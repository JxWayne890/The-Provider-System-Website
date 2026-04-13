import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import {
    buildOrganizationSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
} from '../components/SchemaMarkup';
import { industries } from '../data/industries';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export default function IndustryPage() {
    const { slug } = useParams();
    const industry = industries.find((i) => i.slug === slug);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!industry) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.ip-anim',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.06,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, contentRef);
        return () => ctx.revert();
    }, [industry]);

    if (!industry) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading font-bold text-4xl text-primary mb-4">Industry Not Found</h1>
                    <p className="font-heading text-muted mb-8">The industry page you are looking for does not exist.</p>
                    <Link to="/industries" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform">
                        View All Industries <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>
        );
    }

    const IconComponent = LucideIcons[industry.icon] || LucideIcons.Building2;

    // Related services for this industry
    const relatedServices = (industry.relatedServices || [])
        .map((rs) => services.find((s) => s.slug === rs))
        .filter(Boolean);

    // Other industries to explore (pick 5 that are not the current one)
    const otherIndustries = industries
        .filter((i) => i.slug !== industry.slug)
        .slice(0, 5);

    const schemas = [
        buildOrganizationSchema(),
        buildFAQSchema(industry.faqs),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
            { name: industry.name },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title={industry.metaTitle.replace(' | The Provider System', '')}
                description={industry.metaDescription}
                url={`/industries/${industry.slug}`}
                schemas={schemas}
            />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'Industries', href: '/industries' },
                            { name: industry.name },
                        ]}
                        theme="dark"
                    />
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                            <IconComponent className="w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="font-drama text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        AI Automation for {industry.name}
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
                        {industry.excerpt}
                    </p>
                </div>
            </section>

            <div ref={contentRef}>
                {/* Description */}
                <section className="py-20 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {industry.description.map((paragraph, i) => (
                            <p key={i} className="ip-anim font-heading text-base md:text-lg text-muted leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Automation Use Cases */}
                {industry.automationUseCases && industry.automationUseCases.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="ip-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                What We Automate
                            </span>
                            <h2 className="ip-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Automation Use Cases
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {industry.automationUseCases.map((uc, i) => (
                                    <div
                                        key={i}
                                        className="ip-anim bg-background rounded-2xl p-8 border border-muted/10"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                            {uc.title}
                                        </h3>
                                        <p className="font-heading text-sm text-muted leading-relaxed">
                                            {uc.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Pain Points */}
                {industry.painPoints && industry.painPoints.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                        <div className="max-w-6xl mx-auto relative z-10">
                            <span className="ip-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Problems We Solve
                            </span>
                            <h2 className="ip-anim font-heading font-bold text-3xl md:text-5xl tracking-tight mb-12">
                                Pain Points Automation Eliminates
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {industry.painPoints.map((pp, i) => (
                                    <div
                                        key={i}
                                        className="ip-anim bg-white/5 border border-white/10 rounded-2xl p-8"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-white mb-2">
                                            {pp.title}
                                        </h3>
                                        <p className="font-heading text-sm text-white/60 leading-relaxed">
                                            {pp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Our Services for This Industry */}
                {relatedServices.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="ip-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Tailored Solutions
                            </span>
                            <h2 className="ip-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Our Services for {industry.shortName || industry.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedServices.map((svc) => {
                                    const SvcIcon = LucideIcons[svc.icon] || LucideIcons.Cog;
                                    return (
                                        <Link
                                            key={svc.slug}
                                            to={`/industries/${industry.slug}/${svc.slug}`}
                                            className="ip-anim group bg-white rounded-2xl p-6 border border-muted/10 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <SvcIcon className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-heading font-bold text-base text-primary mb-2 group-hover:text-accent transition-colors">
                                                {svc.shortName || svc.name}
                                            </h3>
                                            <p className="font-heading text-xs text-muted leading-relaxed flex-1 mb-4">
                                                {svc.shortName || svc.name} tailored for {industry.shortName || industry.name}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 font-data text-[0.65rem] uppercase tracking-widest text-accent font-bold">
                                                Learn More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {industry.faqs && industry.faqs.length > 0 && (
                    <FAQSection
                        faqs={industry.faqs}
                        title={`${industry.shortName || industry.name} Automation FAQ`}
                    />
                )}

                {/* Explore Other Industries */}
                {otherIndustries.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="ip-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                More Industries
                            </span>
                            <h2 className="ip-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Explore Other Industries
                            </h2>
                            <div className="ip-anim flex flex-wrap gap-3">
                                {otherIndustries.map((ind) => (
                                    <Link
                                        key={ind.slug}
                                        to={`/industries/${ind.slug}`}
                                        className="inline-flex items-center gap-2 bg-background border border-muted/10 rounded-full px-5 py-3 font-heading text-sm text-primary font-medium hover:border-accent hover:text-accent transition-colors shadow-sm"
                                    >
                                        {ind.shortName || ind.name}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <ContactFormSection
                heading={`Automate Your ${industry.shortName || industry.name} Operations`}
                subheading={`Tell us about your ${(industry.shortName || industry.name).toLowerCase()} business and we will build a custom automation plan.`}
            />
        </main>
    );
}
