import { ArrowRight, Database, GitBranch, Globe2, LayoutDashboard, Mail, Server } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';

const stackGroups = [
    {
        title: 'Website Foundation',
        icon: Globe2,
        items: ['React or Next.js', 'Vite where appropriate', 'Tailwind CSS', 'Structured content', 'Vercel deployment'],
    },
    {
        title: 'Lead & CRM Layer',
        icon: LayoutDashboard,
        items: ['Supabase databases', 'Lead tables', 'Pipeline status', 'Admin dashboards', 'Role-based access when needed'],
    },
    {
        title: 'Forms & Notifications',
        icon: Mail,
        items: ['Validated forms', 'API routes', 'Resend email alerts', 'Internal notifications', 'Contact handoff'],
    },
    {
        title: 'Custom System Logic',
        icon: GitBranch,
        items: ['Booking flows', 'Quote workflows', 'Follow-up steps', 'Client records', 'Operational reporting'],
    },
    {
        title: 'Data Ownership',
        icon: Database,
        items: ['Client-owned accounts where practical', 'Clear data structure', 'Exportable records', 'Documented handoff'],
    },
    {
        title: 'Deployment & Care',
        icon: Server,
        items: ['GitHub source control', 'Vercel hosting', 'Environment variables', 'Health checks', 'Support plans'],
    },
];

export default function TechnologyPage() {
    return (
        <main className="bg-primary min-h-screen text-white pt-32">
            <SEO
                title="Technology Stack | The Provider System"
                description="The practical technology stack The Provider System uses for blue-collar websites, lead CRMs, follow-up systems, and custom operating tools."
                url="/about/technology"
                schemas={[
                    buildBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'About', url: '/about' },
                        { name: 'Technology' },
                    ]),
                ]}
            />

            <section className="px-6 md:px-16 pb-20">
                <div className="max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'About', href: '/about' },
                            { name: 'Technology' },
                        ]}
                        theme="dark"
                    />
                    <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mt-6 mb-4">
                        Practical Stack
                    </span>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-6">
                        Tools chosen for ownership, speed, and real business use.
                    </h1>
                    <p className="font-heading text-white/65 text-lg md:text-xl leading-relaxed max-w-3xl">
                        The Provider System does not sell a tool stack for its own sake. The stack is chosen around
                        what the business needs to own, capture, track, automate, and maintain after launch.
                    </p>
                </div>
            </section>

            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stackGroups.map((group) => {
                        const Icon = group.icon;
                        return (
                            <div key={group.title} className="bg-white/[0.04] border border-white/10 rounded-lg p-6">
                                <div className="w-11 h-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center mb-5">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h2 className="font-heading font-bold text-xl mb-4">{group.title}</h2>
                                <ul className="space-y-2">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 font-heading text-sm text-white/65">
                                            <ArrowRight className="w-3.5 h-3.5 text-accent mt-1 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-4xl mx-auto bg-white text-primary rounded-lg p-8 md:p-10">
                    <span className="font-data text-accent tracking-[0.2em] text-xs uppercase block mb-4">
                        The Rule
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl mb-5">
                        Use enough technology to solve the problem, then stop.
                    </h2>
                    <p className="font-heading text-muted leading-relaxed">
                        A contractor website does not need enterprise complexity. A custom CRM does not need to become
                        a bloated SaaS product. The right build is the one your team can actually use and your business
                        can keep owning.
                    </p>
                </div>
            </section>

            <ContactFormSection
                heading="Need help choosing the right build?"
                subheading="Share the business problem first. We will recommend the lightest stack that can actually handle it."
                theme="dark"
            />
        </main>
    );
}
