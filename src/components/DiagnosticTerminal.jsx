import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Terminal, TrendingDown, ArrowRight, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiagnosticTerminal() {
    const containerRef = useRef(null);
    const terminalRef = useRef(null);
    const valueRef = useRef(null);

    // State
    const [teamSize, setTeamSize] = useState(5);
    const [hoursPerWeek, setHoursPerWeek] = useState(15);
    const [avgHourlyRate, setAvgHourlyRate] = useState(45);

    const [calculatedLoss, setCalculatedLoss] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [logs, setLogs] = useState([
        "> SYSTEM READY",
        "> AWAITING INPUT PARAMETERS...",
    ]);

    // Derived calculation
    // (Team Size) * (Hours) * (Rate) * (52 Weeks)
    const annualLoss = Math.round(teamSize * hoursPerWeek * avgHourlyRate * 52);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const runDiagnostic = () => {
        setIsCalculating(true);
        setLogs([]);

        const sequence = [
            "> INITIATING DIAGNOSTIC PROTOCOL...",
            `> ANALYZING VECTOR: TEAM_SIZE=[${teamSize}]`,
            `> ANALYZING VECTOR: MANUAL_HOURS=[${hoursPerWeek}/wk]`,
            `> INJECTING RATE CONSTANT=[$${avgHourlyRate}/hr]`,
            "> CALCULATING ANNUAL INEFFICIENCY YIELD...",
            "> WARNING: SIGNIFICANT CAPITAL LEAK DETECTED.",
            "> COMPILING AUTOMATION RECOMMENDATIONS.",
            "> DIAGNOSTIC COMPLETE."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLogs(prev => [...prev, sequence[i]]);
                i++;
                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
                setIsCalculating(false);
                setCalculatedLoss(annualLoss);

                // Animate the big number
                if (valueRef.current) {
                    gsap.fromTo(valueRef.current,
                        { textContent: 0, color: "#fff" },
                        {
                            textContent: annualLoss,
                            color: "#FF9F1C",
                            duration: 2,
                            ease: "power2.out",
                            snap: { textContent: 1 },
                            stagger: 1,
                            onUpdate: function () {
                                valueRef.current.innerHTML = "$" + Math.ceil(this.targets()[0].textContent).toLocaleString();
                            }
                        }
                    );
                }
            }
        }, 500); // 500ms between logs
    };

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-16 bg-[#05162D] text-white overflow-hidden relative border-y border-white/5">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">

                {/* Left Side: The Sliders */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="w-6 h-6 text-accent animate-pulse" />
                        <h2 className="font-heading font-medium text-xs tracking-[0.2em] text-accent uppercase">
                            Diagnostic Engine
                        </h2>
                    </div>
                    <h3 className="font-heading font-bold text-4xl leading-tight mb-8">
                        Calculate exactly what your manual processes are <span className="text-white/50 italic font-serif">costing you.</span>
                    </h3>

                    <div className="space-y-10">
                        {/* Slider 1 */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="font-data text-xs uppercase tracking-widest text-muted">Team Size</label>
                                <span className="font-heading text-2xl font-bold text-accent">{teamSize}</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="50"
                                value={teamSize}
                                onChange={(e) => { setTeamSize(e.target.value); setCalculatedLoss(0); }}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Slider 2 */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="font-data text-xs uppercase tracking-widest text-muted">Manual Hours/Week</label>
                                <span className="font-heading text-2xl font-bold text-accent">{hoursPerWeek}</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="60"
                                value={hoursPerWeek}
                                onChange={(e) => { setHoursPerWeek(e.target.value); setCalculatedLoss(0); }}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>

                        {/* Slider 3 */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="font-data text-xs uppercase tracking-widest text-muted">Avg. Hourly Rate ($)</label>
                                <span className="font-heading text-2xl font-bold text-accent">${avgHourlyRate}</span>
                            </div>
                            <input
                                type="range"
                                min="15" max="150" step="5"
                                value={avgHourlyRate}
                                onChange={(e) => { setAvgHourlyRate(e.target.value); setCalculatedLoss(0); }}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                        </div>
                    </div>

                    <button
                        onClick={runDiagnostic}
                        disabled={isCalculating}
                        className="mt-12 group relative w-full overflow-hidden rounded-2xl bg-white text-primary py-5 font-heading text-sm font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 transition-colors group-hover:text-white">
                            {isCalculating ? "Processing..." : "Run Diagnostic Protocol"}
                            {!isCalculating && <ArrowRight className="w-4 h-4" />}
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                    </button>
                </div>

                {/* Right Side: The Terminal & Output */}
                <div className="w-full lg:w-7/12 flex flex-col h-[600px] border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl relative">

                    {/* Terminal Header */}
                    <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <span className="font-data text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                            <Terminal className="w-3 h-3" /> sys_diagnostic.sh
                        </span>
                    </div>

                    {/* Output Number area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10 border-b border-white/5 bg-gradient-to-b from-transparent to-black/20">
                        <div className="font-data text-xs uppercase tracking-widest text-muted mb-6 w-full text-left">
                            [OUTPUT: ANNUAL_CAPITAL_LOSS]
                        </div>
                        <div className="h-32 flex items-center justify-center">
                            {calculatedLoss === 0 && !isCalculating ? (
                                <span className="font-heading text-6xl md:text-8xl font-black text-white/10">AWAITING</span>
                            ) : (
                                <span ref={valueRef} className="font-heading text-6xl md:text-[7rem] leading-none font-black tracking-tighter text-accent">
                                    ${(0).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {calculatedLoss > 0 && !isCalculating && (
                            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <TrendingDown className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-heading font-medium text-red-100 mb-1">Severe Inefficiency Detected</h4>
                                    <p className="font-data text-sm text-red-200/70">
                                        This capital is exiting your business linearly. The Provider's System can automate these workflows, converting this loss back into margin.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Console Log Area */}
                    <div className="h-48 bg-[#0a0a0a] p-6 font-data text-xs md:text-sm text-green-500/80 overflow-y-auto leading-relaxed border-t border-white/5" ref={terminalRef}>
                        {logs.map((log, index) => (
                            <div key={index} className="opacity-0 animate-[fadeIn_0.1s_forwards]">
                                {log}
                            </div>
                        ))}
                        {isCalculating && (
                            <div className="animate-pulse">_</div>
                        )}
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
}
