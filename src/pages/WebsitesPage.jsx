import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe2, PhoneCall, Search, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildServiceSchema } from '../components/SchemaMarkup';

const included = [
    'Professional mobile-first website',
    'Clear service and location structure',
    'Click-to-call and quote request paths',
    'Lead capture form',
    'Google Business Profile connection',
    'Basic SEO foundation and metadata',
    'Ownership handoff after completion',
];

const bestFor = [
    'Contractors with an outdated or missing website',
    'Blue-collar businesses that rely on trust before the first call',
    'Owners who want a clean online presence without a full CRM build yet',
];

export default function WebsitesPage() {
    const schemas = [
        buildOrganizationSchema(),
        buildServiceSchema({
            name: 'Website Foundation',
            description: 'Professional websites for blue-collar service businesses that need trust, service pages, and lead capture.',
            url: '/websites',
        }),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Websites' },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title="Website Foundation"
                description="Website builds for blue-collar service businesses that need a professional site, service pages, Google profile connection, and lead capture."
                url="/websites"
                schemas={schemas}
            />

            <section className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Websites' }]} theme="dark" />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-end mt-8">
                        <div>
                            <p className="font-data text-accent tracking-[0.2em] uppercase text-sm mb-4">
                                Website Foundation
                            </p>
                            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-6">
                                Websites that help blue-collar businesses look trusted and capture leads.
                            </h1>
                            <p className="font-heading text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                                A focused website for owners who need the front door fixed first: service clarity, mobile speed, Google connection, and a lead path people can actually use.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <a href="/#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 font-heading font-bold text-white hover:scale-[1.02] transition-transform">
                                    Book a Website Audit <ArrowRight className="w-5 h-5" />
                                </a>
                                <Link to="/projects" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-heading font-bold text-white hover:border-accent hover:text-accent transition-colors">
                                    View Website Work
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                            <p className="font-data text-accent uppercase tracking-[0.16em] text-xs mb-3">Starting Point</p>
                            <p className="font-heading text-4xl font-bold mb-2">$2,500+</p>
                            <p className="font-heading text-white/60 mb-6">Managed website plans can start at $299/mo depending on scope.</p>
                            <div className="space-y-3">
                                {bestFor.map((item) => (
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
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
                    <div>
                        <Globe2 className="w-10 h-10 text-accent mb-5" />
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            The website is the trust layer.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            Most owners do not need a flashy website. They need a site that makes the business easy to understand, easy to trust, and easy to contact from a phone.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {included.map((item) => (
                            <div key={item} className="bg-white border border-muted/10 rounded-lg p-5">
                                <CheckCircle2 className="w-5 h-5 text-accent mb-3" />
                                <p className="font-heading text-primary font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        ['Service clarity', 'Visitors should know what you do, where you work, and how to request help without digging.'],
                        ['Search foundation', 'Pages, titles, metadata, structure, and Google profile connection give search engines a cleaner picture.'],
                        ['Conversion path', 'Calls, forms, and quote requests should be obvious on mobile and desktop.'],
                    ].map(([title, text], index) => {
                        const Icon = [Search, ShieldCheck, PhoneCall][index];
                        return (
                            <div key={title} className="rounded-lg bg-background border border-muted/10 p-7">
                                <Icon className="w-8 h-8 text-accent mb-5" />
                                <h3 className="font-heading text-xl font-bold text-primary mb-3">{title}</h3>
                                <p className="font-heading text-muted leading-relaxed">{text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <ContactFormSection
                heading="Need the website fixed first?"
                subheading="Tell us about your trade, service area, and current site. We will map the cleanest website path."
            />
        </main>
    );
}
