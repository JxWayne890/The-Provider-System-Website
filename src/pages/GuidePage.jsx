import { useParams, Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { costGuides } from '../data/costGuides';

export default function GuidePage() {
    const { slug } = useParams();
    const guide = costGuides.find((g) => g.slug === slug);

    if (!guide) {
        return (
            <div className="bg-dark min-h-screen font-body text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading font-bold text-4xl mb-4">Guide Not Found</h1>
                    <p className="font-heading text-white/60 mb-8">The guide you are looking for does not exist.</p>
                    <Link to="/guides" className="font-heading text-accent hover:text-accent/80 transition-colors">
                        Back to Guides &rarr;
                    </Link>
                </div>
            </div>
        );
    }

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Guides', url: '/guides' },
            { name: guide.title },
        ]),
        ...(guide.faqs && guide.faqs.length > 0 ? [buildFAQSchema(guide.faqs)] : []),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title={guide.metaTitle}
                description={guide.metaDescription}
                url={`/guides/${guide.slug}`}
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-16">
                    <div className="max-w-4xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'Guides', href: '/guides' },
                                { name: guide.title },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Cost Guide
                        </span>
                        <h1 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-6">
                            {guide.title}
                        </h1>
                    </div>
                </section>

                {/* Intro */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {guide.intro.map((paragraph, i) => (
                            <p key={i} className="font-heading text-white/80 text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Factors That Affect Cost */}
                {guide.factors && guide.factors.length > 0 && (
                    <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Pricing Factors
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-12">
                                Factors That Affect Cost
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {guide.factors.map((factor, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-7"
                                    >
                                        <h3 className="font-heading font-bold text-lg text-white mb-3">
                                            {factor.title}
                                        </h3>
                                        <p className="font-heading text-white/60 text-sm leading-relaxed">
                                            {factor.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* What's Included */}
                {guide.whatsIncluded && guide.whatsIncluded.length > 0 && (
                    <section className="px-6 md:px-16 py-24">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Deliverables
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-12">
                                What Should Be Included
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {guide.whatsIncluded.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-heading font-bold text-lg text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-heading text-white/60 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ROI Considerations */}
                {guide.roiConsiderations && guide.roiConsiderations.length > 0 && (
                    <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                        <div className="max-w-4xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Return on Investment
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-10">
                                ROI Considerations
                            </h2>
                            <div className="space-y-6">
                                {guide.roiConsiderations.map((paragraph, i) => (
                                    <p key={i} className="font-heading text-white/80 text-base leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Questions to Ask */}
                {guide.questionsToAsk && guide.questionsToAsk.length > 0 && (
                    <section className="px-6 md:px-16 py-24">
                        <div className="max-w-4xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Due Diligence
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-10">
                                Questions to Ask Your Provider
                            </h2>
                            <ol className="space-y-5 list-none counter-reset-none">
                                {guide.questionsToAsk.map((question, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-data text-accent text-sm font-bold">
                                            {i + 1}
                                        </span>
                                        <p className="font-heading text-white/80 text-base leading-relaxed pt-1">
                                            {question}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                )}

                {/* Common Mistakes */}
                {guide.commonMistakes && guide.commonMistakes.length > 0 && (
                    <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Watch Out
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-12">
                                Common Mistakes to Avoid
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {guide.commonMistakes.map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-7"
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <h3 className="font-heading font-bold text-lg text-white">
                                                {item.mistake}
                                            </h3>
                                        </div>
                                        <p className="font-heading text-white/60 text-sm leading-relaxed pl-8">
                                            {item.explanation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                {guide.faqs && guide.faqs.length > 0 && (
                    <FAQSection faqs={guide.faqs} theme="dark" />
                )}

                {/* Related Service Link */}
                {guide.relatedServiceSlug && (
                    <section className="px-6 md:px-16 py-16 text-center">
                        <Link
                            to={`/services/${guide.relatedServiceSlug}`}
                            className="inline-flex items-center gap-2 font-heading font-bold text-accent hover:text-accent/80 transition-colors text-lg"
                        >
                            View the related service page <ArrowRight className="w-4 h-4" />
                        </Link>
                    </section>
                )}

                {/* Contact */}
                <ContactFormSection
                    heading="Get a Custom Quote"
                    subheading="Every project is different. Tell us about your requirements and get transparent pricing tailored to your needs."
                    theme="dark"
                />
            </main>
        </div>
    );
}
