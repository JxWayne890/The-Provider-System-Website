import { useMemo, useState } from 'react';
import { ArrowRight, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PlaybookCard } from '../components/ContentCards';
import { PageHero, SectionHeading, SystemReviewCTA } from '../components/PageElements';
import { playbookCategories, playbooks } from '../data/playbooks';
import { cn } from '../lib/cn';

export default function PlaybooksIndex() {
    const [activeCategory, setActiveCategory] = useState('all');

    const visiblePlaybooks = useMemo(() => {
        if (activeCategory === 'all') return playbooks;
        const category = playbookCategories.find((item) => item.slug === activeCategory);
        return playbooks.filter((playbook) => playbook.category === category?.name);
    }, [activeCategory]);

    return (
        <main>
            <SEO
                title="Service Business Systems Playbooks"
                description="15 practical playbooks for service-business websites, local SEO, CRM, lead follow-up, AI customer experience, content, automation, and custom systems."
                url="/playbooks"
            />
            <PageHero
                eyebrow="Playbooks"
                title="Useful guidance before the system decision."
                description="Fifteen original field guides help owners evaluate scope, ownership, local visibility, CRM, follow-up, AI, content, and custom software—without inflated benchmarks or anonymous success stories."
                breadcrumbs={[{ label: 'Playbooks' }]}
                actions={
                    <>
                        <a href="#playbook-library" className="button-primary">
                            Browse all 15
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <Link to="/start" className="button-ghost-dark">
                            Request a website and lead-flow review
                        </Link>
                    </>
                }
                aside={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
                        <BookOpenCheck className="h-7 w-7 text-sun" aria-hidden="true" />
                        <p className="mt-6 text-sm leading-6 text-white/65">
                            Each guide includes a practical decision framework, checklist, or comparison that can be
                            used before hiring a provider.
                        </p>
                    </div>
                }
            />

            <section id="playbook-library" className="section-pad scroll-mt-32 bg-background">
                <div className="page-shell">
                    <SectionHeading
                        eyebrow="The library"
                        title={`${playbooks.length} playbooks. Five operating themes.`}
                        description="Filter by the decision you are working through. Every article links back to the service context it can help clarify."
                    />
                    <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter playbooks">
                        <button
                            type="button"
                            onClick={() => setActiveCategory('all')}
                            aria-pressed={activeCategory === 'all'}
                            className={cn(
                                'min-h-11 rounded-full border px-4 text-sm font-bold transition',
                                activeCategory === 'all'
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-primary/10 bg-white text-muted hover:text-primary'
                            )}
                        >
                            All playbooks
                        </button>
                        {playbookCategories.map((category) => (
                            <button
                                key={category.slug}
                                type="button"
                                onClick={() => setActiveCategory(category.slug)}
                                aria-pressed={activeCategory === category.slug}
                                className={cn(
                                    'min-h-11 rounded-full border px-4 text-sm font-bold transition',
                                    activeCategory === category.slug
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-primary/10 bg-white text-muted hover:text-primary'
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {visiblePlaybooks.map((playbook) => (
                            <PlaybookCard key={playbook.slug} playbook={playbook} />
                        ))}
                    </div>
                </div>
            </section>

            <SystemReviewCTA
                eyebrow="Apply the guidance"
                title="A checklist can expose the question. A system review maps it to the work."
                description="Share the current tools, customer path, and bottleneck. The response will focus on fit and next steps, not force every problem into a preselected service."
            />
        </main>
    );
}
