import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHero, SectionHeading } from '../components/PageElements';
import { getLeadAttribution, trackEvent } from '../lib/analytics';

const modules = [
    {
        title: 'How I built Master Commercial Clean',
        paragraphs: [
            'The order of work was a clear offer, a real walkthrough and a written scope, quality checks, a reply to every lead, and a back office on workflows instead of memory.',
            'Master Commercial Clean scaled to six figures in its first two months and is building toward seven.',
            'This module teaches that map.',
        ],
    },
    {
        title: 'Cold email',
        paragraphs: [
            'This module covers how to research a real building or owner, what a short first note has to do, and how follow up stays human.',
        ],
    },
    {
        title: 'How to structure the automation',
        paragraphs: [
            'The stages are capture, assign, follow up, quote, job tracking, quality, and review.',
            'You will also see how to score a process before automating it, and where a person must stay in the loop.',
        ],
    },
];

const options = ['Systems', 'Cold email', 'Automation', 'All three'];
const fieldClass = 'mt-2 min-h-12 w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-base text-primary focus:border-accent';

function WalkthroughForm() {
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formStartedAt] = useState(Date.now);
    const [submissionId] = useState(() =>
        globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
    const statusRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (status === 'sending') return;

        const fields = new FormData(event.currentTarget);
        const name = fields.get('name').trim();
        const email = fields.get('email').trim();
        const businessType = fields.get('businessType').trim();
        const walkthrough = fields.get('walkthrough');

        if (!name || !businessType) {
            setErrorMessage('Enter your name and business type.');
            requestAnimationFrame(() => statusRef.current?.focus());
            return;
        }

        setStatus('sending');
        setErrorMessage('');
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    ...getLeadAttribution(),
                    name,
                    email,
                    inquiryType: `Walkthrough: ${walkthrough}`,
                    source: 'Walkthroughs page',
                    page: '/walkthroughs',
                    message: `Walkthrough request: ${walkthrough}. Business type: ${businessType}.`,
                    website: fields.get('website'),
                    submissionId,
                    formStartedAt,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                const error = new Error('The request could not be sent.');
                error.status = response.status;
                throw error;
            }
            const result = await response.json();
            if (result?.success !== true) throw new Error('The request was not confirmed.');
        } catch (error) {
            setErrorMessage(error.status === 429
                ? 'Too many requests were received. Please wait a few minutes and try again.'
                : error.name === 'AbortError'
                    ? 'The request took too long to send. Please try again.'
                    : 'The form could not send right now. Please try again.');
            setStatus('idle');
            requestAnimationFrame(() => statusRef.current?.focus());
            return;
        } finally {
            window.clearTimeout(timeoutId);
        }

        setStatus('success');
        requestAnimationFrame(() => statusRef.current?.focus());
        const analytics = { form_name: 'walkthrough_inquiry', inquiry_type: walkthrough };
        trackEvent('form_success', { ...analytics, page_path: '/walkthroughs' });
        trackEvent('generate_lead', analytics);
    }

    if (status === 'success') {
        return (
            <div ref={statusRef} tabIndex={-1} role="status" className="space-y-4">
                <p className="text-xl font-bold text-primary">Thanks. Your request was sent.</p>
                <p className="text-muted">John will review it and reply using the contact information you provided.</p>
            </div>
        );
    }

    const sending = status === 'sending';

    return (
        <form onSubmit={handleSubmit} aria-busy={sending}>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="walkthrough-website">Leave this field empty</label>
                <input id="walkthrough-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <fieldset disabled={sending} className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold text-primary">
                    Name
                    <input name="name" autoComplete="name" maxLength={120} required className={fieldClass} />
                </label>
                <label className="text-sm font-bold text-primary">
                    Email
                    <input name="email" type="email" autoComplete="email" maxLength={320} required className={fieldClass} />
                </label>
                <label className="text-sm font-bold text-primary">
                    Business type
                    <input name="businessType" placeholder="e.g. cleaning, electrical, HVAC" maxLength={200} required className={fieldClass} />
                </label>
                <label className="text-sm font-bold text-primary">
                    Which walkthrough
                    <select name="walkthrough" defaultValue="" required className={fieldClass}>
                        <option value="" disabled>Choose a walkthrough</option>
                        {options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                </label>
            </fieldset>
            {errorMessage && (
                <p ref={statusRef} tabIndex={-1} role="alert" className="mt-5 rounded-xl bg-red-600/10 p-4 text-sm text-red-700">
                    {errorMessage}
                </p>
            )}
            <button type="submit" disabled={sending} className="button-primary mt-7 w-full disabled:cursor-wait disabled:opacity-65">
                {sending ? 'Sending request…' : 'Request a walkthrough'}
            </button>
        </form>
    );
}

export default function WalkthroughsPage() {
    return (
        <main>
            <SEO
                title="Walkthroughs for Service Business Owners"
                description="A short map of how Master Commercial Clean was built, how a first email stays human, and how to structure automation, with a person still in the loop."
                url="/walkthroughs"
            />
            <PageHero
                eyebrow="For service business owners"
                title="Walkthroughs"
                description="This walkthrough is for service business owners who want the map of how the company and the systems around it were built."
                actions={<a href="#request" className="button-primary">Request a walkthrough</a>}
            />

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading title="What the walkthroughs cover" />
                    <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
                        <p>It is not a booking page for a cleaning visit.</p>
                        <p>I can teach the map in public. I will not publish the scripts, the prompts, or the working automations.</p>
                    </div>
                    <div className="mt-10 grid gap-5 lg:grid-cols-3">
                        {modules.map(({ title, paragraphs }, index) => (
                            <article key={title} className="rounded-3xl border border-primary/10 bg-background p-7">
                                <p className="eyebrow text-accent">Module {index + 1}</p>
                                <h3 className="mt-3 text-xl font-bold text-primary">{title}</h3>
                                <div className="mt-4 space-y-4 leading-7 text-muted">
                                    {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="request" className="section-pad scroll-mt-28 bg-sand">
                <div className="page-shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <SectionHeading
                            title="Request a walkthrough"
                            description="If you want the walkthrough, tell us who you are and which module you want."
                        />
                        <p className="mt-4 text-lg leading-8 text-muted">
                            John will review the request and follow up with the matching walkthrough.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-card sm:p-8">
                        <WalkthroughForm />
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="page-shell">
                    <SectionHeading title="Next steps" />
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <article className="rounded-3xl border border-primary/10 bg-background p-7">
                            <h3 className="text-xl font-bold text-primary">The Provider System</h3>
                            <p className="mt-3 leading-7 text-muted">Talk to The Provider System if you want these systems built for your company.</p>
                            <Link to="/start" className="button-primary mt-5">Start here</Link>
                        </article>
                        <article className="rounded-3xl border border-primary/10 bg-background p-7">
                            <h3 className="text-xl font-bold text-primary">Master Commercial Clean</h3>
                            <p className="mt-3 leading-7 text-muted">Need a building cleaned?</p>
                            <a href="https://mastercleanhq.com" className="button-secondary mt-5">mastercleanhq.com</a>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
