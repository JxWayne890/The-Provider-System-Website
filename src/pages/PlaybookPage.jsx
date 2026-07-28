import { ArrowLeft, Check, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqAccordion from '../components/FaqAccordion';
import { ServiceCard } from '../components/ContentCards';
import { BreadcrumbTrail, SystemReviewCTA } from '../components/PageElements';
import { playbooks } from '../data/playbooks';
import { services } from '../data/siteContent';
import NotFoundPage from './NotFoundPage';

const serviceAliases = {
    'website-development': 'websites',
    'local-seo-and-lead-generation': 'local-seo',
    'lead-generation-automation': 'lead-generation',
    'lead-crm-system': 'crm-jobber-alternatives',
    'crm-integration': 'crm-jobber-alternatives',
    'follow-up-systems': 'lead-follow-up',
    'ai-workflow-automation': 'automation',
    'business-process-automation': 'automation',
    'chatbot-development': 'ai-chatbots',
    'ai-phone-agent': 'ai-receptionist',
    'ai-support': 'ai-customer-support',
    'content-video-systems': 'ai-content-video',
    'ai-growth': 'ai-growth-systems',
    'custom-saas-development': 'custom-systems',
};

export default function PlaybookPage() {
    const { slug } = useParams();
    const playbook = playbooks.find((item) => item.slug === slug);

    if (!playbook) return <NotFoundPage />;

    const relatedServices = [...new Set(playbook.relatedServices || [])]
        .map((id) => serviceAliases[id] || id)
        .map((id) => services.find((service) => service.slug === id))
        .filter(Boolean)
        .slice(0, 3);
    const faqItems = (playbook.faq || []).map((item) => ({
        q: item.question,
        a: item.answer,
    }));

    const schemas = [
        {
            '@type': 'Article',
            '@id': `https://theprovidersystem.com/playbooks/${playbook.slug}#article`,
            headline: playbook.title,
            description: playbook.description,
            datePublished: playbook.publishDate,
            dateModified: playbook.dateModified,
            author: { '@type': 'Person', name: 'John W Johnson' },
            publisher: { '@id': 'https://theprovidersystem.com/#organization' },
            mainEntityOfPage: `https://theprovidersystem.com/playbooks/${playbook.slug}`,
        },
    ];

    return (
        <main className="bg-background">
            <SEO
                title={playbook.title}
                description={playbook.description}
                url={`/playbooks/${playbook.slug}`}
                type="article"
                schemas={schemas}
            />

            <article>
                <header className="relative overflow-hidden bg-primary pb-20 pt-40 text-white md:pb-24 md:pt-48">
                    <div className="grid-field absolute inset-0 opacity-70" aria-hidden="true" />
                    <div className="page-shell relative">
                        <BreadcrumbTrail
                            dark
                            items={[
                                { label: 'Playbooks', to: '/playbooks' },
                                { label: playbook.title },
                            ]}
                        />
                        <span className="rounded-full border border-sun/30 bg-sun/10 px-3 py-1.5 font-data text-[0.58rem] font-bold uppercase tracking-[0.16em] text-sun">
                            {playbook.category}
                        </span>
                        <h1 className="mt-7 max-w-5xl font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                            {playbook.title}
                        </h1>
                        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">{playbook.description}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/48">
                            <span>By John W Johnson</span>
                            <span aria-hidden="true">•</span>
                            <time dateTime={playbook.publishDate}>{formatDate(playbook.publishDate)}</time>
                            <span aria-hidden="true">•</span>
                            <span className="inline-flex items-center gap-2">
                                <Clock3 className="h-4 w-4" aria-hidden="true" />
                                {playbook.readTime}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="reading-shell py-16 md:py-20">
                    <aside className="mb-14 rounded-3xl border border-teal/20 bg-sky p-7 sm:p-8">
                        <p className="font-data text-[0.62rem] font-bold uppercase tracking-[0.18em] text-teal">
                            Key takeaway
                        </p>
                        <p className="mt-4 text-xl font-semibold leading-8 text-primary">{playbook.keyTakeaway}</p>
                    </aside>

                    <div className="space-y-14">
                        {playbook.sections.map((section) => (
                            <section key={section.heading}>
                                <h2 className="font-heading text-3xl font-bold leading-tight tracking-[-0.035em] text-primary">
                                    {section.heading}
                                </h2>
                                <div className="mt-6 space-y-5">
                                    {section.paragraphs.map((paragraph) => (
                                        <p key={paragraph.slice(0, 70)} className="text-lg leading-8 text-muted">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                                {section.bullets && (
                                    <ul className="mt-7 space-y-3 rounded-3xl border border-primary/10 bg-white p-6 sm:p-7">
                                        {section.bullets.map((item) => (
                                            <li key={item} className="flex items-start gap-3 leading-7 text-primary/75">
                                                <Check className="mt-1 h-5 w-5 flex-none text-teal" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>

                    {playbook.table && (
                        <section className="mt-16">
                            <h2 className="font-heading text-3xl font-bold tracking-[-0.035em] text-primary">
                                {playbook.table.caption}
                            </h2>
                            <div className="mt-6 overflow-x-auto rounded-3xl border border-primary/10 bg-white">
                                <table className="min-w-full border-collapse text-left text-sm">
                                    <caption className="sr-only">{playbook.table.caption}</caption>
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            {playbook.table.headers.map((header) => (
                                                <th key={header} scope="col" className="px-5 py-4 font-bold">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playbook.table.rows.map((row, rowIndex) => (
                                            <tr key={`${row[0]}-${rowIndex}`} className="border-t border-primary/10">
                                                {row.map((cell, cellIndex) => (
                                                    <td key={`${cell}-${cellIndex}`} className="px-5 py-4 align-top leading-6 text-muted">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {playbook.checklist && (
                        <section className="mt-16 rounded-[2rem] bg-primary p-7 text-white sm:p-10">
                            <p className="eyebrow mb-4 text-sun">Working checklist</p>
                            <h2 className="text-3xl font-bold tracking-[-0.035em]">Use this before the next decision.</h2>
                            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                                {playbook.checklist.map((item) => (
                                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-white/72">
                                        <Check className="mt-0.5 h-5 w-5 flex-none text-sun" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {faqItems.length > 0 && (
                        <section className="mt-16">
                            <p className="eyebrow mb-4">Common questions</p>
                            <h2 className="mb-8 text-3xl font-bold tracking-[-0.035em] text-primary">
                                Put the guidance into context.
                            </h2>
                            <FaqAccordion items={faqItems} />
                        </section>
                    )}

                    <Link to="/playbooks" className="mt-14 inline-flex items-center gap-2 text-sm font-bold text-accent">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to all playbooks
                    </Link>
                </div>
            </article>

            {relatedServices.length > 0 && (
                <section className="section-pad bg-white">
                    <div className="page-shell">
                        <p className="eyebrow mb-4">Related services</p>
                        <h2 className="section-title text-primary">Apply the framework to a real system.</h2>
                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {relatedServices.map((service) => (
                                <ServiceCard key={service.slug} service={service} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <SystemReviewCTA />
        </main>
    );
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
}
