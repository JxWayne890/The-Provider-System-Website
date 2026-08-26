import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';

export function BreadcrumbTrail({ items, dark = false }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                <li>
                    <Link
                        to="/"
                        className={cn(
                            'rounded-sm underline-offset-4 hover:underline',
                            dark ? 'text-white/55 hover:text-white' : 'text-muted hover:text-primary'
                        )}
                    >
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                        <ChevronRight
                            className={cn('h-3.5 w-3.5', dark ? 'text-white/30' : 'text-primary/25')}
                            aria-hidden="true"
                        />
                        {item.to ? (
                            <Link
                                to={item.to}
                                className={cn(
                                    'rounded-sm underline-offset-4 hover:underline',
                                    dark ? 'text-white/55 hover:text-white' : 'text-muted hover:text-primary'
                                )}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={dark ? 'text-white/80' : 'text-primary'} aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export function PageHero({
    eyebrow,
    title,
    description,
    breadcrumbs = [],
    actions,
    aside,
    tone = 'dark',
}) {
    const dark = tone === 'dark';

    return (
        <section
            className={cn(
                'relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48',
                dark ? 'bg-primary text-white' : 'bg-background text-primary'
            )}
        >
            {dark && (
                <>
                    <div className="grid-field absolute inset-0 opacity-80" aria-hidden="true" />
                    <div
                        className="absolute -right-36 -top-44 h-[34rem] w-[34rem] rounded-full border border-sun/30"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10"
                        aria-hidden="true"
                    />
                </>
            )}
            <div className="page-shell relative">
                {breadcrumbs.length > 0 && <BreadcrumbTrail items={breadcrumbs} dark={dark} />}
                <div className={cn('grid gap-12', aside && 'lg:grid-cols-[1.1fr_0.72fr] lg:items-end')}>
                    <div className="max-w-4xl">
                        <p className={cn('eyebrow mb-5', dark && 'text-sun')}>{eyebrow}</p>
                        <h1 className="display-title">{title}</h1>
                        <p className={cn('mt-7 max-w-3xl text-lg leading-8 md:text-xl md:leading-9', dark ? 'text-white/68' : 'text-muted')}>
                            {description}
                        </p>
                        {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
                    </div>
                    {aside && <div>{aside}</div>}
                </div>
            </div>
        </section>
    );
}

export function SectionHeading({ eyebrow, title, description, align = 'left', dark = false }) {
    return (
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && <p className={cn('eyebrow mb-4', dark && 'text-sun')}>{eyebrow}</p>}
            <h2 className={cn('section-title', dark ? 'text-white' : 'text-primary')}>{title}</h2>
            {description && (
                <p className={cn('mt-5 text-lg leading-8', dark ? 'text-white/62' : 'text-muted')}>
                    {description}
                </p>
            )}
        </div>
    );
}

export function SystemReviewCTA({
    eyebrow = 'West Texas website and lead systems',
    title = 'Make the next lead easier to find and follow.',
    description = 'Share the website, lead-flow, or follow-up problem you want to fix. John will review the context and recommend a practical next step.',
}) {
    return (
        <section className="bg-sand px-5 py-16 sm:px-8 md:py-20 lg:px-12">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-white shadow-lift lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="p-8 sm:p-10 lg:p-14">
                    <p className="eyebrow mb-4 text-sun">{eyebrow}</p>
                    <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-7 text-white/65">{description}</p>
                </div>
                <div className="border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                    <Link to="/start" className="button-primary w-full justify-center text-center sm:w-auto">
                        Request a website and lead-flow review
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
