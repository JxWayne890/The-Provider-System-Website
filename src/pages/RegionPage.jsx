import { useState } from 'react';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { ProjectCard, ServiceCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { getRegion, services } from '../data/siteContent';
import { projects } from '../data/projects';
import NotFoundPage from './NotFoundPage';

const regionalServiceIds = ['websites', 'local-seo', 'lead-follow-up', 'crm-jobber-alternatives'];

export default function RegionPage() {
    const { slug } = useParams();
    const region = getRegion(slug);
    const [previewProject, setPreviewProject] = useState(null);

    if (!region) return <NotFoundPage />;

    const proofProjects = region.proofProjects
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);
    const regionalServices = regionalServiceIds
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean);

    return (
        <main>
            <SEO
                title={`Digital Systems for ${region.name}`}
                description={`Digital systems for service businesses in ${region.name}: websites, local SEO, CRM, follow-up, automation, and practical AI.`}
                url={`/texas/${region.slug}`}
            />
            <PageHero
                eyebrow="Texas regional hub"
                title={region.name}
                description={region.stance}
                breadcrumbs={[{ label: 'Texas', to: '/texas' }, { label: region.shortName }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Discuss a regional project
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {proofProjects.length > 0 && (
                            <a href="#regional-proof" className="button-ghost-dark">
                                See local proof
                            </a>
                        )}
                    </>
                }
                aside={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                        <MapPin className="h-6 w-6 text-sun" aria-hidden="true" />
                        <p className="mt-6 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-sun">
                            Coverage lens
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/65">{region.counties}</p>
                    </div>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="Regional operating context"
                        title="What makes this hub distinct."
                        description="A regional page should give an owner a useful reason to read it beyond seeing a familiar city name."
                    />
                    <div className="space-y-4">
                        {region.localContext.map((item) => (
                            <div key={item} className="flex items-start gap-4 rounded-2xl bg-background p-5">
                                <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                <p className="leading-7 text-muted">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {proofProjects.length > 0 && (
                <section id="regional-proof" className="section-pad scroll-mt-32 bg-background">
                    <div className="page-shell">
                        <SectionHeading
                            eyebrow="Project evidence"
                            title={`Work connected to ${region.shortName}.`}
                            description="These projects provide the local substance behind this hub. The descriptions are limited to observable scope."
                        />
                        <div className="mt-12 grid gap-6 lg:grid-cols-3">
                            {proofProjects.map((project) => (
                                <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section-pad bg-primary text-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <p className="eyebrow mb-4 text-sun">Page-quality gate</p>
                        <h2 className="section-title">What we would examine before adding another local page.</h2>
                        <p className="mt-5 leading-7 text-white/62">
                            New geography should follow evidence and customer usefulness. It should not be a default publishing tactic.
                        </p>
                    </div>
                    <ol className="grid gap-4 sm:grid-cols-2">
                        {region.firstChecks.map((item, index) => (
                            <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                                <span className="font-data text-xs font-bold text-sun">0{index + 1}</span>
                                <p className="mt-4 text-sm leading-6 text-white/72">{item}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Common starting points"
                        title="Build the layer the regional customer path needs."
                    />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {regionalServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
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
