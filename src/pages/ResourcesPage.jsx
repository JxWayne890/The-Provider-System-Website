import { Link } from 'react-router-dom';
import { BookOpen, FileText, Wrench, Activity, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';

const resources = [
    {
        icon: FileText,
        title: 'Cost Guides',
        description: 'Transparent pricing breakdowns for AI automation, chatbot development, SaaS builds, and more. Understand what drives cost, what should be included, and the right questions to ask before signing any proposal.',
        href: '/guides',
        cta: 'Browse Cost Guides',
    },
    {
        icon: BookOpen,
        title: 'Blog',
        description: 'Practical guides, platform comparisons, industry insights, and data-driven research on AI automation and workflow optimization. Written by practitioners, not marketers.',
        href: '/blog',
        cta: 'Read the Blog',
    },
    {
        icon: Wrench,
        title: 'Tools & Platforms',
        description: 'Detailed breakdowns of every automation platform, AI model, database, CRM, and integration tool we work with. Understand what each tool does best and where it fits in your stack.',
        href: '/platforms',
        cta: 'Explore Platforms',
    },
    {
        icon: Activity,
        title: 'Free Diagnostic',
        description: 'Take a 2-minute operational audit to identify your exact bottlenecks and generate a custom automation blueprint. No sales pitch, just a clear picture of where automation can help.',
        href: '/diagnostic',
        cta: 'Run the Diagnostic',
    },
    {
        icon: HelpCircle,
        title: 'FAQ',
        description: 'Answers to the most common questions about our services, process, pricing, and the technology behind our builds. If it is not here, reach out and we will answer directly.',
        href: '/faq',
        cta: 'View FAQ',
    },
];

export default function ResourcesPage() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Resources' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Resources | AI Automation Guides, Blog & Tools"
                description="Access cost guides, blog articles, platform deep-dives, a free automation diagnostic, and comprehensive FAQ. Everything you need to make informed automation decisions."
                url="/resources"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'Resources' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Resource Hub
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Resources
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Guides, tools, and knowledge to help you make informed decisions about AI automation. Everything here is written by the same team that builds the systems.
                        </p>
                    </div>
                </section>

                {/* Resource Cards */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {resources.map((resource) => (
                            <Link
                                key={resource.href}
                                to={resource.href}
                                className="group flex flex-col md:flex-row gap-6 md:gap-10 bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-accent/30 transition-colors"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                                    <resource.icon className="w-7 h-7 text-accent" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h2 className="font-heading font-bold text-2xl text-white mb-3 group-hover:text-accent transition-colors">
                                        {resource.title}
                                    </h2>
                                    <p className="font-heading text-white/60 text-base leading-relaxed mb-5">
                                        {resource.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-data text-accent text-xs tracking-wider uppercase">
                                        {resource.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Need Personalized Guidance?"
                    subheading="Our team can walk you through the right resources for your specific situation. Book a free call."
                    theme="dark"
                />
            </main>
        </div>
    );
}
