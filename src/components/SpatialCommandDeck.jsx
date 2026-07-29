import { useMemo, useState } from 'react';
import {
    ArrowRight,
    CalendarCheck2,
    Check,
    FileCheck2,
    Globe2,
    MessageSquareText,
    Maximize2,
    PhoneCall,
    Radio,
    Search,
    UserRoundCheck,
} from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/cn';

const journeySteps = [
    {
        id: 'inquiry',
        label: 'Website inquiry',
        icon: Globe2,
        status: 'Captured',
        state: 'captured',
        title: 'Website request received',
        description: 'The service, location, contact preference, and customer note arrive together.',
        nextAction: 'Review request details',
    },
    {
        id: 'qualified',
        label: 'Lead qualified',
        icon: UserRoundCheck,
        status: 'Qualified',
        state: 'checked',
        title: 'Service fit confirmed',
        description: 'The request matches the demo service area and includes enough context for a response.',
        nextAction: 'Route to the right owner',
    },
    {
        id: 'routed',
        label: 'Call routed',
        icon: PhoneCall,
        status: 'Routing',
        state: 'active',
        title: 'Call request routed',
        description: 'The owner and office view share the same customer context before anyone calls.',
        nextAction: 'Make the follow-up call',
    },
    {
        id: 'quote',
        label: 'Quote ready',
        icon: FileCheck2,
        status: 'Draft',
        state: 'queued',
        title: 'Quote context assembled',
        description: 'Service notes and customer details stay attached while the team prepares the estimate.',
        nextAction: 'Review and send quote',
    },
    {
        id: 'scheduled',
        label: 'Job scheduled',
        icon: CalendarCheck2,
        status: 'Pending',
        state: 'queued',
        title: 'Schedule is ready',
        description: 'The selected service window can be assigned without re-entering the lead information.',
        nextAction: 'Confirm service window',
    },
    {
        id: 'follow-up',
        label: 'Follow-up',
        icon: MessageSquareText,
        status: 'Queued',
        state: 'queued',
        title: 'Follow-up stays visible',
        description: 'The next customer touchpoint remains connected to the original request and job history.',
        nextAction: 'Send the check-in',
    },
];

const commandModules = [
    { id: 'journey', label: 'Lead journey', icon: Globe2 },
    { id: 'search', label: 'Search records', icon: Search },
    { id: 'calls', label: 'Call routing', icon: PhoneCall },
    { id: 'schedule', label: 'Scheduling', icon: CalendarCheck2 },
];

const demoRecords = [
    ['Morgan Ellis', 'Water heater request', 'Abilene'],
    ['Casey Reed', 'Electrical service call', 'San Angelo'],
    ['Jordan Lee', 'Commercial quote', 'Midland'],
];

const phonePanels = [
    { id: 'details', label: 'Customer details', icon: Check },
    { id: 'context', label: 'Job context', icon: Check },
    { id: 'action', label: 'Next action', icon: ArrowRight },
];

export default function SpatialCommandDeck({ onOpenLab }) {
    const [activeModule, setActiveModule] = useState('journey');
    const [activeStageId, setActiveStageId] = useState('routed');
    const [searchTerm, setSearchTerm] = useState('');
    const [phonePanel, setPhonePanel] = useState('action');

    const activeStage =
        journeySteps.find((step) => step.id === activeStageId) || journeySteps[0];
    const activeModuleData =
        commandModules.find((module) => module.id === activeModule) || commandModules[0];
    const filteredRecords = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return demoRecords;
        return demoRecords.filter((record) => record.join(' ').toLowerCase().includes(term));
    }, [searchTerm]);

    const selectStage = (stageId) => {
        setActiveModule('journey');
        setActiveStageId(stageId);
        setPhonePanel('action');
    };

    return (
        <section
            className="spatial-command-scene"
            aria-label="Interactive Provider Command CRM demonstration"
        >
            <div className="spatial-architecture">
                <div className="architecture-plane architecture-plane-left" aria-hidden="true" />
                <div className="architecture-plane architecture-plane-right" aria-hidden="true" />
                <div className="architecture-beam architecture-beam-one" aria-hidden="true" />
                <div className="architecture-beam architecture-beam-two" aria-hidden="true" />

                <div className="command-deck">
                    <header className="command-deck-bar">
                        <div className="flex min-w-0 items-center gap-2.5">
                            <div className="command-brand-logo">
                                <Logo inverted compact />
                            </div>
                            <div className="min-w-0 border-l border-white/10 pl-2.5">
                                <p className="truncate text-[0.66rem] font-bold text-white/90 sm:text-xs">
                                    Provider Command
                                </p>
                                <p className="font-data text-[0.42rem] uppercase tracking-[0.16em] text-white/35 sm:text-[0.48rem]">
                                    Demo workspace
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onOpenLab}
                            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1.5 transition hover:border-sun/30 hover:bg-sun/[0.08]"
                            aria-label="Open the full Provider Command interactive demo"
                        >
                            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            <span className="hidden font-data text-[0.45rem] uppercase tracking-[0.14em] text-white/55 transition group-hover:text-white/80 sm:inline">
                                Full demo
                            </span>
                            <Maximize2 className="h-3 w-3 text-white/45 transition group-hover:text-sun" aria-hidden="true" />
                        </button>
                    </header>

                    <div className="command-deck-body">
                        <nav className="command-rail" aria-label="Provider Command demo areas">
                            {commandModules.map((module) => (
                                <button
                                    key={module.id}
                                    type="button"
                                    title={module.label}
                                    aria-label={`Open ${module.label} demo`}
                                    aria-pressed={activeModule === module.id}
                                    onClick={() => setActiveModule(module.id)}
                                    className={cn(
                                        'command-rail-icon',
                                        activeModule === module.id && 'command-rail-icon-active'
                                    )}
                                >
                                    <module.icon className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                            ))}
                        </nav>

                        <div className="command-main">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-data text-[0.44rem] font-bold uppercase tracking-[0.17em] text-sun sm:text-[0.5rem]">
                                        Interactive demo
                                    </p>
                                    <h2 className="mt-1 text-[0.72rem] font-semibold tracking-[-0.02em] text-white sm:text-sm">
                                        {activeModule === 'journey'
                                            ? 'One lead. Every next step visible.'
                                            : activeModuleData.label}
                                    </h2>
                                </div>
                                <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-data text-[0.45rem] uppercase tracking-[0.12em] text-white/40 sm:block">
                                    Sample data
                                </span>
                            </div>

                            {activeModule === 'journey' && (
                                <JourneyDemo
                                    activeStage={activeStage}
                                    activeStageId={activeStageId}
                                    onSelectStage={selectStage}
                                />
                            )}
                            {activeModule === 'search' && (
                                <SearchDemo
                                    records={filteredRecords}
                                    searchTerm={searchTerm}
                                    onSearch={setSearchTerm}
                                />
                            )}
                            {activeModule === 'calls' && <CallsDemo />}
                            {activeModule === 'schedule' && <ScheduleDemo />}
                        </div>
                    </div>

                    <div className="deck-signal" aria-hidden="true" />
                </div>

                <aside className="mobile-command" aria-label="Interactive mobile field-view demo">
                    <div className="mobile-command-speaker" aria-hidden="true" />
                    <div className="flex items-center justify-between border-b border-primary/[0.08] px-3 pb-2 pt-4">
                        <span className="font-data text-[0.4rem] font-bold uppercase tracking-[0.13em] text-primary/50">
                            Field view
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    </div>
                    <div className="p-3">
                        <div className="rounded-xl bg-primary p-3 text-white">
                            <p className="font-data text-[0.38rem] uppercase tracking-[0.12em] text-sun">
                                {activeModule === 'journey' ? activeStage.status : activeModuleData.label}
                            </p>
                            <p className="mt-2 text-[0.58rem] font-semibold leading-tight">
                                {activeModule === 'journey'
                                    ? activeStage.title
                                    : `${activeModuleData.label} demo is ready`}
                            </p>
                            <div className="mt-3 flex items-center gap-1.5 text-[0.43rem] text-white/55">
                                <Radio className="h-2.5 w-2.5 text-sun" aria-hidden="true" />
                                Sample service request
                            </div>
                        </div>
                        <div className="mt-2.5 space-y-2">
                            {phonePanels.map((panel, index) => (
                                <button
                                    key={panel.id}
                                    type="button"
                                    aria-pressed={phonePanel === panel.id}
                                    onClick={() => setPhonePanel(panel.id)}
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition',
                                        phonePanel === panel.id
                                            ? 'border-sun/40 bg-[#fff6e8]'
                                            : 'border-primary/[0.08] bg-white'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'grid h-4 w-4 place-items-center rounded-full',
                                            index < 2
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-[#fff3df] text-accent'
                                        )}
                                    >
                                        <panel.icon className="h-2.5 w-2.5" aria-hidden="true" />
                                    </span>
                                    <span className="truncate text-[0.42rem] font-semibold text-primary/70">
                                        {panel.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="spatial-coordinate spatial-coordinate-top" aria-hidden="true">
                    32.4487° N / System layer 01
                </div>
                <div className="spatial-coordinate spatial-coordinate-bottom" aria-hidden="true">
                    Customer path / Owner view
                </div>
            </div>
        </section>
    );
}

function JourneyDemo({ activeStage, activeStageId, onSelectStage }) {
    return (
        <div className="mt-3 grid min-h-0 gap-2.5 sm:mt-4 sm:grid-cols-[minmax(0,1.28fr)_minmax(8rem,0.72fr)]">
            <section className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-[#061a33]/90 p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:rounded-2xl sm:p-3.5">
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pb-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-sun/10 text-sun">
                            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-[0.6rem] font-semibold text-white/90 sm:text-[0.7rem]">
                                New website inquiry
                            </p>
                            <p className="truncate text-[0.46rem] text-white/40 sm:text-[0.52rem]">
                                Click a stage to inspect it
                            </p>
                        </div>
                    </div>
                    <span className="rounded-full bg-emerald-300/10 px-2 py-1 font-data text-[0.4rem] font-bold uppercase tracking-[0.1em] text-emerald-200 sm:text-[0.44rem]">
                        Demo
                    </span>
                </div>

                <ol className="command-stage-list mt-2.5 space-y-1.5">
                    {journeySteps.map((step, index) => (
                        <li key={step.id}>
                            <button
                                type="button"
                                aria-pressed={activeStageId === step.id}
                                onClick={() => onSelectStage(step.id)}
                                className={cn(
                                    `workflow-step workflow-step-${step.state}`,
                                    activeStageId === step.id && 'workflow-step-selected'
                                )}
                                style={{ '--step-delay': `${index * 0.52}s` }}
                            >
                                <span className="workflow-step-icon">
                                    <step.icon className="h-3 w-3" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1 truncate text-left text-[0.5rem] font-medium text-white/70 sm:text-[0.58rem]">
                                    {step.label}
                                </span>
                                <span className="font-data text-[0.36rem] font-bold uppercase tracking-[0.07em] text-white/35 sm:text-[0.4rem]">
                                    {step.status}
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="hidden rounded-2xl border border-sun/20 bg-white/[0.045] p-3.5 sm:block">
                <div className="flex items-center justify-between">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-sun/10 text-sun">
                        <activeStage.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="font-data text-[0.42rem] uppercase tracking-[0.12em] text-sun/70">
                        {activeStage.status}
                    </span>
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold text-white/80">{activeStage.title}</p>
                <p className="mt-1.5 text-[0.49rem] leading-4 text-white/45">
                    {activeStage.description}
                </p>
                <div className="mt-4 border-t border-white/[0.07] pt-3">
                    <p className="font-data text-[0.4rem] uppercase tracking-[0.1em] text-white/30">
                        Next action
                    </p>
                    <p className="mt-1 text-[0.48rem] font-medium text-white/65">
                        {activeStage.nextAction}
                    </p>
                </div>
            </section>
        </div>
    );
}

function SearchDemo({ records, searchTerm, onSearch }) {
    return (
        <section className="mt-3 rounded-xl border border-white/10 bg-[#061a33]/90 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2">
                <Search className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                <span className="sr-only">Search sample CRM records</span>
                <input
                    value={searchTerm}
                    onChange={(event) => onSearch(event.target.value)}
                    placeholder="Try Abilene or quote"
                    className="min-w-0 flex-1 bg-transparent text-[0.58rem] text-white outline-none placeholder:text-white/30"
                />
            </label>
            <div className="command-scroll mt-2.5 max-h-[12rem] space-y-1.5 overflow-y-auto pr-1">
                {records.length ? (
                    records.map(([name, request, location]) => (
                        <button
                            type="button"
                            key={name}
                            className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-2 text-left transition hover:border-sun/20 hover:bg-sun/[0.04]"
                        >
                            <span className="min-w-0">
                                <span className="block truncate text-[0.55rem] font-semibold text-white/75">
                                    {name}
                                </span>
                                <span className="block truncate text-[0.45rem] text-white/35">{request}</span>
                            </span>
                            <span className="font-data text-[0.38rem] uppercase tracking-[0.08em] text-sun/60">
                                {location}
                            </span>
                        </button>
                    ))
                ) : (
                    <p className="rounded-lg border border-dashed border-white/10 p-5 text-center text-[0.5rem] text-white/40">
                        No sample records match that search.
                    </p>
                )}
            </div>
        </section>
    );
}

function CallsDemo() {
    return (
        <section className="command-scroll mt-3 max-h-[15.5rem] space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-[#061a33]/90 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
            {[
                ['Incoming request', 'Morgan Ellis', 'Needs owner response'],
                ['Returned call', 'Casey Reed', 'Service fit confirmed'],
                ['Quote follow-up', 'Jordan Lee', 'Review scheduled'],
            ].map(([type, name, note], index) => (
                <button
                    type="button"
                    key={name}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.025] p-2.5 text-left transition hover:border-sun/20"
                >
                    <span className={cn('grid h-7 w-7 place-items-center rounded-lg', index === 0 ? 'bg-sun/10 text-sun' : 'bg-sky/10 text-[#91c9ff]')}>
                        <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-[0.52rem] font-semibold text-white/75">{type}</span>
                        <span className="block truncate text-[0.44rem] text-white/35">{name} · {note}</span>
                    </span>
                    <ArrowRight className="h-3 w-3 text-white/25" aria-hidden="true" />
                </button>
            ))}
        </section>
    );
}

function ScheduleDemo() {
    return (
        <section className="mt-3 rounded-xl border border-white/10 bg-[#061a33]/90 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
                <p className="text-[0.58rem] font-semibold text-white/75">Sample service week</p>
                <span className="font-data text-[0.4rem] uppercase tracking-[0.1em] text-sun/70">July</span>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1.5">
                {[28, 29, 30, 31, 1].map((day, index) => (
                    <button
                        type="button"
                        key={day}
                        className={cn(
                            'rounded-lg border py-2 text-center text-[0.5rem] font-semibold transition',
                            index === 2
                                ? 'border-sun/30 bg-sun/10 text-sun'
                                : 'border-white/[0.06] bg-white/[0.025] text-white/45 hover:border-white/20'
                        )}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <button
                type="button"
                className="mt-3 flex w-full items-center justify-between rounded-lg border border-emerald-300/15 bg-emerald-300/[0.055] px-3 py-2.5 text-left"
            >
                <span>
                    <span className="block text-[0.54rem] font-semibold text-white/75">Service window available</span>
                    <span className="block text-[0.44rem] text-white/35">Wednesday · 10:30 AM</span>
                </span>
                <CalendarCheck2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            </button>
        </section>
    );
}
