import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Mail, PhoneCall } from 'lucide-react';
import { cn } from '../lib/cn';
import { getLeadAttribution, trackEvent } from '../lib/analytics';

const inquiryOptions = [
    'Website or redesign',
    'Local SEO or Google Business Profile',
    'Lead follow-up or CRM',
    'Automation, AI, or a custom system',
    'Not sure yet',
];

const createEmptyForm = () => ({
    name: '',
    email: '',
    phone: '',
    inquiryType: inquiryOptions[0],
    message: '',
    website: '',
});

const createSubmissionId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export default function ContactFormSection({
    heading = 'Tell us where the system is breaking.',
    subheading = 'Share the business context, the current tools, and the handoff that is getting lost. John will review the details before recommending a next step.',
    theme = 'light',
}) {
    const isDark = theme === 'dark';
    const [formData, setFormData] = useState(createEmptyForm);
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const statusRef = useRef(null);
    const formStartedAtRef = useRef(Date.now());
    const submissionIdRef = useRef(createSubmissionId());
    const hasTrackedStartRef = useRef(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: name === 'phone' ? value.slice(0, 50) : value,
        }));
    };

    const handleFormStart = () => {
        if (hasTrackedStartRef.current) return;
        hasTrackedStartRef.current = true;
        trackEvent('lead_form_start', {
            form_name: 'project_inquiry',
            page_path: window.location.pathname,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                signal: controller.signal,
                body: JSON.stringify({
                    ...formData,
                    ...getLeadAttribution(),
                    submissionId: submissionIdRef.current,
                    formStartedAt: formStartedAtRef.current,
                    submittedAt: new Date().toISOString(),
                }),
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
                const requestError = new Error(result.error || 'The request could not be sent.');
                requestError.status = response.status;
                throw requestError;
            }

            setFormData(createEmptyForm());
            setStatus('success');
            trackEvent('form_success', {
                form_name: 'project_inquiry',
                inquiry_type: formData.inquiryType,
                page_path: window.location.pathname,
            });
            trackEvent('generate_lead', {
                form_name: 'project_inquiry',
                inquiry_type: formData.inquiryType,
            });
            requestAnimationFrame(() => statusRef.current?.focus());
        } catch (error) {
            console.error('Contact form submission failed:', error);
            const isRateLimited = error.status === 429;
            const isTimeout = error.name === 'AbortError';
            setErrorMessage(isRateLimited
                ? 'Too many requests were received. Please wait a few minutes, call, or email John directly.'
                : isTimeout
                    ? 'The request took too long to send. Please try again, call, or email John directly.'
                    : 'The form could not send right now. Please try again, call, or email John directly.');
            setStatus('error');
            trackEvent('form_error', {
                form_name: 'project_inquiry',
                error_type: isRateLimited ? 'rate_limited' : isTimeout ? 'timeout' : 'submission_failed',
                page_path: window.location.pathname,
            });
            requestAnimationFrame(() => statusRef.current?.focus());
        } finally {
            window.clearTimeout(timeoutId);
        }
    };

    const handleSendAnother = () => {
        setFormData(createEmptyForm());
        setStatus('idle');
        setErrorMessage('');
        formStartedAtRef.current = Date.now();
        submissionIdRef.current = createSubmissionId();
        hasTrackedStartRef.current = false;
    };

    const surfaceClass = isDark
        ? 'border-white/10 bg-white/[0.05] text-white'
        : 'border-primary/10 bg-white text-primary shadow-card';
    const inputClass = cn(
        'min-h-12 w-full rounded-xl border px-4 py-3 text-base transition placeholder:text-current/35 disabled:cursor-wait disabled:opacity-60',
        isDark
            ? 'border-white/15 bg-white/[0.055] text-white focus:border-sun'
            : 'border-primary/15 bg-background text-primary focus:border-accent'
    );
    const labelClass = cn(
        'mb-2 block text-sm font-bold',
        isDark ? 'text-white/75' : 'text-primary'
    );

    return (
        <section
            id="contact"
            className={cn(
                'scroll-mt-32 px-5 py-20 sm:px-8 md:py-28 lg:px-12',
                isDark ? 'bg-primary' : 'bg-background'
            )}
        >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                    <p className={cn('eyebrow mb-4', isDark && 'text-sun')}>Project context</p>
                    <h2 className={cn('section-title', isDark ? 'text-white' : 'text-primary')}>{heading}</h2>
                    <p className={cn('mt-5 text-lg leading-8', isDark ? 'text-white/62' : 'text-muted')}>
                        {subheading}
                    </p>
                    <div className={cn('mt-8 grid gap-4 rounded-2xl border p-5 sm:grid-cols-2', isDark ? 'border-white/10 bg-white/[0.04]' : 'border-primary/10 bg-white')}>
                        <div className="flex items-start gap-3">
                            <PhoneCall className={cn('mt-0.5 h-5 w-5 flex-none', isDark ? 'text-sun' : 'text-accent')} aria-hidden="true" />
                            <div>
                                <p className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-primary')}>Prefer to call?</p>
                                <a
                                    href="tel:+13252495191"
                                    className={cn('mt-1 block break-all text-sm underline underline-offset-4', isDark ? 'text-white/62' : 'text-muted')}
                                >
                                    (325) 249-5191
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className={cn('mt-0.5 h-5 w-5 flex-none', isDark ? 'text-sun' : 'text-accent')} aria-hidden="true" />
                            <div>
                                <p className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-primary')}>Prefer email?</p>
                                <a
                                    href="mailto:theprovidersystem@gmail.com"
                                    className={cn('mt-1 block break-all text-sm underline underline-offset-4', isDark ? 'text-white/62' : 'text-muted')}
                                >
                                    theprovidersystem@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cn('rounded-[2rem] border p-6 sm:p-8 lg:p-10', surfaceClass)}>
                    {status === 'success' ? (
                        <div
                            ref={statusRef}
                            tabIndex="-1"
                            role="status"
                            className="flex min-h-[28rem] flex-col items-start justify-center"
                        >
                            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-teal/10">
                                <CheckCircle2 className="h-8 w-8 text-teal" aria-hidden="true" />
                            </span>
                            <h3 className="mt-7 text-3xl font-bold tracking-[-0.035em]">Project context received.</h3>
                            <p className={cn('mt-4 max-w-lg leading-7', isDark ? 'text-white/62' : 'text-muted')}>
                                Thanks—your request was sent. John will review it and reply using the contact information you provided.
                            </p>
                            <button type="button" onClick={handleSendAnother} className="button-secondary mt-8">
                                Send another inquiry
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            onFocusCapture={handleFormStart}
                            aria-busy={status === 'sending'}
                        >
                            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                                <label htmlFor="contact-website">Leave this field empty</label>
                                <input
                                    id="contact-website"
                                    name="website"
                                    type="text"
                                    tabIndex="-1"
                                    autoComplete="off"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Your name"
                                    id="contact-name"
                                    name="name"
                                    autoComplete="name"
                                    maxLength={120}
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <Field
                                    label="Email"
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    maxLength={320}
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <Field
                                    label="Phone (optional)"
                                    id="contact-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    inputMode="tel"
                                    maxLength={50}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <div>
                                    <label htmlFor="contact-inquiry-type" className={labelClass}>
                                        What do you need help with?
                                    </label>
                                    <select
                                        id="contact-inquiry-type"
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className={inputClass}
                                    >
                                        {inquiryOptions.map((option) => (
                                            <option key={option} value={option} className="text-primary">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-message" className={labelClass}>
                                    Business, location, and project goal
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="5"
                                    required
                                    minLength="20"
                                    maxLength="5000"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    placeholder="What business do you run, where do you serve, and what should the website or lead process do better?"
                                    className={cn(inputClass, 'min-h-32 resize-y')}
                                />
                                <p className={cn('mt-2 text-xs leading-5', isDark ? 'text-white/65' : 'text-muted')}>
                                    Please do not include passwords, payment details, medical information, or other sensitive data.
                                </p>
                            </div>

                            {status === 'error' && (
                                <div
                                    ref={statusRef}
                                    tabIndex="-1"
                                    role="alert"
                                    className="mt-5 flex items-start gap-3 rounded-2xl border border-red-600/20 bg-red-600/10 p-4 text-sm text-red-700"
                                >
                                    <AlertCircle className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="button-primary mt-7 w-full disabled:cursor-wait disabled:opacity-65"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                                        Sending request…
                                    </>
                                ) : (
                                    'Request a website and lead-flow review'
                                )}
                            </button>
                            <p className={cn('mt-4 text-center text-xs leading-5', isDark ? 'text-white/65' : 'text-muted')}>
                                By submitting, you ask The Provider System to contact you about this inquiry.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

function Field({
    label,
    id,
    name,
    type = 'text',
    autoComplete,
    inputMode,
    maxLength,
    required = false,
    value,
    onChange,
    disabled,
    inputClass,
    labelClass,
}) {
    return (
        <div>
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                inputMode={inputMode}
                maxLength={maxLength}
                required={required}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={inputClass}
            />
        </div>
    );
}
