import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
    const containerRef = useRef(null);

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

    return (
        <section id="contact" ref={containerRef} className="py-32 px-6 md:px-16 bg-background flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center w-full">

                <h2 className="cta-elem font-heading font-bold text-4xl md:text-6xl text-primary mb-6">
                    Ready to reclaim your time?
                </h2>

                <p className="cta-elem font-heading text-lg md:text-xl text-muted max-w-2xl mb-12">
                    Stop leaking revenue through manual chaos. Send us a message to start your system audit.
                </p>

                <form className="cta-elem w-full max-w-xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-muted/10 text-left">
                    <div className="space-y-6">
                        <div>
                            <label className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="john@business.com"
                                className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block font-data text-xs uppercase tracking-widest text-muted mb-2 ml-1">How can we help?</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us about your current bottlenecks..."
                                className="w-full bg-background border border-muted/10 rounded-2xl px-6 py-4 font-heading focus:outline-none focus:border-accent transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-2xl bg-accent text-white py-5 font-heading text-lg font-bold hover:scale-[1.02] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-xl hover:shadow-accent/40"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-primary">Send Message</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
}
