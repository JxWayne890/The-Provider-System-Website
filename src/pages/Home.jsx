import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ArrowUpRight,
    CircleDot,
    MapPin,
    MessageSquareWarning,
    Phone,
    SearchX,
    Workflow,
} from 'lucide-react';
import SEO from '../components/SEO';
import {
    IndustryCard,
    PlaybookCard,
    ServiceCard,
} from '../components/ContentCards';
import { RegionCard } from '../components/ContentCards';
import { SectionHeading } from '../components/PageElements';
import SpatialCommandDeck from '../components/SpatialCommandDeck';
import ProjectShowcase from '../components/ProjectShowcase';
import { industries, regions, serviceGroups, services } from '../data/siteContent';
import { projects } from '../data/projects';
import { playbooks } from '../data/playbooks';

const ProviderCommandLab = lazy(() => import('../components/ProviderCommandLab'));

const homepageServiceGroups = serviceGroups.filter((group) =>
    ['visibility', 'operations'].includes(group.id)
);

const featuredProjects = projects.filter((project) =>
    [
        'total-quality-plumbing',
        'weathersbee-electric',
        'master-commercial-clean',
        'mansfield-mining',
    ].includes(project.slug)
);

const marketLinks = [
    ['San Angelo', '/texas/san-angelo-concho-valley'],
    ['Abilene', '/texas/abilene-big-country'],
    ['Midland–Odessa', '/texas/midland-odessa'],
    ['Lubbock', '/texas/lubbock'],
];

const breakpoints = [
    {
        icon: SearchX,
        title: 'The website does not win trust',
        description: 'Services, coverage, proof, and the next step are hard to understand on the first visit.',
        href: '/services/websites',
        label: 'Service-business websites',
    },
    {
        icon: MapPin,
        title: 'Local buyers cannot place you',
        description: 'The site does not make the real service area, local work, or market relevance clear enough.',
        href: '/services/local-seo',
        label: 'Local visibility',
    },
    {
        icon: MessageSquareWarning,
        title: 'Leads go quiet after contact',
        description: 'Calls, forms, referrals, and estimates arrive—but ownership and follow-up are inconsistent.',
        href: '/services/lead-follow-up',
        label: 'Lead follow-up',
    },
    {
        icon: Workflow,
        title: 'No shared view of the opportunity',
        description: 'Customer, quote, task, and next-step details live across inboxes, spreadsheets, texts, and memory.',
        href: '/services/crm-jobber-alternatives',
        label: 'CRM & job operations',
    },
];

const processSteps = [
    ['01', 'Assess', 'Map the website, lead flow, tools, handoffs, and evidence before deciding what to build.'],
    ['02', 'Design', 'Define the customer path, operating rules, data, ownership, and smallest useful release.'],
    ['03', 'Build', 'Implement in visible stages, test representative scenarios, and keep exceptions explicit.'],
    ['04', 'Launch & learn', 'Document the system, hand it over clearly, and improve it from real use when support is included.'],
];

const connectedSystemLayers = [
    {
        number: '01',
        title: 'A clear customer-facing website',
        description:
            'Service, market, proof, and next steps are organized so the right visitor can understand the offer and take action.',
        href: '/services/websites',
        label: 'Website systems',
    },
    {
        number: '02',
        title: 'Useful local relevance',
        description:
            'Real project context, accurate coverage, and substantial regional information support Texas visibility without thin city pages.',
        href: '/services/local-seo',
        label: 'Local SEO architecture',
    },
    {
        number: '03',
        title: 'A visible lead handoff',
        description:
            'Inquiry details can move into a shared operating view for qualification, calls, quotes, scheduling, and ownership.',
        href: '/services/crm-jobber-alternatives',
        label: 'CRM and job operations',
    },
    {
        number: '04',
        title: 'Follow-up that stays connected',
        description:
            'The next customer touchpoint remains attached to the original request instead of disappearing into inboxes and memory.',
        href: '/services/lead-follow-up',
        label: 'Lead follow-up',
    },
];

export default function Home() {
    const [labOpen, setLabOpen] = useState(false);
    const schemas = [
        {
            '@type': 'Organization',
            '@id': 'https://theprovidersystem.com/#organization',
            name: 'The Provider System',
            url: 'https://theprovidersystem.com',
            founder: { '@type': 'Person', name: 'John W Johnson' },
            email: 'theprovidersystem@gmail.com',
            telephone: '+13252495191',
            description:
                'Websites and lead systems for West Texas service businesses, with local visibility, CRM, and follow-up connected around the customer journey.',
            areaServed: [
                { '@type': 'City', name: 'San Angelo' },
                { '@type': 'City', name: 'Abilene' },
                { '@type': 'City', name: 'Midland' },
                { '@type': 'City', name: 'Odessa' },
                { '@type': 'City', name: 'Lubbock' },
                { '@type': 'State', name: 'Texas' },
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
                title="West Texas Websites & Lead Systems"
                description="Websites and local visibility for West Texas service businesses, connected to CRM and lead follow-up across San Angelo, Abilene, Midland–Odessa, and Lubbock."
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
                            San Angelo based · Serving West Texas
                        </div>
                        <h1 className="display-title max-w-5xl">
                            Websites and lead systems for West Texas service businesses.
                        </h1>
                        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
                            Start with a clear website, useful local visibility, and real proof. Then
                            connect each call or inquiry to CRM and follow-up so the opportunity has an
                            owner and a visible next step.
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link to="/start" className="button-primary">
                                Request a website and lead-flow review
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href="tel:+13252495191"
                                className="button-ghost-dark"
                                aria-label="Call The Provider System at 325 249 5191"
                            >
                                <Phone className="h-4 w-4" aria-hidden="true" />
                                (325) 249-5191
                            </a>
                        </div>
                        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/60">
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                Websites first
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                Local proof, not city-page filler
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CircleDot className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                                CRM and follow-up connected
                            </span>
                        </div>
                    </div>

                    <SpatialCommandDeck onOpenLab={() => setLabOpen(true)} />
                </div>
            </section>

            <section aria-label="West Texas service markets" className="border-b border-primary/10 bg-white">
                <div className="page-shell flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
                    <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                        West Texas focus
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-primary/70">
                        {marketLinks.map(([label, to]) => (
                            <Link key={to} to={to} className="transition hover:text-accent">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="connected-system-demo"
                aria-labelledby="connected-system-demo-title"
                className="section-pad border-b border-primary/10 bg-white"
            >
                <div className="page-shell">
                    <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                        <div>
                            <p className="eyebrow mb-4">The connected difference</p>
                            <h2 id="connected-system-demo-title" className="section-title text-primary">
                                The website earns the inquiry. The lead system keeps it moving.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                                The Provider System starts with the customer-facing website and local
                                visibility. CRM and follow-up connect what happens next, so calls, forms,
                                quotes, and ownership do not disappear into separate tools.
                            </p>
                            <button
                                type="button"
                                onClick={() => setLabOpen(true)}
                                className="button-secondary mt-8"
                            >
                                Explore the interactive system
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <p className="mt-3 text-xs leading-5 text-muted">
                                Sample data only. The demo does not place calls, book appointments,
                                or transmit form information.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {connectedSystemLayers.map((layer) => (
                                <article
                                    key={layer.number}
                                    className="rounded-2xl border border-primary/10 bg-background p-5"
                                >
                                    <span className="font-data text-[0.56rem] font-bold uppercase tracking-[0.16em] text-accent">
                                        Layer {layer.number}
                                    </span>
                                    <h3 className="mt-4 text-lg font-bold tracking-[-0.025em] text-primary">
                                        {layer.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">{layer.description}</p>
                                    <Link
                                        to={layer.href}
                                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent"
                                    >
                                        {layer.label}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Website and visibility first"
                        title="Fix the public path. Then connect the handoff."
                        description="A useful lead system begins with a website that explains the service, earns trust, and makes the next step clear. CRM and follow-up solve what happens after contact."
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
                            eyebrow="Focused services"
                            title="Get found and chosen. Then handle every lead."
                            description="The homepage leads with websites and local visibility. CRM, lead ownership, and follow-up are the connected operational advantage behind them."
                        />
                        <Link to="/services" className="button-secondary w-fit">
                            Explore all services
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="mt-14 space-y-8">
                        {homepageServiceGroups.map((group) => {
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
                            eyebrow="West Texas project proof"
                            title="Real service-business websites you can inspect."
                            description="Explore work for Total Quality Plumbing, Weathersbee Electric, Master Commercial Clean, and Mansfield Mining. Each case study shows the business context and delivered scope."
                        />
                        <Link to="/work" className="button-secondary w-fit">
                            View all project work
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                    <div className="mt-12">
                        <ProjectShowcase projects={featuredProjects} />
                    </div>
                </div>
            </section>

            <section className="section-pad relative overflow-hidden bg-primary text-white">
                <div className="grid-field absolute inset-0 opacity-60" aria-hidden="true" />
                <div className="page-shell relative">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="eyebrow mb-4 text-sun">West Texas proof, not city-name filler</p>
                            <h2 className="section-title">Four regional markets. One honest service model.</h2>
                            <p className="mt-5 text-lg leading-8 text-white/60">
                                San Angelo, Abilene, Midland–Odessa, and Lubbock each have a useful regional
                                page grounded in project evidence or operating context. Delivery stays
                                founder-led from San Angelo, with clear remote milestones across the region.
                            </p>
                            <Link to="/texas" className="button-ghost-dark mt-8">
                                Explore West Texas markets
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

            <section className="bg-sand px-5 py-16 sm:px-8 md:py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-white shadow-lift lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="p-8 sm:p-10 lg:p-14">
                        <p className="eyebrow mb-4 text-sun">Start with the website and lead flow</p>
                        <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
                            Show John what customers see—and what happens after they reach out.
                        </h2>
                        <p className="mt-4 max-w-2xl leading-7 text-white/65">
                            Share the current website, priority West Texas market, and the point where
                            calls, forms, quotes, or follow-up are getting lost. The review starts there.
                        </p>
                    </div>
                    <div className="border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                        <Link to="/start" className="button-primary w-full justify-center text-center sm:w-auto">
                            Request a website and lead-flow review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            {labOpen && (
                <Suspense
                    fallback={
                        <div className="fixed inset-0 z-[120] grid place-items-center bg-dark/90 p-6 text-center text-white backdrop-blur-md">
                            <div>
                                <span className="signal-dot mx-auto block h-3 w-3 rounded-full bg-emerald-300" />
                                <p className="mt-4 font-data text-xs uppercase tracking-[0.16em] text-white/60">
                                    Loading Provider Command Lab
                                </p>
                            </div>
                        </div>
                    }
                >
                    <ProviderCommandLab onClose={() => setLabOpen(false)} />
                </Suspense>
            )}
        </main>
    );
}
