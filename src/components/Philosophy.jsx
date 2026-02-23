import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax
            gsap.fromTo(bgRef.current,
                { y: '-20%' },
                {
                    y: '20%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                }
            );

            // Line 1 Reveal
            gsap.fromTo(textRef1.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef1.current,
                        start: "top 85%",
                    }
                }
            );

            // Line 2 Reveal (staggered slightly after line 1 visibility)
            gsap.fromTo(textRef2.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef2.current,
                        start: "top 85%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-40 overflow-hidden bg-primary flex items-center justify-center">

            {/* Parallax Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                    ref={bgRef}
                    src="https://images.unsplash.com/photo-1518331647614-7a1f04cd34ce?q=80&w=2069&auto=format&fit=crop"
                    alt="Raw materials texture"
                    className="absolute w-full h-[140%] object-cover opacity-10 mix-blend-overlay filter grayscale"
                />
                <div className="absolute inset-0 bg-primary/80"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 text-center">
                <div ref={textRef1} className="mb-8">
                    <p className="font-heading text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto">
                        Most AI consulting focuses on: <span className="text-white/80">pie-in-the-sky theories and endless chatbots.</span>
                    </p>
                </div>

                <div ref={textRef2}>
                    <p className="font-heading text-2xl md:text-3xl text-white font-medium mb-3">
                        We focus on:
                    </p>
                    <h2 className="font-drama italic text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-white">
                        giving business owners their <span className="text-accent">time back</span> without sacrificing peace.
                    </h2>
                </div>
            </div>

        </section>
    );
}
