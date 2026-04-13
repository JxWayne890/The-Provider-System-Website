import { Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';
import { useCases } from '../data/useCases';

const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Use Cases' },
];

export default function UseCasesIndex() {
    const schemas = [
        {
            "@type": "WebPage",
            "@id": "https://theprovidersystem.com/use-cases/#webpage",
            "url": "https://theprovidersystem.com/use-cases",
            "name": "AI Automation Use Cases | The Provider System",
            "description": "Explore practical AI automation use cases across lead capture, scheduling, onboarding, invoicing, and more. See how businesses automate real workflows.",
            "isPartOf": { "@id": "https://theprovidersystem.com/#website" },
        },
        buildBreadcrumbSchema(breadcrumbs),
    ];

    return (
        <div className="bg-background min-h-screen font-body text-primary selection:bg-accent selection:text-dark">
            <SEO
                title="AI Automation Use Cases"
                description="Explore practical AI automation use cases across lead capture, scheduling, onboarding, invoicing, and more. See how businesses automate real workflows."
                url="/use-cases"
                schemas={schemas}
            />

            <main>
                {/* Hero */}
                <section className="bg-primary pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <Breadcrumbs items={breadcrumbs} theme="dark" />
                        <h1 className="font-drama font-bold text-4xl md:text-6xl text-white tracking-tight mt-6">
                            Automation Use Cases
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            Real-world automation workflows we build for businesses every day. Each use case
                            represents a proven pattern that eliminates manual work, reduces errors, and scales
                            operations without adding headcount.
                        </p>
                    </div>
                </section>

                {/* Use Case Grid */}
                <section className="py-24 md:py-32 px-6 md:px-16">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {useCases.map((uc) => {
                                const Icon = LucideIcons[uc.icon] || LucideIcons.Boxes;
                                return (
                                    <Link
                                        key={uc.slug}
                                        to={`/use-cases/${uc.slug}`}
                                        className={cn(
                                            'group block bg-white rounded-2xl border border-muted/10 p-8',
                                            'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5',
                                            'transition-all duration-300'
                                        )}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                            <Icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <h2 className="font-heading font-bold text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                                            {uc.title}
                                        </h2>
                                        <p className="font-heading text-muted text-sm leading-relaxed">
                                            {uc.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 font-data text-accent text-sm mt-6 group-hover:gap-3 transition-all">
                                            View use case
                                            <LucideIcons.ArrowRight className="w-4 h-4" />
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection />
            </main>
        </div>
    );
}
