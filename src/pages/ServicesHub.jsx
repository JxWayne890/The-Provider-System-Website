import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ServiceCard } from '../components/ContentCards';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { serviceGroups, services } from '../data/siteContent';

const decisionPaths = [
    ['Customers cannot understand or find us', 'Website design, local visibility, and useful lead capture', '/services/websites'],
    ['Leads arrive but do not move', 'CRM, lead ownership, estimate status, and follow-up', '/services/crm-jobber-alternatives'],
    ['The same handoff is repeated every day', 'Automation, integrations, and carefully bounded AI', '/services/automation'],
    ['Available software cannot fit a proven workflow', 'A phased custom tool with an explicit ownership plan', '/services/custom-systems'],
];

export default function ServicesHub() {
    const primaryGroups = serviceGroups.filter((group) => group.tier === 'primary');
    const secondaryGroups = serviceGroups.filter((group) => group.tier === 'secondary');

    return (
        <main>
            <SEO
                title="West Texas Web Design, CRM & Lead Systems"
                description="Website design, local visibility, lead capture, CRM, and follow-up for West Texas service businesses, with automation, practical AI, and custom tools when needed."
                url="/services"
            />
            <PageHero
                eyebrow="West Texas service-business systems"
                title="Start with the website or lead handoff that is costing the business clarity."
                description="The front-door offer is website design and local visibility, followed by lead capture, CRM, and follow-up. Automation, practical AI, and custom tools stay secondary until the operating need is clear."
                breadcrumbs={[{ label: 'Services' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
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
                        eyebrow="Primary service paths"
                        title="Get found and make the lead easier to handle."
                        description="These are the clearest starting points for a West Texas service business. Either path can stand alone, or they can be connected when the customer handoff requires both."
                    />
                    <div className="mt-14 space-y-14">
                        {primaryGroups.map((group) => {
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

            <section className="section-pad bg-primary text-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Secondary capabilities"
                        title="Add automation, AI, or custom software only when it earns its complexity."
                        description="These services support a defined customer or operating workflow. They are not required add-ons to a website or CRM engagement."
                        dark
                    />
                    <div className="mt-14 space-y-14">
                        {secondaryGroups.map((group) => {
                            const groupServices = group.serviceSlugs
                                .map((slug) => services.find((service) => service.slug === slug))
                                .filter(Boolean);
                            return (
                                <section key={group.id} aria-labelledby={`secondary-service-group-${group.id}`}>
                                    <div className="grid gap-5 border-t border-white/15 pt-7 md:grid-cols-[0.18fr_0.82fr]">
                                        <p className="font-data text-sm font-bold text-sun">{group.number}</p>
                                        <div>
                                            <h2 id={`secondary-service-group-${group.id}`} className="text-3xl font-bold tracking-[-0.035em] text-white">
                                                {group.name}
                                            </h2>
                                            <p className="mt-3 max-w-2xl leading-7 text-white/62">{group.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                eyebrow="Not sure which layer comes first?"
                title="Bring the website, lead flow, and tools as they work today."
                description="The first task is to identify the earliest broken handoff and define a useful first release—not to sell every capability on this page."
            />
        </main>
    );
}
