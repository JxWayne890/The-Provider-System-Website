import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: "01",
        title: "Audit & Map",
        desc: "Analyze existing manual workflows and identify leaks.",
        type: "concentric"
    },
    {
        step: "02",
        title: "Build & Route",
        desc: "Deploy structural logic and integrate software nodes.",
        type: "laser"
    },
    {
        step: "03",
        title: "Protect & Run",
        desc: "Monitor the machine as it operates silently in the background.",
        type: "waveform"
    }
];

const ConcentricCircles = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 animate-[spin_20s_linear_infinite]">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.2" />
    </svg>
);

const LaserGrid = () => (
    <div className="relative w-full h-full opacity-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#111827_100%)] z-10" />
        <div
            className="absolute w-[200%] h-[200%] rotate-45"
            style={{
                backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#FF9F1C] z-20 animate-[scan_3s_ease-in-out_infinite_alternate]" />
        <style>{`
      @keyframes scan {
        0% { transform: translateY(-50px); }
        100% { transform: translateY(400px); }
      }
    `}</style>
    </div>
);

const Waveform = () => (
    <div className="w-full h-full flex items-center justify-center opacity-60">
        <svg viewBox="0 0 200 100" className="w-full">
            <path
                d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 120 50 L 130 10 L 140 90 L 150 50 L 200 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-[dash_2s_linear_infinite]"
                strokeDasharray="200"
                strokeDashoffset="200"
            />
        </svg>
        <style>{`
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
    </div>
);

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                // Create ScrollTrigger for pinning each card
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                // Animation for the card immediately below transitioning it off
                if (i < cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.2,
                        filter: "blur(10px)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative w-full bg-primary pt-10">

            <div className="h-[20vh] flex items-center justify-center">
                <h2 className="font-heading font-bold text-4xl text-white">System Deployment Protocol</h2>
            </div>

            {protocols.map((protocol, i) => (
                <div
                    key={protocol.step}
                    className="protocol-card h-[100vh] w-full flex items-center justify-center sticky top-0"
                    style={{ zIndex: i + 10 }}
                >
                    <div className={cn(
                        "w-[90vw] max-w-5xl h-[70vh] rounded-[3rem] border p-8 md:p-16 flex flex-col md:flex-row gap-12 overflow-hidden relative shadow-2xl",
                        "bg-dark border-muted/20"
                    )}>

                        <div className="flex-1 flex flex-col justify-center relative z-20">
                            <span className="font-data text-accent text-lg mb-6 block">PHASE {protocol.step}</span>
                            <h3 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
                                {protocol.title}
                            </h3>
                            <p className="font-heading text-xl text-white/50 max-w-lg">
                                {protocol.desc}
                            </p>
                        </div>

                        <div className="flex-1 relative flex items-center justify-center text-white/10 z-10 w-full h-full">
                            {protocol.type === 'concentric' && <ConcentricCircles />}
                            {protocol.type === 'laser' && <LaserGrid />}
                            {protocol.type === 'waveform' && <Waveform />}
                        </div>

                    </div>
                </div>
            ))}

            {/* Spacer to allow scrolling past the last pinned card */}
            <div className="h-[50vh] bg-primary relative z-[99]" />
        </section>
    );
}
