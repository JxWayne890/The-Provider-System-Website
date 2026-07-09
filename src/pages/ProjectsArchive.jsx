import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import SEO from '../components/SEO';

const projectCategories = [
    {
        category: 'SaaS & Apps',
        projects: [
            {
                id: 'offer-hero',
                title: 'The Offer Hero',
                type: 'DSCR Broker Command Platform',
                description: 'A full-scale SaaS command center for real estate finance producers.',
                business:
                    'The Offer Hero supports DSCR brokers and high-output producers who need a tighter way to control borrower intake, deal flow, quote generation, follow-up, and pipeline visibility.',
                built:
                    'Built a React/Vite application experience for pipeline command, high-touch outreach, deal tracking, document-oriented workflows, and conversion-focused producer operations.',
                features: ['Deal pipeline', 'Producer dashboard', 'Quote workflow', 'Outreach support', 'Payment-ready SaaS'],
                stack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Resend'],
                image: 'https://www.theofferhero.com/og-image.png',
                link: 'https://www.theofferhero.com/'
            },
            {
                id: 'flowos',
                title: 'FlowOS',
                type: 'Barbershop Operations SaaS',
                description: 'A live operating system for barbershops and walk-in service businesses.',
                business:
                    'FlowOS helps modern shops manage walk-ins, booking, barber load, client records, analytics, websites, and SMS follow-up from one connected product.',
                built:
                    'Built the Next.js product surface, public landing page, owner dashboard, kiosk check-in flow, booking workflow, analytics views, pricing/sign-up path, and retention campaign foundation.',
                features: ['Kiosk check-in', 'Live queue', 'Online booking', 'Client CRM', 'Shop analytics', 'SMS campaigns'],
                stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Stripe', 'Twilio'],
                image: 'https://www.flowosapp.com/flowos-og.png',
                link: 'https://www.flowosapp.com/'
            }
        ]
    },
    {
        category: 'Booking Systems',
        projects: [
            {
                id: 'roller-rink-usa',
                title: 'Roller Rink USA',
                type: 'Venue Booking System',
                description: 'A party and event booking website for a San Angelo roller skating rink.',
                business:
                    'Roller Rink USA offers birthday parties, private rink rentals, group skate events, and open skate visits from its San Angelo, Texas location.',
                built:
                    'Built a booking-focused public site with clear party packages, date and time selection, guest counts, add-ons, contact capture, deposit-oriented booking flow, staff entry, and local business schema.',
                features: ['Party packages', 'Booking funnel', 'Schedule sections', 'Staff entry', 'Local SEO schema'],
                stack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'JSON-LD'],
                image: 'https://www.rollerrinkusa.com/assets/roller-rink-hero.png',
                link: 'https://rollerrinkusa.com/'
            }
        ]
    },
    {
        category: 'Dynamic Sites',
        projects: [
            {
                id: 'mansfield',
                title: 'Mansfield Mining',
                type: 'Industrial Operations Website',
                description: 'A responsive web presence for West Texas frac sand mining operations.',
                business:
                    'Mansfield Mining serves industrial and commercial operators with sand mining, excavation, hauling, and site operations for Permian Basin production needs.',
                built:
                    'Built a heavy-duty industrial website that positions the company around production capacity, reliability, field operations, recruiting credibility, and fast contact for business inquiries.',
                features: ['Industrial positioning', 'Service messaging', 'Recruiting signal', 'Fast contact path', 'OG/social preview'],
                stack: ['React', 'Vite', 'Tailwind', 'Responsive UI'],
                image: 'https://i.imgur.com/lSxsj0X.png',
                link: 'https://www.mansfieldmining.com/'
            },
            {
                id: 'charged-up',
                title: 'Charged Up Nutrition',
                type: 'Supplement Brand Website',
                description: 'A high-energy storefront-style website for a performance nutrition brand.',
                business:
                    'Charged Up Nutrition sells premium supplements for fitness customers, including protein powders, pre-workouts, weight loss support, and daily wellness essentials.',
                built:
                    'Built a bold brand experience that presents product categories, performance-driven messaging, sales-oriented calls to action, and a polished visual system for customer trust.',
                features: ['Product categories', 'Sales messaging', 'Brand-forward UI', 'Mobile storefront', 'Social preview'],
                stack: ['React', 'Vite', 'Tailwind', 'Responsive UI'],
                image: 'https://chargedupnutrition.biz/og-image.png',
                link: 'https://chargedupnutrition.biz/'
            },
            {
                id: 'abilene',
                title: 'Abilene Commercial',
                type: 'Commercial Real Estate Lead Platform',
                description: 'A localized commercial real estate platform for lead capture and market authority.',
                business:
                    'Abilene Commercial helps buyers, tenants, sellers, and investors evaluate commercial property opportunities around Abilene and nearby West Texas markets.',
                built:
                    'Built a high-conversion property and local SEO platform with listings, property detail pages, buyer/seller paths, valuation flows, service pages, blog content, and inquiry routes.',
                features: ['Property listings', 'Local SEO pages', 'Lead forms', 'Market content', 'Valuation path'],
                stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Shadcn UI'],
                image: 'https://abilenecommercial.com/og-image.png',
                link: 'https://abilenecommercial.com/'
            },
            {
                id: 'texas',
                title: 'Texas Commercial',
                type: 'Regional Real Estate Website',
                description: 'A regional commercial real estate website built for search and inquiries.',
                business:
                    'Texas Commercial presents commercial property opportunities and broker contact paths for Abilene and surrounding areas.',
                built:
                    'Built a fast regional website with clear property navigation, trusted contact information, real estate positioning, and a simple path from browsing to broker inquiry.',
                features: ['Property browsing', 'Broker contact', 'Regional positioning', 'Fast pages', 'SEO metadata'],
                stack: ['React', 'Vite', 'Tailwind', 'Responsive UI'],
                image: 'https://texas-commercial.com/og-image.png',
                link: 'https://texas-commercial.com/'
            }
        ]
    },
    {
        category: 'Local SEO Sites',
        projects: [
            {
                id: 'total-quality-plumbing',
                title: 'Total Quality Plumbing',
                type: 'Local Service SEO Website',
                description: 'A full local SEO website for a licensed plumbing company in Abilene, Texas.',
                business:
                    'Total Quality Plumbing provides drain cleaning, water heaters, gas line repair, leak detection, backflow testing, remodels, and plumbing services across Abilene and the Big Country.',
                built:
                    'Built an SEO-heavy service business website with service pages, city pages, blog content, reviews, gallery, careers, contact routing, structured data, and a polished local trust system.',
                features: ['Service pages', 'City SEO pages', 'Reviews', 'Gallery', 'Careers flow', 'Contact email'],
                stack: ['React', 'Vite', 'React Router', 'SSR/Prerender', 'Resend', 'JSON-LD'],
                image: 'https://www.totalqualityplumbingtx.com/og-image.png',
                link: 'https://totalqualityplumbingtx.com/'
            },
            {
                id: 'master-clean-hq',
                title: 'Master Commercial Clean',
                type: 'Commercial Cleaning Website',
                description: 'A commercial cleaning site built for West Texas service area growth.',
                business:
                    'Master Commercial Clean provides commercial cleaning, post-construction cleaning, specialized cleaning, quotes, and service coverage across San Angelo, Abilene, Lubbock, Midland, Odessa, and surrounding West Texas communities.',
                built:
                    'Built a credible service website with SEO structure, service-area messaging, quote-oriented pages, FAQ support, trust content, and clear contact paths for commercial cleaning inquiries.',
                features: ['Service pages', 'Service areas', 'Quote support', 'FAQ content', 'SEO schema'],
                stack: ['React', 'Vite', 'React Router', 'React Helmet', 'Framer Motion', 'JSON-LD'],
                image: 'https://www.mastercleanhq.com/img/logo.png',
                link: 'https://www.mastercleanhq.com/'
            },
            {
                id: 'adrian',
                title: "Adrian's Custom Services",
                type: 'General Contractor Website',
                description: 'A contractor website for veteran-owned construction and repair services.',
                business:
                    'Adrian\'s Custom Services is a veteran-owned general contractor serving Anson, Abilene, and the Big Country with remodeling, painting, drywall, framing, carpentry, tile, decks, demolition, and repairs.',
                built:
                    'Built a trust-focused local website with service pages, service-area content, project gallery, review filtering, veteran-owned story, FAQ content, and a quote request path.',
                features: ['Service pages', 'Reviews', 'Gallery', 'Quote form', 'Service areas', 'FAQ'],
                stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Shadcn UI'],
                image: 'https://i.imgur.com/ocZW1Qc.png',
                link: 'https://www.adrianscustomservices.org/'
            },
            {
                id: 'weathersbee',
                title: 'Weathersbee Electric Co.',
                type: 'Industrial Service Website',
                description: 'A rugged static site for San Angelo industrial electrical rebuild experts.',
                business:
                    'Weathersbee Electric Co. is a San Angelo electrical rebuilder specializing in new and rebuilt starters, alternators, and heavy industrial electrical systems, with roots going back to 1934.',
                built:
                    'Built a focused industrial website with legacy positioning, service clarity, durable visual direction, mobile-ready sections, and direct contact for rebuild and parts inquiries.',
                features: ['Legacy positioning', 'Industrial services', 'Direct contact', 'Mobile site', 'Brand visuals'],
                stack: ['React', 'Vite', 'Tailwind', 'Static Hosting'],
                image: '/images/projects/weathersbee.png',
                link: 'https://weathersbeeelectric.com/'
            }
        ]
    },
    {
        category: 'Static Sites',
        projects: [
            {
                id: 'arki',
                title: 'Arki Design Studio',
                type: 'Architecture Portfolio Website',
                description: 'A polished architecture and design website for luxury residential and commercial work.',
                business:
                    'ARKI Design Studio offers custom home design, architectural planning, floor plans, portfolio presentation, and construction support for high-end modern spaces.',
                built:
                    'Built a visually refined static site with luxury positioning, architectural service messaging, portfolio entry points, contact paths, and fast-loading marketing pages.',
                features: ['Luxury positioning', 'Portfolio flow', 'Service messaging', 'Contact CTA', 'OG/social preview'],
                stack: ['React', 'Vite', 'Tailwind', 'Static Hosting'],
                image: 'https://i.imgur.com/W9aTjyL.png',
                link: 'https://landing.arkidesignstudio.com/'
            },
            {
                id: 'scalifying',
                title: 'Scalifying AI',
                type: 'AI Growth Consulting Website',
                description: 'A B2B AI growth website for automation and client acquisition systems.',
                business:
                    'Scalifying AI helps B2B companies engineer growth systems, automated lead generation, workflow optimization, and custom AI tooling for business operations.',
                built:
                    'Built a fast AI consulting site with clear positioning, systemized service messaging, technical credibility, and conversion paths for business owners evaluating automation.',
                features: ['AI positioning', 'Lead-gen messaging', 'Consulting offer', 'Fast static pages', 'Social preview'],
                stack: ['React', 'Vite', 'Tailwind', 'Static Hosting'],
                image: 'https://i.imgur.com/4LpuspF.png',
                link: 'https://scalifyingai.com/'
            }
        ]
    }
];

const allCategories = ['All', ...projectCategories.map((g) => g.category)];

export default function ProjectsArchive() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const visibleProjects =
        activeFilter === 'All'
            ? projectCategories.flatMap((g) =>
                  g.projects.map((p) => ({ ...p, category: g.category }))
              )
            : (projectCategories.find((g) => g.category === activeFilter)?.projects || []).map(
                  (p) => ({ ...p, category: activeFilter })
              );

    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <SEO
                title="Project Archive | Deployed Systems"
                description="Explore The Provider System portfolio of deployed SaaS products, booking systems, local SEO websites, dynamic business sites, and public-facing digital infrastructure."
                url="/projects"
                schemas={[
                    {
                        '@type': 'CollectionPage',
                        '@id': 'https://theprovidersystem.com/projects',
                        name: 'Project Archive — The Provider System',
                        description:
                            'Portfolio of deployed SaaS products, booking systems, local SEO websites, and public-facing business systems.',
                        isPartOf: { '@id': 'https://theprovidersystem.com/#website' }
                    },
                    {
                        '@type': 'BreadcrumbList',
                        '@id': 'https://theprovidersystem.com/projects#breadcrumbs',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://theprovidersystem.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Projects'
                            }
                        ]
                    }
                ]}
            />

            <div className="max-w-7xl w-full mx-auto px-6 md:px-12">
                <header className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-4 font-heading text-sm font-semibold"
                    >
                        <ArrowRight size={16} className="rotate-180" aria-hidden="true" />
                        Back to Systems
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight mb-2">
                                Built Work.
                            </h1>
                            <p className="font-heading text-base md:text-lg text-muted max-w-2xl leading-relaxed">
                                Websites, booking flows, lead systems, and custom apps built for owners
                                who need cleaner customer paths and better operational control.
                            </p>
                        </div>
                        <div className="font-data text-xs uppercase tracking-[0.18em] text-muted">
                            {visibleProjects.length} public projects shown
                        </div>
                    </div>
                </header>

                <div className="mb-8 flex flex-wrap gap-2">
                    {allCategories.map((cat) => {
                        const isActive = activeFilter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full font-heading font-semibold text-sm transition-all ${
                                    isActive
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-muted border border-primary/10 hover:border-primary/30 hover:text-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleProjects.map((project) => (
                        <article
                            key={project.id}
                            className="group relative flex flex-col overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary flex items-center justify-center">
                                        <span className="font-heading font-bold text-white/40 text-2xl uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                )}
                                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-primary backdrop-blur">
                                    {project.category}
                                </span>
                            </div>

                            <div className="flex-1 p-5 flex flex-col gap-4">
                                <div>
                                    <div className="font-data text-[11px] uppercase tracking-[0.18em] text-accent mb-2">
                                        {project.type}
                                    </div>
                                    <h3 className="font-heading text-primary font-bold text-xl leading-tight mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="font-heading text-muted text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <dl className="rounded-md border border-primary/10 bg-primary/[0.025] p-4">
                                    <div>
                                        <dt className="mb-1 font-data text-[10px] uppercase tracking-[0.18em] text-primary/50">
                                            Result
                                        </dt>
                                        <dd className="font-heading text-sm leading-relaxed text-primary/80">
                                            {project.built}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProject(project)}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-primary/90"
                                    >
                                        View Details
                                        <ArrowRight size={16} aria-hidden="true" />
                                    </button>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 px-5 py-3 font-heading text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                    >
                                        Live Site
                                        <ExternalLink size={15} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-lg border border-primary/10 bg-white p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-2 font-data text-xs uppercase tracking-[0.18em] text-accent">
                                Need something built?
                            </div>
                            <p className="max-w-2xl font-heading text-lg font-semibold leading-relaxed text-primary">
                                The best projects here started with one clear business problem:
                                capture better leads, book more work, or make the operation easier to run.
                            </p>
                        </div>
                        <Link
                            to="/#contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-accent/90"
                        >
                            Start a Build
                            <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectDetailsModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}

function ProjectDetailsModal({ project, onClose }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
            <button
                type="button"
                className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close project details"
            />
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-modal-${project.id}`}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-2xl"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close project details"
                    className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-primary shadow-sm transition-colors hover:text-accent"
                >
                    <X size={20} aria-hidden="true" />
                </button>

                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[260px] bg-primary">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full min-h-[260px] w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full min-h-[260px] items-center justify-center bg-primary">
                                <span className="font-heading text-2xl font-bold uppercase tracking-widest text-white/40">
                                    {project.category}
                                </span>
                            </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-primary">
                            {project.category}
                        </span>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="mb-3 font-data text-xs uppercase tracking-[0.18em] text-accent">
                            {project.type}
                        </div>
                        <h2
                            id={`project-modal-${project.id}`}
                            className="mb-3 font-heading text-3xl font-bold leading-tight text-primary md:text-4xl"
                        >
                            {project.title}
                        </h2>
                        <p className="mb-6 font-heading text-base leading-relaxed text-muted">
                            {project.description}
                        </p>

                        <div className="space-y-5">
                            <DetailBlock title="The Business">{project.business}</DetailBlock>
                            <DetailBlock title="What Was Built">{project.built}</DetailBlock>

                            <div>
                                <h3 className="mb-3 font-data text-xs uppercase tracking-[0.18em] text-primary/55">
                                    Client-Facing Pieces
                                </h3>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {project.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="rounded-md border border-primary/10 bg-primary/[0.025] px-3 py-2 font-heading text-sm font-semibold text-primary/80"
                                        >
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 font-data text-xs uppercase tracking-[0.18em] text-primary/55">
                                    Developer Notes
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full bg-dark px-3 py-1 font-data text-[11px] uppercase tracking-[0.08em] text-white/80"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-accent/90"
                            >
                                Visit Live Site
                                <ExternalLink size={15} aria-hidden="true" />
                            </a>
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-full border border-primary/15 px-5 py-3 font-heading text-sm font-bold text-primary transition-colors hover:border-primary/35"
                            >
                                Back to Work
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function DetailBlock({ title, children }) {
    return (
        <div>
            <h3 className="mb-2 font-data text-xs uppercase tracking-[0.18em] text-primary/55">
                {title}
            </h3>
            <p className="font-heading text-sm leading-relaxed text-muted">{children}</p>
        </div>
    );
}
