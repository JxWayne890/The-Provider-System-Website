import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IndustryCard } from '../components/ContentCards';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { industries } from '../data/siteContent';

const fitSignals = [
    'Customers must understand, trust, and request a defined service',
    'Leads or job information cross several people or tools',
    'The team can explain where the current handoff breaks',
    'The owner wants a maintainable system, not a one-off demo',
];

export default function IndustriesHub() {
    return (
        <main>
            <SEO
                title="Digital Systems for Texas Service Industries"
                description="Websites and operating systems for plumbing, electrical, HVAC, roofing, oilfield, industrial, and other service businesses."
                url="/industries"
            />
            <PageHero
                eyebrow="Industries"
                title="Industry knowledge should change the system—not just the headline."
                description="Each industry has different intake, urgency, proof, scheduling, and handoff needs. These pages focus on those operating differences instead of substituting trade names into the same template."
                breadcrumbs={[{ label: 'Industries' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Map your workflow
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link to="/work" className="button-ghost-dark">
                            See project evidence
                        </Link>
                    </>
                }
            />

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Priority operating models"
                        title="Built around the customer and the work."
                        description="The public site focuses on industries where the customer journey and operating workflow can be described specifically."
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {industries.map((industry) => (
                            <IndustryCard key={industry.slug} industry={industry} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="Project fit"
                        title="A specific bottleneck matters more than the industry label."
                        description="The same trade can need a very different system depending on service mix, team, territory, and how customers enter the business."
                    />
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {fitSignals.map((signal) => (
                            <li key={signal} className="flex items-start gap-3 rounded-2xl bg-background p-5">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                <span className="text-sm font-semibold leading-6 text-primary">{signal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <SystemReviewCTA />
        </main>
    );
}
