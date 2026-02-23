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
        <section ref={containerRef} className="py-32 px-6 md:px-16 bg-background flex flex-col items-center text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                <h2 className="cta-elem font-heading font-bold text-4xl md:text-6xl text-primary mb-6">
                    Ready to reclaim your time?
                </h2>

                <p className="cta-elem font-heading text-lg md:text-xl text-muted max-w-2xl mb-12">
                    Stop leaking revenue through manual chaos. We build clean, repeatable systems so you can focus on leadership and peace.
                </p>

                <div className="cta-elem">
                    <button className="group relative overflow-hidden rounded-[2.5rem] bg-accent text-white px-10 py-5 font-heading text-xl font-bold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl hover:shadow-accent/40 w-full sm:w-auto">
                        <span className="relative z-10 transition-colors group-hover:text-dark">Book a consultation</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                    </button>
                </div>

            </div>
        </section>
    );
}
