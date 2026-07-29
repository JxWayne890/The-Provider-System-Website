import { useState } from 'react';
import { ArrowRight, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ProjectCard, RegionCard } from '../components/ContentCards';
import ProjectPreviewModal from '../components/ProjectPreviewModal';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { regions } from '../data/siteContent';
import { projects } from '../data/projects';

const texasProofIds = [
    'total-quality-plumbing',
    'weathersbee-electric',
    'roller-rink-usa',
    'mansfield-mining',
    'adrians-custom-services',
    'master-commercial-clean',
];

export default function TexasHub() {
    const [previewProject, setPreviewProject] = useState(null);
    const texasProjects = texasProofIds
        .map((id) => projects.find((project) => project.slug === id))
        .filter(Boolean);

    return (
        <main>
            <SEO
                title="Texas Digital Systems Agency"
                description="Websites, CRM, automation, AI, and custom systems for Texas service businesses, backed by project work across Abilene, San Angelo, and West Texas."
                url="/texas"
                schemas={[
                    {
                        '@type': 'Service',
                        '@id': 'https://theprovidersystem.com/texas#service',
                        name: 'Digital systems for Texas service businesses',
                        description:
                            'Website, CRM, automation, practical AI, and custom systems delivered for Texas service businesses.',
                        provider: { '@id': 'https://theprovidersystem.com/#organization' },
                        areaServed: { '@type': 'State', name: 'Texas' },
                    },
                ]}
            />
            <PageHero
                eyebrow="Texas"
                title="Texas-wide focus, backed by work you can inspect."
                description="The Provider System serves Texas businesses through a founder-led, remote-first process. The local story is built from real projects and specific regional context—not claimed office locations or a grid of copy-swapped city pages."
                breadcrumbs={[{ label: 'Texas' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Start a Texas project
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a href="#texas-work" className="button-ghost-dark">
                            Inspect Texas work
                        </a>
                    </>
                }
                aside={<TexasCoverageCard />}
            />

            <section className="section-pad bg-primary text-white">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Evidence-led regional hubs"
                        title="Four useful regional lenses."
                        description="Each hub has a distinct reason to exist: project evidence, market-specific operating context, or a transparent publication gate for future local content."
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
                        eyebrow="What Texas-first means here"
                        title="A clear market focus without false proximity."
                        description="The site separates statewide availability, evidence-backed regional work, and remote nationwide delivery so a visitor can understand the relationship."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['Statewide service', 'Texas is the primary market position across services, content, and project pathways.'],
                            ['Named local proof', 'Abilene, San Angelo, Anson, the Big Country, the Permian Basin, and West Texas appear where the project record supports them.'],
                            ['No invented offices', 'Regional availability does not imply a storefront, team, address, or business hours in that market.'],
                            ['Nationwide by remote', 'Qualified engagements outside Texas remain available without competing with the Texas-first message.'],
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

            <section id="texas-work" className="section-pad scroll-mt-32 bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Local proof"
                        title="Selected Texas and West Texas work."
                        description="Every card links to a detailed project story with a restricted interactive preview where supported and an automatic fallback when embedding is blocked. No unverified outcome metric is attached."
                    />
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {texasProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} onPreview={setPreviewProject} />
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA
                eyebrow="Build for the real territory"
                title="Start with the customers and markets the business actually serves."
                description="A Texas growth structure should follow service priorities, operating capacity, local proof, and real demand—not a list of every city on a map."
            />

            {previewProject && (
                <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
            )}
        </main>
    );
}

function TexasCoverageCard() {
    return (
        <div className="rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur">
            <MapPinned className="h-7 w-7 text-sun" aria-hidden="true" />
            <p className="mt-7 font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-sun">
                Project footprint represented
            </p>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/72">
                <li>Abilene & the Big Country</li>
                <li>San Angelo & the Concho Valley</li>
                <li>Midland–Odessa & the Permian Basin</li>
                <li>Lubbock and West Texas service markets</li>
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/65">
                This is a service and project footprint. It is not a list of Provider System office locations.
            </p>
        </div>
    );
}
