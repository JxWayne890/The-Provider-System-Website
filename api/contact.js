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
                html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Received</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F5F7FA; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #F5F7FA; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; color: #111827; border-radius: 20px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background-color: #FF9F1C; padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase; }
        .content { padding: 40px; }
        .inquiry-badge { display: inline-block; background-color: #0B1020; color: #ffffff; padding: 6px 16px; border-radius: 100px; font-size: 12px; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; }
        .detail-row { margin-bottom: 20px; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px; }
        .label { font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
        .value { font-size: 16px; color: #0B1020; font-weight: 500; }
        .message-box { background-color: #F8FAFC; border-radius: 12px; padding: 24px; border-left: 4px solid #FF9F1C; margin-top: 32px; }
        .message-text { color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap; margin: 0; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #94A3B8; }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main" width="100%">
            <tr>
                <td class="header">
                    <h1>New System Inquiry</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <div class="inquiry-badge">${normalizedInquiryType}</div>
                    
                    <table width="100%">
                        <tr>
                            <td width="50%" class="detail-row" style="padding-right: 10px;">
                                <div class="label">First Name</div>
                                <div class="value">${normalizedFirstName}</div>
                            </td>
                            <td width="50%" class="detail-row">
                                <div class="label">Last Name</div>
                                <div class="value">${normalizedLastName}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="detail-row">
                                <div class="label">Email Address</div>
                                <div class="value">${normalizedEmail}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="detail-row">
                                <div class="label">Phone Number</div>
                                <div class="value">${normalizedPhone}</div>
                            </td>
                        </tr>
                    </table>

                    <div class="message-box">
                        <div class="label" style="margin-bottom: 12px;">Message Details</div>
                        <p class="message-text">${normalizedMessage}</p>
                    </div>
                </td>
            </tr>
        </table>
        <div class="footer">
            &copy; 2026 The Provider's System. All rights reserved.<br>
            AI Architecture & Automation For Operations.
        </div>
    </div>
</body>
</html>
                `,
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
