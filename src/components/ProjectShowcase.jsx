import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Monitor,
    Search,
    ShieldCheck,
    Smartphone,
} from 'lucide-react';
import ProjectPreviewSurface from './ProjectPreviewSurface';
import { cn } from '../lib/cn';
import { supportsLivePreview, warmProjectPreview } from '../lib/projectPreview';

export default function ProjectShowcase({ projects }) {
    const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug);
    const [device, setDevice] = useState('desktop');
    const [query, setQuery] = useState('');
    const [failedPreviewKey, setFailedPreviewKey] = useState(null);
    const previewRef = useRef(null);

    const selectedProject =
        projects.find((project) => project.slug === selectedSlug) || projects[0];
    const selectedIndex = projects.findIndex((project) => project.slug === selectedProject?.slug);
    const filteredProjects = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return projects;
        return projects.filter((project) =>
            [project.client, project.category, project.location, project.region, ...project.services]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(term)
        );
    }, [projects, query]);

    useEffect(() => {
        if (previewRef.current) previewRef.current.scrollTop = 0;
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
    const moveProject = (direction) => {
        const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
        setSelectedSlug(projects[nextIndex].slug);
    };

    return (
        <div className="project-atlas relative left-1/2 w-[min(96vw,100rem)] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-primary/10 bg-dark text-white shadow-lift">
            <header className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                    <div className="flex items-center gap-2 font-data text-[0.58rem] font-bold uppercase tracking-[0.17em] text-sun">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Provider project atlas
                    </div>
                    <p className="mt-1.5 text-sm text-white/50">
                        Scroll through the real website with its motion, video, and responsive behavior intact.
                    </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-data text-[0.5rem] uppercase tracking-[0.14em] text-white/45">
                    {projects.length} real projects
                </span>
            </header>

            <div className="grid min-h-0 grid-cols-[minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
                <aside className="border-b border-white/[0.08] bg-[#06172b] p-4 xl:border-b-0 xl:border-r xl:p-5">
                    <label className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-3">
                        <Search className="h-4 w-4 text-white/35" aria-hidden="true" />
                        <span className="sr-only">Search projects</span>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search projects"
                            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        />
                    </label>

                    <div className="project-directory-scroll mt-3 flex gap-2 overflow-x-auto pb-1 xl:block xl:max-h-[41rem] xl:space-y-1.5 xl:overflow-y-auto xl:pr-1">
                        {filteredProjects.length ? (
                            filteredProjects.map((project) => (
                                <button
                                    key={project.slug}
                                    type="button"
                                    onClick={() => setSelectedSlug(project.slug)}
                                    aria-pressed={selectedProject.slug === project.slug}
                                    className={cn(
                                        'group flex w-[14rem] flex-none items-center gap-3 rounded-xl border px-3 py-3 text-left transition xl:w-full',
                                        selectedProject.slug === project.slug
                                            ? 'border-sun/30 bg-sun/[0.08]'
                                            : 'border-transparent bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.05]'
                                    )}
                                >
                                    <span className={cn(
                                        'font-data text-[0.48rem] font-bold',
                                        selectedProject.slug === project.slug ? 'text-sun' : 'text-white/25'
                                    )}>
                                        {String(projects.indexOf(project) + 1).padStart(2, '0')}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs font-semibold text-white/80">
                                            {project.client}
                                        </span>
                                        <span className="mt-0.5 block truncate text-[0.58rem] text-white/35">
                                            {project.category}
                                        </span>
                                    </span>
                                    <ArrowRight
                                        className={cn(
                                            'h-3.5 w-3.5 transition group-hover:translate-x-0.5',
                                            selectedProject.slug === project.slug ? 'text-sun' : 'text-white/20'
                                        )}
                                        aria-hidden="true"
                                    />
                                </button>
                            ))
                        ) : (
                            <p className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs leading-5 text-white/40">
                                No project matches that search.
                            </p>
                        )}
                    </div>
                </aside>

                <section className="min-w-0 bg-[#020c18] p-3 sm:p-5" aria-live="polite">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1a30] shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
                        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/[0.045] p-2.5 sm:gap-3 sm:p-3">
                            <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
                                <span className="h-2.5 w-2.5 rounded-full bg-sun/45" />
                                <span className="h-2.5 w-2.5 rounded-full bg-sky/40" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/40" />
                            </div>
                            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-black/15 px-3 py-2">
                                <span className="h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                                <span className="truncate font-data text-[0.53rem] text-white/45">{domain}</span>
                            </div>
                            <div
                                role="group"
                                aria-label="Project preview device"
                                className="flex flex-none gap-1 rounded-lg border border-white/[0.07] bg-black/15 p-1"
                            >
                                <button
                                    type="button"
                                    title="Desktop preview"
                                    aria-label="Show desktop preview"
                                    aria-pressed={device === 'desktop'}
                                    onClick={() => setDevice('desktop')}
                                    className={cn(
                                        'grid h-9 w-9 place-items-center rounded-md transition',
                                        device === 'desktop'
                                            ? 'bg-sun text-primary'
                                            : 'text-white/40 hover:bg-white/[0.06] hover:text-white'
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
                                        'grid h-9 w-9 place-items-center rounded-md transition',
                                        device === 'mobile'
                                            ? 'bg-sun text-primary'
                                            : 'text-white/40 hover:bg-white/[0.06] hover:text-white'
                                    )}
                                >
                                    <Smartphone className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="relative bg-[#e9eef5] p-2 sm:p-4">
                            <ProjectPreviewSurface
                                project={selectedProject}
                                device={device}
                                mode={effectivePreviewMode}
                                preview={preview}
                                imageFailed={imageFailed}
                                onImageError={() => setFailedPreviewKey(previewKey)}
                                snapshotScrollRef={previewRef}
                                heightClass={device === 'desktop' ? 'h-[34rem]' : 'h-[32rem] sm:h-[34rem]'}
                            />
                        </div>
                    </div>
                </section>

                <aside className="border-t border-white/[0.08] bg-[#06172b] p-5 xl:border-l xl:border-t-0 xl:p-6">
                    <p className="font-data text-[0.52rem] font-bold uppercase tracking-[0.15em] text-sun">
                        {selectedProject.category}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[#8fc7f7]">
                        {selectedProject.location || selectedProject.region}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-white">
                        {selectedProject.client}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/50">{selectedProject.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {selectedProject.services.slice(0, 4).map((service) => (
                            <span
                                key={service}
                                className="rounded-full border border-white/10 px-2.5 py-1.5 text-[0.58rem] font-semibold text-white/55"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                    <div className="mt-7 space-y-2.5">
                        <Link
                            to={`/work/${selectedProject.slug}`}
                            className="button-primary w-full"
                        >
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

                    <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
                        <button
                            type="button"
                            onClick={() => moveProject(-1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/30 hover:text-sun"
                            aria-label="Previous project"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="font-data text-[0.5rem] text-white/35">
                            {String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                        <button
                            type="button"
                            onClick={() => moveProject(1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-sun/30 hover:text-sun"
                            aria-label="Next project"
                        >
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function getDomain(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return 'project preview';
    }
}
