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

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, phone, inquiryType, message } = req.body;

    const normalizedFirstName = normalizeField(firstName, 100);
    const normalizedLastName = normalizeField(lastName, 100);
    const normalizedEmail = String(email ?? '').trim().toLowerCase().slice(0, 320);
    const normalizedPhone = normalizeField(phone, 50);
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
                text: [
                    'New System Inquiry',
                    `Service Requested: ${normalizedInquiryType}`,
                    '',
                    `First Name: ${normalizedFirstName}`,
                    `Last Name: ${normalizedLastName}`,
                    `Email: ${normalizedEmail}`,
                    `Phone: ${normalizedPhone}`,
                    '',
                    'Message Details:',
                    normalizedMessage,
                ].join('\n'),
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
