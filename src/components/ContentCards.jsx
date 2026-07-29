import {
    ArrowRight,
    Bot,
    BriefcaseBusiness,
    Building2,
    ExternalLink,
    MapPin,
    MessageSquareMore,
    Route,
    Search,
    Sparkles,
    Workflow,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { warmProjectPreview } from '../lib/projectPreview';

const groupIcons = {
    visibility: Search,
    operations: Workflow,
    'customer-experience': MessageSquareMore,
    growth: Sparkles,
};

export function ServiceCard({ service, compact = false }) {
    const Icon = groupIcons[service.group] || Route;

    return (
        <Link
            to={`/services/${service.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-primary/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift sm:p-7"
        >
            <div className="mb-6 flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-background text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowRight
                    className="h-5 w-5 text-primary/25 transition group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                />
            </div>
            <h3 className="font-heading text-xl font-bold tracking-[-0.025em] text-primary">
                {service.shortName}
            </h3>
            {!compact && <p className="mt-3 flex-1 text-sm leading-6 text-muted">{service.summary}</p>}
            <span className="mt-5 font-data text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">
                View service
            </span>
        </Link>
    );
}

export function IndustryCard({ industry }) {
    return (
        <Link
            to={`/industries/${industry.slug}`}
            className="group rounded-3xl border border-primary/10 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
        >
            <div className="mb-8 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-teal">
                    <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowRight
                    className="h-5 w-5 text-primary/25 transition group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                />
            </div>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-primary">{industry.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{industry.summary}</p>
        </Link>
    );
}

export function RegionCard({ region }) {
    return (
        <Link
            to={`/texas/${region.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-7 text-white transition duration-300 hover:-translate-y-1 hover:border-sun/40 hover:bg-white/[0.08]"
        >
            <div className="mb-8 flex items-start justify-between">
                <MapPin className="h-6 w-6 text-sun" aria-hidden="true" />
                <ArrowRight
                    className="h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-sun"
                    aria-hidden="true"
                />
            </div>
            <h3 className="text-xl font-bold tracking-[-0.02em]">{region.name}</h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{region.counties}</p>
        </Link>
    );
}

export function ProjectCard({ project, onPreview }) {
    return (
        <article
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card"
            onPointerEnter={() => warmProjectPreview(project)}
            onFocus={() => warmProjectPreview(project)}
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-primary">
                <ProjectImage project={project} />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <span className="rounded-full bg-primary/90 px-3 py-1.5 font-data text-[0.58rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                        {project.category}
                    </span>
                    {project.location && (
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold text-primary backdrop-blur">
                            {project.location}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-2xl font-bold tracking-[-0.03em] text-primary">{project.client}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((service) => (
                        <span
                            key={service}
                            className="rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-semibold text-primary/70"
                        >
                            {service}
                        </span>
                    ))}
                </div>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Link to={`/work/${project.slug}`} className="button-primary flex-1">
                        Read case study
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => onPreview(project)}
                        className="button-secondary flex-1"
                    >
                        Preview project
                    </button>
                </div>
            </div>
        </article>
    );
}

export function ProjectImage({ project, className = '' }) {
    const [failed, setFailed] = useState(false);
    const preview = project.preview?.desktop;

    if (!preview?.src || failed) {
        return (
            <div
                className={`flex h-full w-full flex-col items-center justify-center bg-primary p-6 text-center ${className}`}
            >
                <Building2 className="h-10 w-10 text-white/25" aria-hidden="true" />
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                    {project.fallback || `${project.client} preview unavailable`}
                </p>
            </div>
        );
    }

    return (
        <img
            src={preview.src}
            alt={preview.alt || `${project.client} website preview`}
            loading="lazy"
            className={`h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02] ${className}`}
            onError={() => setFailed(true)}
        />
    );
}

export function PlaybookCard({ playbook }) {
    return (
        <Link
            to={`/playbooks/${playbook.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-primary/10 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
        >
            <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-sky px-3 py-1.5 font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-teal">
                    {playbook.category}
                </span>
                <span className="text-xs font-semibold text-muted">{playbook.readTime}</span>
            </div>
            <h3 className="mt-7 text-xl font-bold leading-snug tracking-[-0.025em] text-primary group-hover:text-accent">
                {playbook.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {playbook.description || playbook.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent">
                Read playbook
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
        </Link>
    );
}

export function ExternalProjectLink({ project }) {
    return (
        <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
        >
            Open live site
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
    );
}

export function AiCapabilityNotice() {
    return (
        <div className="rounded-3xl border border-teal/20 bg-sky p-6 text-primary">
            <div className="mb-3 flex items-center gap-3">
                <Bot className="h-5 w-5 text-teal" aria-hidden="true" />
                <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.16em] text-teal">
                    Capability, not a performance claim
                </p>
            </div>
            <p className="text-sm leading-6 text-primary/70">
                This service is presented through its design approach, limits, and fit criteria. No client
                outcome or accuracy claim is made without reviewable evidence.
            </p>
        </div>
    );
}
