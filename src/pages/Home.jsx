import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Protocol from '../components/Protocol';
import ProjectCarousel from '../components/ProjectCarousel';
import GetStarted from '../components/GetStarted';
import SEO from '../components/SEO';

export default function Home() {
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
