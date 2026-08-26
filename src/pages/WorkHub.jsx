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
                title="West Texas Website & Lead System Work"
                description="Explore websites, booking flows, CRM experiences, and custom systems built for West Texas service businesses and other operating teams."
                url="/work"
            />
            <PageHero
                eyebrow="Selected work"
                title="Real websites and systems built around real operations."
                description="See how West Texas service businesses and other operating teams have used clearer websites, lead paths, booking flows, and custom tools."
                breadcrumbs={[{ label: 'Work' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
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
                            Each record shows the business context, delivered scope, stored desktop and mobile
                            launch views, and a direct link to the current live site when available.
                        </p>
                    </div>
                }
            />

            <section id="project-grid" className="section-pad scroll-mt-32 bg-background">
                <div className="page-shell">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <SectionHeading
                            eyebrow="Project proof"
                            title={`${projects.length} projects across websites, lead paths, booking, and operations.`}
                            description="Filter the work, compare desktop and mobile launch views, or open the current live site in a new tab."
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
                        eyebrow="What each case study shows"
                        title="Business context, delivered work, and a live path to inspect."
                        description="The project record focuses on what was built and why. Performance claims only appear when approved, attributable evidence exists."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['Business context', 'The customer, territory, operating need, and reason the project existed.'],
                            ['Delivered scope', 'The pages, workflows, interfaces, integrations, and customer paths that were built.'],
                            ['Public experience', 'Stored desktop and mobile launch views plus direct links to current client sites.'],
                            ['Related fit', 'The services and starting point that apply to a similar West Texas operation.'],
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
