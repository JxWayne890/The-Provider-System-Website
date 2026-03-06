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

// Simplified SVGs tailored for smaller card heights
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111827_100%)] z-10" />
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
        0% { transform: translateY(-30px); }
        100% { transform: translateY(200px); }
      }
    `}</style>
    </div>
);

const Waveform = () => (
    <div className="w-full h-full flex items-center justify-center opacity-60">
        <svg viewBox="0 0 200 100" className="w-full relative top-4">
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
            gsap.fromTo('.protocol-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
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
        <section id="protocol" ref={containerRef} className="py-24 px-6 md:px-16 bg-primary flex flex-col items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="protocol-card font-heading font-bold text-4xl md:text-5xl text-white">System Deployment Protocol</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {protocols.map((protocol) => (
                        <div
                            key={protocol.step}
                            className={cn(
                                "protocol-card relative flex flex-col h-[400px] rounded-[2rem] border p-8 overflow-hidden shadow-2xl",
                                "bg-dark border-muted/20 hover:border-accent/40 transition-colors duration-500 group"
                            )}
                        >
                            <div className="relative z-20 flex-1">
                                <span className="font-data text-accent text-sm md:text-xs uppercase tracking-widest mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">
                                    PHASE {protocol.step}
                                </span>
                                <h3 className="font-heading text-3xl font-bold text-white mb-3 uppercase tracking-tight">
                                    {protocol.title}
                                </h3>
                                <p className="font-heading text-base text-white/50 leading-relaxed">
                                    {protocol.desc}
                                </p>
                            </div>

                            <div className="absolute inset-0 pointer-events-none mt-auto h-[70%] text-white/10 z-10 flex items-end opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out">
                                {protocol.type === 'concentric' && <ConcentricCircles />}
                                {protocol.type === 'laser' && <LaserGrid />}
                                {protocol.type === 'waveform' && <Waveform />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
