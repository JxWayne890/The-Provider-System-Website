import { Check, ClipboardCheck, Search, Waypoints } from 'lucide-react';
import SEO from '../components/SEO';
import ContactFormSection from '../components/ContactFormSection';
import { PageHero, SectionHeading } from '../components/PageElements';

const nextSteps = [
    {
        icon: Search,
        title: 'John reviews the context',
        copy: 'The inquiry is read before a service or technical direction is recommended.',
    },
    {
        icon: Waypoints,
        title: 'The bottleneck is clarified',
        copy: 'The first conversation focuses on the current customer path, team handoffs, tools, and constraints.',
    },
    {
        icon: ClipboardCheck,
        title: 'A practical next step is defined',
        copy: 'That may be discovery, an audit, a scoped build, or a recommendation to keep or configure an existing tool.',
    },
];

export default function StartPage() {
    return (
        <main>
            <SEO
                title="Start a System Review"
                description="Share your website, lead, CRM, automation, AI, or custom-system bottleneck with The Provider System."
                url="/start"
            />
            <PageHero
                eyebrow="Start a system review"
                title="Bring the current workflow—even if it is messy."
                description="You do not need a finished brief or the right technical vocabulary. Explain the business, where customers enter, what the team does next, and where the process is breaking."
                breadcrumbs={[{ label: 'Start a system review' }]}
            />

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="What happens next"
                        title="A review before a recommendation."
                        description="Submitting the form is a request to discuss the project, not an agreement to buy a service or a promise of a free deliverable."
                    />
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {nextSteps.map((step) => (
                            <article key={step.title} className="rounded-3xl border border-primary/10 bg-background p-7">
                                <step.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                                <h2 className="mt-8 text-xl font-bold tracking-[-0.025em] text-primary">{step.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-muted">{step.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-sand px-5 py-16 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="Helpful context"
                        title="What to include if you know it."
                        description="Do not send passwords, customer records, payment information, or other sensitive material through the inquiry form."
                    />
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {[
                            'Business type, priority service, and actual service area',
                            'How calls, forms, referrals, or bookings arrive today',
                            'The tools and spreadsheets involved',
                            'The handoff that most often gets delayed or lost',
                            'Who needs to use or own the future system',
                            'Any deadline, access, contract, or platform constraint',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3 rounded-2xl bg-background p-5">
                                <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                <span className="text-sm font-semibold leading-6 text-primary">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <ContactFormSection theme="dark" />
        </main>
    );
}
