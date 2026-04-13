import { useParams, Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';
import { useCases } from '../data/useCases';
import { industries } from '../data/industries';
import { services } from '../data/services';

export default function UseCasePage() {
    const { slug } = useParams();
    const useCase = useCases.find((uc) => uc.slug === slug);

    if (!useCase) {
        return (
            <div className="bg-primary min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="font-drama text-6xl font-bold mb-4">404</h1>
                    <p className="font-heading text-white/60 text-lg mb-8">Use case not found.</p>
                    <Link to="/use-cases" className="font-heading font-bold text-accent hover:text-accent/80 transition-colors">
                        &larr; Back to Use Cases
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = LucideIcons[useCase.icon] || LucideIcons.Boxes;

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Use Cases', url: '/use-cases' },
        { name: useCase.title },
    ];

    const schemas = [
        {
            "@type": "WebPage",
            "@id": `https://theprovidersystem.com/use-cases/${useCase.slug}/#webpage`,
            "url": `https://theprovidersystem.com/use-cases/${useCase.slug}`,
            "name": useCase.metaTitle,
            "description": useCase.metaDescription,
            "isPartOf": { "@id": "https://theprovidersystem.com/#website" },
        },
        buildBreadcrumbSchema(breadcrumbs),
        buildFAQSchema(useCase.faqs),
    ];

    // Resolve industry slugs to data
    const relatedIndustries = (useCase.industries || [])
        .map((indSlug) => industries.find((i) => i.slug === indSlug))
        .filter(Boolean);

    // Resolve service slugs to data
    const relatedServices = (useCase.relatedServices || [])
        .map((svcSlug) => services.find((s) => s.slug === svcSlug))
        .filter(Boolean);

    // Other use cases for "Explore More"
    const otherUseCases = useCases
        .filter((uc) => uc.slug !== useCase.slug)
        .slice(0, 6);

    return (
        <div className="bg-background min-h-screen font-body text-primary selection:bg-accent selection:text-dark">
            <SEO
                title={useCase.metaTitle}
                description={useCase.metaDescription}
                url={`/use-cases/${useCase.slug}`}
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
                        </div>
                        <h1 className="font-drama font-bold text-4xl md:text-6xl text-white tracking-tight">
                            {useCase.title}
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            {useCase.excerpt}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-24 md:py-32 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {useCase.content.map((paragraph, i) => (
                            <p key={i} className="font-heading text-muted text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                {useCase.benefits && useCase.benefits.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Impact
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-16">
                                Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {useCase.benefits.map((benefit, i) => (
                                    <div
                                        key={i}
                                        className="bg-background rounded-2xl p-8 border border-muted/10"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                                            <LucideIcons.CheckCircle2 className="w-5 h-5 text-accent" />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="font-heading text-muted text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Industries That Benefit */}
                {relatedIndustries.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Industries
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Industries That Benefit
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {relatedIndustries.map((ind) => {
                                    const IndIcon = LucideIcons[ind.icon] || LucideIcons.Building2;
                                    return (
                                        <Link
                                            key={ind.slug}
                                            to={`/industries/${ind.slug}`}
                                            className={cn(
                                                'inline-flex items-center gap-3 bg-white rounded-xl border border-muted/10 px-6 py-4',
                                                'hover:border-accent/30 hover:shadow-md transition-all duration-300 group'
                                            )}
                                        >
                                            <IndIcon className="w-5 h-5 text-accent" />
                                            <span className="font-heading font-bold text-primary text-sm group-hover:text-accent transition-colors">
                                                {ind.shortName || ind.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

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

                {/* FAQ */}
                <FAQSection faqs={useCase.faqs} />

                {/* Explore More Use Cases */}
                <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Explore
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                            Explore More Use Cases
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherUseCases.map((uc) => {
                                const OtherIcon = LucideIcons[uc.icon] || LucideIcons.Boxes;
                                return (
                                    <Link
                                        key={uc.slug}
                                        to={`/use-cases/${uc.slug}`}
                                        className={cn(
                                            'group flex items-center gap-4 bg-background rounded-xl border border-muted/10 p-5',
                                            'hover:border-accent/30 hover:shadow-md transition-all duration-300'
                                        )}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                            <OtherIcon className="w-5 h-5 text-accent" />
                                        </div>
                                        <span className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors">
                                            {uc.title}
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
