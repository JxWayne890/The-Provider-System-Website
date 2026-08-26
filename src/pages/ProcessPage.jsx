import { ArrowRight, Check, CircleDotDashed } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';

const phases = [
    {
        number: '01',
        name: 'Assess the current system',
        purpose: 'Understand what customers do, what the team does, where information moves, and where the next action disappears.',
        inputs: ['Current website and lead sources', 'Tools, spreadsheets, inboxes, and handoffs', 'Priority services, customers, and markets', 'Known constraints, evidence, and access'],
        output: 'A current-state map and a clearly framed bottleneck.',
    },
    {
        number: '02',
        name: 'Design the smallest useful path',
        purpose: 'Compare configure, integrate, buy, and build options before custom work expands.',
        inputs: ['Customer and staff journeys', 'Records, statuses, permissions, and owners', 'Edge cases and human escalation', 'Success evidence and excluded scope'],
        output: 'A scoped system design, phased release, and explicit tradeoffs.',
    },
    {
        number: '03',
        name: 'Build and verify in stages',
        purpose: 'Turn the model into visible working experiences while the business context is still easy to correct.',
        inputs: ['Responsive interface and content', 'Data and workflow implementation', 'Representative normal and exception scenarios', 'Access, security, and provider constraints'],
        output: 'A tested release with known limits, decisions, and remaining work.',
    },
    {
        number: '04',
        name: 'Launch, hand off, and learn',
        purpose: 'Make the system operable after launch and define how changes or support will be handled.',
        inputs: ['Production readiness checks', 'Account and deployment access', 'Documentation and owner training', 'Support, monitoring, and improvement scope'],
        output: 'A live or handed-off system with an accountable operating model.',
    },
];

export default function ProcessPage() {
    return (
        <main>
            <SEO
                title="West Texas Website & Lead System Process"
                description="See how a West Texas website or lead-system project moves from assessment through scoped build, verification, launch, and handoff."
                url="/process"
            />
            <PageHero
                eyebrow="Process"
                title="Make the system understandable before making it bigger."
                description="The process keeps customer experience, operating rules, data, technical choices, and ownership in the same conversation. The exact scope and pace depend on the project."
                breadcrumbs={[{ label: 'Process' }]}
                actions={
                    <>
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link to="/work" className="button-ghost-dark">
                            See delivered work
                        </Link>
                    </>
                }
            />

            <section className="section-pad bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="Four phases"
                        title="A visible path from mess to working system."
                        description="Each phase ends with something the owner can review before the next layer earns its complexity."
                    />
                    <ol className="mt-14 space-y-8">
                        {phases.map((phase) => (
                            <li key={phase.number} className="grid overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-card lg:grid-cols-[0.36fr_0.64fr]">
                                <div className="bg-primary p-8 text-white sm:p-10">
                                    <span className="font-data text-sm font-bold text-sun">{phase.number}</span>
                                    <h2 className="mt-10 text-3xl font-bold tracking-[-0.035em]">{phase.name}</h2>
                                    <p className="mt-5 leading-7 text-white/62">{phase.purpose}</p>
                                </div>
                                <div className="p-8 sm:p-10">
                                    <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">
                                        What is examined
                                    </p>
                                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {phase.inputs.map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted">
                                                <Check className="mt-0.5 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 flex items-start gap-3 rounded-2xl bg-background p-5">
                                        <CircleDotDashed className="mt-0.5 h-5 w-5 flex-none text-accent" aria-hidden="true" />
                                        <p className="text-sm leading-6 text-primary">
                                            <strong>Phase output:</strong> {phase.output}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                    <SectionHeading
                        eyebrow="What changes by project"
                        title="The process is consistent. The proof required is not."
                        description="A marketing site, production automation, AI voice system, and customer-data application carry different risks."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['Website', 'Content approval, responsive behavior, forms, redirects, schema, and direct route checks.'],
                            ['CRM or app', 'Roles, permissions, migration, validation, record ownership, logging, and operational scenarios.'],
                            ['Automation', 'Trigger conditions, duplicates, failure behavior, exception owners, and provider limits.'],
                            ['AI customer system', 'Approved knowledge, restricted actions, uncertainty, disclosures, testing, and human escalation.'],
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
