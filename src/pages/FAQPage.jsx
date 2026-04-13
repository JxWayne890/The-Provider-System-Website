import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { GeoQuestionGrid } from '../components/GeoBlocks';
import { homeFaqData } from '../data/homeFaqData';

const geoPrimerQuestions = [
    {
        question: 'Who is The Provider\'s System?',
        answer: 'The Provider\'s System is a custom development and automation company focused on websites, AI workflows, SaaS applications, and internal systems for business owners.'
    },
    {
        question: 'What is GEO in plain language?',
        answer: 'GEO means structuring site content so AI systems can understand the business, extract the right facts, compare the offer clearly, and cite the company more accurately in generated answers.'
    },
    {
        question: 'How is GEO different from SEO and AEO?',
        answer: 'SEO helps people find a site in search. AEO helps answer engines pull direct responses. GEO helps generative systems understand the entity and summarize it with fewer gaps or errors.'
    }
];

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
            "name": "Frequently Asked Questions | The Provider System",
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
                title="Frequently Asked Questions | The Provider System"
                description="Find answers to common questions about our AI automation, custom SaaS builds, and system deployment protocols."
                canonicalUrl="https://theprovidersystem.com/faq"
                schemas={schemas}
            />
            <main className="pt-32 pb-24">
                <section className="px-6 md:px-16 mb-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight">
                            Straight answers about The Provider&apos;s System
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            This page keeps the existing FAQ intact and adds a short primer that explains the company, the work, and how SEO, AEO, and GEO relate to each other.
                        </p>
                        <GeoQuestionGrid
                            className="mt-12"
                            theme="dark"
                            eyebrow="GEO Primer"
                            title="Three quick questions before the full FAQ"
                            items={geoPrimerQuestions}
                        />
                    </div>
                </section>
                <FAQ faqs={homeFaqData} />
            </main>
        </div>
    );
};

export default FAQPage;
