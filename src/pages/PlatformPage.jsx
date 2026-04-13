import { useParams, Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';
import { toolsPlatforms } from '../data/toolsPlatforms';
import { services } from '../data/services';

const CATEGORY_LABELS = {
    automation: 'Automation',
    ai: 'AI & Machine Learning',
    crm: 'CRM & Sales',
    communication: 'Communication',
    database: 'Database & Storage',
    payment: 'Payment Processing',
    ecommerce: 'Ecommerce',
    development: 'Development',
};

export default function PlatformPage() {
    const { slug } = useParams();
    const platform = toolsPlatforms.find((p) => p.slug === slug);

    if (!platform) {
        return (
            <div className="bg-primary min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="font-drama text-6xl font-bold mb-4">404</h1>
                    <p className="font-heading text-white/60 text-lg mb-8">Platform not found.</p>
                    <Link to="/platforms" className="font-heading font-bold text-accent hover:text-accent/80 transition-colors">
                        &larr; Back to Platforms
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = LucideIcons[platform.icon] || LucideIcons.Boxes;
    const categoryLabel = CATEGORY_LABELS[platform.category] || platform.category;

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Platforms', url: '/platforms' },
        { name: platform.name },
    ];

    const schemas = [
        {
            "@type": "WebPage",
            "@id": `https://theprovidersystem.com/platforms/${platform.slug}/#webpage`,
            "url": `https://theprovidersystem.com/platforms/${platform.slug}`,
            "name": platform.metaTitle,
            "description": platform.metaDescription,
            "isPartOf": { "@id": "https://theprovidersystem.com/#website" },
        },
        buildBreadcrumbSchema(breadcrumbs),
        buildFAQSchema(platform.faqs),
    ];

    // Resolve related services
    const relatedServices = (platform.relatedServices || [])
        .map((svcSlug) => services.find((s) => s.slug === svcSlug))
        .filter(Boolean);

    // Other platforms for "Explore Other Platforms"
    const otherPlatforms = toolsPlatforms
        .filter((p) => p.slug !== platform.slug)
        .slice(0, 6);

    return (
        <div className="bg-background min-h-screen font-body text-primary selection:bg-accent selection:text-dark">
            <SEO
                title={platform.metaTitle}
                description={platform.metaDescription}
                url={`/platforms/${platform.slug}`}
                schemas={schemas}
            />

            <main>
                {/* Hero */}
                <section className="bg-primary pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <Breadcrumbs items={breadcrumbs} theme="dark" />
                        <div className="flex items-center gap-4 mt-6 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-accent" />
                            </div>
                            <span className="font-data text-xs tracking-wider uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
                                {categoryLabel}
                            </span>
                        </div>
                        <h1 className="font-drama font-bold text-4xl md:text-6xl text-white tracking-tight">
                            {platform.name}
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            {platform.excerpt}
                        </p>
                    </div>
                </section>

                {/* Description */}
                <section className="py-24 md:py-32 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {platform.description.map((paragraph, i) => (
                            <p key={i} className="font-heading text-muted text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* What We Can Build */}
                {platform.whatWeCanBuild && platform.whatWeCanBuild.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Capabilities
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-16">
                                What We Can Build
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {platform.whatWeCanBuild.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 bg-background rounded-xl border border-muted/10 p-6"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <LucideIcons.Wrench className="w-4 h-4 text-accent" />
                                        </div>
                                        <p className="font-heading text-primary text-sm leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Common Integrations */}
                {platform.commonIntegrations && platform.commonIntegrations.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Integrations
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-16">
                                Common Integrations
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {platform.commonIntegrations.map((integration, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl border border-muted/10 p-8"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-accent" />
                                            </div>
                                            <LucideIcons.ArrowRight className="w-4 h-4 text-muted/40" />
                                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                                                <LucideIcons.Plug className="w-5 h-5 text-primary/60" />
                                            </div>
                                        </div>
                                        <h3 className="font-heading font-bold text-base text-primary mb-2">
                                            {integration.platform}
                                        </h3>
                                        <p className="font-heading text-muted text-sm leading-relaxed">
                                            {integration.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                <FAQSection faqs={platform.faqs} />

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Services
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Related Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedServices.map((svc) => {
                                    const SvcIcon = LucideIcons[svc.icon] || LucideIcons.Cog;
                                    return (
                                        <Link
                                            key={svc.slug}
                                            to={`/services/${svc.slug}`}
                                            className={cn(
                                                'group block bg-background rounded-2xl border border-muted/10 p-8',
                                                'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300'
                                            )}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                                                <SvcIcon className="w-6 h-6 text-accent" />
                                            </div>
                                            <h3 className="font-heading font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                                                {svc.shortName || svc.name}
                                            </h3>
                                            <p className="font-heading text-muted text-sm leading-relaxed">
                                                {svc.excerpt}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Explore Other Platforms */}
                <section className="py-24 md:py-32 px-6 md:px-16">
                    <div className="max-w-6xl mx-auto">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Explore
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                            Explore Other Platforms
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherPlatforms.map((p) => {
                                const OtherIcon = LucideIcons[p.icon] || LucideIcons.Boxes;
                                const otherCatLabel = CATEGORY_LABELS[p.category] || p.category;
                                return (
                                    <Link
                                        key={p.slug}
                                        to={`/platforms/${p.slug}`}
                                        className={cn(
                                            'group flex items-center gap-4 bg-white rounded-xl border border-muted/10 p-5',
                                            'hover:border-accent/30 hover:shadow-md transition-all duration-300'
                                        )}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                            <OtherIcon className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <span className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors block">
                                                {p.name}
                                            </span>
                                            <span className="font-data text-xs text-muted">
                                                {otherCatLabel}
                                            </span>
                                        </div>
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
