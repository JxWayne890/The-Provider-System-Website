/* global process */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_BODY_LENGTH = 20_000;
const requestTimestampsByIp = new Map();

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
    return normalizeField(value, 50);
};

const getHeader = (req, name) => {
    const value = req.headers?.[name];
    return Array.isArray(value) ? value[0] : value || '';
};

const getClientIp = (req) => {
    const forwardedFor = getHeader(req, 'x-forwarded-for');
    return normalizeField(forwardedFor.split(',')[0] || req.socket?.remoteAddress || 'unknown', 100);
};

const consumeRateLimit = (ip) => {
    const now = Date.now();
    const recentRequests = (requestTimestampsByIp.get(ip) || [])
        .filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - recentRequests[0]);
        return {
            allowed: false,
            retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        };
    }

    recentRequests.push(now);
    requestTimestampsByIp.set(ip, recentRequests);

    if (requestTimestampsByIp.size > 500) {
        for (const [storedIp, timestamps] of requestTimestampsByIp) {
            if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
                requestTimestampsByIp.delete(storedIp);
            }
        }
    }

    return { allowed: true, retryAfterSeconds: 0 };
};

const parseBody = (body) => {
    if (typeof body === 'string') return JSON.parse(body);
    return body && typeof body === 'object' ? body : {};
};

const isHoneypotSpam = (body) => Boolean(normalizeField(body.website, 200));

const formatAttributionLine = (label, value) => `${label}: ${value || 'Not provided'}`;

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    let body;
    try {
        const bodyLength = typeof req.body === 'string'
            ? req.body.length
            : JSON.stringify(req.body || {}).length;
        if (bodyLength > MAX_BODY_LENGTH) {
            return res.status(413).json({ error: 'The request is too large.' });
        }
        body = parseBody(req.body);
    } catch {
        return res.status(400).json({ error: 'The request body is invalid.' });
    }

    // Quietly accept obvious bot submissions without sending a notification.
    if (isHoneypotSpam(body)) {
        return res.status(200).json({ success: true });
    }

    const rateLimit = consumeRateLimit(getClientIp(req));
    if (!rateLimit.allowed) {
        res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
        return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
    }

    const legacyName = `${normalizeField(body.firstName, 60)} ${normalizeField(body.lastName, 60)}`.trim();
    const normalizedName = normalizeField(body.name || legacyName, 120);
    const normalizedEmail = String(body.email ?? '').trim().toLowerCase().slice(0, 320);
    const normalizedPhone = formatPhone(body.phone);
    const normalizedInquiryType = normalizeField(body.inquiryType || 'General inquiry', 120);
    const normalizedMessage = normalizeMessage(body.message, 5000);
    const normalizedSource = normalizeField(body.source || 'Website', 80);
    const normalizedPage = normalizeField(body.page || '/start', 500);
    const normalizedLandingPage = normalizeField(body.landingPage, 500);
    const normalizedReferrer = normalizeField(body.referrer, 1000);
    const normalizedSubmittedAt = normalizeField(body.submittedAt, 80) || new Date().toISOString();
    const normalizedSubmissionId = normalizeField(body.submissionId, 120)
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .slice(0, 100);
    const normalizedUtms = {
        source: normalizeField(body.utmSource, 200),
        medium: normalizeField(body.utmMedium, 200),
        campaign: normalizeField(body.utmCampaign, 200),
        term: normalizeField(body.utmTerm, 200),
        content: normalizeField(body.utmContent, 200),
    };

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
        return res.status(400).json({ error: 'Name, email, and project details are required.' });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (normalizedMessage.length < 20) {
        return res.status(400).json({ error: 'Please add a little more detail about the project.' });
    }

    const phoneDigits = normalizedPhone.replace(/\D/g, '');
    if (normalizedPhone && phoneDigits.length < 7) {
        return res.status(400).json({ error: 'Please enter a valid phone number or leave it blank.' });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('Contact notification is unavailable: RESEND_API_KEY is not configured.');
        return res.status(503).json({ error: 'The form is temporarily unavailable. Please call or email directly.' });
    }

    try {
        const emailText = [
            'New Website Project Inquiry',
            '',
            `Name: ${normalizedName}`,
            `Email: ${normalizedEmail}`,
            `Phone: ${normalizedPhone || 'Not provided'}`,
            `Project type: ${normalizedInquiryType}`,
            '',
            'Project details:',
            normalizedMessage,
            '',
            'Attribution:',
            formatAttributionLine('Source', normalizedSource),
            formatAttributionLine('Page', normalizedPage),
            formatAttributionLine('Landing page', normalizedLandingPage),
            formatAttributionLine('Referrer', normalizedReferrer),
            formatAttributionLine('UTM source', normalizedUtms.source),
            formatAttributionLine('UTM medium', normalizedUtms.medium),
            formatAttributionLine('UTM campaign', normalizedUtms.campaign),
            formatAttributionLine('UTM term', normalizedUtms.term),
            formatAttributionLine('UTM content', normalizedUtms.content),
            formatAttributionLine('Submitted at', normalizedSubmittedAt),
            formatAttributionLine('User agent', normalizeField(getHeader(req, 'user-agent'), 500)),
        ].join('\n');

        const resendHeaders = {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        };
        if (normalizedSubmissionId) {
            resendHeaders['Idempotency-Key'] = `website-inquiry-${normalizedSubmissionId}`;
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: resendHeaders,
            signal: AbortSignal.timeout(12_000),
            body: JSON.stringify({
                from: process.env.RESEND_FROM_EMAIL || 'The Provider System <notifications@mail.theprovidersystem.com>',
                to: process.env.CONTACT_NOTIFICATION_EMAIL || 'theprovidersystem@gmail.com',
                subject: `[WEBSITE INQUIRY] ${normalizedInquiryType} — ${normalizedName}`,
                reply_to: normalizedEmail,
                text: emailText,
            }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            console.error('Resend API error:', data);
            return res.status(502).json({ error: 'The form could not send. Please call or email directly.' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact form server error:', error);
        return res.status(500).json({ error: 'The form could not send. Please call or email directly.' });
    }
}
