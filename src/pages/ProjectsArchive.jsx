import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { GeoCapsuleGrid, GeoComparisonTable } from '../components/GeoBlocks';

const projectCategories = [
    {
        category: 'SaaS',
        projects: [
            {
                id: 'offer-hero',
                title: 'The Offer Hero',
                description: 'A full-scale React SaaS application designed for high-conversion offer creation.',
                image: 'https://www.theofferhero.com/og-image.png',
                link: 'https://www.theofferhero.com/'
            }
        ]
    },
    {
        category: 'Dynamic Sites',
        projects: [
            {
                id: 'mansfield',
                title: 'Mansfield Mining',
                description: 'A responsive, dynamic web presence built for industrial and commercial scale operations.',
                image: 'https://i.imgur.com/lSxsj0X.png',
                link: 'https://www.mansfieldmining.com/'
            },
            {
                id: 'charged-up',
                title: 'Charged Up Nutrition',
                description: 'A dynamic, high-energy web presence designed to drive sales and customer engagement for a nutrition brand.',
                image: 'https://chargedupnutrition.biz/og-image.png',
                link: 'https://chargedupnutrition.biz/'
            }
        ]
    },
    {
        category: 'Static Sites',
        projects: [
            {
                id: 'adrian',
                title: "Adrian's Custom Services",
                description: 'High-performance static site for local professional services.',
                image: 'https://i.imgur.com/ocZW1Qc.png',
                link: 'https://www.adrianscustomservices.org/'
            },
            {
                id: 'arki',
                title: 'Arki Design Studio',
                description: 'A high-performance static architecture portfolio built for speed and visual impact.',
                image: 'https://i.imgur.com/W9aTjyL.png',
                link: 'https://landing.arkidesignstudio.com/'
            },
            {
                id: 'abilene',
                title: 'Abilene Commercial',
                description: 'A localized, high-conversion commercial real estate platform optimizing lead generation.',
                image: 'https://abilenecommercial.com/og-image.png',
                link: 'https://abilenecommercial.com/'
            },
            {
                id: 'texas',
                title: 'Texas Commercial',
                description: 'Regional commercial real estate platform built for speed and SEO.',
                image: 'https://texas-commercial.com/og-image.png',
                link: 'https://texas-commercial.com/'
            },
            {
                id: 'scalifying',
                title: 'Scalifying AI',
                description: 'Advanced AI automation and consulting platform for scaling operations.',
                image: 'https://i.imgur.com/4LpuspF.png',
                link: 'https://scalifyingai.com/'
            },
            {
                id: 'weathersbee',
                title: 'Weathersbee Electric Co.',
                description: 'A lightning-fast static site for San Angelo\'s premier electrical rebuilders, showcasing 90+ years of industrial expertise.',
                image: '/images/projects/weathersbee.png',
                link: 'https://weathersbeeelectric.com/'
            }
        ]
    },
    {
        category: 'Private Projects',
        projects: [
            {
                id: 'billnest',
                title: 'BillNest Craft',
                description: 'Professional Invoice Management System designed for freelancers and small businesses to create, manage, and track financial documents with precision.',
                link: '#contact'
            },
            {
                id: 'podprep',
                title: 'PodPrepGo',
                description: 'Internal automation system for podcast preparation and workflow routing.',
                link: '#contact'
            }
        ]
    }
];

const archiveCapsules = [
    {
        label: 'What This Archive Is',
        value: 'This archive is a working snapshot of websites, SaaS applications, and internal systems built by The Provider\'s System for real operating use cases.'
    },
    {
        label: 'What Kinds Of Builds Are Included',
        value: 'The work includes static websites, dynamic web experiences, custom SaaS products, and private systems that support lead flow, operations, and internal execution.'
    },
    {
        label: 'Who These Builds Serve',
        value: 'Most projects are built for owners and teams that want simpler digital infrastructure, better visibility, and stronger control over how the business runs online.'
    },
    {
        label: 'What Outcomes They Target',
        value: 'Common outcomes include faster sites, cleaner positioning, better lead capture, less technical sprawl, and digital assets the client can keep using without platform lock-in.'
    }
];

const platformColumns = ['Factor', 'Static Website', 'Overly Complex Platform'];
const platformRows = [
    [
        'Performance',
        'Static architecture is usually lighter, faster, and easier to optimize for search and AI readability.',
        'Heavy themes, plugins, and server-side layers can add latency and technical overhead.'
    ],
    [
        'Maintenance',
        'There are fewer moving parts to patch, monitor, and troubleshoot.',
        'More integrations and dependencies usually mean more updates, conflicts, and failure points.'
    ],
    [
        'Security surface',
        'A smaller stack generally exposes fewer unnecessary attack vectors.',
        'A large plugin or platform stack often creates more entry points and more upkeep.'
    ],
    [
        'Best fit',
        'Works well for service businesses, portfolios, local lead generation, and clear information delivery.',
        'Makes more sense only when the business truly needs advanced application behavior or dense editorial tooling.'
    ]
];

const ownershipColumns = ['Factor', 'Closed Vendor Setup', 'Own-Your-Code Build'];
const ownershipRows = [
    [
        'Source access',
        'The owner may not receive the actual codebase or may only control content inside a platform account.',
        'The owner can retain the delivered code, content, and supporting assets.'
    ],
    [
        'Hosting choice',
        'Hosting is often tied to the vendor or approved platform stack.',
        'The business can usually choose where the project is hosted and how it is managed.'
    ],
    [
        'Portability',
        'Moving the project can be difficult if templates, data, or features depend on the vendor ecosystem.',
        'A portable build is easier to move, extend, or hand to another developer later.'
    ],
    [
        'Long-term leverage',
        'The vendor relationship can become the product itself, which reduces flexibility.',
        'Hiring a developer does not have to reduce ownership if the delivered system is built for client control.'
    ]
];

const allCategories = ['All', ...projectCategories.map((g) => g.category)];

export default function ProjectsArchive() {
    const [activeFilter, setActiveFilter] = useState('All');

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
                description="Explore The Provider System portfolio of deployed AI architectures, high-performance SaaS applications, conversion-optimized static sites, and custom internal workflow tools."
                url="/projects"
                schemas={[
                    {
                        '@type': 'CollectionPage',
                        '@id': 'https://theprovidersystem.com/projects',
                        name: 'Project Archive — The Provider System',
                        description:
                            'Portfolio of deployed AI architectures, SaaS applications, and custom automation systems.',
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
                {/* Compact header */}
                <header className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-4 font-heading text-sm font-semibold"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Systems
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight mb-2">
                                Project Archive.
                            </h1>
                            <p className="font-heading text-base md:text-lg text-muted max-w-2xl leading-relaxed">
                                A snapshot of deployed systems — SaaS products, dynamic sites, static
                                builds, and private tools.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Category filter pills */}
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

                {/* Project grid — visible immediately */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProjects.map((project) => (
                        <a
                            key={project.id}
                            href={project.link}
                            target={project.link === '#contact' ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image or gradient placeholder */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-[#050810] flex items-center justify-center">
                                        <span className="font-heading font-bold text-white/40 text-2xl uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                )}
                                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-primary px-3 py-1 rounded-full font-heading font-bold text-xs uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 flex flex-col">
                                <h3 className="font-heading text-primary font-bold text-lg md:text-xl leading-tight mb-2">
                                    {project.title}
                                </h3>
                                <p className="font-heading text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="mt-auto inline-flex items-center gap-2 text-accent font-heading font-bold text-sm">
                                    <span>
                                        {project.link === '#contact' ? 'Inquire for Details' : 'Explore System'}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transform group-hover:translate-x-1 transition-transform"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* GEO content — now below the projects so it doesn't block the view */}
                <div className="mt-24 space-y-12 pt-12 border-t border-primary/10">
                    <GeoCapsuleGrid
                        eyebrow="Archive Summary"
                        title="What this portfolio says about the work"
                        intro="Plain-language context around the portfolio so both people and AI systems can understand what The Provider System builds and why those build choices matter."
                        capsules={archiveCapsules}
                    />
                    <GeoComparisonTable
                        eyebrow="Architecture Comparison"
                        title="Static websites vs overly complex platforms"
                        columns={platformColumns}
                        rows={platformRows}
                        note="What this means: for many business websites, a simpler stack is easier to maintain, easier to optimize, and easier for answer engines to parse."
                    />
                    <GeoComparisonTable
                        eyebrow="Ownership Comparison"
                        title="Hiring a developer vs owning your code outright"
                        intro="These are not opposites. The important distinction is whether the build leaves the business with control or with a closed dependency."
                        columns={ownershipColumns}
                        rows={ownershipRows}
                        note="Why this matters: owning the delivered asset gives a business more freedom to change vendors, hosts, or growth strategy later."
                    />
                </div>
            </div>
        </div>
    );
}
