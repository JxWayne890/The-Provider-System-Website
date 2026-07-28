import { Code2, KeyRound, DollarSign, Brain, Globe, LifeBuoy, Wrench, FolderKanban } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';

const differentiators = [
    {
        icon: Code2,
        title: 'Custom-Built Solutions',
        description: 'Every system is designed and built for your specific workflows and business context. No templates, no cookie-cutter setups. Your operations are unique and your automation should be too.',
    },
    {
        icon: KeyRound,
        title: 'Full Code Ownership',
        description: 'You own every line of code, every workflow, and every asset from day one. No proprietary platforms you cannot leave, no vendor lock-in, no hostage situations when you want to make changes.',
    },
    {
        icon: DollarSign,
        title: 'Transparent Pricing',
        description: 'Clear, upfront pricing after a thorough scope review. No surprise invoices, no hidden fees, no scope creep charges. You know exactly what you are paying for before we build anything.',
    },
    {
        icon: Brain,
        title: 'Practical Systems First',
        description: 'We use automation and AI where they create real value, but the goal is not novelty. The goal is better lead capture, cleaner follow-up, and simpler operations.',
    },
    {
        icon: Globe,
        title: 'Search and Trust Structure',
        description: 'Websites are built so customers, search engines, and answer tools can understand what you do, where you work, and why people should contact you.',
    },
    {
        icon: LifeBuoy,
        title: 'End-to-End Support',
        description: 'From initial discovery through post-launch monitoring and maintenance. We do not build and disappear. Ongoing support packages keep your systems current, optimized, and running reliably.',
    },
    {
        icon: Wrench,
        title: 'Practitioner-Led',
        description: 'You work directly with the person designing and building your systems. No sales team handoff to junior developers. The founder architects every engagement and leads every build.',
    },
    {
        icon: FolderKanban,
        title: 'Proven Portfolio',
        description: 'A track record of deployed service websites, booking flows, SaaS applications, dashboards, and internal tools that are running in production today.',
    },
];

export default function WhyChooseUsPage() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
            { name: 'Why Choose Us' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Why Choose The Provider System"
                description="Owned websites, CRMs, follow-up systems, and custom operating tools for blue-collar businesses and serious operators."
                url="/about/why-choose-us"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'About', href: '/about' },
                                { name: 'Why Choose Us' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Why Us
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Why Choose The Provider System
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Not every web or software vendor is built the same. Here is what sets us apart for service businesses that need practical systems and ownership.
                        </p>
                    </div>
                </section>

                {/* Differentiator Cards */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                        {differentiators.map((d) => (
                            <div
                                key={d.title}
                                className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors"
                            >
                                <d.icon className="w-8 h-8 text-accent mb-5" />
                                <h2 className="font-heading font-bold text-xl text-white mb-3">
                                    {d.title}
                                </h2>
                                <p className="font-heading text-white/60 text-sm leading-relaxed">
                                    {d.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="See the Difference Firsthand"
                    subheading="Book a call and see what a practical, owner-led website or system build can look like."
                    theme="dark"
                />
            </main>
        </div>
    );
}
