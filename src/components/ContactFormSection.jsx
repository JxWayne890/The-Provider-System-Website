import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Mail } from 'lucide-react';
import { cn } from '../lib/cn';

const inquiryOptions = [
    'Website or local SEO',
    'Lead generation or follow-up',
    'CRM or Jobber alternative',
    'Automation or integrations',
    'AI receptionist, chat, or support',
    'AI content or growth system',
    'Custom business system',
    'I am not sure yet',
];

const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: inquiryOptions[0],
    message: '',
};

export default function ContactFormSection({
    heading = 'Tell us where the system is breaking.',
    subheading = 'Share the business context, the current tools, and the handoff that is getting lost. John will review the details before recommending a next step.',
    theme = 'light',
}) {
    const isDark = theme === 'dark';
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const statusRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: name === 'phone' ? value.slice(0, 50) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(result.error || 'The request could not be sent.');
            }

            setFormData(emptyForm);
            setStatus('success');
            requestAnimationFrame(() => statusRef.current?.focus());
        } catch (error) {
            console.error('Contact form submission failed:', error);
            setErrorMessage(
                'The form could not send right now. Please try again or email theprovidersystem@gmail.com.'
            );
            setStatus('error');
            requestAnimationFrame(() => statusRef.current?.focus());
        }
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
                    <div className={cn('mt-8 rounded-2xl border p-5', isDark ? 'border-white/10 bg-white/[0.04]' : 'border-primary/10 bg-white')}>
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
                                John can now review the business, the current system, and the requested direction before following up.
                            </p>
                            <button type="button" onClick={() => setStatus('idle')} className="button-secondary mt-8">
                                Send another inquiry
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} aria-busy={status === 'sending'}>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="First name"
                                    id="contact-first-name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <Field
                                    label="Last name"
                                    id="contact-last-name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <Field
                                    label="Work email"
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                                <Field
                                    label="Phone"
                                    id="contact-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    inputMode="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    inputClass={inputClass}
                                    labelClass={labelClass}
                                />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="contact-inquiry-type" className={labelClass}>
                                    Where should we start?
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

                            <div className="mt-5">
                                <label htmlFor="contact-message" className={labelClass}>
                                    What is happening today?
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="6"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={status === 'sending'}
                                    placeholder="What business do you run? Where do leads or work get lost? Which tools are involved? What would a better next step look like?"
                                    className={cn(inputClass, 'min-h-36 resize-y')}
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
                                        Sending project context…
                                    </>
                                ) : (
                                    'Send project context'
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
                required
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={inputClass}
            />
        </div>
    );
}
