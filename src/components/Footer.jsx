import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const serviceLinks = [
    ['Websites', '/services/websites'],
    ['Local visibility', '/services/local-seo'],
    ['Lead generation', '/services/lead-generation'],
    ['CRM & job operations', '/services/crm-jobber-alternatives'],
    ['Lead follow-up', '/services/lead-follow-up'],
];

const companyLinks = [
    ['Work', '/work'],
    ['Industries', '/industries'],
    ['Process', '/process'],
    ['About', '/about'],
    ['Playbooks', '/playbooks'],
    ['FAQ', '/faq'],
];

const marketLinks = [
    ['San Angelo', '/texas/san-angelo-concho-valley'],
    ['Abilene', '/texas/abilene-big-country'],
    ['Midland–Odessa', '/texas/midland-odessa'],
    ['Lubbock', '/texas/lubbock'],
    ['All West Texas markets', '/texas'],
];

export default function Footer() {
    return (
        <footer className="bg-primary px-5 pb-10 pt-20 text-white sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.72fr_0.65fr]">
                    <div>
                        <Logo inverted className="mb-7" />
                        <h2 className="max-w-xl font-heading text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                            Websites that win trust. Lead systems that keep the opportunity moving.
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                            The Provider System builds websites and local visibility for West Texas service
                            businesses, then connects inquiries to CRM and follow-up. Based in San Angelo;
                            nationwide remote engagements remain available when the fit is right.
                        </p>
                        <div className="mt-8 flex flex-col items-start gap-3">
                            <Link to="/start" className="button-primary">
                                Request a website and lead-flow review
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href="tel:+13252495191"
                                className="button-ghost-dark"
                                aria-label="Call The Provider System at 325 249 5191"
                            >
                                <Phone className="h-4 w-4" aria-hidden="true" />
                                (325) 249-5191
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 font-data text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sun">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {serviceLinks.map(([label, to]) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm font-semibold text-white/70 transition hover:text-white">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 font-data text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sun">
                            West Texas
                        </h3>
                        <ul className="space-y-3">
                            {marketLinks.map(([label, to]) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm font-semibold text-white/70 transition hover:text-white">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 font-data text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sun">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map(([label, to]) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm font-semibold text-white/70 transition hover:text-white">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pt-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
                    <p>&copy; {new Date().getFullYear()} The Provider System. All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <Link to="/privacy-policy" className="transition hover:text-white">
                            Privacy
                        </Link>
                        <Link to="/sms-consent" className="transition hover:text-white">
                            SMS communications
                        </Link>
                        <a
                            href="tel:+13252495191"
                            className="transition hover:text-white"
                            aria-label="Call The Provider System at 325 249 5191"
                        >
                            (325) 249-5191
                        </a>
                        <a href="mailto:theprovidersystem@gmail.com" className="transition hover:text-white">
                            <Mail className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
                            theprovidersystem@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
