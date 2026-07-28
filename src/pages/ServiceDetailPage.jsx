import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, CircleAlert, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import {
    AiCapabilityNotice,
    PlaybookCard,
    ProjectCard,
} from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { getService } from '../data/siteContent';
import { projects } from '../data/projects';
import { playbooks } from '../data/playbooks';
import NotFoundPage from './NotFoundPage';

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const service = getService(slug);
    const [previewProject, setPreviewProject] = useState(null);

    if (!service) return <NotFoundPage />;

    const relatedProjects = service.relatedProjects
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);
    const relatedPlaybooks = service.relatedPlaybooks
        .map((id) => playbooks.find((playbook) => playbook.slug === id))
        .filter(Boolean);
    const isAiService = service.slug.startsWith('ai-');

    const schemas = [
        {
            '@type': 'Service',
            '@id': `https://theprovidersystem.com/services/${service.slug}#service`,
            name: service.name,
            description: service.summary,
            url: `https://theprovidersystem.com/services/${service.slug}`,
            provider: { '@id': 'https://theprovidersystem.com/#organization' },
            areaServed: [
                { '@type': 'State', name: 'Texas' },
                { '@type': 'Country', name: 'United States' },
            ],
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://theprovidersystem.com/',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Services',
                    item: 'https://theprovidersystem.com/services',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: service.name,
                },
            ],
        },
    ];

    return (
        <main>
            <SEO
                title={`${service.shortName} for Service Businesses`}
                description={service.summary}
                url={`/services/${service.slug}`}
                schemas={schemas}
            />
            <PageHero
                eyebrow={service.kicker}
                title={service.name}
                description={service.promise}
                breadcrumbs={[{ label: 'Services', to: '/services' }, { label: service.shortName }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Talk through the workflow
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        {relatedProjects.length > 0 && (
                            <a href="#related-work" className="button-ghost-dark">
                                See related work
                            </a>
                        )}
                    </>
                }
                aside={isAiService ? <AiCapabilityNotice /> : undefined}
            />

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <p className="eyebrow mb-4">The operating problem</p>
                        <h2 className="section-title text-primary">Start with the work, not the tool.</h2>
                    </div>
                    <div>
                        <p className="text-xl leading-9 text-muted">{service.problem}</p>
                        <div className="mt-10 grid gap-3 sm:grid-cols-2">
                            {service.includes.map((item) => (
                                <div key={item} className="flex items-start gap-3 rounded-2xl bg-background p-4">
                                    <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                    <span className="text-sm font-semibold leading-6 text-primary">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-sand">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="What the engagement produces"
                        title="A system you can explain."
                        description="Deliverables are defined around decisions, operating rules, and working customer or team experiences—not a vague promise to transform the business."
                    />
                    <ol className="mt-12 grid gap-5 md:grid-cols-3">
                        {service.deliverables.map(([title, description], index) => (
                            <li key={title} className="rounded-3xl border border-primary/10 bg-background p-7">
                                <span className="font-data text-xs font-bold text-accent">0{index + 1}</span>
                                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-primary">{title}</h3>
                                <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section-pad bg-primary text-white">
                <div className="page-shell grid gap-12 lg:grid-cols-2">
                    <div>
                        <p className="eyebrow mb-4 text-sun">Good fit</p>
                        <h2 className="section-title">This may be the next layer when…</h2>
                        <ul className="mt-8 space-y-4">
                            {service.goodFit.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-white/72">
                                    <Check className="mt-1 h-5 w-5 flex-none text-sun" aria-hidden="true" />
                                    <span className="leading-7">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 sm:p-10">
                        <CircleAlert className="h-7 w-7 text-sun" aria-hidden="true" />
                        <h3 className="mt-7 text-2xl font-bold">What this page does not promise</h3>
                        <ul className="mt-6 space-y-4 text-sm leading-6 text-white/62">
                            <li className="flex items-start gap-3">
                                <Minus className="mt-1 h-4 w-4 flex-none text-sun" aria-hidden="true" />
                                Rankings, lead volume, revenue, savings, or perfect AI accuracy.
                            </li>
                            <li className="flex items-start gap-3">
                                <Minus className="mt-1 h-4 w-4 flex-none text-sun" aria-hidden="true" />
                                Integrations before current documentation, access, and platform limits are verified.
                            </li>
                            <li className="flex items-start gap-3">
                                <Minus className="mt-1 h-4 w-4 flex-none text-sun" aria-hidden="true" />
                                Ownership or support terms beyond what is written in the project agreement.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {relatedProjects.length > 0 && (
                <section id="related-work" className="section-pad scroll-mt-32 bg-background">
                    <div className="page-shell">
                        <SectionHeading
                            eyebrow="Related work"
                            title="See the delivered pieces in context."
                            description="These examples describe observable project scope. No unverified performance result is attached."
                        />
                        <div className="mt-12 grid gap-6 lg:grid-cols-3">
                            {relatedProjects.slice(0, 3).map((project) => (
                                <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
                    <SectionHeading
                        eyebrow="Questions to resolve"
                        title={`Before starting ${service.shortName.toLowerCase()}.`}
                        description="Scope becomes safer when the limits, data, owners, and next actions are discussed before implementation."
                    />
                    <FaqAccordion items={service.faqs} />
                </div>
            </section>

            {relatedPlaybooks.length > 0 && (
                <section className="section-pad bg-background">
                    <div className="page-shell">
                        <SectionHeading
                            eyebrow="Read before you buy"
                            title="Useful planning guides."
                        />
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            {relatedPlaybooks.map((playbook) => (
                                <PlaybookCard key={playbook.slug} playbook={playbook} />
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
