import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Settings, Terminal, Plus, Activity } from 'lucide-react';
import { cn } from './Navbar';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
    const [cards, setCards] = useState([
        { id: 1, label: "Extract Data", desc: "Parsing manual inputs" },
        { id: 2, label: "Apply Logic", desc: "Routing via ruleset" },
        { id: 3, label: "Execute Workflow", desc: "Smoother business ops" }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                if (last) newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-48 w-full flex items-center justify-center -mt-6">
            {cards.map((card, i) => {
                const isFirst = i === 0;
                const isSecond = i === 1;
                const isThird = i === 2;

                return (
                    <div
                        key={card.id}
                        className={cn(
                            "absolute w-64 bg-white rounded-2xl border border-muted/20 shadow-xl p-5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                            isFirst ? "z-30 translate-y-0 scale-100 opacity-100" :
                                isSecond ? "z-20 translate-y-6 scale-[0.92] opacity-70" :
                                    "z-10 translate-y-12 scale-[0.84] opacity-40"
                        )}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Settings className="w-5 h-5 text-accent animate-[spin_4s_linear_infinite]" />
                            <span className="font-data text-xs uppercase tracking-wider text-muted font-bold text-primary">Step {card.id}</span>
                        </div>
                        <h4 className="font-heading font-bold text-dark">{card.label}</h4>
                        <p className="font-heading text-sm text-muted mt-1">{card.desc}</p>
                    </div>
                )
            })}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const [text, setText] = useState("");
    const messages = [
        "Receiving inbound lead...",
        "Validating contact schema...",
        "Routing to CRM channel.",
        "Drafting automatic follow-up...",
        "Follow-up sent. Leak plugged."
    ];
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        let currentText = "";
        let charIdx = 0;
        const targetMsg = messages[msgIdx];

        // Type characters
        const typeInterval = setInterval(() => {
            currentText = targetMsg.slice(0, charIdx + 1);
            setText(currentText);
            charIdx++;

            if (charIdx > targetMsg.length) {
                clearInterval(typeInterval);
                // Wait then clear to next
                setTimeout(() => {
                    setMsgIdx((prev) => (prev + 1) % messages.length);
                }, 2000);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [msgIdx]);

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl p-5 border border-white/10 shadow-inner overflow-hidden relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="font-data text-xs text-white/50">SYSTEM.LOG</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-data text-xs text-accent">LIVE FEED</span>
                </div>
            </div>
            <div className="font-data text-sm flex gap-2 text-green-400">
                <span className="text-white/30">$</span>
                <p className="flex-1 break-words">
                    {text}
                    <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
                </p>
            </div>
        </div>
    )
}

const ProtocolScheduler = () => {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const targetDayRef = useRef(null);
    const saveBtnRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Starting position (bottom right offscreen)
            tl.set(cursorRef.current, { x: 150, y: 150, opacity: 0 });

            // Move to target day
            tl.to(cursorRef.current, {
                x: -40, // Relative positions might be tricky, we'll use simple hardcoded offsets for the component scale
                y: -30,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut"
            })
                // Click simulation
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .to(targetDayRef.current, { backgroundColor: "#FF9F1C", color: "white", duration: 0.2 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 })

                // Move to save button
                .to(cursorRef.current, {
                    x: 60,
                    y: 45,
                    duration: 0.8,
                    ease: "power2.inOut",
                    delay: 0.3
                })
                // Click Save
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .to(saveBtnRef.current, { scale: 0.95, duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                .to(saveBtnRef.current, { scale: 1, duration: 0.1 })

                // Move off and reset
                .to(cursorRef.current, { x: 150, y: 150, opacity: 0, duration: 0.8, delay: 0.5 })
                .set(targetDayRef.current, { backgroundColor: "transparent", color: "#111827" });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div ref={containerRef} className="relative w-full h-full flex flex-col justify-center items-center py-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-muted/10 w-full max-w-[240px]">
                <div className="text-xs font-data text-muted mb-3 flex justify-between items-center">
                    <span>Weekly Protocol</span>
                    <Plus className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-7 gap-1 mb-6">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            ref={i === 3 ? targetDayRef : null}
                            className={cn(
                                "aspect-square rounded-full flex items-center justify-center font-heading text-xs font-medium transition-colors",
                                i === 3 ? "text-dark" : "text-dark"
                            )}
                        >
                            {d}
                        </div>
                    ))}
                </div>
                <button
                    ref={saveBtnRef}
                    className="w-full bg-primary text-white font-heading text-xs py-2 rounded-lg"
                >
                    Save Hours
                </button>
            </div>

            {/* Animated Cursor */}
            <MousePointer2
                ref={cursorRef}
                className="absolute z-50 text-dark w-8 h-8 drop-shadow-md pointer-events-none fill-white"
            />
        </div>
    )
}

export default function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.feature-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={sectionRef} className="py-24 px-6 md:px-16 bg-background relative z-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary mb-4">
                        Interactive Functional Artifacts
                    </h2>
                    <p className="font-data text-sm md:text-base text-muted uppercase tracking-widest">
                        Core Operational Leverage
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="feature-card bg-white rounded-[2rem] p-8 border border-muted/10 shadow-xl shadow-muted/5 flex flex-col h-[400px]">
                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-primary leading-tight mb-2">
                                Automate Data Extraction
                            </h3>
                            <div className="font-heading text-muted text-sm leading-relaxed space-y-1">
                                <p className="mb-2">We build custom routing systems that replace manual data entry.</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Extract data from emails or forms</li>
                                    <li>Apply custom business logic rules</li>
                                    <li>Execute complex Zapier/Make workflows</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-background rounded-[1.5rem] border border-muted/5 p-4 flex flex-col justify-end overflow-hidden">
                            <ShufflerCard />
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card bg-white rounded-[2rem] p-8 border border-muted/10 shadow-xl shadow-muted/5 flex flex-col h-[400px]">
                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-primary leading-tight mb-2">
                                Intelligent Lead Routing
                            </h3>
                            <div className="font-heading text-muted text-sm leading-relaxed space-y-1">
                                <p className="mb-2">Stop losing revenue to slow response times.</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Capture inbound leads instantly</li>
                                    <li>Validate contact schemas</li>
                                    <li>Trigger automated SMS/Email outreach</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-background rounded-[1.5rem] border border-muted/5 p-2 overflow-hidden">
                            <TelemetryTypewriter />
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card bg-white rounded-[2rem] p-8 border border-muted/10 shadow-xl shadow-muted/5 flex flex-col h-[400px]">
                        <div className="mb-6">
                            <h3 className="font-heading font-bold text-xl text-primary leading-tight mb-2">
                                Centralized Scheduling
                            </h3>
                            <div className="font-heading text-muted text-sm leading-relaxed space-y-1">
                                <p className="mb-2">Clean, repeatable systems for reclaiming hours.</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Sync calendars automatically</li>
                                    <li>Enforce meeting buffer protocols</li>
                                    <li>Reduce organizational chaos</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-background rounded-[1.5rem] border border-muted/5 p-4 overflow-hidden relative">
                            <ProtocolScheduler />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
