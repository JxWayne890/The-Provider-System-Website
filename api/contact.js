/* global process */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeField = (value, maxLength = 500) => {
    return String(value ?? '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
};

const normalizeMessage = (value, maxLength = 5000) => {
    return String(value ?? '')
        .replace(/\r\n/g, '\n')
        .trim()
        .slice(0, maxLength);
};

const formatPhone = (value) => {
    const raw = String(value ?? '').replace(/[^\d]/g, '');
    if (raw.length === 10) {
        return `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    return value; // Return as-is if it's not a standard 10-digit number
};

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, phone, inquiryType, message } = req.body;

    const normalizedFirstName = normalizeField(firstName, 100);
    const normalizedLastName = normalizeField(lastName, 100);
    const normalizedEmail = String(email ?? '').trim().toLowerCase().slice(0, 320);
    const normalizedPhone = formatPhone(normalizeField(phone, 50));
    const normalizedInquiryType = normalizeField(inquiryType || 'General Inquiry', 120);
    const normalizedMessage = normalizeMessage(message, 5000);

    // Basic validation
    if (!normalizedFirstName || !normalizedLastName || !normalizedEmail || !normalizedPhone || !normalizedMessage) {
        return res.status(400).json({ error: 'All primary fields are required.' });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
    }

    try {
        const emailText = [
            'New System Inquiry',
            '',
            `Inquiry Type: ${normalizedInquiryType}`,
            `First Name: ${normalizedFirstName}`,
            `Last Name: ${normalizedLastName}`,
            `Email Address: ${normalizedEmail}`,
            `Phone Number: ${normalizedPhone}`,
            '',
            'Message Details:',
            normalizedMessage,
        ].join('\n');

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'The Provider\'s System <onboarding@resend.dev>',
                to: 'theprovidersystem@gmail.com',
                subject: `[INQUIRY] ${normalizedInquiryType} from ${normalizedFirstName} ${normalizedLastName}`,
                reply_to: normalizedEmail,
                text: emailText,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Resend API error:', data);
            return res.status(response.status).json({ error: data.message || 'Failed to send email.' });
        }

        return res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
