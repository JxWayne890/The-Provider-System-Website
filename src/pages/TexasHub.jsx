import { useState } from 'react';
import { ArrowRight, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ProjectCard, RegionCard, ServiceCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { regions, services } from '../data/siteContent';
import { projects } from '../data/projects';

const westTexasProofIds = [
    'total-quality-plumbing',
    'weathersbee-electric',
    'roller-rink-usa',
    'mansfield-mining',
    'adrians-custom-services',
    'master-commercial-clean',
];

const westTexasServiceIds = ['websites', 'local-seo', 'crm-jobber-alternatives', 'lead-follow-up'];

export default function TexasHub() {
    const [previewProject, setPreviewProject] = useState(null);
    const westTexasProjects = westTexasProofIds
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);
    const westTexasServices = westTexasServiceIds
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean);

    return (
        <main>
            <SEO
                title="West Texas Web Design & Lead Systems"
                description="Websites, local visibility, CRM, lead routing, and follow-up for service businesses across San Angelo, Abilene, Midland–Odessa, Lubbock, and West Texas."
                url="/texas"
                schemas={[
                    {
                        '@type': 'Service',
                        '@id': 'https://theprovidersystem.com/texas#service',
                        name: 'West Texas web design and lead systems',
                        description:
                            'Websites, local visibility, CRM, lead routing, and follow-up for West Texas service businesses.',
                        url: 'https://theprovidersystem.com/texas',
                        provider: { '@id': 'https://theprovidersystem.com/#organization' },
                        areaServed: [
                            { '@type': 'AdministrativeArea', name: 'West Texas' },
                            { '@type': 'City', name: 'San Angelo' },
                            { '@type': 'City', name: 'Abilene' },
                            { '@type': 'City', name: 'Midland' },
                            { '@type': 'City', name: 'Odessa' },
                            { '@type': 'City', name: 'Lubbock' },
                        ],
                    },
                ]}
            />
            <PageHero
                eyebrow="West Texas websites & lead systems"
                title="Build the website customers see—and the lead system behind it."
                description="The Provider System helps service businesses across San Angelo, Abilene, Midland–Odessa, Lubbock, and West Texas improve local visibility, capture useful inquiry details, and give every lead a clearer next step."
                breadcrumbs={[{ label: 'West Texas' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a href="#west-texas-work" className="button-ghost-dark">
                            See West Texas work
                        </a>
                    </>
                }
                aside={<WestTexasCoverageCard />}
            />

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Two connected priorities"
                        title="Get found, then make the lead easier to handle."
                        description="Website and local-visibility work lead the offer. CRM and follow-up become the next layer when inquiries are arriving but ownership, status, or response is inconsistent."
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {westTexasServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-primary text-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="West Texas markets"
                        title="Choose the regional page closest to the business and customer path."
                        description="Each page combines an honest delivery model with relevant services, project evidence, fit criteria, and market-specific lead context."
                        dark
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {regions.map((region) => (
                            <RegionCard key={region.slug} region={region} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                    <SectionHeading
                        eyebrow="What West Texas-first means"
                        title="Regional focus backed by real work and a clear delivery model."
                        description="The offer is built around West Texas markets where the service-business context, project record, and customer path can be addressed specifically."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['West Texas front door', 'Website design, local visibility, lead management, and follow-up are the clearest starting points for regional service businesses.'],
                            ['Named project proof', 'San Angelo, Abilene, the Big Country, and the Permian Basin appear where the project record supports the connection.'],
                            ['Founder-led delivery', 'Planning, implementation, review, access, handoff, and support stay explicit throughout the engagement.'],
                            ['Clear regional delivery', 'Based in San Angelo, with direct remote milestones for businesses across the named West Texas markets.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="rounded-3xl border border-primary/10 bg-background p-6">
                                <ShieldCheck className="h-6 w-6 text-teal" aria-hidden="true" />
                                <h3 className="mt-6 text-xl font-bold tracking-[-0.025em] text-primary">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="west-texas-work" className="section-pad scroll-mt-32 bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="West Texas project proof"
                        title="Websites and systems you can inspect."
                        description="Each project record shows the business context, customer path, and delivered website or system scope."
                    />
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {westTexasProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA
                eyebrow="Start with the first broken handoff"
                title="Bring the website, lead flow, and tools as they work today."
                description="John will review where customers get confused, where inquiries arrive, and where ownership or follow-up disappears before recommending the first useful layer."
            />

            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}

function WestTexasCoverageCard() {
    return (
        <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur">
            <MapPinned className="h-7 w-7 text-sun" aria-hidden="true" />
            <p className="mt-7 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-sun">
                West Texas focus
            </p>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/72">
                <li>San Angelo & the Concho Valley</li>
                <li>Abilene & the Big Country</li>
                <li>Midland–Odessa & the Permian Basin</li>
                <li>Lubbock & the South Plains</li>
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/65">
                Based in San Angelo, with founder-led remote delivery across these priority West Texas markets.
            </p>
        </div>
    );
}
