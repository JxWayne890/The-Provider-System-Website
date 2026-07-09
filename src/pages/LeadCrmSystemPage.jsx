import { Link } from 'react-router-dom';
import { ArrowRight, BellRing, CheckCircle2, ClipboardList, MessageSquareText, Star, Workflow } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildServiceSchema } from '../components/SchemaMarkup';

const pieces = [
    'Lead capture from website forms',
    'Central CRM pipeline',
    'New lead notifications',
    'Automated email or SMS follow-up',
    'Quote and booking status tracking',
    'Review request workflow',
    'Simple reporting dashboard',
];

const leaks = [
    ['Inbox leads', 'Form submissions land in email and get buried.'],
    ['Text threads', 'Customer details live across personal phones.'],
    ['No next step', 'Nobody knows which leads were called, quoted, booked, or lost.'],
    ['Forgotten reviews', 'Happy customers are not asked when the moment is warm.'],
];

export default function LeadCrmSystemPage() {
    const schemas = [
        buildOrganizationSchema(),
        buildServiceSchema({
            name: 'Lead and CRM System',
            description: 'Lead capture, CRM, notifications, automated follow-up, and review request systems for blue-collar service businesses.',
            url: '/lead-crm-system',
        }),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Lead & CRM System' },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title="Lead & CRM System"
                description="Lead capture, CRM, notifications, follow-up, and review request systems for blue-collar service businesses."
                url="/lead-crm-system"
                schemas={schemas}
            />

            <section className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Lead & CRM System' }]} theme="dark" />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-end mt-8">
                        <div>
                            <p className="font-data text-accent tracking-[0.2em] uppercase text-sm mb-4">
                                Lead & CRM System
                            </p>
                            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                                Capture every lead, see every status, and follow up without relying on memory.
                            </h1>
                            <p className="font-heading text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                                A connected system for service businesses that already get opportunities but lose money because calls, forms, texts, quotes, and follow-up are scattered.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <a href="/#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 font-heading font-bold text-white hover:scale-[1.02] transition-transform">
                                    Book a Lead Flow Audit <ArrowRight className="w-5 h-5" />
                                </a>
                                <Link to="/blue-collar" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-heading font-bold text-white hover:border-accent hover:text-accent transition-colors">
                                    See Blue-Collar Systems
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                            <p className="font-data text-accent uppercase tracking-[0.16em] text-xs mb-3">Starting Point</p>
                            <p className="font-heading text-4xl font-bold mb-2">$6,500+</p>
                            <p className="font-heading text-white/60 mb-6">Monthly system plans can start at $750/mo depending on scope and support.</p>
                            <div className="space-y-3">
                                {pieces.slice(0, 5).map((item) => (
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
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-3xl mb-14">
                        <Workflow className="w-10 h-10 text-accent mb-5" />
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            This is the bridge between a website and a full operating system.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            The CRM does not need to be complicated. It needs to show what came in, what happened next, who owns it, and what follow-up is scheduled.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {leaks.map(([title, text]) => (
                            <div key={title} className="bg-white border border-muted/10 rounded-lg p-6">
                                <BellRing className="w-6 h-6 text-accent mb-4" />
                                <h3 className="font-heading font-bold text-primary mb-2">{title}</h3>
                                <p className="font-heading text-muted text-sm leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
                    <div>
                        <ClipboardList className="w-10 h-10 text-accent mb-5" />
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            What the system can include.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            We start with the highest-value leak first, then build the rest of the workflow around how your team actually works.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pieces.map((item, index) => {
                            const Icon = [ClipboardList, Workflow, BellRing, MessageSquareText, ClipboardList, Star, Workflow][index];
                            return (
                                <div key={item} className="bg-background border border-muted/10 rounded-lg p-5">
                                    <Icon className="w-5 h-5 text-accent mb-3" />
                                    <p className="font-heading text-primary font-medium">{item}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ContactFormSection
                heading="Ready to stop losing leads between tools?"
                subheading="Tell us where leads come from today and where they get lost. We will map the CRM and follow-up path."
            />
        </main>
    );
}
