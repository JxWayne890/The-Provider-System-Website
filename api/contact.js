export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, phone, inquiryType, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ error: 'All primary fields are required.' });
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
                subject: `[INQUIRY] ${inquiryType} from ${firstName} ${lastName}`,
                reply_to: email,
                html: `
                    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                        <div style="background: #0B1020; padding: 40px 24px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.02em;">New System Inquiry</h1>
                            <p style="color: #FF9F1C; font-size: 14px; margin-top: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">The Provider's System</p>
                        </div>
                        <div style="padding: 40px 32px; background: #ffffff;">
                            <div style="margin-bottom: 32px; padding: 20px; background: #fdf2f2; border-radius: 8px; border-left: 4px solid #FF9F1C;">
                                <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service Requested</p>
                                <p style="margin: 4px 0 0 0; color: #0B1020; font-size: 18px; font-weight: 700;">${inquiryType}</p>
                            </div>

                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">First Name</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 600;">${firstName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Last Name</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 600;">${lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">
                                        <a href="mailto:${email}" style="color: #FF9F1C; text-decoration: none; font-weight: 600;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                                    <td style="padding: 16px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: 600;">${phone}</td>
                                </tr>
                            </table>

                            <div style="margin-top: 40px;">
                                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message Details</p>
                                <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                            </div>
                        </div>
                        <div style="background: #0B1020; padding: 24px 32px; text-align: center; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                            <p style="color: #9ca3af; font-size: 13px; margin: 0;">Lead generated via <strong>The Provider's System</strong> website.</p>
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
