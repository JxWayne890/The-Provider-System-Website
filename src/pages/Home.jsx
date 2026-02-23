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
            <Protocol />
            <ProjectCarousel />
            <GetStarted />
        </main>
    );
}
