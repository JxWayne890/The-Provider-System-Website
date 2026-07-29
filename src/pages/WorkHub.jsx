import { useMemo, useState } from 'react';
import { ArrowRight, Filter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ProjectCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { projects } from '../data/projects';
import { cn } from '../lib/cn';

const filters = [
    { id: 'all', label: 'All work' },
    { id: 'texas', label: 'Texas work' },
    { id: 'websites', label: 'Websites' },
    { id: 'operations', label: 'Apps & operations' },
];

const texasPattern = /Texas|Abilene|San Angelo|Big Country|Permian|Midland|Odessa|Lubbock|Anson/i;

export default function WorkHub() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [previewProject, setPreviewProject] = useState(null);

    const visibleProjects = useMemo(() => {
        if (activeFilter === 'texas') {
            return projects.filter((project) =>
                texasPattern.test(`${project.location || ''} ${project.region || ''}`)
            );
        }
        if (activeFilter === 'websites') {
            return projects.filter(
                (project) =>
                    !/SaaS/i.test(project.category) &&
                    project.category !== 'Booking System' &&
                    project.category !== 'Commercial Real Estate Platform'
            );
        }
        if (activeFilter === 'operations') {
            return projects.filter((project) =>
                /SaaS|Booking|Platform/i.test(project.category)
            );
        }
        return projects;
    }, [activeFilter]);

    return (
        <main>
            <SEO
                title="Project Lab | Websites & Business Systems"
                description="Explore real websites, booking systems, CRM experiences, and custom applications built by The Provider System, with safe desktop and mobile previews."
                url="/work"
            />
            <PageHero
                eyebrow="Project lab"
                title="Inspect the work without relying on invented results."
                description="Every project story explains the business context and delivered pieces. Supported projects open as interactive websites with desktop and mobile views."
                breadcrumbs={[{ label: 'Work' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Build something useful
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a href="#project-grid" className="button-ghost-dark">
                            Browse projects
                        </a>
                    </>
                }
                aside={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                        <ShieldCheck className="h-7 w-7 text-sun" aria-hidden="true" />
                        <p className="mt-6 text-sm leading-6 text-white/65">
                            Interactive previews restrict forms, popups, downloads, and top-level navigation. If a
                            website blocks secure embedding, its full-page project record appears automatically.
                        </p>
                    </div>
                }
            />

            <section id="project-grid" className="section-pad scroll-mt-32 bg-background">
                <div className="page-shell">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <SectionHeading
                            eyebrow="Observable scope"
                            title={`${projects.length} project records, organized for evaluation.`}
                            description="Filter by the kind of evidence you need, then inspect the website in a secure interactive preview."
                        />
                        <div className="flex flex-wrap gap-2" aria-label="Filter projects">
                            <span className="mr-1 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-muted">
                                <Filter className="h-4 w-4" aria-hidden="true" />
                                Filter
                            </span>
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.id)}
                                    aria-pressed={activeFilter === filter.id}
                                    className={cn(
                                        'min-h-11 rounded-full border px-4 text-sm font-bold transition',
                                        activeFilter === filter.id
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-primary/10 bg-white text-muted hover:border-primary/30 hover:text-primary'
                                    )}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {visibleProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <SectionHeading
                        eyebrow="How to read a case study"
                        title="Scope is proof. Metrics require more."
                        description="The archive deliberately separates directly observable deliverables from outcomes that would need client approval and attributable measurement."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['Published now', 'Business context, project type, visible features, public pages, regional context, and live links.'],
                            ['Requires approval', 'Client testimonials, private workflow details, screenshots containing customer data, or non-public operating information.'],
                            ['Requires measurement', 'Rankings, qualified leads, revenue, conversion rates, time savings, or attribution across channels.'],
                            ['Always available', 'A clear explanation of what was designed, what was built, and how a similar engagement would be scoped.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-3xl bg-background p-6">
                                <h3 className="text-lg font-bold text-primary">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA />
            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}
