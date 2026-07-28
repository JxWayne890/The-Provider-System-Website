import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowUpRight,
    Bot,
    CircleDot,
    MapPin,
    MessageSquareWarning,
    SearchX,
    Workflow,
} from 'lucide-react';
import SEO from '../components/SEO';
import {
    IndustryCard,
    PlaybookCard,
    ProjectCard,
    ServiceCard,
} from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { RegionCard } from '../components/ContentCards';
import { SectionHeading, SystemReviewCTA } from '../components/PageElements';
import SpatialCommandDeck from '../components/SpatialCommandDeck';
import { industries, regions, serviceGroups, services } from '../data/siteContent';
import { projects } from '../data/projects';
import { playbooks } from '../data/playbooks';

const breakpoints = [
    {
        icon: SearchX,
        title: 'Hard to find or trust',
        description: 'The site does not explain the service, coverage, proof, or next step clearly enough.',
        href: '/services/websites',
        label: 'Website & local visibility',
    },
    {
        icon: MessageSquareWarning,
        title: 'Leads go quiet',
        description: 'Calls, forms, referrals, and estimates arrive—but responsibility and follow-up are inconsistent.',
        href: '/services/lead-follow-up',
        label: 'Lead follow-up',
    },
    {
        icon: Workflow,
        title: 'Work is scattered',
        description: 'Customer, job, quote, and task details live across inboxes, spreadsheets, texts, and memory.',
        href: '/services/crm-jobber-alternatives',
        label: 'CRM & job operations',
    },
    {
        icon: Bot,
        title: 'Customers wait',
        description: 'Routine questions and intake consume the team, while urgent or unusual requests need better routing.',
        href: '/services/ai-customer-support',
        label: 'AI customer experience',
    },
];

const featuredProjectIds = ['total-quality-plumbing', 'weathersbee-electric', 'flowos'];

const processSteps = [
    ['01', 'Assess', 'Map the website, lead flow, tools, handoffs, and evidence before deciding what to build.'],
    ['02', 'Design', 'Define the customer path, operating rules, data, ownership, and smallest useful release.'],
    ['03', 'Build', 'Implement in visible stages, test representative scenarios, and keep exceptions explicit.'],
    ['04', 'Launch & learn', 'Document the system, hand it over clearly, and improve it from real use when support is included.'],
];

export default function Home() {
    const [previewProject, setPreviewProject] = useState(null);
    const featuredProjects = featuredProjectIds
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);

    const schemas = [
        {
            '@type': 'Organization',
            '@id': 'https://theprovidersystem.com/#organization',
            name: 'The Provider System',
            url: 'https://theprovidersystem.com',
            founder: { '@type': 'Person', name: 'John W Johnson' },
            email: 'theprovidersystem@gmail.com',
            description:
                'A Texas-focused digital systems agency for service businesses, providing websites, CRM and job operations, automation, practical AI, and custom systems.',
            areaServed: [
                { '@type': 'State', name: 'Texas' },
                { '@type': 'Country', name: 'United States' },
            ],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://theprovidersystem.com/#website',
            url: 'https://theprovidersystem.com',
            name: 'The Provider System',
            publisher: { '@id': 'https://theprovidersystem.com/#organization' },
        },
    ];

    return (
        <main>
            <SEO
                title="Texas Digital Systems for Service Businesses"
                description="Websites, CRM and job operations, automation, practical AI, and custom systems for Texas service businesses. Remote engagements available nationwide."
                url="/"
                schemas={schemas}
            />

            <section className="relative overflow-hidden bg-dark pb-20 pt-44 text-white md:pb-28 md:pt-52 lg:min-h-[55rem]">
                <div className="spatial-hero-field absolute inset-0" aria-hidden="true" />
                <div className="absolute -left-48 top-40 h-[34rem] w-[34rem] rounded-full bg-[#0d4f8e]/20 blur-[120px]" aria-hidden="true" />
                <div className="absolute -right-32 top-28 h-[30rem] w-[30rem] rounded-full bg-sun/[0.08] blur-[120px]" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#020d1d] to-transparent" aria-hidden="true" />

                <div className="page-shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:gap-12">
                    <div className="relative z-10">
                        <div className="eyebrow mb-6 text-sun">
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            Texas digital systems agency
                        </div>
                        <h1 className="display-title max-w-5xl">
                            Make every lead, customer, and handoff easier to handle.
                        </h1>
                        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
                            The Provider System designs the website customers see and the operating
                            system behind it—CRM, follow-up, automation, practical AI, and custom tools
                            built around how a service business actually works.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link to="/start" className="button-primary">
                                Start a system review
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link to="/work" className="button-ghost-dark">
                                See the work
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/60">
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                Texas first
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                Founder-led
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                Remote nationwide
                            </span>
                        </div>
                    </div>

                    <SpatialCommandDeck />
                </div>
            </section>

            <section aria-label="Texas project markets" className="border-b border-primary/10 bg-white">
                <div className="page-shell flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
                    <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                        Selected work across Texas
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-primary/70">
                        <span>Abilene & the Big Country</span>
                        <span>San Angelo</span>
                        <span>Permian Basin</span>
                        <span>West Texas service markets</span>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Start with the break"
                        title="The software is rarely the first problem."
                        description="A useful system starts by making the customer path and the team handoffs visible. These are the four places we most often begin."
                    />
                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {breakpoints.map((item) => (
                            <Link
                                key={item.title}
                                to={item.href}
                                className="group rounded-3xl border border-primary/10 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
                            >
                                <item.icon className="h-7 w-7 text-accent" aria-hidden="true" />
                                <h2 className="mt-8 text-xl font-bold tracking-[-0.025em] text-primary">{item.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent">
                                    {item.label}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <SectionHeading
                            eyebrow="One connected system"
                            title="Four layers. One operating story."
                            description="Each layer can stand alone. The value comes from making sure the customer-facing experience and the back-office process agree."
                        />
                        <Link to="/services" className="button-secondary w-fit">
                            Explore all services
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="mt-14 space-y-8">
                        {serviceGroups.map((group) => {
                            const groupServices = group.serviceSlugs
                                .map((slug) => services.find((service) => service.slug === slug))
                                .filter(Boolean);
                            return (
                                <div key={group.id} className="grid gap-6 border-t border-primary/10 pt-8 lg:grid-cols-[0.38fr_1fr]">
                                    <div>
                                        <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                                            {group.number}
                                        </p>
                                        <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-primary">
                                            {group.name}
                                        </h3>
                                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{group.description}</p>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        {groupServices.map((service) => (
                                            <ServiceCard key={service.slug} service={service} compact />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <SectionHeading
                            eyebrow="Evidence before claims"
                            title="Real projects. Observable work."
                            description="The portfolio explains the business context and what was delivered. It does not invent rankings, revenue, or lead results."
                        />
                        <Link to="/work" className="button-secondary w-fit">
                            View project lab
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad relative overflow-hidden bg-primary text-white">
                <div className="grid-field absolute inset-0 opacity-60" aria-hidden="true" />
                <div className="page-shell relative">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="eyebrow mb-4 text-sun">Texas proof, not Texas wallpaper</p>
                            <h2 className="section-title">Local relevance has to be earned.</h2>
                            <p className="mt-5 text-lg leading-8 text-white/60">
                                We use statewide positioning to connect a real body of Texas work. Regional pages
                                exist where project evidence or useful operating context makes them meaningfully different.
                                No invented offices. No copy-swapped city pages.
                            </p>
                            <Link to="/texas" className="button-primary mt-8">
                                Explore Texas coverage
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {regions.map((region) => (
                                <RegionCard key={region.slug} region={region} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                        <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] bg-sand p-8 sm:p-10">
                            <div className="absolute -bottom-16 -right-10 font-drama text-[20rem] leading-none text-primary/[0.045]" aria-hidden="true">
                                J
                            </div>
                            <div className="relative flex h-full flex-col justify-between">
                                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary font-drama text-3xl text-sun">
                                    JW
                                </div>
                                <div className="mt-24">
                                    <p className="text-2xl font-bold tracking-[-0.03em] text-primary">John W Johnson</p>
                                    <p className="mt-2 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                                        Founder & principal architect
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="eyebrow mb-4">Founder-led by design</p>
                            <h2 className="section-title text-primary">
                                The person mapping the problem stays close to the build.
                            </h2>
                            <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
                                <p>
                                    John founded The Provider System around a practical gap: service businesses
                                    are often sold isolated tools when the real issue is the handoff between the
                                    website, the lead, the customer, and the team.
                                </p>
                                <p>
                                    Engagements are intentionally direct. Scope, access, ownership, third-party
                                    services, and handoff are made explicit in the project agreement so the operating
                                    model is understandable before the build begins.
                                </p>
                            </div>
                            <Link to="/about" className="button-secondary mt-8">
                                Meet the founder
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-sand">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="A visible process"
                        title="Assess before building. Learn before expanding."
                        description="The process is designed to keep the operating problem, the customer experience, and the technical work in the same conversation."
                    />
                    <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-primary/10 bg-primary/10 md:grid-cols-2 xl:grid-cols-4">
                        {processSteps.map(([number, title, description]) => (
                            <li key={number} className="bg-background p-7 sm:p-8">
                                <span className="font-data text-xs font-bold text-accent">{number}</span>
                                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-primary">{title}</h3>
                                <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
                            </li>
                        ))}
                    </ol>
                    <Link to="/process" className="button-secondary mt-8">
                        See the full process
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <SectionHeading
                            eyebrow="Field notes for owners"
                            title="Useful guidance before the sales call."
                            description="Fifteen practical playbooks help service-business owners evaluate websites, CRM, follow-up, AI, content, and custom systems."
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            {playbooks.slice(0, 2).map((playbook) => (
                                <PlaybookCard key={playbook.slug} playbook={playbook} />
                            ))}
                        </div>
                    </div>
                    <Link to="/playbooks" className="button-secondary mt-8">
                        Browse all 15 playbooks
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Who this is built for"
                        title="Service businesses with a real operating bottleneck."
                        description="The strongest engagements begin with a defined customer journey and a concrete place where leads, information, or work are getting lost."
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {industries.map((industry) => (
                            <IndustryCard key={industry.slug} industry={industry} />
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA />

            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}
