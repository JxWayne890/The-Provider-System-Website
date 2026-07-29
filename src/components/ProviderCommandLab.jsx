import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    ArrowRight,
    BookOpenText,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    FileCheck2,
    Globe2,
    LayoutDashboard,
    MapPin,
    MessageSquareText,
    Monitor,
    PhoneCall,
    Radio,
    Search,
    Send,
    Smartphone,
    Sparkles,
    UserRound,
    UsersRound,
    Workflow,
    X,
} from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/cn';

const CRM_VIEWS = [
    { id: 'pipeline', label: 'Pipeline', icon: Workflow },
    { id: 'leads', label: 'Leads', icon: UsersRound },
    { id: 'calls', label: 'Calls', icon: PhoneCall },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'followup', label: 'Follow-up', icon: MessageSquareText },
];

const PIPELINE_STAGES = [
    { id: 'inquiry', label: 'Website inquiry', status: 'Captured', icon: Globe2 },
    { id: 'qualified', label: 'Lead qualified', status: 'Qualified', icon: UserRound },
    { id: 'routed', label: 'Call routed', status: 'Routing', icon: PhoneCall },
    { id: 'quote', label: 'Quote ready', status: 'Draft', icon: FileCheck2 },
    { id: 'scheduled', label: 'Job scheduled', status: 'Pending', icon: CalendarDays },
    { id: 'follow-up', label: 'Follow-up', status: 'Queued', icon: MessageSquareText },
];

const INITIAL_LEADS = [
    {
        id: 'lead-1042',
        name: 'Morgan Ellis',
        company: 'Ellis Home Services',
        service: 'Water heater request',
        location: 'Abilene',
        source: 'Website',
        stage: 'routed',
        urgency: 'Today',
        email: 'morgan@example.com',
        phone: '(325) 555-0142',
        note: 'Customer requested an afternoon call and shared the service address.',
    },
    {
        id: 'lead-1039',
        name: 'Casey Reed',
        company: 'Reed Commercial',
        service: 'Electrical service call',
        location: 'San Angelo',
        source: 'Phone',
        stage: 'qualified',
        urgency: 'This week',
        email: 'casey@example.com',
        phone: '(325) 555-0139',
        note: 'Commercial request with site access details captured during the first call.',
    },
    {
        id: 'lead-1034',
        name: 'Jordan Lee',
        company: 'Lee Property Group',
        service: 'Commercial quote',
        location: 'Midland',
        source: 'Referral',
        stage: 'quote',
        urgency: 'Open',
        email: 'jordan@example.com',
        phone: '(432) 555-0134',
        note: 'Quote context is ready for an owner review before it is shared.',
    },
    {
        id: 'lead-1028',
        name: 'Taylor Brooks',
        company: 'Brooks Field Services',
        service: 'Maintenance request',
        location: 'Odessa',
        source: 'Website',
        stage: 'scheduled',
        urgency: 'Scheduled',
        email: 'taylor@example.com',
        phone: '(432) 555-0128',
        note: 'The service window and assigned team are visible in one record.',
    },
];

const CALLS = [
    { id: 1, name: 'Morgan Ellis', type: 'Incoming request', time: '9:42 AM', status: 'Owner response due' },
    { id: 2, name: 'Casey Reed', type: 'Returned call', time: 'Yesterday', status: 'Service fit confirmed' },
    { id: 3, name: 'Jordan Lee', type: 'Quote follow-up', time: 'Mon', status: 'Review scheduled' },
    { id: 4, name: 'Taylor Brooks', type: 'Confirmation call', time: 'Fri', status: 'Service window confirmed' },
];

const FOLLOW_UP_TASKS = [
    { id: 1, label: 'Return Morgan’s website inquiry', context: 'Due today · owner queue' },
    { id: 2, label: 'Review Jordan’s quote context', context: 'Due today · estimate queue' },
    { id: 3, label: 'Confirm Taylor’s service window', context: 'Tomorrow · scheduling' },
    { id: 4, label: 'Send Casey’s post-call recap', context: 'This week · customer care' },
];

const WEBSITE_SECTIONS = [
    { id: 'hero', label: 'Hero', icon: Sparkles, summary: 'Clear service, market, proof, and next step.' },
    { id: 'proof', label: 'Local proof', icon: MapPin, summary: 'Real locations and evidence establish relevance.' },
    { id: 'services', label: 'Services', icon: LayoutDashboard, summary: 'Organized offers help customers self-select.' },
    { id: 'about', label: 'About', icon: UserRound, summary: 'A credible operating story makes the business human.' },
    { id: 'map', label: 'Service area', icon: Globe2, summary: 'Coverage is useful when it is accurate and specific.' },
    { id: 'faq', label: 'FAQ', icon: MessageSquareText, summary: 'Useful answers remove friction before the call.' },
    { id: 'resources', label: 'Playbooks', icon: BookOpenText, summary: 'Original guidance supports topical depth.' },
    { id: 'contact', label: 'Contact', icon: Send, summary: 'A focused form captures context for the next handoff.' },
];

const pad = (value) => String(value).padStart(2, '0');
const dateKey = (year, monthIndex, day) => `${year}-${pad(monthIndex + 1)}-${pad(day)}`;

function calendarCells(year, monthIndex) {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return [
        ...Array.from({ length: firstDay }, () => null),
        ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
}

function demoAppointments(year, monthIndex, anchorDay) {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days = [...new Set([4, 9, Math.min(anchorDay, daysInMonth), 18, 24, Math.max(daysInMonth - 2, 1)])];
    const labels = [
        ['9:00 AM', 'New lead review'],
        ['11:30 AM', 'Estimate follow-up'],
        ['2:00 PM', 'Service window'],
        ['10:30 AM', 'Owner callback'],
        ['3:15 PM', 'Quote review'],
        ['8:30 AM', 'Team schedule'],
    ];
    return Object.fromEntries(
        days.map((day, index) => [dateKey(year, monthIndex, day), labels[index % labels.length]])
    );
}

export default function ProviderCommandLab({ onClose }) {
    const [experience, setExperience] = useState('crm');
    const [crmView, setCrmView] = useState('pipeline');
    const [leads, setLeads] = useState(INITIAL_LEADS);
    const [selectedLeadId, setSelectedLeadId] = useState(INITIAL_LEADS[0].id);
    const [activeWebsiteSection, setActiveWebsiteSection] = useState('hero');
    const [submittedName, setSubmittedName] = useState('');
    const [notice, setNotice] = useState('');
    const closeRef = useRef(null);
    const dialogRef = useRef(null);
    const previousFocusRef = useRef(null);
    const today = useMemo(() => new Date(), []);
    const [monthCursor, setMonthCursor] = useState(
        () => new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState(
        () => dateKey(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const [completedTasks, setCompletedTasks] = useState([]);

    const selectedLead = leads.find((lead) => lead.id === selectedLeadId) || leads[0];

    useEffect(() => {
        previousFocusRef.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const dialog = dialogRef.current;
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }
            if (event.key !== 'Tab' || !dialog) return;

            const focusable = dialog.querySelectorAll(
                'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        dialog?.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            dialog?.removeEventListener('keydown', handleKey);
            previousFocusRef.current?.focus?.();
        };
    }, [onClose]);

    const updateLeadStage = (stage) => {
        setLeads((current) =>
            current.map((lead) => (lead.id === selectedLead.id ? { ...lead, stage } : lead))
        );
        setNotice(`${selectedLead.name} moved to ${PIPELINE_STAGES.find((item) => item.id === stage)?.label}.`);
    };

    const changeMonth = (offset) => {
        const next = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + offset, 1);
        setMonthCursor(next);
        setSelectedDate(dateKey(next.getFullYear(), next.getMonth(), 1));
    };

    const resetToToday = () => {
        const next = new Date(today.getFullYear(), today.getMonth(), 1);
        setMonthCursor(next);
        setSelectedDate(dateKey(today.getFullYear(), today.getMonth(), today.getDate()));
    };

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-[#010916]/90 backdrop-blur-md"
                aria-label="Close Provider Command Lab"
            />
            <section
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="provider-command-lab-title"
                className="relative flex h-[96dvh] w-full max-w-[96rem] flex-col overflow-hidden rounded-[1.4rem] border border-[#7dc4ff]/20 bg-[#06172b] text-white shadow-[0_42px_120px_rgba(0,0,0,0.72)] sm:rounded-[2rem]"
            >
                <header className="flex min-h-16 flex-none items-center justify-between gap-4 border-b border-white/[0.08] bg-white/[0.025] px-3 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="command-brand-logo hidden sm:block">
                            <Logo inverted compact />
                        </div>
                        <div className="min-w-0 border-white/10 sm:border-l sm:pl-3">
                            <h2 id="provider-command-lab-title" className="truncate text-sm font-bold sm:text-base">
                                Provider Command Lab
                            </h2>
                            <p className="font-data text-[0.48rem] uppercase tracking-[0.15em] text-white/35">
                                Interactive sample workspace · no data is sent
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="hidden items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 font-data text-[0.5rem] uppercase tracking-[0.12em] text-emerald-200 md:flex">
                            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            Sample data
                        </span>
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-sun/30 hover:text-sun"
                            aria-label="Close Provider Command Lab"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto xl:grid xl:grid-cols-[13.5rem_minmax(0,1fr)_18rem] xl:overflow-hidden">
                    <LabSidebar
                        experience={experience}
                        setExperience={setExperience}
                        crmView={crmView}
                        setCrmView={setCrmView}
                        activeWebsiteSection={activeWebsiteSection}
                        setActiveWebsiteSection={setActiveWebsiteSection}
                    />

                    <main className="min-h-[38rem] border-b border-white/[0.08] p-3 sm:p-5 xl:min-h-0 xl:border-b-0 xl:border-l xl:border-r">
                        {experience === 'crm' ? (
                            <CrmWorkspace
                                view={crmView}
                                leads={leads}
                                selectedLead={selectedLead}
                                setSelectedLeadId={setSelectedLeadId}
                                updateLeadStage={updateLeadStage}
                                monthCursor={monthCursor}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                today={today}
                                changeMonth={changeMonth}
                                resetToToday={resetToToday}
                                completedTasks={completedTasks}
                                setCompletedTasks={setCompletedTasks}
                                setNotice={setNotice}
                            />
                        ) : (
                            <WebsiteBlueprint
                                activeSection={activeWebsiteSection}
                                setActiveSection={setActiveWebsiteSection}
                                submittedName={submittedName}
                                setSubmittedName={setSubmittedName}
                            />
                        )}
                    </main>

                    <MobileCompanion
                        experience={experience}
                        crmView={crmView}
                        selectedLead={selectedLead}
                        activeWebsiteSection={activeWebsiteSection}
                        selectedDate={selectedDate}
                        submittedName={submittedName}
                    />
                </div>

                <div
                    aria-live="polite"
                    className={cn(
                        'pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-[#102844] px-4 py-2 text-xs font-semibold text-white shadow-xl transition',
                        notice ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                    )}
                >
                    {notice}
                </div>
            </section>
        </div>,
        document.body
    );
}

function LabSidebar({
    experience,
    setExperience,
    crmView,
    setCrmView,
    activeWebsiteSection,
    setActiveWebsiteSection,
}) {
    const selectExperience = (next) => {
        setExperience(next);
    };

    return (
        <aside className="border-b border-white/[0.08] bg-black/10 p-3 xl:min-h-0 xl:overflow-y-auto xl:border-b-0 xl:p-4">
            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => selectExperience('crm')}
                    aria-pressed={experience === 'crm'}
                    className={cn(
                        'rounded-xl border px-3 py-3 text-left transition',
                        experience === 'crm'
                            ? 'border-sun/35 bg-sun/[0.1] text-white'
                            : 'border-white/[0.07] bg-white/[0.025] text-white/50 hover:text-white/80'
                    )}
                >
                    <Workflow className="h-4 w-4 text-sun" aria-hidden="true" />
                    <span className="mt-2 block text-xs font-bold">CRM demo</span>
                </button>
                <button
                    type="button"
                    onClick={() => selectExperience('website')}
                    aria-pressed={experience === 'website'}
                    className={cn(
                        'rounded-xl border px-3 py-3 text-left transition',
                        experience === 'website'
                            ? 'border-sun/35 bg-sun/[0.1] text-white'
                            : 'border-white/[0.07] bg-white/[0.025] text-white/50 hover:text-white/80'
                    )}
                >
                    <Globe2 className="h-4 w-4 text-sun" aria-hidden="true" />
                    <span className="mt-2 block text-xs font-bold">Website demo</span>
                </button>
            </div>

            <p className="mt-5 font-data text-[0.5rem] font-bold uppercase tracking-[0.14em] text-white/30">
                {experience === 'crm' ? 'Workspace views' : 'Website blueprint'}
            </p>
            <nav className="lab-nav-scroll mt-2 flex gap-1.5 overflow-x-auto pb-1 xl:block xl:space-y-1 xl:overflow-visible">
                {(experience === 'crm' ? CRM_VIEWS : WEBSITE_SECTIONS).map((item) => {
                    const selected =
                        experience === 'crm' ? crmView === item.id : activeWebsiteSection === item.id;
                    return (
                        <button
                            type="button"
                            key={item.id}
                            onClick={() =>
                                experience === 'crm' ? setCrmView(item.id) : setActiveWebsiteSection(item.id)
                            }
                            aria-current={selected ? 'page' : undefined}
                            className={cn(
                                'flex min-w-fit items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition xl:w-full',
                                selected
                                    ? 'bg-white/[0.08] text-white'
                                    : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70'
                            )}
                        >
                            <item.icon className={cn('h-4 w-4', selected && 'text-sun')} aria-hidden="true" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-5 hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 xl:block">
                <p className="font-data text-[0.46rem] uppercase tracking-[0.12em] text-sun/70">
                    Safe demo
                </p>
                <p className="mt-2 text-[0.68rem] leading-5 text-white/40">
                    Everything here is sample content. Interactions stay in this browser and do not create
                    records, calls, appointments, or messages.
                </p>
            </div>
        </aside>
    );
}

function CrmWorkspace({
    view,
    leads,
    selectedLead,
    setSelectedLeadId,
    updateLeadStage,
    monthCursor,
    selectedDate,
    setSelectedDate,
    today,
    changeMonth,
    resetToToday,
    completedTasks,
    setCompletedTasks,
    setNotice,
}) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            <WorkspaceHeading
                eyebrow="Sample service operation"
                title={CRM_VIEWS.find((item) => item.id === view)?.label || 'Pipeline'}
                description="Explore how one customer record can stay visible from inquiry through follow-up."
            />
            <div className="command-scroll mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                {view === 'pipeline' && (
                    <PipelineView selectedLead={selectedLead} updateLeadStage={updateLeadStage} />
                )}
                {view === 'leads' && (
                    <LeadsView
                        leads={leads}
                        selectedLead={selectedLead}
                        setSelectedLeadId={setSelectedLeadId}
                    />
                )}
                {view === 'calls' && <CallsView setNotice={setNotice} />}
                {view === 'calendar' && (
                    <CalendarView
                        monthCursor={monthCursor}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        today={today}
                        changeMonth={changeMonth}
                        resetToToday={resetToToday}
                    />
                )}
                {view === 'followup' && (
                    <FollowUpView
                        completedTasks={completedTasks}
                        setCompletedTasks={setCompletedTasks}
                    />
                )}
            </div>
        </div>
    );
}

function WorkspaceHeading({ eyebrow, title, description }) {
    return (
        <div className="flex flex-none flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="font-data text-[0.52rem] font-bold uppercase tracking-[0.16em] text-sun">
                    {eyebrow}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">{title}</h3>
            </div>
            <p className="max-w-md text-xs leading-5 text-white/40">{description}</p>
        </div>
    );
}

function PipelineView({ selectedLead, updateLeadStage }) {
    const activeIndex = PIPELINE_STAGES.findIndex((stage) => stage.id === selectedLead.stage);
    return (
        <div>
            <div className="grid gap-2 sm:grid-cols-3">
                {[
                    ['4', 'Open sample leads'],
                    ['2', 'Actions due today'],
                    ['1', 'Service window pending'],
                ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                        <p className="text-lg font-bold text-white">{value}</p>
                        <p className="mt-1 text-[0.65rem] text-white/35">{label}</p>
                    </div>
                ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.72fr)]">
                <section className="rounded-2xl border border-white/[0.08] bg-[#071c36] p-3 sm:p-4">
                    <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                        <div>
                            <p className="text-sm font-bold text-white/90">{selectedLead.name}</p>
                            <p className="mt-0.5 text-[0.65rem] text-white/35">
                                {selectedLead.service} · {selectedLead.location}
                            </p>
                        </div>
                        <span className="rounded-full bg-emerald-300/10 px-2.5 py-1 font-data text-[0.48rem] uppercase tracking-[0.1em] text-emerald-200">
                            Demo lead
                        </span>
                    </div>
                    <ol className="mt-3 space-y-1.5">
                        {PIPELINE_STAGES.map((stage, index) => (
                            <li key={stage.id}>
                                <button
                                    type="button"
                                    onClick={() => updateLeadStage(stage.id)}
                                    aria-pressed={selectedLead.stage === stage.id}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition',
                                        selectedLead.stage === stage.id
                                            ? 'border-sun/35 bg-sun/[0.09] shadow-[inset_3px_0_0_#ff9f1c]'
                                            : index < activeIndex
                                                ? 'border-emerald-300/10 bg-emerald-300/[0.035]'
                                                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'grid h-7 w-7 place-items-center rounded-lg',
                                            index <= activeIndex
                                                ? 'bg-emerald-300/10 text-emerald-200'
                                                : 'bg-white/[0.04] text-white/30'
                                        )}
                                    >
                                        {index < activeIndex ? (
                                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                        ) : (
                                            <stage.icon className="h-3.5 w-3.5" aria-hidden="true" />
                                        )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs font-semibold text-white/75">
                                            {stage.label}
                                        </span>
                                    </span>
                                    <span className="font-data text-[0.45rem] uppercase tracking-[0.08em] text-white/35">
                                        {selectedLead.stage === stage.id ? 'Current' : stage.status}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </section>
                <LeadDetail lead={selectedLead} />
            </div>
        </div>
    );
}

function LeadDetail({ lead }) {
    const stage = PIPELINE_STAGES.find((item) => item.id === lead.stage);
    return (
        <aside className="rounded-2xl border border-sun/15 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun/10 text-sun">
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-data text-[0.48rem] uppercase tracking-[0.1em] text-sun/70">
                    {stage?.label}
                </span>
            </div>
            <h4 className="mt-5 text-base font-bold text-white">{lead.company}</h4>
            <dl className="mt-4 space-y-3 text-xs">
                {[
                    ['Service', lead.service],
                    ['Market', lead.location],
                    ['Source', lead.source],
                    ['Priority', lead.urgency],
                ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-2">
                        <dt className="text-white/30">{label}</dt>
                        <dd className="text-right font-semibold text-white/65">{value}</dd>
                    </div>
                ))}
            </dl>
            <p className="mt-4 text-xs leading-5 text-white/42">{lead.note}</p>
        </aside>
    );
}

function LeadsView({ leads, selectedLead, setSelectedLeadId }) {
    const [query, setQuery] = useState('');
    const filtered = leads.filter((lead) =>
        [lead.name, lead.company, lead.service, lead.location, lead.source]
            .join(' ')
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    );
    return (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(14rem,0.72fr)]">
            <section className="rounded-2xl border border-white/[0.08] bg-[#071c36] p-3 sm:p-4">
                <label className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5">
                    <Search className="h-4 w-4 text-sun" aria-hidden="true" />
                    <span className="sr-only">Search sample leads</span>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/25"
                        placeholder="Search by name, service, or city"
                    />
                </label>
                <div className="mt-3 space-y-1.5">
                    {filtered.map((lead) => (
                        <button
                            type="button"
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            aria-pressed={selectedLead.id === lead.id}
                            className={cn(
                                'grid w-full grid-cols-[1fr_auto] gap-3 rounded-xl border px-3 py-3 text-left transition sm:grid-cols-[1fr_0.8fr_auto]',
                                selectedLead.id === lead.id
                                    ? 'border-sun/30 bg-sun/[0.07]'
                                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                            )}
                        >
                            <span className="min-w-0">
                                <span className="block truncate text-xs font-bold text-white/80">{lead.name}</span>
                                <span className="mt-0.5 block truncate text-[0.65rem] text-white/35">{lead.company}</span>
                            </span>
                            <span className="hidden min-w-0 sm:block">
                                <span className="block truncate text-[0.68rem] text-white/60">{lead.service}</span>
                                <span className="mt-0.5 block text-[0.62rem] text-white/30">{lead.location}</span>
                            </span>
                            <span className="rounded-full bg-white/[0.05] px-2 py-1 font-data text-[0.44rem] uppercase text-white/45">
                                {lead.source}
                            </span>
                        </button>
                    ))}
                </div>
            </section>
            <LeadDetail lead={selectedLead} />
        </div>
    );
}

function CallsView({ setNotice }) {
    return (
        <section className="rounded-2xl border border-white/[0.08] bg-[#071c36] p-3 sm:p-4">
            <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/[0.07] pb-3 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/25 sm:grid-cols-[1fr_0.8fr_auto]">
                <span>Call</span>
                <span className="hidden sm:block">Context</span>
                <span>Action</span>
            </div>
            <div className="mt-2 space-y-1.5">
                {CALLS.map((call, index) => (
                    <div
                        key={call.id}
                        className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 sm:grid-cols-[1fr_0.8fr_auto]"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <span className={cn('grid h-8 w-8 flex-none place-items-center rounded-lg', index === 0 ? 'bg-sun/10 text-sun' : 'bg-[#74b9f1]/10 text-[#74b9f1]')}>
                                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate text-xs font-bold text-white/75">{call.name}</span>
                                <span className="block truncate text-[0.62rem] text-white/32">{call.type} · {call.time}</span>
                            </span>
                        </div>
                        <span className="hidden text-[0.66rem] text-white/42 sm:block">{call.status}</span>
                        <button
                            type="button"
                            onClick={() => setNotice(`Demo action recorded for ${call.name}. No call was placed.`)}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-2 text-[0.62rem] font-bold text-white/60 transition hover:border-sun/25 hover:text-sun"
                        >
                            Log action
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CalendarView({
    monthCursor,
    selectedDate,
    setSelectedDate,
    today,
    changeMonth,
    resetToToday,
}) {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const cells = calendarCells(year, month);
    const appointments = demoAppointments(year, month, today.getDate());
    const selectedAppointment = appointments[selectedDate];
    const isCurrentMonth =
        year === today.getFullYear() && month === today.getMonth();
    const monthLabel = monthCursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <section className="rounded-2xl border border-white/[0.08] bg-[#071c36] p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <h4 className="min-w-[9rem] text-center text-sm font-bold text-white">{monthLabel}</h4>
                    <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
                <button
                    type="button"
                    onClick={resetToToday}
                    className="rounded-full border border-sun/20 bg-sun/[0.06] px-3 py-2 text-[0.65rem] font-bold text-sun"
                >
                    Today
                </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center font-data text-[0.46rem] uppercase tracking-[0.08em] text-white/25">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <span key={day} className="py-1">{day}</span>
                ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((day, index) => {
                    if (!day) return <span key={`blank-${index}`} className="min-h-12 rounded-lg sm:min-h-14" aria-hidden="true" />;
                    const key = dateKey(year, month, day);
                    const hasAppointment = Boolean(appointments[key]);
                    const isToday = isCurrentMonth && day === today.getDate();
                    return (
                        <button
                            type="button"
                            key={key}
                            onClick={() => setSelectedDate(key)}
                            aria-pressed={selectedDate === key}
                            aria-label={`${monthLabel} ${day}${hasAppointment ? ', sample appointment' : ''}${isToday ? ', today' : ''}`}
                            className={cn(
                                'relative min-h-12 rounded-lg border p-1.5 text-left text-[0.66rem] font-semibold transition sm:min-h-14',
                                selectedDate === key
                                    ? 'border-sun/40 bg-sun/[0.1] text-sun'
                                    : 'border-white/[0.055] bg-white/[0.02] text-white/45 hover:border-white/15',
                                isToday && 'ring-1 ring-emerald-300/50'
                            )}
                        >
                            {day}
                            {hasAppointment && (
                                <span className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-3 rounded-xl border border-emerald-300/12 bg-emerald-300/[0.045] p-3">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    <p className="text-xs font-bold text-white/75">
                        {selectedAppointment ? selectedAppointment[1] : 'No sample appointment'}
                    </p>
                </div>
                <p className="mt-1 pl-6 text-[0.65rem] text-white/35">
                    {selectedAppointment
                        ? `${selectedAppointment[0]} · Sample calendar item`
                        : 'Choose a date with a green marker to inspect its sample schedule.'}
                </p>
            </div>
        </section>
    );
}

function FollowUpView({ completedTasks, setCompletedTasks }) {
    const toggleTask = (id) => {
        setCompletedTasks((current) =>
            current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id]
        );
    };
    return (
        <section className="rounded-2xl border border-white/[0.08] bg-[#071c36] p-3 sm:p-4">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                <div>
                    <p className="text-sm font-bold text-white/85">Action queue</p>
                    <p className="mt-1 text-[0.65rem] text-white/32">Try completing a sample follow-up.</p>
                </div>
                <span className="rounded-full bg-sun/10 px-2.5 py-1 text-[0.6rem] font-bold text-sun">
                    {FOLLOW_UP_TASKS.length - completedTasks.length} open
                </span>
            </div>
            <ul className="mt-3 space-y-2">
                {FOLLOW_UP_TASKS.map((task) => {
                    const complete = completedTasks.includes(task.id);
                    return (
                        <li key={task.id}>
                            <button
                                type="button"
                                onClick={() => toggleTask(task.id)}
                                aria-pressed={complete}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition',
                                    complete
                                        ? 'border-emerald-300/15 bg-emerald-300/[0.05]'
                                        : 'border-white/[0.06] bg-white/[0.02] hover:border-sun/20'
                                )}
                            >
                                <span className={cn('grid h-7 w-7 place-items-center rounded-full border', complete ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-white/10 text-white/20')}>
                                    {complete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />}
                                </span>
                                <span className="min-w-0">
                                    <span className={cn('block text-xs font-semibold', complete ? 'text-white/35 line-through' : 'text-white/75')}>
                                        {task.label}
                                    </span>
                                    <span className="mt-0.5 block text-[0.64rem] text-white/30">{task.context}</span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

function WebsiteBlueprint({
    activeSection,
    setActiveSection,
    submittedName,
    setSubmittedName,
}) {
    const viewportRef = useRef(null);
    const sectionRefs = useRef({});
    const programmaticScrollRef = useRef(false);
    const scrollDrivenSectionRef = useRef(false);
    const scrollTimerRef = useRef(null);

    useEffect(() => {
        const viewport = viewportRef.current;
        const target = sectionRefs.current[activeSection];
        if (!viewport || !target) return;
        if (scrollDrivenSectionRef.current) {
            scrollDrivenSectionRef.current = false;
            return;
        }
        programmaticScrollRef.current = true;
        const targetTop =
            target.getBoundingClientRect().top -
            viewport.getBoundingClientRect().top +
            viewport.scrollTop;
        viewport.scrollTo({ top: Math.max(targetTop - 12, 0), behavior: 'smooth' });
        window.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = window.setTimeout(() => {
            programmaticScrollRef.current = false;
        }, 550);
        return () => window.clearTimeout(scrollTimerRef.current);
    }, [activeSection]);

    const handleScroll = () => {
        const viewport = viewportRef.current;
        if (!viewport || programmaticScrollRef.current) return;
        const marker = viewport.scrollTop + 100;
        const viewportTop = viewport.getBoundingClientRect().top;
        let current = WEBSITE_SECTIONS[0].id;
        WEBSITE_SECTIONS.forEach((section) => {
            const node = sectionRefs.current[section.id];
            if (!node) return;
            const sectionTop =
                node.getBoundingClientRect().top - viewportTop + viewport.scrollTop;
            if (sectionTop <= marker) current = section.id;
        });
        if (current !== activeSection) {
            scrollDrivenSectionRef.current = true;
            setActiveSection(current);
        }
    };

    return (
        <div className="flex h-full min-h-0 flex-col">
            <WorkspaceHeading
                eyebrow="Educational website blueprint"
                title="Your website, mapped as a working system."
                description="Scroll a sample page and see why each section exists. This is a teaching model—not a copied client website."
            />
            <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c1d34] shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <div className="flex h-12 flex-none items-center gap-3 border-b border-white/[0.08] bg-white/[0.035] px-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#a96269]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#a18e48]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4e836d]" />
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-black/20 px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                        <span className="truncate font-data text-[0.48rem] text-white/35">
                            demo.your-service-business.com
                        </span>
                    </div>
                    <Monitor className="h-4 w-4 text-sun/70" aria-hidden="true" />
                </div>
                <div
                    ref={viewportRef}
                    tabIndex={0}
                    onScroll={handleScroll}
                    aria-label="Scrollable educational website blueprint"
                    className="command-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#f5f8fc]"
                >
                    <BlueprintHero sectionRef={(node) => { sectionRefs.current.hero = node; }} />
                    <BlueprintProof sectionRef={(node) => { sectionRefs.current.proof = node; }} />
                    <BlueprintServices sectionRef={(node) => { sectionRefs.current.services = node; }} />
                    <BlueprintAbout sectionRef={(node) => { sectionRefs.current.about = node; }} />
                    <BlueprintMap sectionRef={(node) => { sectionRefs.current.map = node; }} />
                    <BlueprintFaq sectionRef={(node) => { sectionRefs.current.faq = node; }} />
                    <BlueprintResources sectionRef={(node) => { sectionRefs.current.resources = node; }} />
                    <BlueprintContact
                        sectionRef={(node) => { sectionRefs.current.contact = node; }}
                        submittedName={submittedName}
                        setSubmittedName={setSubmittedName}
                    />
                </div>
            </div>
        </div>
    );
}

function BlueprintLabel({ number, children }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1.5 font-data text-[0.48rem] font-bold uppercase tracking-[0.12em] text-accent shadow-sm">
            <span className="text-primary/35">{number}</span>
            {children}
        </div>
    );
}

function BlueprintHero({ sectionRef }) {
    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-primary px-5 py-10 text-white sm:px-8 sm:py-14">
            <div className="absolute inset-0 grid-field opacity-60" aria-hidden="true" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_0.78fr] lg:items-center">
                <div>
                    <BlueprintLabel number="01">Hero section</BlueprintLabel>
                    <h4 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-4xl">
                        Say what you do, where you work, and what happens next.
                    </h4>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/62">
                        A strong first screen reduces uncertainty. It gives the right customer a clear
                        reason to continue and a visible path to call or request service.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full bg-sun px-4 py-2 text-xs font-bold text-primary">Request service</span>
                        <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold">See local work</span>
                    </div>
                </div>
                <div className="relative min-h-56 overflow-hidden rounded-2xl border border-white/12 bg-[#06182d] p-4 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,159,28,0.2),transparent_36%)]" aria-hidden="true" />
                    <div className="relative h-full min-h-48 rounded-xl border border-[#75bdf8]/15 bg-[#0a2949]">
                        <div className="absolute left-4 top-4 h-20 w-32 rounded-xl border border-white/10 bg-white/[0.04]" />
                        <div className="absolute bottom-4 right-4 h-28 w-36 rounded-xl border border-sun/20 bg-sun/[0.07]" />
                        <div className="absolute left-12 top-20 h-px w-36 rotate-12 bg-gradient-to-r from-transparent via-[#73bafa] to-transparent" />
                        <span className="absolute right-8 top-8 grid h-12 w-12 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200">
                            <Radio className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="absolute bottom-7 left-7 font-data text-[0.48rem] uppercase tracking-[0.14em] text-white/35">
                            Customer path visual
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BlueprintProof({ sectionRef }) {
    return (
        <section ref={sectionRef} className="border-b border-primary/10 bg-white px-5 py-9 sm:px-8">
            <BlueprintLabel number="02">Local proof</BlueprintLabel>
            <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                    <h4 className="text-2xl font-bold tracking-[-0.035em] text-primary">Make relevance observable.</h4>
                    <p className="mt-3 text-sm leading-6 text-muted">
                        Real project markets, specific service context, and honest case studies are more useful
                        than a wall of unsupported superlatives.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {['Abilene & Big Country', 'San Angelo', 'Permian Basin', 'West Texas markets'].map((market) => (
                        <div key={market} className="rounded-xl border border-primary/10 bg-background p-3">
                            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                            <p className="mt-3 text-xs font-bold text-primary">{market}</p>
                            <p className="mt-1 text-[0.65rem] text-muted">Project or market context</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BlueprintServices({ sectionRef }) {
    return (
        <section ref={sectionRef} className="bg-[#edf3f9] px-5 py-9 sm:px-8">
            <BlueprintLabel number="03">Services</BlueprintLabel>
            <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-primary">Organize the decision, not just the menu.</h4>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Service groups help visitors recognize their problem, understand the offer, and reach the right next step.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: 'Get found', copy: 'Conversion website and local search foundations.', icon: Search },
                    { title: 'Capture demand', copy: 'Clear inquiry paths and lead context.', icon: Radio },
                    { title: 'Run the work', copy: 'CRM, scheduling, and follow-up visibility.', icon: Workflow },
                ].map((item) => (
                    <article key={item.title} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
                        <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                        <h5 className="mt-4 text-base font-bold text-primary">{item.title}</h5>
                        <p className="mt-2 text-xs leading-5 text-muted">{item.copy}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent">
                            See the service <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}

function BlueprintAbout({ sectionRef }) {
    return (
        <section ref={sectionRef} className="bg-white px-5 py-9 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-center">
                <div className="relative min-h-56 overflow-hidden rounded-2xl bg-primary p-5 text-white">
                    <div className="absolute -bottom-10 -right-3 font-drama text-[10rem] text-white/[0.05]" aria-hidden="true">J</div>
                    <div className="relative flex min-h-48 flex-col justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-sun font-drama text-primary">JW</span>
                        <div>
                            <p className="font-bold">Founder-led</p>
                            <p className="mt-1 font-data text-[0.48rem] uppercase tracking-[0.12em] text-sun">Direct accountability</p>
                        </div>
                    </div>
                </div>
                <div>
                    <BlueprintLabel number="04">About</BlueprintLabel>
                    <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-primary">Explain who is responsible for the work.</h4>
                    <p className="mt-3 text-sm leading-6 text-muted">
                        A useful about section connects the founder’s point of view to the way projects are
                        assessed, designed, built, and handed over. It should create confidence without inventing scale.
                    </p>
                </div>
            </div>
        </section>
    );
}

function BlueprintMap({ sectionRef }) {
    return (
        <section ref={sectionRef} className="bg-primary px-5 py-9 text-white sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-center">
                <div>
                    <BlueprintLabel number="05">Service-area map</BlueprintLabel>
                    <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em]">Show coverage without inventing locations.</h4>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                        An accurate service-area view supports customers and search engines. Project markets can be
                        highlighted without pretending they are offices.
                    </p>
                    <p className="mt-4 font-data text-[0.48rem] uppercase tracking-[0.12em] text-sun">
                        Illustrative coverage map · not office locations
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#06172b] p-4">
                    <svg viewBox="0 0 560 340" role="img" aria-label="Illustrative map of Texas project markets" className="w-full">
                        <path
                            d="M102 42 L267 46 L269 93 L346 97 L384 161 L453 190 L420 230 L383 237 L359 283 L310 313 L275 285 L225 271 L203 228 L167 208 L137 167 L110 141 Z"
                            fill="#0b3060"
                            stroke="#5daeea"
                            strokeWidth="3"
                            opacity="0.96"
                        />
                        {[
                            [213, 143, 'Abilene'],
                            [240, 193, 'San Angelo'],
                            [161, 191, 'Midland'],
                            [136, 206, 'Odessa'],
                        ].map(([x, y, label]) => (
                            <g key={label}>
                                <circle cx={x} cy={y} r="14" fill="#ff9f1c" opacity="0.18" />
                                <circle cx={x} cy={y} r="5" fill="#ff9f1c" />
                                <text x={x + 11} y={y - 9} fill="#ffffff" fontSize="13" fontFamily="Space Grotesk">{label}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </section>
    );
}

function BlueprintFaq({ sectionRef }) {
    return (
        <section ref={sectionRef} className="bg-white px-5 py-9 sm:px-8">
            <BlueprintLabel number="06">FAQ</BlueprintLabel>
            <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-primary">Answer the questions that delay action.</h4>
            <div className="mt-5 space-y-2">
                {[
                    ['Do you work across Texas?', 'Statewide positioning should be backed by real service capability, project evidence, or useful regional context.'],
                    ['Can the website connect to our workflow?', 'The right answer depends on the tools, ownership rules, and handoffs already in the business.'],
                    ['Will every city need its own page?', 'No. A location page should exist only when it offers distinct, useful information—not copy-swapped text.'],
                ].map(([question, answer]) => (
                    <details key={question} className="group rounded-xl border border-primary/10 bg-background p-4">
                        <summary className="cursor-pointer list-none text-sm font-bold text-primary">
                            <span className="flex items-center justify-between gap-3">
                                {question}
                                <span className="text-accent transition group-open:rotate-45">+</span>
                            </span>
                        </summary>
                        <p className="mt-3 border-t border-primary/10 pt-3 text-xs leading-5 text-muted">{answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

function BlueprintResources({ sectionRef }) {
    return (
        <section ref={sectionRef} className="bg-[#edf3f9] px-5 py-9 sm:px-8">
            <BlueprintLabel number="07">Useful content</BlueprintLabel>
            <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-primary">Build authority by being genuinely helpful.</h4>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                    'How to map a service-business lead flow',
                    'What belongs on a Texas service-area page',
                    'CRM questions to answer before choosing software',
                ].map((title, index) => (
                    <article key={title} className="rounded-2xl border border-primary/10 bg-white p-4">
                        <span className="font-data text-[0.48rem] font-bold uppercase tracking-[0.12em] text-accent">
                            Playbook {pad(index + 1)}
                        </span>
                        <h5 className="mt-3 text-sm font-bold leading-5 text-primary">{title}</h5>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent">
                            Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}

function BlueprintContact({ sectionRef, submittedName, setSubmittedName }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get('demo-name') || '').trim();
        setSubmittedName(name || 'there');
    };

    return (
        <section ref={sectionRef} className="bg-white px-5 py-9 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1fr]">
                <div>
                    <BlueprintLabel number="08">Contact form</BlueprintLabel>
                    <h4 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-primary">Capture enough context for a useful response.</h4>
                    <p className="mt-3 text-sm leading-6 text-muted">
                        This sample form stays in your browser. It demonstrates validation and a clear success state,
                        but it does not send a message or create a real lead.
                    </p>
                </div>
                {submittedName ? (
                    <div role="status" className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-emerald-700/15 bg-emerald-50 p-6 text-center">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <h5 className="mt-4 text-lg font-bold text-primary">Demo submission received, {submittedName}.</h5>
                        <p className="mt-2 max-w-sm text-xs leading-5 text-muted">
                            This is how a real inquiry could confirm the handoff before it enters a CRM. Nothing was sent.
                        </p>
                        <button type="button" onClick={() => setSubmittedName('')} className="mt-5 text-xs font-bold text-accent">
                            Reset sample form
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/10 bg-background p-4 sm:p-5">
                        <p className="font-data text-[0.48rem] font-bold uppercase tracking-[0.12em] text-accent">
                            Demo only · no data is transmitted
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <label className="text-xs font-bold text-primary">
                                Name
                                <input name="demo-name" required autoComplete="off" className="mt-1.5 min-h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm font-normal outline-none focus:border-accent" />
                            </label>
                            <label className="text-xs font-bold text-primary">
                                Email
                                <input name="demo-email" type="email" required autoComplete="off" className="mt-1.5 min-h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm font-normal outline-none focus:border-accent" />
                            </label>
                        </div>
                        <label className="mt-3 block text-xs font-bold text-primary">
                            Service needed
                            <select name="demo-service" required defaultValue="" className="mt-1.5 min-h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm font-normal outline-none focus:border-accent">
                                <option value="" disabled>Select a sample service</option>
                                <option>Website design</option>
                                <option>CRM and operations</option>
                                <option>Local SEO architecture</option>
                                <option>Automation and follow-up</option>
                            </select>
                        </label>
                        <label className="mt-3 block text-xs font-bold text-primary">
                            What should the team know?
                            <textarea name="demo-message" rows="3" className="mt-1.5 w-full rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-accent" />
                        </label>
                        <button type="submit" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-sun px-5 text-xs font-bold text-primary">
                            Submit sample inquiry <Send className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

function MobileCompanion({
    experience,
    crmView,
    selectedLead,
    activeWebsiteSection,
    selectedDate,
    submittedName,
}) {
    const websiteSection = WEBSITE_SECTIONS.find((section) => section.id === activeWebsiteSection) || WEBSITE_SECTIONS[0];
    const crmViewData = CRM_VIEWS.find((view) => view.id === crmView) || CRM_VIEWS[0];
    const dateLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    return (
        <aside className="bg-black/10 p-4 xl:min-h-0 xl:overflow-y-auto xl:p-5">
            <div className="mx-auto max-w-[16rem] rounded-[2rem] border-[4px] border-[#173454] bg-background shadow-[0_26px_70px_rgba(0,0,0,0.45)]">
                <div className="relative border-b border-primary/10 px-4 pb-3 pt-6">
                    <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-primary/20" aria-hidden="true" />
                    <div className="flex items-center justify-between">
                        <span className="font-data text-[0.48rem] font-bold uppercase tracking-[0.12em] text-primary/45">
                            Field view
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    </div>
                </div>
                <div className="p-3.5">
                    {experience === 'crm' ? (
                        <>
                            <div className="rounded-2xl bg-primary p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <crmViewData.icon className="h-4 w-4 text-sun" aria-hidden="true" />
                                    <span className="font-data text-[0.42rem] uppercase tracking-[0.1em] text-white/35">{crmViewData.label}</span>
                                </div>
                                <p className="mt-4 text-sm font-bold">{selectedLead.name}</p>
                                <p className="mt-1 text-[0.65rem] leading-5 text-white/50">{selectedLead.service}</p>
                            </div>
                            <div className="mt-3 space-y-2">
                                {[
                                    ['Customer', selectedLead.company],
                                    ['Market', selectedLead.location],
                                    [crmView === 'calendar' ? 'Selected date' : 'Next step', crmView === 'calendar' ? dateLabel : PIPELINE_STAGES.find((stage) => stage.id === selectedLead.stage)?.label],
                                ].map(([label, value], index) => (
                                    <div key={label} className="flex items-center gap-2 rounded-xl border border-primary/10 bg-white p-3">
                                        <span className={cn('grid h-6 w-6 place-items-center rounded-full', index < 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#fff3df] text-accent')}>
                                            {index < 2 ? <Check className="h-3 w-3" aria-hidden="true" /> : <ArrowRight className="h-3 w-3" aria-hidden="true" />}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[0.52rem] font-bold text-primary/45">{label}</span>
                                            <span className="block truncate text-[0.62rem] font-semibold text-primary">{value}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="overflow-hidden rounded-2xl bg-primary text-white">
                                <div className="grid-field relative min-h-28 p-4">
                                    <div className="relative">
                                        <websiteSection.icon className="h-4 w-4 text-sun" aria-hidden="true" />
                                        <p className="mt-4 font-data text-[0.44rem] uppercase tracking-[0.12em] text-sun">
                                            Section preview
                                        </p>
                                        <p className="mt-1 text-sm font-bold">{websiteSection.label}</p>
                                    </div>
                                </div>
                                <p className="px-4 pb-4 text-[0.65rem] leading-5 text-white/55">
                                    {submittedName && activeWebsiteSection === 'contact'
                                        ? `Demo inquiry received for ${submittedName}.`
                                        : websiteSection.summary}
                                </p>
                            </div>
                            <div className="mt-3 rounded-xl border border-primary/10 bg-white p-3">
                                <div className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4 text-accent" aria-hidden="true" />
                                    <span className="text-[0.62rem] font-bold text-primary">Synchronized mobile view</span>
                                </div>
                                <p className="mt-2 text-[0.56rem] leading-4 text-muted">
                                    The phone follows the section you select or scroll to in the desktop blueprint.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="mx-auto mt-4 max-w-[16rem] rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-center">
                <p className="font-data text-[0.46rem] uppercase tracking-[0.12em] text-white/30">
                    {experience === 'crm' ? 'Desktop + field view' : 'Desktop + mobile blueprint'}
                </p>
                <p className="mt-2 text-[0.64rem] leading-5 text-white/40">
                    Both views respond to the same sample interaction.
                </p>
            </div>
        </aside>
    );
}
