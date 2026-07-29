import { useEffect, useMemo, useRef, useState } from 'react';
import {
    ArrowRight,
    CalendarCheck2,
    Check,
    FileCheck2,
    Globe2,
    MapPin,
    MessageSquareText,
    Maximize2,
    Monitor,
    Pause,
    Play,
    PhoneCall,
    Radio,
    RotateCcw,
    Search,
    Send,
    UserRoundCheck,
    Workflow,
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
    { id: 'site', label: 'Website flow', icon: Monitor },
    { id: 'journey', label: 'Lead journey', icon: Workflow },
    { id: 'search', label: 'Search records', icon: Search },
    { id: 'calls', label: 'Call routing', icon: PhoneCall },
    { id: 'schedule', label: 'Scheduling', icon: CalendarCheck2 },
];

const guidedSteps = [
    {
        id: 'site-hero',
        module: 'site',
        websiteSection: 'hero',
        label: 'Visitor arrives',
        heading: 'A customer understands the offer.',
        duration: 1500,
    },
    {
        id: 'site-proof',
        module: 'site',
        websiteSection: 'proof',
        label: 'Local proof',
        heading: 'Real context builds confidence.',
        duration: 1300,
    },
    {
        id: 'site-services',
        module: 'site',
        websiteSection: 'services',
        label: 'Service match',
        heading: 'The right service is easy to find.',
        duration: 1400,
    },
    {
        id: 'site-contact-type',
        module: 'site',
        websiteSection: 'contact',
        label: 'Entering sample data',
        heading: 'Morgan shares the request.',
        duration: 1800,
    },
    {
        id: 'site-contact-click',
        module: 'site',
        websiteSection: 'contact',
        label: 'Submitting inquiry',
        heading: 'The form hands the lead forward.',
        duration: 650,
    },
    {
        id: 'site-submit',
        module: 'site',
        websiteSection: 'contact',
        label: 'Inquiry received',
        heading: 'The customer gets a clear confirmation.',
        duration: 1100,
    },
    {
        id: 'crm-inquiry',
        module: 'journey',
        stage: 'inquiry',
        label: 'Lead captured',
        heading: 'Morgan appears in Provider Command.',
        duration: 2400,
    },
    {
        id: 'crm-qualified',
        module: 'journey',
        stage: 'qualified',
        label: 'Lead qualified',
        heading: 'The request matches the service area.',
        duration: 2100,
    },
    {
        id: 'crm-routed',
        module: 'journey',
        stage: 'routed',
        label: 'Call routed',
        heading: 'The right owner receives the context.',
        duration: 2100,
    },
    {
        id: 'crm-quote',
        module: 'journey',
        stage: 'quote',
        label: 'Quote prepared',
        heading: 'The estimate keeps the request attached.',
        duration: 2100,
    },
    {
        id: 'crm-scheduled',
        module: 'journey',
        stage: 'scheduled',
        label: 'Job scheduled',
        heading: 'The service window becomes visible.',
        duration: 2100,
    },
    {
        id: 'crm-follow-up',
        module: 'journey',
        stage: 'follow-up',
        label: 'Follow-up queued',
        heading: 'The next customer touchpoint stays connected.',
        duration: 2700,
    },
];

const demoCustomerName = 'Morgan Ellis';

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
    const sceneRef = useRef(null);
    const [activeModule, setActiveModule] = useState('site');
    const [activeStageId, setActiveStageId] = useState('inquiry');
    const [searchTerm, setSearchTerm] = useState('');
    const [phonePanel, setPhonePanel] = useState('action');
    const [guidedIndex, setGuidedIndex] = useState(0);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [inViewport, setInViewport] = useState(true);
    const [documentVisible, setDocumentVisible] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [typedName, setTypedName] = useState('');

    const activeStage =
        journeySteps.find((step) => step.id === activeStageId) || journeySteps[0];
    const activeModuleData =
        commandModules.find((module) => module.id === activeModule) || commandModules[0];
    const currentGuidedStep = guidedSteps[guidedIndex] || guidedSteps[0];
    const guidedStepMatchesModule = currentGuidedStep.module === activeModule;
    const autoplayRunning =
        autoplayEnabled &&
        inViewport &&
        documentVisible &&
        !prefersReducedMotion;
    const filteredRecords = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return demoRecords;
        return demoRecords.filter((record) => record.join(' ').toLowerCase().includes(term));
    }, [searchTerm]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => {
            setPrefersReducedMotion(media.matches);
            if (media.matches) setAutoplayEnabled(false);
        };
        updatePreference();
        media.addEventListener('change', updatePreference);
        return () => media.removeEventListener('change', updatePreference);
    }, []);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene || typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setInViewport(entry.isIntersecting && entry.intersectionRatio >= 0.2),
            { threshold: [0, 0.2, 0.65] }
        );
        observer.observe(scene);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleVisibility = () => setDocumentVisible(!document.hidden);
        handleVisibility();
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    useEffect(() => {
        if (!autoplayRunning || currentGuidedStep.id !== 'site-contact-type') return undefined;
        const interval = window.setInterval(() => {
            setTypedName((current) => {
                if (current.length >= demoCustomerName.length) {
                    window.clearInterval(interval);
                    return current;
                }
                return demoCustomerName.slice(0, current.length + 1);
            });
        }, 70);
        return () => window.clearInterval(interval);
    }, [autoplayRunning, currentGuidedStep.id]);

    useEffect(() => {
        if (!autoplayRunning) return undefined;
        const timer = window.setTimeout(() => {
            const nextIndex = (guidedIndex + 1) % guidedSteps.length;
            const nextStep = guidedSteps[nextIndex];
            setGuidedIndex(nextIndex);
            setActiveModule(nextStep.module);
            if (nextStep.stage) setActiveStageId(nextStep.stage);
            setPhonePanel('action');
            if (nextStep.id === 'site-contact-type') {
                setTypedName('');
            } else if (
                nextStep.id === 'site-contact-click' ||
                nextStep.id === 'site-submit' ||
                nextStep.module === 'journey'
            ) {
                setTypedName(demoCustomerName);
            } else {
                setTypedName('');
            }
        }, currentGuidedStep.duration);
        return () => window.clearTimeout(timer);
    }, [autoplayRunning, currentGuidedStep.duration, guidedIndex]);

    const pauseAutoplay = () => setAutoplayEnabled(false);

    const applyGuidedStep = () => {
        setActiveModule(currentGuidedStep.module);
        if (currentGuidedStep.stage) setActiveStageId(currentGuidedStep.stage);
        setPhonePanel('action');
    };

    const toggleAutoplay = () => {
        if (prefersReducedMotion) return;
        if (autoplayEnabled) {
            setAutoplayEnabled(false);
            return;
        }
        applyGuidedStep();
        setAutoplayEnabled(true);
    };

    const replayAutoplay = () => {
        setTypedName('');
        setGuidedIndex(0);
        setActiveModule('site');
        setActiveStageId('inquiry');
        if (!prefersReducedMotion) setAutoplayEnabled(true);
    };

    const selectModule = (moduleId) => {
        pauseAutoplay();
        if (moduleId === 'site') {
            setGuidedIndex(0);
            setTypedName('');
        }
        setActiveModule(moduleId);
    };

    const selectStage = (stageId) => {
        pauseAutoplay();
        setActiveModule('journey');
        setActiveStageId(stageId);
        setPhonePanel('action');
    };

    return (
        <section
            ref={sceneRef}
            className="spatial-command-scene"
            aria-label="Guided website-to-CRM Provider Command demonstration"
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
                            <div className="command-deck-title min-w-0 border-l border-white/10 pl-2.5">
                                <p className="truncate text-[0.66rem] font-bold text-white/90 sm:text-xs">
                                    Provider Command
                                </p>
                                <p className="font-data text-[0.42rem] uppercase tracking-[0.16em] text-white/35 sm:text-[0.48rem]">
                                    Demo workspace
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={toggleAutoplay}
                                disabled={prefersReducedMotion}
                                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition hover:border-sun/30 hover:text-sun disabled:cursor-not-allowed disabled:opacity-35"
                                aria-label={
                                    prefersReducedMotion
                                        ? 'Autoplay disabled by reduced-motion preference'
                                        : autoplayEnabled
                                            ? 'Pause guided demo'
                                            : 'Play guided demo'
                                }
                                aria-pressed={autoplayEnabled}
                            >
                                {autoplayEnabled ? (
                                    <Pause className="h-3 w-3" aria-hidden="true" />
                                ) : (
                                    <Play className="h-3 w-3" aria-hidden="true" />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={replayAutoplay}
                                className="hidden h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition hover:border-sun/30 hover:text-sun sm:grid"
                                aria-label="Replay guided demo from the beginning"
                            >
                                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    pauseAutoplay();
                                    onOpenLab();
                                }}
                                className="group flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-2.5 transition hover:border-sun/30 hover:bg-sun/[0.08]"
                                aria-label="Open the full Provider Command interactive demo"
                            >
                                <span className="signal-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                <span className="hidden font-data text-[0.45rem] uppercase tracking-[0.14em] text-white/55 transition group-hover:text-white/80 md:inline">
                                    Full demo
                                </span>
                                <Maximize2 className="h-3 w-3 text-white/45 transition group-hover:text-sun" aria-hidden="true" />
                            </button>
                        </div>
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
                                    onClick={() => selectModule(module.id)}
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
                                        {autoplayEnabled ? 'Guided system flow' : 'Interactive demo'}
                                    </p>
                                    <h2 className="mt-1 text-[0.72rem] font-semibold tracking-[-0.02em] text-white sm:text-sm">
                                        {guidedStepMatchesModule
                                            ? currentGuidedStep.heading
                                            : activeModule === 'journey'
                                                ? 'One lead. Every next step visible.'
                                                : activeModuleData.label}
                                    </h2>
                                </div>
                                <div className="hidden items-center gap-2 sm:flex">
                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-data text-[0.43rem] uppercase tracking-[0.1em] text-white/45">
                                        {guidedStepMatchesModule ? currentGuidedStep.label : 'Sample data'}
                                    </span>
                                    <span className="font-data text-[0.4rem] text-white/25">
                                        {String(guidedIndex + 1).padStart(2, '0')}/{guidedSteps.length}
                                    </span>
                                </div>
                            </div>

                            {activeModule === 'site' && (
                                <GuidedWebsiteDemo
                                    step={currentGuidedStep}
                                    typedName={typedName}
                                    autoplayRunning={autoplayRunning}
                                    prefersReducedMotion={prefersReducedMotion}
                                    onManualInteraction={pauseAutoplay}
                                />
                            )}
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
                                    onSearch={(value) => {
                                        pauseAutoplay();
                                        setSearchTerm(value);
                                    }}
                                />
                            )}
                            {activeModule === 'calls' && <CallsDemo />}
                            {activeModule === 'schedule' && <ScheduleDemo />}
                        </div>
                    </div>

                    <div className="deck-signal" aria-hidden="true" />
                    <div
                        className="guided-progress"
                        style={{ '--guided-progress': `${((guidedIndex + 1) / guidedSteps.length) * 100}%` }}
                        aria-hidden="true"
                    />
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
                        {activeModule === 'site' ? (
                            <GuidedMobileWebsite step={currentGuidedStep} typedName={typedName} />
                        ) : (
                            <>
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
                                        {activeModule === 'journey' ? demoCustomerName : 'Sample service request'}
                                    </div>
                                </div>
                                <div className="mt-2.5 space-y-2">
                                    {phonePanels.map((panel, index) => (
                                        <button
                                            key={panel.id}
                                            type="button"
                                            aria-pressed={phonePanel === panel.id}
                                            onClick={() => {
                                                pauseAutoplay();
                                                setPhonePanel(panel.id);
                                            }}
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
                            </>
                        )}
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

function GuidedWebsiteDemo({
    step,
    typedName,
    autoplayRunning,
    prefersReducedMotion,
    onManualInteraction,
}) {
    const viewportRef = useRef(null);
    const sectionRefs = useRef({});
    const lastAnimatedStepRef = useRef(null);
    const sectionId = step.websiteSection || 'hero';
    const isTyping = step.id === 'site-contact-type';
    const isClicking = step.id === 'site-contact-click';
    const isSubmitted = step.id === 'site-submit';
    const showCompletedFields = isClicking || isSubmitted;

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport || !autoplayRunning) return undefined;

        const nextSectionByStep = {
            'site-hero': 'proof',
            'site-proof': 'services',
            'site-services': 'contact',
        };
        const targetSectionId = nextSectionByStep[step.id] || sectionId;
        const target = sectionRefs.current[targetSectionId];
        if (!target) return undefined;

        const stepChanged = lastAnimatedStepRef.current !== step.id;
        lastAnimatedStepRef.current = step.id;
        if (step.id === 'site-hero' && stepChanged) {
            viewport.scrollTop = 0;
        }

        const targetTop =
            target.getBoundingClientRect().top -
            viewport.getBoundingClientRect().top +
            viewport.scrollTop;
        const source = sectionRefs.current[sectionId];
        const sourceTop = source
            ? source.getBoundingClientRect().top -
                viewport.getBoundingClientRect().top +
                viewport.scrollTop
            : viewport.scrollTop;
        const startTop = viewport.scrollTop;
        const distance = Math.max(targetTop, 0) - startTop;

        if (prefersReducedMotion || !nextSectionByStep[step.id]) {
            viewport.scrollTop = Math.max(targetTop, 0);
            return undefined;
        }

        let animationFrame;
        let startedAt;
        const fullDistance = Math.max(Math.abs(targetTop - sourceTop), 1);
        const remainingRatio = Math.min(Math.abs(distance) / fullDistance, 1);
        const animationDuration = Math.max(step.duration * remainingRatio, 180);
        const animateScroll = (timestamp) => {
            if (startedAt === undefined) startedAt = timestamp;
            const progress = Math.min((timestamp - startedAt) / animationDuration, 1);
            viewport.scrollTop = startTop + distance * progress;
            if (progress < 1) {
                animationFrame = window.requestAnimationFrame(animateScroll);
            }
        };

        animationFrame = window.requestAnimationFrame(animateScroll);
        return () => window.cancelAnimationFrame(animationFrame);
    }, [
        autoplayRunning,
        prefersReducedMotion,
        sectionId,
        step.duration,
        step.id,
    ]);

    return (
        <section className="guided-site-frame mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#061a33] shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:mt-4 sm:rounded-2xl">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.035] px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a96269]" aria-hidden="true" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#a18e48]" aria-hidden="true" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#4e836d]" aria-hidden="true" />
                <div className="ml-1.5 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/20 px-2 py-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-300" aria-hidden="true" />
                    <span className="truncate font-data text-[0.35rem] text-white/35">
                        demo.texas-service-company.com
                    </span>
                </div>
                <Monitor className="h-2.5 w-2.5 text-sun/70" aria-hidden="true" />
            </div>

            <div
                ref={viewportRef}
                onWheel={onManualInteraction}
                onTouchStart={onManualInteraction}
                className="guided-site-scroll overflow-y-auto overscroll-contain bg-[#f4f7fb]"
                aria-label="Self-scrolling sample service-business website"
            >
                <section
                    ref={(node) => { sectionRefs.current.hero = node; }}
                    className="guided-site-section grid min-h-[12.6rem] gap-3 bg-primary p-4 text-white sm:grid-cols-[1fr_0.72fr] sm:items-center"
                >
                    <div>
                        <p className="font-data text-[0.38rem] font-bold uppercase tracking-[0.11em] text-sun">
                            Abilene, Texas · Service team
                        </p>
                        <h3 className="mt-2 text-base font-bold leading-tight tracking-[-0.03em] sm:text-lg">
                            Clear service. Fast response. One simple next step.
                        </h3>
                        <p className="mt-2 text-[0.48rem] leading-4 text-white/55 sm:text-[0.52rem]">
                            A focused first screen tells the customer what the business does, where it works,
                            and how to request help.
                        </p>
                        <button
                            type="button"
                            onClick={onManualInteraction}
                            className="mt-3 rounded-full bg-sun px-3 py-1.5 text-[0.45rem] font-bold text-primary"
                        >
                            Request service
                        </button>
                    </div>
                    <div className="relative hidden min-h-28 overflow-hidden rounded-xl border border-white/10 bg-[#071b33] sm:block">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,159,28,0.2),transparent_42%)]" aria-hidden="true" />
                        <span className="absolute left-3 top-3 h-12 w-16 rounded-lg border border-white/10 bg-white/[0.04]" />
                        <span className="absolute bottom-3 right-3 h-16 w-20 rounded-lg border border-sun/20 bg-sun/[0.07]" />
                        <span className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-emerald-300/10 text-emerald-200">
                            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                    </div>
                </section>

                <section
                    ref={(node) => { sectionRefs.current.proof = node; }}
                    className="guided-site-section min-h-[10.8rem] bg-white p-4 text-primary"
                >
                    <p className="font-data text-[0.36rem] font-bold uppercase tracking-[0.11em] text-accent">
                        Local proof
                    </p>
                    <h3 className="mt-2 text-sm font-bold tracking-[-0.025em]">Show the work behind the promise.</h3>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {['Abilene', 'San Angelo', 'Permian Basin'].map((market) => (
                            <div key={market} className="rounded-lg border border-primary/10 bg-background p-2">
                                <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
                                <p className="mt-2 truncate text-[0.43rem] font-bold">{market}</p>
                                <p className="mt-0.5 text-[0.34rem] text-muted">Project context</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    ref={(node) => { sectionRefs.current.services = node; }}
                    className="guided-site-section min-h-[11.4rem] bg-[#eaf1f8] p-4 text-primary"
                >
                    <p className="font-data text-[0.36rem] font-bold uppercase tracking-[0.11em] text-accent">
                        Services
                    </p>
                    <h3 className="mt-2 text-sm font-bold tracking-[-0.025em]">Help the customer recognize the right path.</h3>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                            ['Repair', 'Urgent service'],
                            ['Install', 'Planned work'],
                            ['Maintain', 'Ongoing care'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-lg border border-primary/10 bg-white p-2">
                                <span className="grid h-5 w-5 place-items-center rounded-md bg-primary text-sun">
                                    <Workflow className="h-2.5 w-2.5" aria-hidden="true" />
                                </span>
                                <p className="mt-2 text-[0.45rem] font-bold">{title}</p>
                                <p className="mt-0.5 text-[0.34rem] text-muted">{copy}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    ref={(node) => { sectionRefs.current.contact = node; }}
                    className="guided-site-section min-h-[14.5rem] bg-white p-4 text-primary"
                >
                    {isSubmitted ? (
                        <div className="flex min-h-[11.5rem] flex-col items-center justify-center rounded-xl border border-emerald-700/15 bg-emerald-50 p-5 text-center">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <h3 className="mt-3 text-sm font-bold">Thanks, {demoCustomerName}.</h3>
                            <p className="mt-1 max-w-xs text-[0.45rem] leading-4 text-muted">
                                Your sample request was received. Watch it enter Provider Command next.
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 font-data text-[0.35rem] uppercase tracking-[0.09em] text-emerald-700">
                                Handoff ready <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                            </span>
                        </div>
                    ) : (
                        <>
                            <p className="font-data text-[0.36rem] font-bold uppercase tracking-[0.11em] text-accent">
                                Request service
                            </p>
                            <h3 className="mt-1.5 text-sm font-bold tracking-[-0.025em]">Tell the team what you need.</h3>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <label className="text-[0.38rem] font-bold">
                                    Name
                                    <span className="mt-1 flex min-h-7 items-center rounded-md border border-primary/10 bg-background px-2 font-normal text-primary/70">
                                        {typedName || <span className="text-primary/25">Your name</span>}
                                        {isTyping && typedName.length < demoCustomerName.length && (
                                            <span className="guided-type-caret ml-0.5 h-3 w-px bg-accent" aria-hidden="true" />
                                        )}
                                    </span>
                                </label>
                                <label className="text-[0.38rem] font-bold">
                                    Email
                                    <span className="mt-1 flex min-h-7 items-center truncate rounded-md border border-primary/10 bg-background px-2 font-normal text-primary/70">
                                        {(isTyping && typedName.length > 6) || showCompletedFields
                                            ? 'morgan@example.com'
                                            : <span className="text-primary/25">Email address</span>}
                                    </span>
                                </label>
                            </div>
                            <label className="mt-2 block text-[0.38rem] font-bold">
                                Service needed
                                <span className="mt-1 flex min-h-7 items-center rounded-md border border-primary/10 bg-background px-2 font-normal text-primary/70">
                                    {showCompletedFields || (isTyping && typedName.length > 10)
                                        ? 'Water heater service'
                                        : <span className="text-primary/25">Choose a service</span>}
                                </span>
                            </label>
                            <button
                                type="button"
                                onClick={onManualInteraction}
                                className={cn(
                                    'mt-3 flex min-h-8 w-full items-center justify-center gap-1.5 rounded-full bg-sun text-[0.42rem] font-bold text-primary transition',
                                    isClicking && 'guided-click-target'
                                )}
                            >
                                Submit sample request
                                <Send className="h-3 w-3" aria-hidden="true" />
                            </button>
                        </>
                    )}
                </section>
            </div>
        </section>
    );
}

function GuidedMobileWebsite({ step, typedName }) {
    const sectionLabels = {
        hero: 'Website hero',
        proof: 'Local proof',
        services: 'Services',
        contact: 'Contact form',
    };
    const isSubmitted = step.id === 'site-submit';
    const contactActive = step.websiteSection === 'contact';

    return (
        <>
            <div className="rounded-xl bg-primary p-3 text-white">
                <p className="font-data text-[0.38rem] uppercase tracking-[0.12em] text-sun">
                    {isSubmitted ? 'Request received' : sectionLabels[step.websiteSection] || 'Website flow'}
                </p>
                <p className="mt-2 text-[0.58rem] font-semibold leading-tight">
                    {isSubmitted
                        ? `${demoCustomerName} is ready for CRM handoff`
                        : contactActive
                            ? typedName || 'Customer request'
                            : step.heading}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[0.43rem] text-white/55">
                    <Monitor className="h-2.5 w-2.5 text-sun" aria-hidden="true" />
                    Sample website
                </div>
            </div>
            <div className="mt-2.5 space-y-2">
                {[
                    ['Website visit', true],
                    ['Contact form', contactActive],
                    ['CRM handoff', isSubmitted],
                ].map(([label, complete], index) => (
                    <div
                        key={label}
                        className={cn(
                            'flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition',
                            complete ? 'border-emerald-700/10 bg-emerald-50' : 'border-primary/[0.08] bg-white'
                        )}
                    >
                        <span className={cn('grid h-4 w-4 place-items-center rounded-full', complete ? 'bg-emerald-100 text-emerald-700' : 'bg-[#fff3df] text-accent')}>
                            {complete ? (
                                <Check className="h-2.5 w-2.5" aria-hidden="true" />
                            ) : index === 2 ? (
                                <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                            ) : (
                                <span className="h-1 w-1 rounded-full bg-current" />
                            )}
                        </span>
                        <span className="truncate text-[0.42rem] font-semibold text-primary/70">{label}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

function JourneyDemo({ activeStage, activeStageId, onSelectStage }) {
    const activeIndex = journeySteps.findIndex((step) => step.id === activeStageId);
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
                                {demoCustomerName}
                            </p>
                            <p className="truncate text-[0.46rem] text-white/40 sm:text-[0.52rem]">
                                Water heater service · Website form
                            </p>
                        </div>
                    </div>
                    <span className="rounded-full bg-emerald-300/10 px-2 py-1 font-data text-[0.4rem] font-bold uppercase tracking-[0.1em] text-emerald-200 sm:text-[0.44rem]">
                        Demo
                    </span>
                </div>

                <ol className="command-stage-list mt-2.5 space-y-1.5">
                    {journeySteps.map((step, index) => {
                        const complete = index < activeIndex;
                        const current = activeStageId === step.id;
                        const state = complete ? 'checked' : current ? 'active' : 'queued';
                        return (
                            <li key={step.id}>
                                <button
                                    type="button"
                                    aria-pressed={current}
                                    onClick={() => onSelectStage(step.id)}
                                    className={cn(
                                        `workflow-step workflow-step-${state}`,
                                        current && 'workflow-step-selected'
                                    )}
                                    style={{ '--step-delay': `${index * 0.52}s` }}
                                >
                                    <span className="workflow-step-icon">
                                        {complete ? (
                                            <Check className="h-3 w-3" aria-hidden="true" />
                                        ) : (
                                            <step.icon className="h-3 w-3" aria-hidden="true" />
                                        )}
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-left text-[0.5rem] font-medium text-white/70 sm:text-[0.58rem]">
                                        {step.label}
                                    </span>
                                    <span className="font-data text-[0.36rem] font-bold uppercase tracking-[0.07em] text-white/35 sm:text-[0.4rem]">
                                        {complete ? 'Complete' : current ? step.status : 'Waiting'}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
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
