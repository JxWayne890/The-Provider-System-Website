import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, CalendarCheck, CheckCircle2, Code2, LayoutDashboard, LockKeyhole, Users } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildServiceSchema } from '../components/SchemaMarkup';

const examples = [
    ['FlowOS', 'Barbershop operating system with queue, booking, CRM, analytics, kiosk check-in, and SMS workflows.'],
    ['The Offer Hero', 'Finance producer command center with borrower intake, deal flow, quote workflows, and outreach support.'],
    ['Roller Rink USA', 'Booking-focused venue site with party packages, date and time selection, add-ons, and staff entry.'],
];

const systemTypes = [
    'Booking and scheduling systems',
    'Quote and proposal workflows',
    'Client or customer portals',
    'Internal dashboards',
    'Lead assignment and status tools',
    'Workflow automations and integrations',
    'Payment-ready SaaS products',
    'Private operating systems',
];

export default function CustomSystemsPage() {
    const schemas = [
        buildOrganizationSchema(),
        buildServiceSchema({
            name: 'Custom Operating Systems',
            description: 'Private apps, booking systems, dashboards, portals, and custom operating systems for serious business operators.',
            url: '/custom-systems',
        }),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Custom Systems' },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title="Custom Systems & Apps"
                description="Custom apps, dashboards, booking systems, portals, and private operating systems for serious business operators."
                url="/custom-systems"
                schemas={schemas}
            />

            <section className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Custom Systems' }]} theme="dark" />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-end mt-8">
                        <div>
                            <p className="font-data text-accent tracking-[0.2em] uppercase text-sm mb-4">
                                Custom Operating Systems
                            </p>
                            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                                For the builds that are worth more than a website.
                            </h1>
                            <p className="font-heading text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                                We take select custom app and system builds when the operational value is real: portals, dashboards, booking systems, quoting flows, internal tools, and SaaS products.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <a href="/#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 font-heading font-bold text-white hover:scale-[1.02] transition-transform">
                                    Book a System Scope Call <ArrowRight className="w-5 h-5" />
                                </a>
                                <Link to="/projects" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-heading font-bold text-white hover:border-accent hover:text-accent transition-colors">
                                    View App Builds
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                            <p className="font-data text-accent uppercase tracking-[0.16em] text-xs mb-3">Starting Point</p>
                            <p className="font-heading text-4xl font-bold mb-2">$12k+</p>
                            <p className="font-heading text-white/60 mb-6">
                                Custom systems are quoted after a workflow audit because the scope depends on users, data, integrations, and risk.
                            </p>
                            <div className="space-y-3">
                                {['Private app planning', 'Database and dashboard logic', 'Integrations and notifications'].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                                        <span className="font-heading text-white/75">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
                    <div>
                        <Code2 className="w-10 h-10 text-accent mb-5" />
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            This lane stays selective on purpose.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            Not every business needs a custom app. But when the workflow is valuable, repeated, and hard to manage with off-the-shelf tools, a custom system can become the asset.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {systemTypes.map((item, index) => {
                            const Icon = [CalendarCheck, Code2, Users, LayoutDashboard, Boxes, LockKeyhole, Code2, LayoutDashboard][index];
                            return (
                                <div key={item} className="bg-white border border-muted/10 rounded-lg p-5">
                                    <Icon className="w-5 h-5 text-accent mb-3" />
                                    <p className="font-heading text-primary font-medium">{item}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                        Proof
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                        Select custom systems already built.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {examples.map(([title, text]) => (
                            <div key={title} className="bg-background border border-muted/10 rounded-lg p-7">
                                <LayoutDashboard className="w-8 h-8 text-accent mb-5" />
                                <h3 className="font-heading font-bold text-xl text-primary mb-3">{title}</h3>
                                <p className="font-heading text-muted leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactFormSection
                heading="Have a system that is worth building?"
                subheading="Tell us what the workflow is, who uses it, what data it touches, and what breaks when it stays manual."
            />
        </main>
    );
}
