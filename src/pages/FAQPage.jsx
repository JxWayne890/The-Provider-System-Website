import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { GeoQuestionGrid } from '../components/GeoBlocks';
import { homeFaqData } from '../data/homeFaqData';

const geoPrimerQuestions = [
    {
        question: 'Who is The Provider System?',
        answer: 'The Provider System builds websites, CRMs, follow-up systems, and custom operating tools for blue-collar service businesses and select serious operators.'
    },
    {
        question: 'What is the main focus?',
        answer: 'The main lane is blue-collar and service businesses that need to get found, capture leads, follow up faster, and keep ownership of the system.'
    },
    {
        question: 'Why still mention custom systems?',
        answer: 'Some projects are worth more than a website. FlowOS and The Offer Hero are examples of selective custom systems where the operational value justified a deeper build.'
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
            "description": "Find answers to common questions about The Provider System websites, CRMs, follow-up systems, and custom operating tools.",
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
                description="Find answers to common questions about websites, CRMs, follow-up systems, ownership, pricing, and custom operating tools."
                url="/faq"
                schemas={schemas}
            />
            <main className="pt-32 pb-24">
                <section className="px-6 md:px-16 mb-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight">
                            Straight answers about The Provider System
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            A short FAQ for owners comparing website, lead system, and custom operating system options.
                        </p>
                        <GeoQuestionGrid
                            className="mt-12"
                            theme="dark"
                            eyebrow="Quick Primer"
                            title="Three quick answers before the full FAQ"
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
