import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/cn';

const inquiryOptions = [
    'AI Workflow Automation',
    'Custom SaaS Development',
    'Website / Web App Build',
    'Intelligent Lead Routing',
    'Operational Audit',
    'Other / Idea Integration',
];

/**
 * Reusable contact form section that can be dropped into any page.
 *
 * @param {string} [heading="Ready to Automate?"]
 * @param {string} [subheading]
 * @param {"light" | "dark"} [theme="light"]
 */
export default function ContactFormSection({
    heading = 'Ready to Automate?',
    subheading,
    theme = 'light',
}) {
    const isDark = theme === 'dark';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'AI Workflow Automation',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || `Server responded with ${res.status}`);
                }
                if (res.status === 404) {
                    throw new Error("API route not found. Make sure you are running 'npx vercel dev' to enable backend functions.");
                }
                throw new Error(`Server error: ${res.status} ${res.statusText}`);
            }

            await res.json();
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', inquiryType: 'AI Workflow Automation', message: '' });
        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
            if (err.message === 'Failed to fetch') {
                setErrorMsg("Network error: Could not reach the server. If testing locally, please use 'npx vercel dev' instead of 'npm run dev'.");
            } else {
                setErrorMsg(err.message || 'An unexpected error occurred.');
            }
        }
    };

    // Shared input classes
    const inputClass = cn(
        'w-full rounded-2xl px-6 py-4 font-heading focus:outline-none transition-colors disabled:opacity-50',
        isDark
            ? 'bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:border-accent'
            : 'bg-background border border-muted/10 text-primary placeholder-muted/40 focus:border-accent'
    );

    const labelClass = cn(
        'block font-data text-xs uppercase tracking-widest mb-2 ml-1',
        isDark ? 'text-white/50' : 'text-muted'
    );

    return (
        <section
            className={cn(
                'py-24 md:py-32 px-6 md:px-16',
                isDark ? 'bg-primary' : 'bg-background'
            )}
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <h2
                    className={cn(
                        'font-heading font-bold text-4xl md:text-6xl mb-6',
                        isDark ? 'text-white' : 'text-primary'
                    )}
                >
                    {heading}
                </h2>

                {subheading && (
                    <p
                        className={cn(
                            'font-heading text-lg md:text-xl max-w-2xl mb-12',
                            isDark ? 'text-white/60' : 'text-muted'
                        )}
                    >
                        {subheading}
                    </p>
                )}

                <div
                    className={cn(
                        'w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] text-left',
                        isDark
                            ? 'bg-white/[0.04] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]'
                            : 'bg-white shadow-2xl border border-muted/10'
                    )}
                >
                    {status === 'success' ? (
                        <div className="py-12 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h3
                                className={cn(
                                    'font-heading font-bold text-4xl mb-4',
                                    isDark ? 'text-white' : 'text-primary'
                                )}
                            >
                                Message Sent
                            </h3>
                            <p
                                className={cn(
                                    'font-heading text-xl leading-relaxed max-w-sm',
                                    isDark ? 'text-white/60' : 'text-muted'
                                )}
                            >
                                We&apos;ve received your data. A strategist will contact you within 24 hours.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-12 bg-accent text-white px-8 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform"
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="cfs-firstName" className={labelClass}>First Name</label>
                                        <input
                                            id="cfs-firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cfs-lastName" className={labelClass}>Last Name</label>
                                        <input
                                            id="cfs-lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="cfs-email" className={labelClass}>Email Address</label>
                                        <input
                                            id="cfs-email"
                                            name="email"
                                            type="email"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@business.com"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cfs-phone" className={labelClass}>Phone Number</label>
                                        <input
                                            id="cfs-phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(555) 000-0000"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="cfs-inquiryType" className={labelClass}>What do you need?</label>
                                    <select
                                        id="cfs-inquiryType"
                                        name="inquiryType"
                                        disabled={status === 'sending'}
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className={cn(inputClass, 'appearance-none cursor-pointer')}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 1.5rem center',
                                            backgroundSize: '1.25rem',
                                        }}
                                    >
                                        {inquiryOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="cfs-message" className={labelClass}>Details &amp; Context</label>
                                    <textarea
                                        id="cfs-message"
                                        name="message"
                                        rows="4"
                                        required
                                        disabled={status === 'sending'}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your current bottlenecks..."
                                        className={cn(inputClass, 'resize-none')}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div
                                        className={cn(
                                            'flex items-start gap-3 p-5 rounded-xl text-sm font-heading border',
                                            isDark
                                                ? 'bg-red-500/10 text-red-300 border-red-500/20'
                                                : 'bg-red-50 text-red-700 border-red-100'
                                        )}
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold mb-1">Error Sending Message</p>
                                            <p className="opacity-80 leading-relaxed">{errorMsg}</p>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-accent text-white py-5 font-heading text-lg font-bold hover:scale-[1.02] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-xl hover:shadow-accent/40 disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 transition-colors group-hover:text-primary flex items-center justify-center gap-3">
                                        {status === 'sending' ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Initializing Workflow...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
