import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Terminal, Activity, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function DiagnosticPage() {
    // Current step in the flow
    const [step, setStep] = useState(1);
    const containerRef = useRef(null);
    const terminalRef = useRef(null);

    // State for Phase 1
    const [role, setRole] = useState('');
    const [techStack, setTechStack] = useState('');

    // State for Phase 2
    const [aiUsage, setAiUsage] = useState('');
    const [bottleneck, setBottleneck] = useState('');

    // State for Phase 3
    const [teamSize, setTeamSize] = useState(5);
    const [hoursPerWeek, setHoursPerWeek] = useState(15);
    const [avgHourlyRate, setAvgHourlyRate] = useState(45);

    // State for Phase 4
    const [email, setEmail] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [logs, setLogs] = useState([]);

    // Animation for step transitions
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [step]);

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const calculatedLoss = Math.round(teamSize * hoursPerWeek * avgHourlyRate * 52);

    const runFinalDiagnostic = (e) => {
        e.preventDefault();
        setIsCalculating(true);
        setStep(5); // Loading/Calculating state

        const sequence = [
            "> INITIATING FINAL SYSTEM DIAGNOSTIC...",
            `> ANALYZING ROLE PROFILE=[${role}]`,
            `> MAPPING STACK INTEGRATION=[${techStack}]`,
            `> EVALUATING AI READINESS=[${aiUsage}]`,
            `> ISOLATING CRITICAL BOTTLENECK=[${bottleneck}]`,
            `> CALCULATING FINANCIAL LEAKAGE...`,
            "> GENERATING CUSTOM AUTOMATION BLUEPRINT..."
        ];

        let i = 0;
        setLogs([]);
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
                setIsComplete(true);
            }
        }, 600);
    };

    // Helper components for options
    const OptionCard = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${selected ? 'bg-accent/10 border-accent font-bold text-accent' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#05162D] text-white flex flex-col justify-center relative overflow-hidden">
            <SEO
                title="System Diagnostic | The Provider's System"
                description="Take our operational audit to identify your exact bottlenecks and generate a custom automation blueprint."
                url="/diagnostic"
            />
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-3xl justify-center mx-auto w-full px-6 relative z-10 flex-1 flex flex-col pt-12">

                {/* Progress Indicator */}
                {step < 5 && (
                    <div className="w-full mb-12">
                        <div className="flex justify-between font-data text-xs tracking-widest text-accent mb-2 uppercase">
                            <span>Diagnostic Protocol</span>
                            <span>Phase {step} of 4</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent transition-all duration-500 ease-out"
                                style={{ width: `${(step / 4) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div ref={containerRef} className="flex-1">
                    {/* Phase 1: Baseline */}
                    {step === 1 && (
                        <div className="space-y-10">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Establish Operational Baseline</h1>

                            <div>
                                <h3 className="font-data tracking-widest text-sm uppercase text-white/60 mb-4">Identify Primary Role</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <OptionCard label="Founder / CEO" selected={role === 'Founder / CEO'} onClick={() => setRole('Founder / CEO')} />
                                    <OptionCard label="Operations / Fulfillment" selected={role === 'Operations / Fulfillment'} onClick={() => setRole('Operations / Fulfillment')} />
                                    <OptionCard label="Sales / Growth" selected={role === 'Sales / Growth'} onClick={() => setRole('Sales / Growth')} />
                                    <OptionCard label="Client Success" selected={role === 'Client Success'} onClick={() => setRole('Client Success')} />
                                </div>
                            </div>

                            {role && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="font-data tracking-widest text-sm uppercase text-white/60 mb-4 mt-8">Current Infrastructure</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <OptionCard label="Heavy reliance on Spreadsheets/Docs" selected={techStack === 'Spreadsheets'} onClick={() => setTechStack('Spreadsheets')} />
                                        <OptionCard label="Multiple disconnected SaaS tools" selected={techStack === 'Disconnected SaaS'} onClick={() => setTechStack('Disconnected SaaS')} />
                                        <OptionCard label="Aging custom software/CRM" selected={techStack === 'Custom Software'} onClick={() => setTechStack('Custom Software')} />
                                    </div>
                                </div>
                            )}

                            {role && techStack && (
                                <button onClick={handleNext} className="mt-8 group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                                    Proceed to Phase 2 <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Phase 2: AI & Bottleneck */}
                    {step === 2 && (
                        <div className="space-y-10">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Identify Constraints</h1>

                            <div>
                                <h3 className="font-data tracking-widest text-sm uppercase text-white/60 mb-4">Current AI Utilization</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <OptionCard label="None - Completely Manual" selected={aiUsage === 'None'} onClick={() => setAiUsage('None')} />
                                    <OptionCard label="Basic - ChatGPT for copywriting/ideas" selected={aiUsage === 'ChatGPT'} onClick={() => setAiUsage('ChatGPT')} />
                                    <OptionCard label="Intermediate - Zapier/Make automations" selected={aiUsage === 'Zapier'} onClick={() => setAiUsage('Zapier')} />
                                    <OptionCard label="Advanced - Integrated LLMs & Custom Agents" selected={aiUsage === 'Advanced'} onClick={() => setAiUsage('Advanced')} />
                                </div>
                            </div>

                            {aiUsage && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="font-data tracking-widest text-sm uppercase text-white/60 mb-4 mt-8">Primary Target Vector (Bottleneck)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <OptionCard label="Data Entry & Syncing" selected={bottleneck === 'Data Entry'} onClick={() => setBottleneck('Data Entry')} />
                                        <OptionCard label="Lead Routing & CRM Updates" selected={bottleneck === 'Lead Routing'} onClick={() => setBottleneck('Lead Routing')} />
                                        <OptionCard label="Client Onboarding" selected={bottleneck === 'Client Onboarding'} onClick={() => setBottleneck('Client Onboarding')} />
                                        <OptionCard label="Customer Support Volume" selected={bottleneck === 'Customer Support'} onClick={() => setBottleneck('Customer Support')} />
                                        <OptionCard label="Reporting & Analysis" selected={bottleneck === 'Reporting'} onClick={() => setBottleneck('Reporting')} />
                                        <OptionCard label="Content/Proposal Generation" selected={bottleneck === 'Content Generation'} onClick={() => setBottleneck('Content Generation')} />
                                    </div>
                                </div>
                            )}

                            {aiUsage && bottleneck && (
                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="mt-8 hover:text-accent font-data uppercase tracking-widest text-xs transition-colors px-4">Back</button>
                                    <button onClick={handleNext} className="mt-8 group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                                        Proceed to Phase 3 <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Phase 3: Financial Reality */}
                    {step === 3 && (
                        <div className="space-y-10">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Quantify The Leak</h1>
                            <p className="font-data text-white/60 mb-8 max-w-xl">Based on your bottleneck in <strong className="text-white">{bottleneck}</strong>, let's calculate the financial impact of this inefficiency.</p>

                            <div className="space-y-10 bg-white/5 p-8 border border-white/10 rounded-3xl">
                                {/* Slider 1 */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="font-data text-xs uppercase tracking-widest text-muted">Team size handling this</label>
                                        <span className="font-heading text-2xl font-bold text-accent">{teamSize}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="50" value={teamSize}
                                        onChange={(e) => setTeamSize(e.target.value)}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                </div>

                                {/* Slider 2 */}
                                <div className="group">
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="font-data text-xs uppercase tracking-widest text-muted">Hours wasted per week (per person)</label>
                                        <span className="font-heading text-2xl font-bold text-accent">{hoursPerWeek}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="40" value={hoursPerWeek}
                                        onChange={(e) => setHoursPerWeek(e.target.value)}
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
                                        type="range" min="15" max="150" step="5" value={avgHourlyRate}
                                        onChange={(e) => setAvgHourlyRate(e.target.value)}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep(2)} className="mt-8 hover:text-accent font-data uppercase tracking-widest text-xs transition-colors px-4">Back</button>
                                <button onClick={handleNext} className="mt-8 group flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                                    Proceed to Phase 4 <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Phase 4: Capture */}
                    {step === 4 && (
                        <div className="space-y-10 flex flex-col items-center text-center max-w-xl mx-auto">
                            <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold">Diagnostic Complete</h1>
                            <p className="font-data text-white/60 mb-8 leading-relaxed">
                                We have sufficient data to generate your Custom Automation Blueprint. Enter your email to receive the report and reveal your financial leakage.
                            </p>

                            <form onSubmit={runFinalDiagnostic} className="w-full">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your work email..."
                                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-center text-lg font-heading focus:outline-none focus:border-accent transition-colors mb-6"
                                />
                                <button type="submit" className="w-full group flex items-center justify-center gap-3 bg-accent text-white px-8 py-5 rounded-2xl font-heading font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors shadow-xl">
                                    Generate Output
                                </button>
                                <button type="button" onClick={() => setStep(3)} className="mt-8 hover:text-white/60 font-data uppercase tracking-widest text-xs transition-colors px-4">Go Back</button>
                            </form>
                        </div>
                    )}

                    {/* Step 5: Output Terminal / Result */}
                    {step === 5 && (
                        <div className="w-full flex justify-center pb-24">
                            <div className="w-full max-w-4xl border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl relative flex flex-col min-h-[500px]">

                                {/* Terminal Header */}
                                <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <span className="font-data text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> blueprint_generator.sh
                                    </span>
                                </div>

                                {isCalculating ? (
                                    <div className="flex-1 p-8 font-data text-sm text-green-500/80 overflow-y-auto leading-relaxed" ref={terminalRef}>
                                        {logs.map((log, index) => (
                                            <div key={index} className="opacity-0 animate-[fadeIn_0.1s_forwards] mb-2">
                                                {log}
                                            </div>
                                        ))}
                                        <div className="animate-pulse mt-2">_</div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center animate-in fade-in zoom-in-95 duration-700">

                                        <div className="font-data text-xs md:text-sm uppercase tracking-widest text-red-400 mb-6">
                                            [CRITICAL LEAKAGE DETECTED]
                                        </div>

                                        <h2 className="font-heading text-6xl md:text-[6rem] lg:text-[8rem] leading-none font-black tracking-tighter text-accent mb-8">
                                            ${calculatedLoss.toLocaleString()}
                                        </h2>

                                        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-left mb-10">
                                            <p className="font-data text-white/80 leading-relaxed mb-6">
                                                Based on your team size and hours lost to <strong className="text-white">{bottleneck}</strong>, your business is hemorrhaging capital linearly.
                                            </p>
                                            <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
                                                <h4 className="font-heading font-medium text-accent mb-2 flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5" /> Recommended Architecture
                                                </h4>
                                                <p className="text-sm text-white/70">
                                                    Replace your <strong className="text-white font-medium">{techStack}</strong> dependency with a custom API bridge and a specialized AI Agent. This workflow can be 90% automated, immediately returning margin to your bottom line.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="font-data text-sm text-white/60 mb-6">Your full blueprint will be sent to {email}.</p>

                                        <a href="/#contact" className="group flex items-center gap-3 bg-white text-primary px-8 py-5 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors shadow-2xl">
                                            Schedule Implementation Call <ArrowRight className="w-5 h-5" />
                                        </a>

                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
