import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-anim',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: "power3.out", delay: 0.2 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-16 overflow-hidden">
            {/* Background Image & Gradient overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
                    alt="Brutalist Architecture"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
            </div>

            {/* Content pushes to bottom left third */}
            <div className="relative z-10 max-w-4xl text-white">
                <h1 className="flex flex-col gap-2 mb-8">
                    <span className="hero-anim font-heading font-bold text-4xl md:text-6xl tracking-tight uppercase">
                        Automate the
                    </span>
                    <span className="hero-anim font-drama italic text-7xl md:text-[9rem] leading-[0.85] text-white">
                        Process.
                    </span>
                </h1>

                <p className="hero-anim font-heading text-lg md:text-xl max-w-2xl text-white/80 mb-10 font-light leading-relaxed">
                    The Provider's System is a digital architecture group specializing in high-performance SaaS applications, dynamic corporate sites, and custom internal tools. We design automated workflows and scalable software infrastructures that allow founders and operators to reclaim their time without sacrificing operational control.
                </p>

                <div className="hero-anim">
                    <a
                        href="#contact"
                        className="group inline-block relative overflow-hidden rounded-[2rem] bg-accent text-white px-8 py-4 font-heading text-lg font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-lg hover:shadow-accent/25"
                    >
                        <span className="relative z-10">Book a consultation</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                    </a>
                </div>
            </div>
        </section>
    );
}
