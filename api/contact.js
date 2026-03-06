export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
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
                subject: `New Inquiry from ${name}`,
                reply_to: email,
                html: `
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
                        <div style="background: #0B1020; padding: 32px 24px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">New Contact Form Inquiry</h1>
                            <p style="color: #FF9F1C; font-size: 13px; margin-top: 8px; letter-spacing: 2px; text-transform: uppercase;">The Provider's System</p>
                        </div>
                        <div style="padding: 32px 24px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">Name</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 600;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px;"><a href="mailto:${email}" style="color: #FF9F1C; text-decoration: none;">${email}</a></td>
                                </tr>
                            </table>
                            <div style="margin-top: 24px;">
                                <p style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
                                <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                            </div>
                        </div>
                        <div style="background: #0B1020; padding: 16px 24px; text-align: center;">
                            <p style="color: #6b7280; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${name}</p>
                        </div>
                    </div>
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
