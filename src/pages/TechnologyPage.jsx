import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { toolsPlatforms } from '../data/toolsPlatforms';
import { cn } from '../lib/cn';

const categoryLabels = {
    automation: 'Automation Platforms',
    ai: 'AI & Language Models',
    database: 'Databases & Storage',
    crm: 'CRM & Sales Platforms',
    communication: 'Communication & Messaging',
    payment: 'Payment Processing',
    ecommerce: 'E-Commerce Platforms',
};

const categoryOrder = ['automation', 'ai', 'database', 'crm', 'communication', 'payment', 'ecommerce'];

export default function TechnologyPage() {
    // Group tools by category
    const grouped = {};
    toolsPlatforms.forEach((tool) => {
        if (!grouped[tool.category]) grouped[tool.category] = [];
        grouped[tool.category].push(tool);
    });

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
            { name: 'Technology' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Our Technology Stack | AI & Automation Platforms"
                description="Explore the platforms, frameworks, and tools The Provider System uses to build AI-powered automation, custom SaaS applications, and workflow systems."
                url="/about/technology"
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
                                { name: 'Technology' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Tech Stack
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Our Technology
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            We are platform-agnostic and tool-pragmatic. Every project gets the right stack for the job, not the one we happen to prefer. Here is the ecosystem we work across.
                        </p>
                    </div>
                </section>

                {/* Grouped Tools */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-6xl mx-auto space-y-20">
                        {categoryOrder.map((cat) => {
                            const tools = grouped[cat];
                            if (!tools || tools.length === 0) return null;

                            return (
                                <div key={cat}>
                                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-8 border-b border-white/10 pb-4">
                                        {categoryLabels[cat] || cat}
                                    </h2>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {tools.map((tool) => (
                                            <Link
                                                key={tool.slug}
                                                to={`/platforms/${tool.slug}`}
                                                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-colors"
                                            >
                                                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">
                                                    {tool.name}
                                                </h3>
                                                <p className="font-heading text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {tool.excerpt}
                                                </p>
                                                <span className="inline-flex items-center gap-1.5 font-data text-accent text-xs tracking-wider uppercase">
                                                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Need Help Choosing the Right Stack?"
                    subheading="We will recommend the platforms and tools that fit your requirements, budget, and scale."
                    theme="dark"
                />
            </main>
        </div>
    );
}
