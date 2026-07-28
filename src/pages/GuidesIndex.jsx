import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { costGuides } from '../data/costGuides';

export default function GuidesIndex() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Guides' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="AI Automation Cost Guides | Budgeting for Automation"
                description="Transparent cost guides for AI automation, chatbot development, SaaS builds, and more. Understand pricing factors, what to expect, and the right questions to ask."
                url="/guides"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'Guides' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Cost Guides
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            AI Automation Cost Guides
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Transparent breakdowns of what drives automation pricing, what should be included in every build, and the questions you should ask before signing any proposal.
                        </p>
                    </div>
                </section>

                {/* Guide Cards Grid */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                        {costGuides.map((guide) => (
                            <Link
                                key={guide.slug}
                                to={`/guides/${guide.slug}`}
                                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors"
                            >
                                <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-4 group-hover:text-accent transition-colors">
                                    {guide.title}
                                </h2>
                                <p className="font-heading text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {guide.intro[0]}
                                </p>
                                <span className="inline-flex items-center gap-2 font-data text-accent text-xs tracking-wider uppercase">
                                    Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Need a Custom Quote?"
                    subheading="Every project is different. Book a free consultation and get pricing tailored to your specific requirements."
                    theme="dark"
                />
            </main>
        </div>
    );
}
