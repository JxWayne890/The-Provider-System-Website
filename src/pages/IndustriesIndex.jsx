import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { industries } from '../data/industries';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesIndex() {
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.industry-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, gridRef);
        return () => ctx.revert();
    }, []);

    const schemas = [
        buildOrganizationSchema(),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title="Industries We Serve | AI Automation by Industry"
                description="See how The Provider System builds AI automation solutions tailored for 20 different industries including healthcare, legal, real estate, e-commerce, and more."
                url="/industries"
                schemas={schemas}
            />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'Industries' },
                        ]}
                        theme="dark"
                    />
                    <h1 className="font-drama text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Industries We Serve
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                        AI automation works differently for every industry. The compliance requirements, workflows, pain points, and growth levers vary dramatically from healthcare to e-commerce to construction. We build systems that account for those differences from day one.
                    </p>
                </div>
            </section>

            {/* Industries Grid */}
            <section ref={gridRef} className="py-24 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {industries.map((industry) => {
                            const IconComponent = LucideIcons[industry.icon] || LucideIcons.Building2;
                            return (
                                <Link
                                    key={industry.slug}
                                    to={`/industries/${industry.slug}`}
                                    className="industry-card group relative bg-white rounded-2xl p-8 border border-muted/10 shadow-sm hover:shadow-xl hover:border-accent transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-bold text-lg text-primary mb-3 group-hover:text-accent transition-colors">
                                        {industry.name}
                                    </h3>
                                    <p className="font-heading text-sm text-muted leading-relaxed flex-1 mb-6">
                                        {industry.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 font-data text-xs uppercase tracking-widest text-accent font-bold group-hover:gap-3 transition-all">
                                        Explore <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ContactFormSection
                heading="Automation for your industry"
                subheading="Tell us your industry and biggest bottleneck. We will show you what automation looks like for your specific business."
            />
        </main>
    );
}
