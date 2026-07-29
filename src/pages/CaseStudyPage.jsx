import { useState } from 'react';
import { ArrowRight, Check, ExternalLink, Eye, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { ServiceCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { projects } from '../data/projects';
import { services } from '../data/siteContent';
import NotFoundPage from './NotFoundPage';

const serviceMapByCategory = {
    'Business SaaS': ['custom-systems', 'crm-jobber-alternatives', 'automation'],
    'Booking System': ['custom-systems', 'automation', 'websites'],
    'Commercial Real Estate Platform': ['websites', 'lead-generation', 'local-seo'],
};

export default function CaseStudyPage() {
    const { slug } = useParams();
    const project = projects.find((item) => item.slug === slug);
    const [previewOpen, setPreviewOpen] = useState(false);

    if (!project) return <NotFoundPage />;

    const defaultServiceIds = /Website/i.test(project.category)
        ? ['websites', 'local-seo', 'lead-generation']
        : ['custom-systems', 'automation', 'websites'];
    const relatedServices = (serviceMapByCategory[project.category] || defaultServiceIds)
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean);

    return (
        <main>
            <SEO
                title={`${project.client} Project`}
                description={`${project.summary} Explore the challenge, delivered scope, and safe project preview.`}
                url={`/work/${project.slug}`}
                schemas={[
                    {
                        '@type': 'CreativeWork',
                        '@id': `https://theprovidersystem.com/work/${project.slug}#project`,
                        name: `${project.client} project`,
                        description: project.summary,
                        creator: { '@id': 'https://theprovidersystem.com/#organization' },
                        url: `https://theprovidersystem.com/work/${project.slug}`,
                    },
                ]}
            />
            <PageHero
                eyebrow={project.category}
                title={project.client}
                description={project.summary}
                breadcrumbs={[{ label: 'Work', to: '/work' }, { label: project.client }]}
                actions={
                    <>
                        <button type="button" onClick={() => setPreviewOpen(true)} className="button-primary">
                            Inspect desktop & mobile
                            <Eye className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-ghost-dark"
                        >
                            Open live site
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </>
                }
                aside={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                        <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.16em] text-sun">
                            Project context
                        </p>
                        <dl className="mt-5 space-y-4 text-sm">
                            <div>
                                <dt className="text-white/65">Location / region</dt>
                                <dd className="mt-1 font-bold text-white/80">
                                    {project.location || project.region || 'Remote project'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-white/65">Evidence used</dt>
                                <dd className="mt-1 font-bold text-white/80">Public project experience and observable scope</dd>
                            </div>
                        </dl>
                    </div>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <p className="eyebrow mb-4">The challenge</p>
                        <h2 className="section-title text-primary">What the experience needed to organize.</h2>
                    </div>
                    <p className="text-xl leading-9 text-muted">{project.challenge}</p>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Delivered scope"
                        title="The pieces that can be observed."
                        description="This list stays with the public experience and documented project record. It does not infer a business result."
                    />
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {project.delivered.map((item) => (
                            <div key={item} className="flex items-start gap-3 rounded-3xl border border-primary/10 bg-white p-6 shadow-card">
                                <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                <span className="font-semibold leading-6 text-primary">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-primary text-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
                    <div>
                        <p className="eyebrow mb-4 text-sun">Safe project preview</p>
                        <h2 className="section-title">See the real website in context.</h2>
                        <p className="mt-5 leading-7 text-white/62">
                            Supported projects load inside a restricted frame so video, animation, and responsive
                            behavior remain visible. If a website blocks secure embedding, the preview automatically
                            uses its stored full-page project record.
                        </p>
                        <button type="button" onClick={() => setPreviewOpen(true)} className="button-primary mt-8">
                            Open project preview
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-8 sm:p-10">
                        <ShieldCheck className="h-8 w-8 text-sun" aria-hidden="true" />
                        <h3 className="mt-7 text-2xl font-bold">Evidence boundary</h3>
                        <p className="mt-4 leading-7 text-white/62">
                            This case study makes no claim about revenue, ranking, lead volume, conversion, or time saved.
                            Those outcomes require attributable data and client approval.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.services.map((service) => (
                                <span key={service} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/65">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Related capabilities"
                        title="Build a similar system from the operating need."
                    />
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA
                eyebrow="Start a related project"
                title="Bring the workflow, not a request to copy the screen."
                description="A similar engagement begins by understanding your customers, team, data, and constraints. The result should belong to your operation."
            />
            {previewOpen && (
                <ProjectPreviewModal project={project} onClose={() => setPreviewOpen(false)} />
            )}
        </main>
    );
}
