import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { homeFaqData } from './Home';

const FAQPage = () => {
    // Generate the schema specifically for the FAQ page
    const faqSchema = {
        "@type": "FAQPage",
        "@id": "https://theprovidersystem.com/faq/#faq",
        "mainEntity": homeFaqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://theprovidersystem.com/faq/#webpage",
            "url": "https://theprovidersystem.com/faq",
            "name": "Frequently Asked Questions | The Provider's System",
            "description": "Find answers to common questions about our AI automation, custom SaaS builds, and system deployment protocols.",
            "isPartOf": { "@id": "https://theprovidersystem.com/#website" }
        },
        faqSchema,
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "https://theprovidersystem.com/",
                        "name": "Home"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": "https://theprovidersystem.com/faq",
                        "name": "FAQ"
                    }
                }
            ]
        }
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Frequently Asked Questions | The Provider's System"
                description="Find answers to common questions about our AI automation, custom SaaS builds, and system deployment protocols."
                canonicalUrl="https://theprovidersystem.com/faq"
                schemas={schemas}
            />
            <Navbar />
            <main className="pt-32 pb-24">
                <FAQ faqs={homeFaqData} />
            </main>
            <Footer />
        </div>
    );
};

export default FAQPage;
