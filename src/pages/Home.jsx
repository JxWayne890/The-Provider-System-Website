import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Protocol from '../components/Protocol';
import ProjectCarousel from '../components/ProjectCarousel';
import GetStarted from '../components/GetStarted';
import SEO from '../components/SEO';

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');

            // Larger timeout to wait for heavy animations/images to settle
            const scrollTimer = setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const offset = 80; // Account for fixed navbar
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

    return (
        <main>
            <SEO
                title="AI Architecture & Automation"
                description="We build high-performance deployed systems, AI wrappers, and internal tools that give you your time back without sacrificing peace."
                url="/"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "The Provider's System",
                    "url": "https://theprovidersystem.com",
                    "logo": "https://theprovidersystem.com/logo.png",
                    "description": "A digital architecture group specializing in high-performance SaaS applications, dynamic corporate sites, and custom internal workflow automation.",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "Customer Service",
                        "email": "josh@theprovidersystem.com",
                        "availableLanguage": "English"
                    },
                    "sameAs": []
                }}
            />
            <Hero />
            <Features />

            {/* CTA Banner replacing inline terminal */}
            <section className="py-24 px-6 md:px-16 bg-[#05162D] text-white border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
                <div className="relative z-10 max-w-3xl">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">Find out exactly how much your manual processes are <span className="text-accent italic font-serif">costing you.</span></h2>
                    <p className="font-data text-sm md:text-base text-white/60 mb-10 max-w-2xl mx-auto">Take our 2-minute operational audit to identify your exact bottlenecks and generate a custom automation blueprint.</p>
                    {/* Hardlink used here to force a fresh page load for the diagnostic PWA feel, 
                        if using standard Link it must be imported from react-router-dom */}
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
