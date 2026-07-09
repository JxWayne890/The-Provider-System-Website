import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { GeoQuestionGrid } from './GeoBlocks';

const contactQuestions = [
    {
        question: 'Who should reach out?',
        answer: 'Blue-collar business owners who need a better website, cleaner lead handling, follow-up, CRM visibility, booking, quoting, or a custom system that reduces operational mess.'
    },
    {
        question: 'What should a finished system improve?',
        answer: 'A strong result should make leads easier to capture, easier to track, easier to follow up with, and easier to turn into booked work.'
    },
    {
        question: 'What happens after you submit the form?',
        answer: 'John reviews the request, identifies the main bottleneck or build need, and follows up with the next practical step instead of generic sales copy.'
    }
];

export default function GetStarted() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'I need a better website',
        message: ''
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
            setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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

            // Check if request failed (e.g., 404, 500)
            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
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
            setFormData({ firstName: '', lastName: '', email: '', phone: '', inquiryType: 'I need a better website', message: '' });

        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
            
            // Helpful message for the "Failed to fetch" network error
            if (err.message === 'Failed to fetch') {
                setErrorMsg("Network error: Could not reach the server. If testing locally, please use 'npx vercel dev' instead of 'npm run dev'.");
            } else {
                setErrorMsg(err.message || 'An unexpected error occurred.');
            }
        }
    };

    return (
        <section id="contact" className="py-32 px-6 md:px-16 bg-background flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center w-full">

                <h2 className="cta-elem font-heading font-bold text-4xl md:text-6xl text-primary mb-6">
                    Want to know what your business actually needs?
                </h2>

                <p className="cta-elem font-heading text-lg md:text-xl text-muted max-w-2xl mb-12">
                    Tell us about your website, lead flow, and current tools. We will look for the simplest path forward.
                </p>

                <GeoQuestionGrid
                    className="cta-elem w-full mb-10"
                    eyebrow="Contact Clarity"
                    title="Before you reach out"
                    items={contactQuestions}
                />

                <div className="cta-elem w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-muted/10 text-left">
                    {status === 'success' ? (
                        <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="font-heading font-bold text-4xl text-primary mb-4">Message Sent</h3>
                            <p className="font-heading text-muted text-xl leading-relaxed max-w-sm">
                                We've received your message. John will review it and follow up with the next practical step.
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
                                        <label htmlFor="contact-firstName" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">First Name</label>
                                        <input
                                            id="contact-firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-lastName" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Last Name</label>
                                        <input
                                            id="contact-lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contact-email" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Email Address</label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@business.com"
                                            className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-phone" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Phone Number</label>
                                        <input
                                            id="contact-phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            disabled={status === 'sending'}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(555) 000-0000"
                                            className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-inquiryType" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">What do you need?</label>
                                    <select
                                        id="contact-inquiryType"
                                        name="inquiryType"
                                        disabled={status === 'sending'}
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', backgroundSize: '1.25rem' }}
                                    >
                                        <option value="I need a better website">I need a better website</option>
                                        <option value="I need help capturing and following up with leads">I need help capturing and following up with leads</option>
                                        <option value="I need a CRM or dashboard">I need a CRM or dashboard</option>
                                        <option value="I need booking, quotes, or scheduling">I need booking, quotes, or scheduling</option>
                                        <option value="I need a custom internal system">I need a custom internal system</option>
                                        <option value="I am not sure yet">I am not sure yet</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Details & Context</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="4"
                                        required
                                        disabled={status === 'sending'}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us what business you run, what you need fixed, and what is happening today..."
                                        className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-start gap-3 bg-red-50 text-red-700 p-5 rounded-xl text-sm font-heading border border-red-100">
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
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending Message...
                                            </>
                                        ) : 'Send Message'}
                                    </span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}
