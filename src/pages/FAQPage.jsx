import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';

const faqGroups = [
    {
        title: 'Fit and engagement',
        items: [
            {
                q: 'What kind of businesses does The Provider System work with?',
                a: 'The primary focus is West Texas service businesses—especially trades, field services, commercial and industrial operators, and selected local service companies. Remote projects outside West Texas remain available when the operating problem and working model fit.',
            },
            {
                q: 'Do I need to know whether I need a website, CRM, automation, or AI system?',
                a: 'No. Start with the customer or team handoff that is breaking. The system review is used to separate the actual workflow need from the first tool or service name that comes to mind.',
            },
            {
                q: 'Do you work with existing tools?',
                a: 'Yes, when they are a reasonable fit and the necessary access is available. A project may configure, integrate, or retain an existing product instead of replacing it.',
            },
        ],
    },
    {
        title: 'Scope, pricing, and ownership',
        items: [
            {
                q: 'How is pricing determined?',
                a: 'Pricing depends on scope, content, integrations, data, access, risk, and ongoing support. Current site materials have described website work from $2,500 or managed plans from $299 per month, CRM systems from $6,500 or managed plans from $750 per month, and larger custom systems from $12,000, but a written scope controls the actual price and terms.',
            },
            {
                q: 'Will I own the website or system?',
                a: 'Ownership, account access, delivered assets, third-party licenses, data, hosting, and handoff are stated in the project agreement. The Provider System does not make a blanket ownership promise that ignores platform or contract terms.',
            },
            {
                q: 'Are support and ongoing changes included?',
                a: 'Only when the written scope includes them. Launch support, managed service, maintenance, and future product work should be distinguished clearly before a project begins.',
            },
        ],
    },
    {
        title: 'AI and automation',
        items: [
            {
                q: 'Can an AI receptionist or chatbot handle every customer conversation?',
                a: 'No. AI systems should be limited to approved use cases and include clear uncertainty, escalation, and human handoff behavior. Sensitive, urgent, or unusual situations require specific policies.',
            },
            {
                q: 'Can every software product be integrated?',
                a: 'No. Feasibility depends on current APIs, permissions, plan limits, rate limits, data policy, and the quality of the available records. These constraints are verified before an integration is promised.',
            },
            {
                q: 'Do you guarantee rankings, leads, revenue, savings, or AI accuracy?',
                a: 'No. The Provider System can design and implement useful infrastructure, but these outcomes depend on market, demand, offer, reputation, sales, delivery, data, platform behavior, and other factors outside a build.',
            },
        ],
    },
    {
        title: 'West Texas and remote delivery',
        items: [
            {
                q: 'Where is The Provider System located?',
                a: 'The Provider System is anchored in San Angelo and serves West Texas through a founder-led, remote-first delivery model. The site does not claim additional offices in Abilene, Lubbock, Midland, or Odessa.',
            },
            {
                q: 'Do you create a page for every West Texas city?',
                a: 'No. A regional or city page should contain distinct local context or proof. Otherwise, statewide, service, industry, and case-study pages provide a more useful structure than a doorway-page matrix.',
            },
            {
                q: 'Can the work be completed remotely?',
                a: 'Yes, many engagements can be delivered remotely. Any need for on-site discovery, content capture, training, or other coordination is discussed in the project scope.',
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <main>
            <SEO
                title="Frequently Asked Questions"
                description="Answers about West Texas website and lead-system services, project fit, pricing, ownership, automation, and remote delivery."
                url="/faq"
            />
            <PageHero
                eyebrow="FAQ"
                title="Clear answers before the project begins."
                description="These answers explain the current service model and its boundaries. A written proposal and project agreement control the exact scope, pricing, ownership, and support terms."
                breadcrumbs={[{ label: 'FAQ' }]}
                actions={
                    <Link to="/start" className="button-primary">
                        Request a website and lead-flow review
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                }
            />
            <section className="section-pad bg-white">
                <div className="page-shell space-y-16">
                    {faqGroups.map((group) => (
                        <section key={group.title} className="grid gap-10 lg:grid-cols-[0.5fr_1fr]">
                            <SectionHeading title={group.title} />
                            <FaqAccordion items={group.items} />
                        </section>
                    ))}
                </div>
            </section>
            <SystemReviewCTA />
        </main>
    );
}
