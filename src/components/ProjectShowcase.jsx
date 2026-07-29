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
    const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug);
    const [device, setDevice] = useState('desktop');
    const [failedPreviewKey, setFailedPreviewKey] = useState(null);
    const previewRef = useRef(null);
    const reelRef = useRef(null);

    const selectedProject =
        projects.find((project) => project.slug === selectedSlug) || projects[0];
    const selectedIndex = projects.findIndex((project) => project.slug === selectedProject?.slug);

    useEffect(() => {
        if (previewRef.current) previewRef.current.scrollTop = 0;

        const activeReelItem = reelRef.current?.querySelector(
            `[data-project-slug="${selectedSlug}"]`
        );
        activeReelItem?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
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

    if (!selectedProject) return null;

    const preview = selectedProject.preview?.[device];
    const previewKey = `${selectedProject.slug}-${device}`;
    const imageFailed = failedPreviewKey === previewKey;
    const domain = getDomain(selectedProject.liveUrl);
    const livePreviewAvailable = supportsLivePreview(selectedProject);
    const effectivePreviewMode = livePreviewAvailable ? 'live' : 'snapshot';
    const position = `${String(selectedIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;

    const selectProject = (project) => {
        warmProjectPreview(project);
        setSelectedSlug(project.slug);
    };

    const moveProject = (direction) => {
        const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
        selectProject(projects[nextIndex]);
    };

    return (
        <section
            className="project-theater relative left-1/2 w-[min(96vw,100rem)] -translate-x-1/2 overflow-hidden rounded-[2.25rem] border border-primary/10 bg-dark text-white shadow-lift"
            aria-label="Provider Project Theater"
        >
            <div className="project-theater-field absolute inset-0" aria-hidden="true" />

            <header className="relative border-b border-white/[0.08] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 font-data text-[0.58rem] font-bold uppercase tracking-[0.18em] text-sun">
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            Provider Project Theater
                        </div>
                        <div className="mt-5 flex items-start gap-4 sm:gap-6">
                            <span className="pt-1 font-data text-[0.62rem] font-bold tracking-[0.14em] text-white/30">
                                {position}
                            </span>
                            <div>
                                <h3
                                    key={`title-${selectedProject.slug}`}
                                    className="project-theater-title text-3xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
                                >
                                    {selectedProject.client}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/48 sm:text-base">
                                    {selectedProject.summary}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 font-data text-[0.5rem] uppercase tracking-[0.13em] text-white/45">
                            {selectedProject.category}
                        </span>
                        <span className="rounded-full border border-sky/15 bg-sky/[0.07] px-3 py-2 text-xs font-semibold text-[#8fc7f7]">
                            {selectedProject.location || selectedProject.region}
                        </span>
                    </div>
                </div>

                <div className="mt-7 h-px overflow-hidden bg-white/[0.08]" aria-hidden="true">
                    <span key={`route-${selectedProject.slug}`} className="project-theater-route block h-full bg-gradient-to-r from-transparent via-sun to-transparent" />
                </div>
            </header>

            <div className="relative px-3 pb-5 pt-9 sm:px-6 sm:pb-7 sm:pt-11 lg:px-10 lg:pb-10">
                <div className="relative">
                    <div className="pointer-events-none absolute -top-5 left-3 z-20 flex max-w-[58%] items-center gap-2 rounded-full border border-white/10 bg-[#071a30]/95 px-3 py-2 shadow-xl backdrop-blur sm:left-6">
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                        <span className="truncate font-data text-[0.5rem] tracking-[0.08em] text-white/48">
                            {domain}
                        </span>
                    </div>

                    <div
                        role="group"
                        aria-label="Project preview device"
                        className="absolute -top-6 right-3 z-20 flex gap-1 rounded-full border border-white/10 bg-[#071a30]/95 p-1.5 shadow-xl backdrop-blur sm:right-6"
                    >
                        <button
                            type="button"
                            title="Desktop preview"
                            aria-label="Show desktop preview"
                            aria-pressed={device === 'desktop'}
                            onClick={() => setDevice('desktop')}
                            className={cn(
                                'grid h-10 w-10 place-items-center rounded-full transition',
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
                                'grid h-10 w-10 place-items-center rounded-full transition',
                                device === 'mobile'
                                    ? 'bg-sun text-primary'
                                    : 'text-white/42 hover:bg-white/[0.08] hover:text-white'
                            )}
                        >
                            <Smartphone className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="project-theater-portal overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#e9eef5] p-2 shadow-[0_36px_100px_rgba(0,0,0,0.46)] sm:p-4">
                        <div key={selectedProject.slug} className="project-theater-arrive">
                            <ProjectPreviewSurface
                                project={selectedProject}
                                device={device}
                                mode={effectivePreviewMode}
                                preview={preview}
                                imageFailed={imageFailed}
                                onImageError={() => setFailedPreviewKey(previewKey)}
                                snapshotScrollRef={previewRef}
                                heightClass={
                                    device === 'desktop'
                                        ? 'h-[24rem] sm:h-[32rem] lg:h-[clamp(36rem,46vw,46rem)]'
                                        : 'h-[38rem] sm:h-[44rem]'
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <nav className="relative border-y border-white/[0.08] bg-[#06172b]/88 px-4 py-5 sm:px-7" aria-label="Project reel">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-data text-[0.52rem] font-bold uppercase tracking-[0.16em] text-sun">
                            Project reel
                        </p>
                        <p className="mt-1 text-xs text-white/35">Choose another system to bring it onto the stage.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => moveProject(-1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                            aria-label="Previous project"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={() => moveProject(1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/35 hover:text-sun"
                            aria-label="Next project"
                        >
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div ref={reelRef} className="project-reel-scroll flex snap-x gap-2.5 overflow-x-auto pb-2">
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
                                    'group relative flex w-[13.5rem] flex-none snap-center items-center gap-3 overflow-hidden rounded-2xl border px-4 py-4 text-left transition duration-300 sm:w-[15rem]',
                                    isActive
                                        ? 'border-sun/45 bg-sun/[0.1]'
                                        : 'border-white/[0.07] bg-white/[0.035] hover:border-white/15 hover:bg-white/[0.06]'
                                )}
                            >
                                {isActive && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sun via-[#ffd28e] to-sun" aria-hidden="true" />
                                )}
                                <span className={cn(
                                    'font-data text-[0.48rem] font-bold',
                                    isActive ? 'text-sun' : 'text-white/25'
                                )}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-xs font-semibold text-white/82">
                                        {project.client}
                                    </span>
                                    <span className="mt-1 block truncate text-[0.56rem] text-white/34">
                                        {project.category}
                                    </span>
                                </span>
                                <ArrowRight
                                    className={cn(
                                        'h-3.5 w-3.5 flex-none transition group-hover:translate-x-0.5',
                                        isActive ? 'text-sun' : 'text-white/18'
                                    )}
                                    aria-hidden="true"
                                />
                            </button>
                        );
                    })}
                </div>
            </nav>

            <div className="relative grid gap-px bg-white/[0.08] lg:grid-cols-[1.05fr_0.95fr_0.9fr_16rem]">
                <article className="bg-[#071a30] p-6 sm:p-8">
                    <p className="font-data text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[#8fc7f7]">
                        Business context
                    </p>
                    <p className="mt-4 text-sm leading-6 text-white/56">{selectedProject.challenge}</p>
                </article>

                <article className="bg-[#071a30] p-6 sm:p-8">
                    <p className="font-data text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[#8fc7f7]">
                        System delivered
                    </p>
                    <ul className="mt-4 space-y-2.5">
                        {selectedProject.delivered.slice(0, 3).map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-white/56">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-sun" aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="bg-[#071a30] p-6 sm:p-8">
                    <p className="font-data text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[#8fc7f7]">
                        Observable scope
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {selectedProject.services.slice(0, 4).map((service) => (
                            <span
                                key={service}
                                className="rounded-full border border-white/10 px-2.5 py-1.5 text-[0.58rem] font-semibold text-white/52"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 text-[0.66rem] leading-5 text-white/32">
                        Public scope only. No unverified outcome metric is implied.
                    </p>
                </article>

                <div className="flex flex-col justify-center gap-3 bg-[#071a30] p-6 sm:p-8">
                    <Link to={`/work/${selectedProject.slug}`} className="button-primary w-full">
                        Read case study
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-ghost-dark w-full"
                    >
                        Open live site
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
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
