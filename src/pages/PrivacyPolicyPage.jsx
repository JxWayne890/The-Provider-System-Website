import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const lastUpdated = 'April 26, 2026';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <SEO
                title="Privacy Policy"
                description="The Provider System privacy policy describing how we collect, use, and protect personal information submitted through our website and services."
                url="/privacy-policy"
                schemas={[
                    {
                        '@type': 'WebPage',
                        '@id': 'https://theprovidersystem.com/privacy-policy',
                        name: 'Privacy Policy — The Provider System',
                        description:
                            'How The Provider System collects, uses, and protects personal information.',
                        isPartOf: { '@id': 'https://theprovidersystem.com/#website' }
                    },
                    {
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://theprovidersystem.com/'
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'Privacy Policy'
                            }
                        ]
                    }
                ]}
            />

            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 font-heading text-sm font-semibold"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Home
                </Link>

                <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight mb-3">
                    Privacy Policy
                </h1>
                <p className="font-heading text-muted text-sm mb-12">
                    Last updated: {lastUpdated}
                </p>

                <div className="space-y-10 font-heading text-dark leading-relaxed">
                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            1. Introduction
                        </h2>
                        <p>
                            The Provider System ("we," "us," or "our") respects your privacy and is
                            committed to protecting the personal information you share with us. This
                            Privacy Policy explains how we collect, use, store, and disclose information
                            when you visit our website at <span className="font-semibold">theprovidersystem.com</span>{' '}
                            or interact with our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            2. Information We Collect
                        </h2>
                        <p className="mb-3">We collect information in the following ways:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <span className="font-semibold">Information you provide directly:</span>{' '}
                                When you submit a contact form, request a consultation, or email us, we
                                collect your name, email address, phone number, company name, and any
                                other details you choose to share.
                            </li>
                            <li>
                                <span className="font-semibold">Automatically collected information:</span>{' '}
                                When you visit our site, we may automatically collect basic technical
                                information such as IP address, browser type, device type, pages visited,
                                and referring URLs through standard server logs and analytics tools.
                            </li>
                            <li>
                                <span className="font-semibold">Cookies and similar technologies:</span>{' '}
                                Our site may use cookies and similar tracking technologies to improve
                                user experience and understand site usage patterns.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            3. How We Use Your Information
                        </h2>
                        <p className="mb-3">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Respond to inquiries and provide requested services or consultations</li>
                            <li>Send service updates, proposals, and follow-up communications</li>
                            <li>Improve our website, content, and service offerings</li>
                            <li>Analyze website usage and measure marketing effectiveness</li>
                            <li>Comply with legal obligations and enforce our terms</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            4. How We Share Your Information
                        </h2>
                        <p className="mb-3">
                            We do not sell, rent, or trade your personal information. We may share
                            information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <span className="font-semibold">Service providers:</span> Third-party
                                vendors that help us operate our business, including email delivery
                                (Resend), hosting (Vercel), and analytics platforms. These providers are
                                contractually required to protect your information.
                            </li>
                            <li>
                                <span className="font-semibold">Legal authorities:</span> When required
                                by law, subpoena, or to protect our legal rights, we may disclose
                                information to government or regulatory bodies.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            5. Data Retention
                        </h2>
                        <p>
                            We retain personal information only as long as necessary to provide our
                            services, comply with legal obligations, resolve disputes, and enforce our
                            agreements. You may request deletion of your information at any time by
                            contacting us using the information below.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            6. Your Rights
                        </h2>
                        <p className="mb-3">Depending on your location, you may have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt out of marketing communications</li>
                            <li>
                                Lodge a complaint with a supervisory authority (for EU/UK residents under
                                GDPR, or California residents under CCPA)
                            </li>
                        </ul>
                        <p className="mt-3">
                            To exercise any of these rights, contact us at the email address listed
                            below.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            7. Data Security
                        </h2>
                        <p>
                            We use commercially reasonable administrative, technical, and physical
                            safeguards to protect your information. However, no system is completely
                            secure, and we cannot guarantee absolute security of any data transmitted
                            over the internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            8. Third-Party Links
                        </h2>
                        <p>
                            Our website may contain links to third-party sites or services. We are not
                            responsible for the privacy practices of these third parties. We encourage
                            you to review their privacy policies before sharing personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            9. Children's Privacy
                        </h2>
                        <p>
                            Our services are intended for business use and are not directed to
                            individuals under the age of 16. We do not knowingly collect personal
                            information from children. If you believe a child has provided us with
                            personal information, please contact us so we can remove it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            10. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in
                            our practices or legal requirements. The "Last updated" date at the top of
                            this page indicates when the policy was last revised. We encourage you to
                            review this page periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                            11. Contact Us
                        </h2>
                        <p>
                            If you have questions about this Privacy Policy or how we handle your
                            information, please reach out:
                        </p>
                        <p className="mt-3">
                            <a
                                href="mailto:theprovidersystem@gmail.com"
                                className="text-accent font-semibold hover:underline"
                            >
                                theprovidersystem@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
