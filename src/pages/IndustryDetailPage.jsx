import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { ProjectCard, ServiceCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { getIndustry, services } from '../data/siteContent';
import { projects } from '../data/projects';
import NotFoundPage from './NotFoundPage';

const industrySeoNames = {
    plumbing: 'Plumbing Contractor',
    electrical: 'Electrical & Industrial',
    hvac: 'HVAC Contractor',
    roofing: 'Roofing Contractor',
    'oilfield-industrial': 'Oilfield & Industrial',
    'service-businesses': 'Service Business',
};

export default function IndustryDetailPage() {
    const { slug } = useParams();
    const industry = getIndustry(slug);
    const [previewProject, setPreviewProject] = useState(null);

    if (!industry) return <NotFoundPage />;

    const relevantServices = industry.relatedServices
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean);
    const relevantProjects = industry.relatedProjects
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);
    const industrySeoName = industrySeoNames[industry.slug] || industry.name;

    return (
        <main>
            <SEO
                title={`${industrySeoName} Websites & Lead Systems`}
                description={`Websites, lead capture, CRM, and follow-up for West Texas ${industry.name.toLowerCase()}, shaped around the customer and operating workflow.`}
                url={`/industries/${industry.slug}`}
            />
            <PageHero
                eyebrow="West Texas industry guide"
                title={industry.name}
                description={industry.summary}
                breadcrumbs={[{ label: 'Industries', to: '/industries' }, { label: industry.name }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {relevantProjects.length > 0 && (
                            <a href="#industry-work" className="button-ghost-dark">
                                See related work
                            </a>
                        )}
                    </>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <p className="eyebrow mb-4">Operating reality</p>
                        <h2 className="section-title text-primary">The workflow shapes the build.</h2>
                    </div>
                    <div>
                        <p className="text-xl leading-9 text-muted">{industry.operatingReality}</p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {industry.priorities.map((priority) => (
                                <div key={priority} className="flex items-start gap-3 rounded-2xl bg-background p-5">
                                    <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                    <span className="text-sm font-semibold leading-6 text-primary">{priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Relevant system layers"
                        title="Start with the layer creating the friction."
                        description="These are common starting points, not a required bundle."
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {relevantServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {relevantProjects.length > 0 && (
                <section id="industry-work" className="section-pad scroll-mt-32 bg-white">
                    <div className="page-shell">
                        <SectionHeading
                            eyebrow="Project proof"
                            title="Work connected to this operating model."
                            description="Project cards describe delivered scope only. Business performance is not inferred."
                        />
                        <div className="mt-12 grid gap-6 lg:grid-cols-3">
                            {relevantProjects.map((project) => (
                                <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SystemReviewCTA />
            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}
