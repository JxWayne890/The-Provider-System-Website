import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import {
    buildOrganizationSchema,
    buildServiceSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
} from '../components/SchemaMarkup';
import { services } from '../data/services';
import { industries } from '../data/industries';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage() {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!service) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.sp-anim',
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
    }, [service]);

    if (!service) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading font-bold text-4xl text-primary mb-4">Service Not Found</h1>
                    <p className="font-heading text-muted mb-8">The service you are looking for does not exist.</p>
                    <Link to="/services" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform">
                        View All Services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>
        );
    }

    const IconComponent = LucideIcons[service.icon] || LucideIcons.Cog;

    // Related services
    const relatedServices = (service.relatedServices || [])
        .map((rs) => services.find((s) => s.slug === rs))
        .filter(Boolean)
        .slice(0, 3);

    // Related industries
    const relatedIndustries = (service.relatedIndustries || [])
        .map((ri) => industries.find((i) => i.slug === ri))
        .filter(Boolean)
        .slice(0, 5);

    const schemas = [
        buildOrganizationSchema(),
        buildServiceSchema({
            name: service.name,
            description: service.metaDescription,
            url: `/services/${service.slug}`,
        }),
        buildFAQSchema(service.faqs),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.name },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title={service.metaTitle.replace(' | The Provider System', '')}
                description={service.metaDescription}
                url={`/services/${service.slug}`}
                schemas={schemas}
            />

            {/* Hero */}
            <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'Services', href: '/services' },
                            { name: service.name },
                        ]}
                        theme="dark"
                    />
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                            <IconComponent className="w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="font-drama text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        {service.name}
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
                        {service.excerpt}
                    </p>
                </div>
            </section>

            <div ref={contentRef}>
                {/* Description */}
                <section className="py-20 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {service.description.map((paragraph, i) => (
                            <p key={i} className="sp-anim font-heading text-base md:text-lg text-muted leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Advantages
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {service.benefits.map((benefit, i) => (
                                    <div
                                        key={i}
                                        className="sp-anim bg-background rounded-2xl p-8 border border-muted/10"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="font-heading text-sm text-muted leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Process / Timeline */}
                {service.process && service.process.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                        <div className="max-w-4xl mx-auto relative z-10">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Our Process
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl tracking-tight mb-16">
                                How We Build It
                            </h2>
                            <div className="space-y-0">
                                {service.process.map((step, i) => (
                                    <div key={i} className="sp-anim flex gap-6 md:gap-10 relative">
                                        {/* Timeline line */}
                                        {i < service.process.length - 1 && (
                                            <div className="absolute left-[1.375rem] md:left-[1.625rem] top-14 bottom-0 w-px bg-white/10" />
                                        )}
                                        {/* Step number */}
                                        <div className="flex-shrink-0 w-11 h-11 md:w-[3.25rem] md:h-[3.25rem] rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-lg relative z-10">
                                            {step.step}
                                        </div>
                                        {/* Content */}
                                        <div className="pb-12">
                                            <h3 className="font-heading font-bold text-xl text-white mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="font-heading text-white/60 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Use Cases */}
                {service.useCases && service.useCases.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Applications
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Use Cases
                            </h2>
                            <div className="sp-anim flex flex-wrap gap-3">
                                {service.useCases.map((uc, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-muted/10 rounded-xl px-5 py-4 font-heading text-sm text-muted leading-relaxed shadow-sm"
                                    >
                                        {uc}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Who It's For */}
                {service.whoItsFor && service.whoItsFor.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-4xl mx-auto">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Ideal Clients
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Who It&apos;s For
                            </h2>
                            <ul className="sp-anim space-y-4">
                                {service.whoItsFor.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="font-heading text-muted leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {service.faqs && service.faqs.length > 0 && (
                    <FAQSection faqs={service.faqs} title={`${service.shortName || service.name} FAQ`} />
                )}

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Explore More
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Related Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedServices.map((rs) => {
                                    const RSIcon = LucideIcons[rs.icon] || LucideIcons.Cog;
                                    return (
                                        <Link
                                            key={rs.slug}
                                            to={`/services/${rs.slug}`}
                                            className="sp-anim group bg-background rounded-2xl p-8 border border-muted/10 hover:border-accent hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <RSIcon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-heading font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                                                {rs.name}
                                            </h3>
                                            <p className="font-heading text-sm text-muted leading-relaxed">
                                                {rs.excerpt}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Industries We Serve */}
                {relatedIndustries.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="sp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Industry Focus
                            </span>
                            <h2 className="sp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Industries We Serve
                            </h2>
                            <div className="sp-anim flex flex-wrap gap-3">
                                {relatedIndustries.map((ind) => (
                                    <Link
                                        key={ind.slug}
                                        to={`/industries/${ind.slug}`}
                                        className="inline-flex items-center gap-2 bg-white border border-muted/10 rounded-full px-5 py-3 font-heading text-sm text-primary font-medium hover:border-accent hover:text-accent transition-colors shadow-sm"
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
                heading={`Get ${service.shortName || service.name} for Your Business`}
                subheading="Tell us about your current workflow and we will scope an automation plan within 24 hours."
            />
        </main>
    );
}
