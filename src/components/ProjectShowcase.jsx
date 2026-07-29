import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Monitor,
    ShieldCheck,
    Smartphone,
} from 'lucide-react';
import ProjectPreviewSurface from './ProjectPreviewSurface';
import { cn } from '../lib/cn';
import { supportsLivePreview, warmProjectPreview } from '../lib/projectPreview';

export default function ProjectShowcase({ projects }) {
    const featuredProject = projects.find((project) => project.slug === 'adrians-custom-services') || projects[0];
    const [selectedSlug, setSelectedSlug] = useState(featuredProject?.slug);
    const [device, setDevice] = useState('desktop');
    const [failedPreviewKey, setFailedPreviewKey] = useState(null);
    const [previousProject, setPreviousProject] = useState(null);
    const [transitionId, setTransitionId] = useState(0);
    const previewRef = useRef(null);
    const queueRef = useRef(null);
    const transitionTimerRef = useRef(null);

    const selectedProject =
        projects.find((project) => project.slug === selectedSlug) || projects[0];
    const selectedIndex = projects.findIndex((project) => project.slug === selectedProject?.slug);

    useEffect(() => {
        if (previewRef.current) previewRef.current.scrollTop = 0;

        const activeQueueItem = queueRef.current?.querySelector(
            `[data-project-slug="${selectedSlug}"]`
        );
        activeQueueItem?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
        });
    }, [device, selectedSlug]);

    useEffect(() => {
        warmProjectPreview(selectedProject);

        const warmRemainingProjects = () => {
            projects.forEach(warmProjectPreview);
        };

        if (typeof window.requestIdleCallback === 'function') {
            const idleId = window.requestIdleCallback(warmRemainingProjects, { timeout: 1800 });
            return () => window.cancelIdleCallback(idleId);
        }

        const timeoutId = window.setTimeout(warmRemainingProjects, 1200);
        return () => window.clearTimeout(timeoutId);
    }, [projects, selectedProject]);

    useEffect(() => () => window.clearTimeout(transitionTimerRef.current), []);

    if (!selectedProject) return null;

    const preview = selectedProject.preview?.[device];
    const previewKey = `${selectedProject.slug}-${device}`;
    const imageFailed = failedPreviewKey === previewKey;
    const domain = getDomain(selectedProject.liveUrl);
    const livePreviewAvailable = supportsLivePreview(selectedProject);
    const effectivePreviewMode = livePreviewAvailable ? 'live' : 'snapshot';
    const position = `${String(selectedIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

    const selectProject = (project) => {
        if (!project || project.slug === selectedProject.slug) return;

        warmProjectPreview(project);
        window.clearTimeout(transitionTimerRef.current);
        setPreviousProject(selectedProject);
        setSelectedSlug(project.slug);
        setTransitionId((current) => current + 1);
        transitionTimerRef.current = window.setTimeout(() => setPreviousProject(null), 620);
    };

    const moveProject = (direction) => {
        const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
        selectProject(projects[nextIndex]);
    };

    return (
        <section
            className={cn(
                'project-console relative left-1/2 w-[min(96vw,100rem)] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-primary/10 bg-dark text-white shadow-lift',
                device === 'mobile' && 'project-console-mobile-focus'
            )}
            aria-label="Provider Project Console"
        >
            <div className="project-console-field absolute inset-0" aria-hidden="true" />

            <header className="relative flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
                <div>
                    <div className="flex items-center gap-2 font-data text-[0.58rem] font-bold uppercase tracking-[0.18em] text-sun">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Provider Project Console
                    </div>
                    <p className="mt-1.5 text-sm text-white/46">
                        Live client websites, motion, video, and responsive views—kept compact.
                    </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-data text-[0.5rem] uppercase tracking-[0.14em] text-white/45">
                    {position} selected
                </span>
            </header>

            <div className={cn(
                'relative grid min-h-0',
                device === 'mobile'
                    ? 'lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,48rem)_18rem] xl:justify-center'
                    : 'lg:grid-cols-[minmax(0,1fr)_21rem]'
            )}>
                <article className="min-w-0 border-b border-white/[0.08] p-3 sm:p-5 lg:border-b-0 lg:border-r lg:p-6" aria-live="polite">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" aria-hidden="true" />
                                <span className="truncate font-data text-[0.52rem] tracking-[0.09em] text-white/43">
                                    {domain}
                                </span>
                            </div>
                            <p className="mt-2 font-data text-[0.48rem] font-bold uppercase tracking-[0.15em] text-sun">
                                {livePreviewAvailable ? 'Live client site' : 'Project launch preview'}
                            </p>
                        </div>

                        <div
                            role="group"
                            aria-label="Project preview device"
                            className="flex flex-none gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1"
                        >
                            <button
                                type="button"
                                title="Desktop preview"
                                aria-label="Show desktop preview"
                                aria-pressed={device === 'desktop'}
                                onClick={() => setDevice('desktop')}
                                className={cn(
                                    'grid h-9 w-9 place-items-center rounded-full transition',
                                    device === 'desktop'
                                        ? 'bg-sun text-primary'
                                        : 'text-white/42 hover:bg-white/[0.08] hover:text-white'
                                )}
                            >
                                <Monitor className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                title="Mobile preview"
                                aria-label="Show mobile preview"
                                aria-pressed={device === 'mobile'}
                                onClick={() => setDevice('mobile')}
                                className={cn(
                                    'grid h-9 w-9 place-items-center rounded-full transition',
                                    device === 'mobile'
                                        ? 'bg-sun text-primary'
                                        : 'text-white/42 hover:bg-white/[0.08] hover:text-white'
                                )}
                            >
                                <Smartphone className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className={cn(
                        'project-console-stage relative overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_26px_70px_rgba(0,0,0,0.34)]',
                        device === 'mobile'
                            ? 'project-console-stage-mobile p-4 sm:p-5'
                            : 'bg-[#e9eef5] p-2 sm:p-3'
                    )}>
                        {previousProject && (
                            <div key={`handoff-${transitionId}`} className="project-console-handoff pointer-events-none absolute right-5 top-5 z-30 hidden max-w-44 rounded-xl border border-white/10 bg-[#071a30]/95 px-3 py-2 shadow-xl backdrop-blur sm:block" aria-hidden="true">
                                <p className="font-data text-[0.42rem] uppercase tracking-[0.13em] text-white/35">Switching from</p>
                                <p className="mt-1 truncate text-[0.65rem] font-semibold text-white/70">{previousProject.client}</p>
                            </div>
                        )}
                        <div
                            key={`stage-${selectedProject.slug}-${device}-${transitionId}`}
                            className={cn(
                                'project-console-stage-enter',
                                device === 'mobile' && 'project-console-phone-focus'
                            )}
                        >
                            <ProjectPreviewSurface
                                project={selectedProject}
                                device={device}
                                mode={effectivePreviewMode}
                                preview={preview}
                                imageFailed={imageFailed}
                                onImageError={() => setFailedPreviewKey(previewKey)}
                                snapshotScrollRef={previewRef}
                                maintainAspectRatio={device === 'mobile'}
                                heightClass={
                                    device === 'desktop'
                                        ? 'h-[15.5rem] sm:h-[20rem] lg:h-[27rem]'
                                        : 'h-[37.333rem]'
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0 max-w-2xl">
                            <h3 key={`title-${selectedProject.slug}-${transitionId}`} className="project-console-title text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                                {selectedProject.client}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-white/48">{selectedProject.summary}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full border border-sky/15 bg-sky/[0.07] px-2.5 py-1 text-[0.62rem] font-semibold text-[#8fc7f7]">
                                    {selectedProject.location || selectedProject.region}
                                </span>
                                {selectedProject.services.slice(0, 2).map((service) => (
                                    <span key={service} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.58rem] font-semibold text-white/45">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:flex-none">
                            <Link to={`/work/${selectedProject.slug}`} className="button-primary px-4 py-2.5 text-sm">
                                Case study
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                            <a
                                href={selectedProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-ghost-dark px-4 py-2.5 text-sm"
                            >
                                Open site
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </article>

                <aside className={cn(
                    'relative bg-[#06172b]/88 p-4 sm:p-5',
                    device === 'mobile' ? 'lg:p-4' : 'lg:p-5'
                )}>
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="font-data text-[0.52rem] font-bold uppercase tracking-[0.16em] text-sun">Project queue</p>
                            <p className="mt-1 text-xs text-white/35">Choose a client website to bring forward.</p>
                        </div>
                        <div className="hidden items-center gap-1.5 sm:flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => moveProject(-1)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                                aria-label="Previous project"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveProject(1)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                                aria-label="Next project"
                            >
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={queueRef}
                        className={cn(
                            'project-console-queue mt-4 flex snap-x gap-2.5 overflow-x-auto pb-1 lg:snap-none lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1',
                            device === 'mobile' ? 'lg:max-h-[39rem]' : 'lg:max-h-[31.8rem]'
                        )}
                    >
                        {projects.map((project, index) => {
                            const isActive = selectedProject.slug === project.slug;
                            return (
                                <button
                                    key={project.slug}
                                    type="button"
                                    data-project-slug={project.slug}
                                    aria-pressed={isActive}
                                    onClick={() => selectProject(project)}
                                    onPointerEnter={() => warmProjectPreview(project)}
                                    onFocus={() => warmProjectPreview(project)}
                                    className={cn(
                                        'group relative flex w-[15rem] flex-none snap-start items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition duration-300 lg:w-full',
                                        isActive
                                            ? 'project-console-card-active border-sun/45 bg-sun/[0.1]'
                                            : 'border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.06]'
                                    )}
                                >
                                    <span className="relative h-14 w-[5.45rem] flex-none overflow-hidden rounded-lg border border-white/10 bg-primary/40">
                                        {project.preview?.desktop?.src ? (
                                            <img
                                                src={project.preview.desktop.src}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <span className="grid h-full w-full place-items-center font-data text-[0.42rem] uppercase tracking-[0.1em] text-white/35">Preview</span>
                                        )}
                                        <span className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className={cn('font-data text-[0.45rem] font-bold', isActive ? 'text-sun' : 'text-white/25')}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="mt-1 block truncate text-xs font-semibold text-white/82">{project.client}</span>
                                        <span className="mt-1 block truncate text-[0.56rem] text-white/36">{project.category}</span>
                                    </span>
                                    <ArrowRight
                                        className={cn(
                                            'mr-1 h-3.5 w-3.5 flex-none transition group-hover:translate-x-0.5',
                                            isActive ? 'text-sun' : 'text-white/18'
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 hidden border-t border-white/[0.08] pt-4 lg:flex lg:items-center lg:justify-between">
                        <span className="font-data text-[0.48rem] uppercase tracking-[0.13em] text-white/30">{position}</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => moveProject(-1)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                                aria-label="Previous project"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveProject(1)}
                                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                                aria-label="Next project"
                            >
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function getDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return 'project preview';
    }
}
