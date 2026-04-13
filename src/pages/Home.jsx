import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Protocol from '../components/Protocol';
import ProjectCarousel from '../components/ProjectCarousel';
import GetStarted from '../components/GetStarted';
import SEO from '../components/SEO';
import { GeoCapsuleGrid } from '../components/GeoBlocks';

const geoEntityCapsules = [
    {
        label: 'Who The Provider\'s System Is',
        value: 'The Provider\'s System is a custom development and automation company that builds websites, AI workflows, SaaS applications, and internal operating tools for business owners.'
    },
    {
        label: 'What It Does',
        value: 'It designs fast digital systems that reduce manual work, improve online visibility, organize lead flow, and give teams a cleaner operating setup.'
    },
    {
        label: 'Who It Serves',
        value: 'The company works with founders, service businesses, and lean operators that need reliable website development, automation, and performance without enterprise-level complexity.'
    },
    {
        label: 'What Results Clients Can Expect',
        value: 'Clients can expect clearer websites, better lead handling, less repetitive admin work, and direct ownership of the code, content, and digital assets that support the business.'
    }
];

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');

            const scrollTimer = setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 600);

            return () => clearTimeout(scrollTimer);
        }
    }, [hash]);

    // Build @graph schema array
    const seoSchemas = [
        // Organization
        {
            "@type": "Organization",
            "@id": "https://theprovidersystem.com/#organization",
            "name": "The Provider System",
            "url": "https://theprovidersystem.com",
            "logo": "https://theprovidersystem.com/logo.png",
            "description": "A digital architecture group specializing in AI-powered automation, high-performance SaaS applications, and custom internal workflow tools for founders and operators.",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "theprovidersystem@gmail.com",
                "availableLanguage": "English"
            },
            "knowsAbout": [
                "Business Process Automation",
                "AI Integration",
                "SaaS Development",
                "Workflow Optimization",
                "Lead Routing Systems",
                "Custom Internal Tools"
            ],
            "sameAs": []
        },
        // WebSite with SearchAction
        {
            "@type": "WebSite",
            "@id": "https://theprovidersystem.com/#website",
            "url": "https://theprovidersystem.com",
            "name": "The Provider System",
            "publisher": { "@id": "https://theprovidersystem.com/#organization" },
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://theprovidersystem.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },
        // BreadcrumbList — Home
        {
            "@type": "BreadcrumbList",
            "@id": "https://theprovidersystem.com/#breadcrumbs",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://theprovidersystem.com/"
                }
            ]
        },
        // Service: AI Automation
        {
            "@type": "Service",
            "@id": "https://theprovidersystem.com/#service-automation",
            "name": "AI Workflow Automation",
            "provider": { "@id": "https://theprovidersystem.com/#organization" },
            "serviceType": "Business Process Automation",
            "description": "Custom data extraction, routing, and workflow automation systems that replace manual processes with intelligent, rule-based AI pipelines."
        },
        // Service: Lead Routing
        {
            "@type": "Service",
            "@id": "https://theprovidersystem.com/#service-lead-routing",
            "name": "Intelligent Lead Routing",
            "provider": { "@id": "https://theprovidersystem.com/#organization" },
            "serviceType": "CRM Automation & Lead Management",
            "description": "Automated lead capture, validation, and outreach systems that eliminate slow response times and revenue leaks from missed follow-ups."
        },
        // Service: SaaS Development
        {
            "@type": "Service",
            "@id": "https://theprovidersystem.com/#service-saas",
            "name": "Custom SaaS Development",
            "provider": { "@id": "https://theprovidersystem.com/#organization" },
            "serviceType": "Software as a Service Development",
            "description": "High-performance, fully deployed SaaS applications and internal tools built with modern frameworks for speed, scalability, and operational control."
        }
    ];

    return (
        <main>
            <SEO
                title="AI Architecture & Automation"
                description="The Provider System builds AI-powered automation, SaaS applications, and internal workflow tools that help founders and operators reclaim their time without sacrificing control."
                url="/"
                schemas={seoSchemas}
            />
            <Hero />
            <section id="about" className="py-20 px-6 md:px-16 bg-background relative z-20">
                <div className="max-w-6xl mx-auto">
                    <GeoCapsuleGrid
                        eyebrow="Entity Clarity"
                        title="Quick answers about The Provider System"
                        intro="This section gives both human visitors and AI systems a direct summary of who The Provider System is, what it builds, who it helps, and why the work matters."
                        capsules={geoEntityCapsules}
                    />
                </div>
            </section>
            <Features />

            {/* CTA Banner replacing inline terminal */}
            <section className="py-24 px-6 md:px-16 bg-[#05162D] text-white border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">Find out exactly how much your manual processes are <span className="text-accent italic font-serif">costing you.</span></h2>
                    <p className="font-data text-sm md:text-base text-white/60 mb-10 max-w-2xl mx-auto">Take our 2-minute operational audit to identify your exact bottlenecks and generate a custom automation blueprint.</p>
                    <a href="/diagnostic" className="inline-flex items-center justify-center group relative overflow-hidden rounded-full bg-accent text-white px-8 py-4 font-heading text-lg font-bold hover:scale-[1.02] transition-transform duration-300 shadow-xl hover:shadow-accent/40">
                        <span className="relative z-10 transition-colors group-hover:text-primary">Run System Diagnostic</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    </a>
                </div>
            </section>

            <Protocol />
            <ProjectCarousel />
            <GetStarted />
        </main>
    );
}
