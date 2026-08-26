import { useState } from 'react';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { ProjectCard, ServiceCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading } from '../components/PageElements';
import { getRegion, services } from '../data/siteContent';
import { projects } from '../data/projects';
import NotFoundPage from './NotFoundPage';

export default function RegionPage() {
    const { slug } = useParams();
    const region = getRegion(slug);
    const [previewProject, setPreviewProject] = useState(null);

    if (!region) return <NotFoundPage />;

    const proofProjects = region.proofProjects
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);
    const regionalServices = region.serviceSlugs
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean);
    const schemas = [
        {
            '@type': 'Service',
            '@id': `https://theprovidersystem.com/texas/${region.slug}#service`,
            name: region.seoTitle,
            description: region.seoDescription,
            url: `https://theprovidersystem.com/texas/${region.slug}`,
            provider: { '@id': 'https://theprovidersystem.com/#organization' },
            areaServed: { '@type': 'AdministrativeArea', name: region.name },
        },
    ];

    return (
        <main>
            <SEO
                title={region.seoTitle}
                description={region.seoDescription}
                url={`/texas/${region.slug}`}
                schemas={schemas}
            />
            <PageHero
                eyebrow={`${region.shortName} · West Texas market`}
                title={region.heroTitle}
                description={region.stance}
                breadcrumbs={[{ label: 'West Texas', to: '/texas' }, { label: region.shortName }]}
                actions={
                    <Link to="/start" className="button-primary">
                        Request a website and lead-flow review
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                }
                aside={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                        <MapPin className="h-6 w-6 text-sun" aria-hidden="true" />
                        <p className="mt-6 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-sun">
                            Founder-led delivery
                        </p>
                        <p className="mt-3 text-sm font-semibold leading-6 text-white/80">{region.counties}</p>
                        <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-5 text-white/60">
                            {region.deliveryModel}
                        </p>
                    </div>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow={`Services for ${region.shortName}`}
                        title="Start with the first customer or team handoff that needs work."
                        description="A website, local-visibility project, lead workflow, or custom tool can stand alone. Additional layers are included only when they support the same operating need."
                    />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {regionalServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="Market and lead context"
                        title={`Build around how ${region.shortName} customers find, choose, and contact the business.`}
                        description="The regional value is in the services, proof, intake, and follow-through—not in repeating a city name across otherwise identical pages."
                    />
                    <div className="space-y-4">
                        {region.localContext.map((item) => (
                            <div key={item} className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5">
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
                            description="These project records show the business context and delivered scope connected to this market."
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
                        <p className="eyebrow mb-4 text-sun">Project fit</p>
                        <h2 className="section-title">{region.fitTitle}</h2>
                        <p className="mt-5 leading-7 text-white/62">{region.fitIntro}</p>
                    </div>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {region.fitSignals.map((item) => (
                            <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                                <Check className="mt-0.5 h-5 w-5 flex-none text-sun" aria-hidden="true" />
                                <p className="text-sm leading-6 text-white/72">{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
                    <SectionHeading
                        eyebrow={`${region.shortName} project questions`}
                        title="Know the delivery model and limits before the build."
                        description="The first conversation should make scope, access, ownership, proof, and the next useful release clear."
                    />
                    <FaqAccordion items={region.faqs} />
                </div>
            </section>

            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}
