import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
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

export default function IndustryServicePage() {
    const { industrySlug, serviceSlug } = useParams();
    const industry = industries.find((i) => i.slug === industrySlug);
    const service = services.find((s) => s.slug === serviceSlug);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!industry || !service) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.isp-anim',
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
    }, [industry, service]);

    // 404 handling
    if (!industry || !service) {
        const missing = !industry && !service ? 'industry and service' : !industry ? 'industry' : 'service';
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading font-bold text-4xl text-primary mb-4">Page Not Found</h1>
                    <p className="font-heading text-muted mb-8">The {missing} combination you are looking for does not exist.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/services" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform">
                            View Services <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/industries" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform">
                            View Industries <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const ServiceIcon = LucideIcons[service.icon] || LucideIcons.Cog;
    const industryName = industry.shortName || industry.name;
    const serviceName = service.shortName || service.name;

    // Combined FAQs: first 3 from service, first 3 from industry (no duplicates)
    const serviceFaqs = (service.faqs || []).slice(0, 3);
    const industryFaqs = (industry.faqs || []).slice(0, 3);
    const combinedFaqs = [...serviceFaqs, ...industryFaqs];

    // Other industries for the same service
    const otherIndustriesForService = industries
        .filter((i) => i.slug !== industry.slug)
        .filter((i) => (i.relatedServices || []).includes(service.slug))
        .slice(0, 6);

    // Other services for the same industry
    const otherServicesForIndustry = (industry.relatedServices || [])
        .map((rs) => services.find((s) => s.slug === rs))
        .filter(Boolean)
        .filter((s) => s.slug !== service.slug)
        .slice(0, 4);

    const schemas = [
        buildOrganizationSchema(),
        buildServiceSchema({
            name: `${service.name} for ${industry.name}`,
            description: `${service.metaDescription} Tailored specifically for ${industry.name.toLowerCase()}.`,
            url: `/industries/${industry.slug}/${service.slug}`,
        }),
        buildFAQSchema(combinedFaqs),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
            { name: industry.name, url: `/industries/${industry.slug}` },
            { name: service.name },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title={`${service.name} for ${industry.name}`}
                description={`${service.name} built specifically for ${industry.name.toLowerCase()}. ${service.excerpt}`}
                url={`/industries/${industry.slug}/${service.slug}`}
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
                            { name: industry.name, href: `/industries/${industry.slug}` },
                            { name: service.name },
                        ]}
                        theme="dark"
                    />
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                            <ServiceIcon className="w-7 h-7" />
                        </div>
                    </div>
                    <h1 className="font-drama text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        {service.name} for {industry.name}
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
                        {service.excerpt}
                    </p>
                </div>
            </section>

            <div ref={contentRef}>
                {/* Combined Intro — blends service and industry context */}
                <section className="py-20 px-6 md:px-16">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <p className="isp-anim font-heading text-base md:text-lg text-muted leading-relaxed">
                            For {industry.name.toLowerCase()} businesses, {service.description[0]}
                        </p>
                        {industry.description[0] && (
                            <p className="isp-anim font-heading text-base md:text-lg text-muted leading-relaxed">
                                {industry.description[0]}
                            </p>
                        )}
                        {service.description[1] && (
                            <p className="isp-anim font-heading text-base md:text-lg text-muted leading-relaxed">
                                {service.description[1]}
                            </p>
                        )}
                    </div>
                </section>

                {/* Industry-Specific Use Cases */}
                {industry.automationUseCases && industry.automationUseCases.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                {industryName} Applications
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                How {serviceName} Works in {industryName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {industry.automationUseCases.map((uc, i) => (
                                    <div
                                        key={i}
                                        className="isp-anim bg-background rounded-2xl p-8 border border-muted/10"
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

                {/* Service Use Cases */}
                {service.useCases && service.useCases.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-4xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                {serviceName} Applications
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                General {serviceName} Use Cases
                            </h2>
                            <div className="isp-anim flex flex-wrap gap-3">
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

                {/* Process — adapted with industry context */}
                {service.process && service.process.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                        <div className="max-w-4xl mx-auto relative z-10">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Implementation Process
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl tracking-tight mb-16">
                                How We Deploy {serviceName} for {industryName}
                            </h2>
                            <div className="space-y-0">
                                {service.process.map((step, i) => (
                                    <div key={i} className="isp-anim flex gap-6 md:gap-10 relative">
                                        {i < service.process.length - 1 && (
                                            <div className="absolute left-[1.375rem] md:left-[1.625rem] top-14 bottom-0 w-px bg-white/10" />
                                        )}
                                        <div className="flex-shrink-0 w-11 h-11 md:w-[3.25rem] md:h-[3.25rem] rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-lg relative z-10">
                                            {step.step}
                                        </div>
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

                {/* Industry Pain Points */}
                {industry.painPoints && industry.painPoints.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                {industryName} Challenges
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Pain Points {serviceName} Solves in {industryName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {industry.painPoints.map((pp, i) => (
                                    <div
                                        key={i}
                                        className="isp-anim bg-background rounded-2xl p-8 border border-muted/10"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-heading font-bold text-lg text-primary mb-2">
                                            {pp.title}
                                        </h3>
                                        <p className="font-heading text-sm text-muted leading-relaxed">
                                            {pp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Benefits from service data */}
                {service.benefits && service.benefits.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Advantages
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Benefits of {serviceName} for {industryName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {service.benefits.map((benefit, i) => (
                                    <div
                                        key={i}
                                        className="isp-anim bg-white rounded-2xl p-8 border border-muted/10"
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

                {/* Combined FAQ */}
                {combinedFaqs.length > 0 && (
                    <FAQSection
                        faqs={combinedFaqs}
                        title={`${serviceName} for ${industryName} FAQ`}
                    />
                )}

                {/* Other Industries for Same Service */}
                {otherIndustriesForService.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Same Service, Different Industry
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                {service.name} for Other Industries
                            </h2>
                            <div className="isp-anim flex flex-wrap gap-3">
                                {otherIndustriesForService.map((ind) => (
                                    <Link
                                        key={ind.slug}
                                        to={`/industries/${ind.slug}/${service.slug}`}
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

                {/* Other Services for Same Industry */}
                {otherServicesForIndustry.length > 0 && (
                    <section className="py-20 px-6 md:px-16">
                        <div className="max-w-6xl mx-auto">
                            <span className="isp-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                More for {industryName}
                            </span>
                            <h2 className="isp-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                Other Services for {industry.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {otherServicesForIndustry.map((svc) => {
                                    const SvcIcon = LucideIcons[svc.icon] || LucideIcons.Cog;
                                    return (
                                        <Link
                                            key={svc.slug}
                                            to={`/industries/${industry.slug}/${svc.slug}`}
                                            className="isp-anim group bg-white rounded-2xl p-6 border border-muted/10 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <SvcIcon className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-heading font-bold text-base text-primary mb-2 group-hover:text-accent transition-colors">
                                                {svc.shortName || svc.name}
                                            </h3>
                                            <p className="font-heading text-xs text-muted leading-relaxed flex-1 mb-4">
                                                {svc.excerpt}
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
            </div>

            <ContactFormSection
                heading={`Get ${serviceName} for ${industryName}`}
                subheading={`Tell us about your ${industryName.toLowerCase()} operations and we will scope a custom ${serviceName.toLowerCase()} solution within 24 hours.`}
            />
        </main>
    );
}
