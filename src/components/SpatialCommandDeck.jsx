import {
    ArrowRight,
    CalendarCheck2,
    Check,
    FileCheck2,
    Globe2,
    MessageSquareText,
    PhoneCall,
    Radio,
    Search,
    Sparkles,
} from 'lucide-react';

const journeySteps = [
    { label: 'Website inquiry', icon: Globe2, state: 'captured' },
    { label: 'Lead qualified', icon: Search, state: 'checked' },
    { label: 'Call routed', icon: PhoneCall, state: 'active' },
    { label: 'Quote ready', icon: FileCheck2, state: 'queued' },
    { label: 'Job scheduled', icon: CalendarCheck2, state: 'queued' },
    { label: 'Follow-up', icon: MessageSquareText, state: 'queued' },
];

export default function SpatialCommandDeck() {
    return (
        <figure
            className="spatial-command-scene"
            role="img"
            aria-label="An illustrative Provider System workspace showing a service-business lead moving from a website inquiry through qualification, call routing, quoting, job scheduling, and follow-up."
        >
            <div className="spatial-architecture" aria-hidden="true">
                <div className="architecture-plane architecture-plane-left" />
                <div className="architecture-plane architecture-plane-right" />
                <div className="architecture-beam architecture-beam-one" />
                <div className="architecture-beam architecture-beam-two" />

                <div className="command-deck">
                    <header className="command-deck-bar">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-sun text-primary shadow-[0_0_18px_rgba(255,159,28,0.28)]">
                                <Sparkles className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-[0.66rem] font-bold text-white/90 sm:text-xs">
                                    Provider Command
                                </p>
                                <p className="font-data text-[0.42rem] uppercase tracking-[0.16em] text-white/35 sm:text-[0.48rem]">
                                    Client journey
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1.5">
                            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            <span className="hidden font-data text-[0.45rem] uppercase tracking-[0.14em] text-white/50 sm:inline">
                                System online
                            </span>
                        </div>
                    </header>

                    <div className="command-deck-body">
                        <aside className="command-rail">
                            {[Globe2, Search, PhoneCall, CalendarCheck2].map((Icon, index) => (
                                <span
                                    key={index}
                                    className={`command-rail-icon ${index === 0 ? 'command-rail-icon-active' : ''}`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                </span>
                            ))}
                        </aside>

                        <div className="min-w-0 flex-1 p-3 sm:p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-data text-[0.44rem] font-bold uppercase tracking-[0.17em] text-sun sm:text-[0.5rem]">
                                        Live workflow
                                    </p>
                                    <h2 className="mt-1 text-[0.78rem] font-semibold tracking-[-0.02em] text-white sm:text-sm">
                                        One lead. Every next step visible.
                                    </h2>
                                </div>
                                <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-data text-[0.45rem] uppercase tracking-[0.12em] text-white/40 sm:block">
                                    Texas service team
                                </span>
                            </div>

                            <div className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-[minmax(0,1.28fr)_minmax(8rem,0.72fr)]">
                                <section className="rounded-xl border border-white/10 bg-[#061a33]/90 p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:rounded-2xl sm:p-3.5">
                                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pb-2.5">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-sun/10 text-sun">
                                                <Radio className="h-3.5 w-3.5" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-[0.6rem] font-semibold text-white/90 sm:text-[0.7rem]">
                                                    New website inquiry
                                                </p>
                                                <p className="truncate text-[0.46rem] text-white/40 sm:text-[0.52rem]">
                                                    Service request received
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-emerald-300/10 px-2 py-1 font-data text-[0.4rem] font-bold uppercase tracking-[0.1em] text-emerald-200 sm:text-[0.44rem]">
                                            Captured
                                        </span>
                                    </div>

                                    <ol className="mt-2.5 space-y-1.5">
                                        {journeySteps.map((step, index) => (
                                            <li
                                                key={step.label}
                                                className={`workflow-step workflow-step-${step.state}`}
                                                style={{ '--step-delay': `${index * 0.52}s` }}
                                            >
                                                <span className="workflow-step-icon">
                                                    <step.icon className="h-3 w-3" />
                                                </span>
                                                <span className="min-w-0 flex-1 truncate text-[0.5rem] font-medium text-white/70 sm:text-[0.58rem]">
                                                    {step.label}
                                                </span>
                                                {step.state === 'captured' || step.state === 'checked' ? (
                                                    <Check className="h-3 w-3 text-emerald-300" />
                                                ) : step.state === 'active' ? (
                                                    <span className="font-data text-[0.38rem] font-bold uppercase tracking-[0.09em] text-sun sm:text-[0.42rem]">
                                                        Routing
                                                    </span>
                                                ) : (
                                                    <span className="h-1.5 w-1.5 rounded-full border border-white/20" />
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </section>

                                <div className="hidden gap-2.5 sm:grid">
                                    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
                                        <div className="flex items-center justify-between">
                                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky/10 text-[#91c9ff]">
                                                <PhoneCall className="h-3.5 w-3.5" />
                                            </span>
                                            <span className="font-data text-[0.44rem] uppercase tracking-[0.12em] text-white/35">
                                                Next action
                                            </span>
                                        </div>
                                        <p className="mt-5 text-[0.65rem] font-semibold text-white/80">
                                            Call request routed
                                        </p>
                                        <p className="mt-1 text-[0.5rem] leading-4 text-white/40">
                                            Owner and office view share the same context.
                                        </p>
                                    </section>

                                    <section className="rounded-2xl border border-sun/20 bg-sun/[0.065] p-3.5">
                                        <p className="font-data text-[0.44rem] uppercase tracking-[0.12em] text-sun/70">
                                            System note
                                        </p>
                                        <p className="mt-2 text-[0.52rem] leading-4 text-white/60">
                                            Follow-up stays attached to the customer journey.
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="deck-signal" />
                </div>

                <div className="mobile-command">
                    <div className="mobile-command-speaker" />
                    <div className="flex items-center justify-between border-b border-primary/[0.08] px-3 pb-2 pt-4">
                        <span className="font-data text-[0.4rem] font-bold uppercase tracking-[0.13em] text-primary/50">
                            Field view
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="p-3">
                        <div className="rounded-xl bg-primary p-3 text-white">
                            <p className="font-data text-[0.38rem] uppercase tracking-[0.12em] text-sun">
                                New lead
                            </p>
                            <p className="mt-2 text-[0.58rem] font-semibold leading-tight">
                                Service request is ready
                            </p>
                            <div className="mt-3 flex items-center gap-1.5 text-[0.43rem] text-white/55">
                                <PhoneCall className="h-2.5 w-2.5 text-sun" />
                                Call request
                            </div>
                        </div>
                        <div className="mt-2.5 space-y-2">
                            {['Customer details', 'Job context', 'Next action'].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 rounded-lg border border-primary/[0.08] bg-white px-2.5 py-2"
                                >
                                    <span
                                        className={`grid h-4 w-4 place-items-center rounded-full ${
                                            index < 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#fff3df] text-accent'
                                        }`}
                                    >
                                        {index < 2 ? <Check className="h-2.5 w-2.5" /> : <ArrowRight className="h-2.5 w-2.5" />}
                                    </span>
                                    <span className="truncate text-[0.42rem] font-semibold text-primary/70">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="spatial-coordinate spatial-coordinate-top">
                    32.4487° N / System layer 01
                </div>
                <div className="spatial-coordinate spatial-coordinate-bottom">
                    Customer path / Owner view
                </div>
            </div>
        </figure>
    );
}
