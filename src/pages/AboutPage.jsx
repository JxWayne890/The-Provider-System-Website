import { ArrowRight, Compass, FileCheck2, Handshake, MapPin, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';

const principles = [
    {
        icon: Compass,
        title: 'Start with the operating truth',
        copy: 'Map the actual customer path, tools, roles, and exceptions before choosing a platform or screen.',
    },
    {
        icon: Handshake,
        title: 'Keep the work direct',
        copy: 'The founder remains close to discovery, system design, and the decisions that shape implementation.',
    },
    {
        icon: FileCheck2,
        title: 'Make ownership explicit',
        copy: 'Accounts, access, delivered assets, third-party services, handoff, and support are defined in the project agreement.',
    },
    {
        icon: Wrench,
        title: 'Build for practical adoption',
        copy: 'A smaller system the team can operate is more useful than a broad build that never becomes part of the work.',
    },
];

export default function AboutPage() {
    return (
        <main>
            <SEO
                title="About The Provider System"
                description="Meet John W Johnson, founder of The Provider System, a West Texas website and lead-systems partner for service businesses."
                url="/about"
                schemas={[
                    {
                        '@type': 'AboutPage',
                        '@id': 'https://theprovidersystem.com/about#page',
                        name: 'About The Provider System',
                        mainEntity: { '@id': 'https://theprovidersystem.com/#organization' },
                    },
                ]}
            />
            <PageHero
                eyebrow="About"
                title="West Texas websites and lead systems, built with the owner in the room."
                description="John W Johnson founded The Provider System to connect the website customers see with the lead routing, follow-up, and operating tools the team uses next."
                breadcrumbs={[{ label: 'About' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link to="/process" className="button-ghost-dark">
                            See the process
                        </Link>
                    </>
                }
            />

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
                    <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-sand p-8 sm:p-10">
                        <div className="absolute -bottom-20 -right-10 font-drama text-[24rem] leading-none text-primary/[0.045]" aria-hidden="true">
                            J
                        </div>
                        <div className="relative flex h-full flex-col justify-between">
                            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary font-drama text-4xl text-sun">
                                JW
                            </div>
                            <div className="mt-40">
                                <p className="text-3xl font-bold tracking-[-0.035em] text-primary">John W Johnson</p>
                                <p className="mt-2 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                                    Founder & principal architect
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="eyebrow mb-4">The founder</p>
                        <h2 className="section-title text-primary">One person accountable for the system story.</h2>
                        <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
                            <p>
                                John works across the customer-facing and operational layers of a business:
                                websites, booking and intake, CRM and pipeline views, automation, dashboards,
                                and selected custom applications.
                            </p>
                            <p>
                                The agency is intentionally direct. Discovery is not handed to a salesperson
                                who disappears before implementation. The person helping define the system stays
                                close to the build, the tradeoffs, and the handoff.
                            </p>
                            <p>
                                That does not mean every project should become custom software. A central part of
                                the work is deciding when an existing product, a better configuration, or a smaller
                                process change is the more responsible answer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Operating principles"
                        title="Clear enough to understand. Durable enough to operate."
                        description="These principles shape the scope and the working relationship; they are not blanket promises that override a project agreement."
                    />
                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {principles.map((principle) => (
                            <article key={principle.title} className="rounded-3xl border border-primary/10 bg-white p-7 shadow-card">
                                <principle.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                                <h3 className="mt-8 text-xl font-bold tracking-[-0.025em] text-primary">{principle.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-muted">{principle.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-primary text-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                        <MapPin className="h-8 w-8 text-sun" aria-hidden="true" />
                        <p className="eyebrow mb-4 mt-8 text-sun">West Texas focus</p>
                        <h2 className="section-title">Built around the markets the work already serves.</h2>
                    </div>
                    <div className="space-y-5 text-lg leading-8 text-white/65">
                        <p>
                            West Texas is the primary market because the project record already spans San Angelo,
                            Abilene, Anson, the Big Country, the Permian Basin, and broader regional service areas.
                        </p>
                        <p>
                            The Provider System does not claim an office, address, or staffed location where one has
                            not been established publicly. Regional pages connect visible work and useful context;
                            they do not use a city name as a substitute for experience.
                        </p>
                        <p>
                            Remote engagements remain available nationwide when the problem and working model are a fit.
                        </p>
                        <Link to="/texas" className="button-primary mt-3">
                            Explore West Texas markets
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="What working together should clarify"
                        title="No hidden operating model."
                        description="Before implementation, the project should make the important commercial and technical boundaries visible."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['Scope', 'What is included, what is excluded, and which assumptions still need validation.'],
                            ['Accounts & access', 'Who owns the domain, hosting, provider accounts, data, and credentials used by the system.'],
                            ['Third parties', 'Which licenses, APIs, platform plans, or provider policies remain outside the custom build.'],
                            ['Handoff & support', 'What is documented, what transfers, what support is included, and what happens when the engagement changes.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-3xl bg-background p-6">
                                <h3 className="text-xl font-bold text-primary">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA />
        </main>
    );
}
