import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'AI Workflow Automation',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-elem',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');
        console.log('Starting submission:', formData);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            // Check if response is actually JSON before parsing
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("API route not found. If testing locally, use 'npx vercel dev'.");
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', inquiryType: 'AI Workflow Automation', message: '' });

        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
            setErrorMsg(err.message || 'Failed to send message. Please try again.');
        }
    };

    return (
        <section id="contact" ref={containerRef} className="py-32 px-6 md:px-16 bg-background flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center w-full">

                <h2 className="cta-elem font-heading font-bold text-4xl md:text-6xl text-primary mb-6">
                    Ready to reclaim your time?
                </h2>

                <p className="cta-elem font-heading text-lg md:text-xl text-muted max-w-2xl mb-12">
                    Stop leaking revenue through manual chaos. Send us a message to start your system audit.
                </p>

                <div className="cta-elem w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-muted/10 text-left">
                    {status === 'success' ? (
                        <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="font-heading font-bold text-4xl text-primary mb-4">Message Sent</h3>
                            <p className="font-heading text-muted text-xl leading-relaxed max-w-sm">
                                We've received your data. A strategist will contact you within 24 hours.
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
                                        <option value="AI Workflow Automation">AI Workflow Automation</option>
                                        <option value="Custom SaaS Development">Custom SaaS Development</option>
                                        <option value="Website / Web App Build">Website / Web App Build</option>
                                        <option value="Intelligent Lead Routing">Intelligent Lead Routing</option>
                                        <option value="Operational Audit">Operational Audit</option>
                                        <option value="Other / Idea Integration">Other / Idea Integration</option>
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
                                        placeholder="Tell us about your current bottlenecks..."
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
                                                Initializing Workflow...
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

