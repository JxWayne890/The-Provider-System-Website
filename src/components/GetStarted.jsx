import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
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

                {status === 'success' ? (
                    <div className="cta-elem w-full max-w-xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-200 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-primary">Message Sent</h3>
                        <p className="font-heading text-muted">We'll get back to you within 24 hours. Check your inbox for a confirmation.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="cta-elem w-full max-w-xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-muted/10 text-left">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="contact-name" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Full Name</label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Email Address</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@business.com"
                                    className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">How can we help?</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your current bottlenecks..."
                                    className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors resize-none"
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-3 bg-red-50 text-red-700 px-5 py-3 rounded-xl text-sm font-heading">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="group relative w-full overflow-hidden rounded-2xl bg-accent text-white py-5 font-heading text-lg font-bold hover:scale-[1.02] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-xl hover:shadow-accent/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-primary">
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </section>
    );
}

