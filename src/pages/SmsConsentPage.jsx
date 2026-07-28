import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const lastUpdated = 'July 28, 2026';

export default function SmsConsentPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <SEO
                title="SMS Communications"
                description="The Provider System's current SMS communications and consent disclosure."
                url="/sms-consent"
                schemas={[
                    {
                        '@type': 'WebPage',
                        '@id': 'https://theprovidersystem.com/sms-consent',
                        name: 'SMS Communications — The Provider System',
                        description: 'Current SMS communications and consent disclosure for The Provider System.',
                        isPartOf: { '@id': 'https://theprovidersystem.com/#website' },
                    },
                    {
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://theprovidersystem.com/' },
                            { '@type': 'ListItem', position: 2, name: 'SMS Communications' },
                        ],
                    },
                ]}
            />

            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Link to="/" className="inline-flex text-muted hover:text-primary transition-colors mb-6 font-heading text-sm font-semibold">
                    ← Back to Home
                </Link>

                <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight mb-3">
                    SMS Communications
                </h1>
                <p className="font-heading text-muted text-sm mb-12">Last updated: {lastUpdated}</p>

                <div className="space-y-10 font-heading text-dark leading-relaxed">
                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">Current website practice</h2>
                        <p>
                            The contact form on theprovidersystem.com collects a phone number so we can respond
                            to an inquiry. It does not include an SMS marketing opt-in, and submitting that form
                            does not constitute consent to receive text messages.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">Future SMS programs</h2>
                        <p>
                            If The Provider System introduces an SMS program, the relevant opt-in disclosure,
                            message-frequency information, applicable message and data-rate notice, and opt-out
                            instructions will be displayed with that specific consent request. This page will be
                            updated before that program is used.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">Questions</h2>
                        <p>
                            For questions about this disclosure or your personal information, email{' '}
                            <a href="mailto:theprovidersystem@gmail.com" className="text-accent hover:text-accent/80 underline underline-offset-4">
                                theprovidersystem@gmail.com
                            </a>{' '}
                            or review our <Link to="/privacy-policy" className="text-accent hover:text-accent/80 underline underline-offset-4">Privacy Policy</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
