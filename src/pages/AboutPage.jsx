import { Link } from 'react-router-dom';
import { Shield, Eye, Gauge, Minimize2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';

const values = [
    {
        icon: Shield,
        title: 'Ownership',
        description: 'You own every line of code, every workflow, and every asset we build. No vendor lock-in, no proprietary platforms you cannot leave. Your systems belong to you.',
    },
    {
        icon: Eye,
        title: 'Transparency',
        description: 'Clear pricing, documented processes, and open communication at every stage. You always know what is being built, why, and how much it costs.',
    },
    {
        icon: Gauge,
        title: 'Performance',
        description: 'Every system is built for speed, reliability, and scale. We measure success by uptime, throughput, and the hours reclaimed for your team each week.',
    },
    {
        icon: Minimize2,
        title: 'Simplicity',
        description: 'Complex problems deserve elegant solutions, not more complexity. We reduce moving parts, eliminate unnecessary tooling, and build systems that operators can actually manage.',
    },
];

const subpages = [
    { title: 'Our Process', description: 'How engagements work from discovery through ongoing support.', href: '/about/process' },
    { title: 'Why Choose Us', description: 'What sets The Provider System apart from other agencies and freelancers.', href: '/about/why-choose-us' },
    { title: 'Technology', description: 'The platforms, frameworks, and tools that power our builds.', href: '/about/technology' },
];

export default function AboutPage() {
    const schemas = [
        buildOrganizationSchema(),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="About The Provider System"
                description="The Provider System builds websites, CRMs, follow-up systems, and custom operating tools for blue-collar service businesses and select serious operators."
                url="/about"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'About' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            About Us
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-4">
                            The Provider System
                        </h1>
                        <p className="font-drama text-2xl md:text-3xl text-accent/90 italic mb-8">
                            Websites, CRMs &amp; Operating Systems
                        </p>
                    </div>
                </section>

                {/* About Content */}
                <section className="px-6 md:px-16 mb-24">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <p className="font-heading text-white/80 text-lg leading-relaxed">
                            The Provider System builds websites, CRMs, follow-up systems, and custom operating tools for blue-collar service businesses. The main focus is contractors, trades, and local service operators that need more leads and less operational chaos.
                        </p>
                        <p className="font-heading text-white/80 text-lg leading-relaxed">
                            Founded by John W Johnson, the company was built on a single observation: most businesses do not have a technology problem. They have an implementation problem. Leads land in too many places, follow-up depends on memory, and owners end up stitching the business together by hand.
                        </p>
                        <p className="font-heading text-white/80 text-lg leading-relaxed">
                            Our mission is to help blue-collar businesses get found, capture leads, follow up faster, and run cleaner systems without giving up ownership of the important parts of the business.
                        </p>
                        <p className="font-heading text-white/80 text-lg leading-relaxed">
                            We deliver full code ownership, transparent pricing, and systems built for longevity. No proprietary lock-in, no black boxes, no surprise invoices. When we hand off a project, you own every line of code, every workflow, and every asset.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Core Values
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-16">
                            What We Stand For
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((v) => (
                                <div
                                    key={v.title}
                                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors"
                                >
                                    <v.icon className="w-8 h-8 text-accent mb-5" />
                                    <h3 className="font-heading font-bold text-xl text-white mb-3">
                                        {v.title}
                                    </h3>
                                    <p className="font-heading text-white/60 text-sm leading-relaxed">
                                        {v.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder */}
                <section className="px-6 md:px-16 py-24">
                    <div className="max-w-4xl mx-auto">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Leadership
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-8">
                            Built by a Practitioner
                        </h2>
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12">
                            <h3 className="font-heading font-bold text-2xl text-white mb-2">
                                John W Johnson
                            </h3>
                            <p className="font-data text-accent text-sm tracking-wider uppercase mb-6">
                                Founder &amp; Principal Architect
                            </p>
                            <p className="font-heading text-white/70 text-base leading-relaxed mb-4">
                                John W Johnson founded The Provider System to bridge the gap between what local service businesses need and what most web vendors actually deliver. With hands-on experience across websites, CRMs, booking systems, SaaS products, and operational systems design, he leads every engagement from architecture through deployment.
                            </p>
                            <p className="font-heading text-white/70 text-base leading-relaxed">
                                The company is intentionally lean and practitioner-led. When you work with The Provider System, you work directly with the person designing and building your systems — not a sales team that hands you off to junior developers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sub-pages */}
                <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Learn More
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-12">
                            Explore Further
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {subpages.map((sp) => (
                                <Link
                                    key={sp.href}
                                    to={sp.href}
                                    className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors"
                                >
                                    <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-accent transition-colors">
                                        {sp.title}
                                    </h3>
                                    <p className="font-heading text-white/60 text-sm leading-relaxed mb-6">
                                        {sp.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-data text-accent text-xs tracking-wider uppercase">
                                        Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Let's Talk About Your Project"
                    subheading="Tell us where leads, follow-up, booking, or operations are getting messy. We will map the simplest path forward."
                    theme="dark"
                />
            </main>
        </div>
    );
}
