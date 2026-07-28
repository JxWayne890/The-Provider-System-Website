import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ServiceCard } from '../components/ContentCards';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { serviceGroups, services } from '../data/siteContent';

const decisionPaths = [
    ['Customers cannot understand or find us', 'Websites, local SEO, and lead-generation architecture', '/services/websites'],
    ['Leads arrive but do not move', 'CRM, job operations, follow-up, and automation', '/services/crm-jobber-alternatives'],
    ['The team repeats the same customer answers', 'AI receptionist, chat, support, and knowledge systems', '/services/ai-receptionist'],
    ['The business has a proven workflow software cannot fit', 'Custom business systems and phased product design', '/services/custom-systems'],
];

export default function ServicesHub() {
    return (
        <main>
            <SEO
                title="Digital Systems Services for Texas Businesses"
                description="Explore websites, local SEO, CRM and Jobber alternatives, automation, lead generation, AI customer systems, content, and custom software."
                url="/services"
            />
            <PageHero
                eyebrow="Services"
                title="Build the part of the system the business needs next."
                description="The Provider System connects visibility, intake, job operations, customer support, and growth infrastructure. Each engagement is scoped around a real operating bottleneck—not a bundle of trendy tools."
                breadcrumbs={[{ label: 'Services' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Start a system review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link to="/work" className="button-ghost-dark">
                            See related work
                        </Link>
                    </>
                }
            />

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="A connected service map"
                        title="Four layers, organized around the work."
                        description="Start at the bottleneck. A website project does not have to become a CRM build, and an AI use case does not need to expand into a full platform."
                    />
                    <div className="mt-14 space-y-14">
                        {serviceGroups.map((group) => {
                            const groupServices = group.serviceSlugs
                                .map((slug) => services.find((service) => service.slug === slug))
                                .filter(Boolean);
                            return (
                                <section key={group.id} aria-labelledby={`service-group-${group.id}`}>
                                    <div className="grid gap-5 border-t border-primary/15 pt-7 md:grid-cols-[0.18fr_0.82fr]">
                                        <p className="font-data text-sm font-bold text-accent">{group.number}</p>
                                        <div>
                                            <h2 id={`service-group-${group.id}`} className="text-3xl font-bold tracking-[-0.035em] text-primary">
                                                {group.name}
                                            </h2>
                                            <p className="mt-3 max-w-2xl leading-7 text-muted">{group.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {groupServices.map((service) => (
                                            <ServiceCard key={service.slug} service={service} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
                    <SectionHeading
                        eyebrow="Choose by symptom"
                        title="You do not need to know the service name."
                        description="Describe what is breaking. The system review is designed to separate the real workflow problem from the first solution that comes to mind."
                    />
                    <div className="overflow-hidden rounded-3xl border border-primary/10">
                        {decisionPaths.map(([symptom, path, href]) => (
                            <Link
                                key={symptom}
                                to={href}
                                className="group grid gap-3 border-b border-primary/10 bg-background p-6 last:border-b-0 sm:grid-cols-[1fr_1fr_auto] sm:items-center"
                            >
                                <span className="flex items-start gap-3 font-bold text-primary">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-accent" aria-hidden="true" />
                                    {symptom}
                                </span>
                                <span className="text-sm leading-6 text-muted">{path}</span>
                                <ArrowRight className="h-5 w-5 text-primary/25 transition group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA
                eyebrow="Not sure where to begin?"
                title="Bring the messy version."
                description="Share the tools, handoffs, customer questions, and manual work as they exist today. The first task is to make the problem understandable."
            />
        </main>
    );
}
