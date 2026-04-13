import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { homeFaqData } from '../data/homeFaqData';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { useCases } from '../data/useCases';
import { cn } from '../lib/cn';

// Normalize FAQ formats: homeFaqData uses { question, answer }, others use { q, a }
function normalizeToQA(faq) {
    return {
        q: faq.q || faq.question,
        a: faq.a || faq.answer,
    };
}

// Collect all FAQs grouped by category
function buildGroups() {
    const generalFaqs = homeFaqData.map(normalizeToQA);

    const serviceFaqs = services.flatMap((s) =>
        (s.faqs || []).map(normalizeToQA)
    );

    const industryFaqs = industries.flatMap((ind) =>
        (ind.faqs || []).map(normalizeToQA)
    );

    const useCaseFaqs = useCases.flatMap((uc) =>
        (uc.faqs || []).map(normalizeToQA)
    );

    return [
        { key: 'general', label: 'General', faqs: generalFaqs },
        { key: 'services', label: 'Services', faqs: serviceFaqs },
        { key: 'industries', label: 'Industries', faqs: industryFaqs },
        { key: 'use-cases', label: 'Use Cases', faqs: useCaseFaqs },
    ].filter((g) => g.faqs.length > 0);
}

function CollapsibleGroup({ group, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-white/10 rounded-2xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left group hover:bg-white/[0.02] transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-4">
                    <h2 className="font-heading font-bold text-2xl text-white group-hover:text-accent transition-colors">
                        {group.label}
                    </h2>
                    <span className="font-data text-white/30 text-xs tracking-wider">
                        {group.faqs.length} questions
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        'w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>
            {isOpen && (
                <div className="border-t border-white/5">
                    <FAQSection
                        faqs={group.faqs}
                        title={`${group.label} Questions`}
                        theme="dark"
                    />
                </div>
            )}
        </div>
    );
}

export default function FAQHubPage() {
    const groups = buildGroups();

    // Flatten all FAQs for schema
    const allFaqs = groups.flatMap((g) => g.faqs);

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'FAQ Hub' },
        ]),
        buildFAQSchema(allFaqs),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="FAQ Hub | Everything About AI Automation | The Provider System"
                description="Comprehensive FAQ hub covering AI automation, services, industry-specific questions, and use cases. Find answers to every question about working with The Provider System."
                url="/faq-hub"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-16">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'FAQ Hub' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Knowledge Base
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            FAQ Hub
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Every question answered in one place. Browse by category to find answers about our services, industry solutions, use cases, and how we work.
                        </p>
                        <p className="font-data text-white/30 text-sm mt-4">
                            {allFaqs.length} total questions across {groups.length} categories
                        </p>
                    </div>
                </section>

                {/* Collapsible Groups */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {groups.map((group, i) => (
                            <CollapsibleGroup
                                key={group.key}
                                group={group}
                                defaultOpen={i === 0}
                            />
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Still Have Questions?"
                    subheading="If you did not find your answer above, reach out directly and we will get back to you within 24 hours."
                    theme="dark"
                />
            </main>
        </div>
    );
}
