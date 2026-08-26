import { ArrowRight, Check, ClipboardCheck, PhoneCall, Search, Waypoints } from 'lucide-react';
import SEO from '../components/SEO';
import ContactFormSection from '../components/ContactFormSection';
import { PageHero, SectionHeading } from '../components/PageElements';

const nextSteps = [
    {
        icon: Search,
        title: 'John reviews your request',
        copy: 'The business, service area, project goal, and current problem are reviewed before a recommendation is made.',
    },
    {
        icon: Waypoints,
        title: 'You get a direct reply',
        copy: 'The follow-up focuses on the missing context and whether The Provider System is a practical fit.',
    },
    {
        icon: ClipboardCheck,
        title: 'The next step stays specific',
        copy: 'That may be a website review, discovery, a scoped build, or a recommendation to keep an existing tool.',
    },
];

export default function StartPage() {
    return (
        <main>
            <SEO
                title="Request a West Texas Website or Lead-System Review"
                description="Tell The Provider System about your West Texas service business, website, local visibility, lead follow-up, CRM, or automation project."
                url="/start"
            />
            <PageHero
                eyebrow="Request a project review"
                title="Tell us what needs to work better."
                description="Share your business, West Texas service area, and the website or lead problem you want to solve. You do not need a finished brief or technical vocabulary."
                breadcrumbs={[{ label: 'Request a project review' }]}
                actions={
                    <>
                        <a href="#contact" className="button-primary">
                            Start the short form
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <a href="tel:+13252495191" className="button-ghost-dark">
                            <PhoneCall className="h-4 w-4" aria-hidden="true" />
                            Call (325) 249-5191
                        </a>
                    </>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="What happens next"
                        title="A direct review before a recommendation."
                        description="Submitting the form starts a project-fit conversation. It is not an agreement to buy a service."
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
                        title="A few details make the reply more useful."
                        description="Do not send passwords, customer records, payment information, or other sensitive material through the inquiry form."
                    />
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {[
                            'Business type, priority service, and actual service area',
                            'How calls, forms, referrals, or bookings arrive now',
                            'The clearest website or lead problem to solve first',
                            'Any real deadline or platform constraint',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3 rounded-2xl bg-background p-5">
                                <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                <span className="text-sm font-semibold leading-6 text-primary">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <ContactFormSection
                theme="dark"
                heading="Request a practical project review."
                subheading="Tell John what your business does, where it serves, and what should work better. Use the form, call, or email—whichever is easiest."
            />
        </main>
    );
}
