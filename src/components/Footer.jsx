import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const serviceLinks = [
    ['Websites', '/services/websites'],
    ['CRM & job operations', '/services/crm-jobber-alternatives'],
    ['Automation', '/services/automation'],
    ['Local SEO', '/services/local-seo'],
    ['AI receptionist', '/services/ai-receptionist'],
    ['AI growth systems', '/services/ai-growth-systems'],
];

const companyLinks = [
    ['Work', '/work'],
    ['Texas', '/texas'],
    ['Industries', '/industries'],
    ['Process', '/process'],
    ['About', '/about'],
    ['Playbooks', '/playbooks'],
    ['FAQ', '/faq'],
];

export default function Footer() {
    return (
        <footer className="bg-primary px-5 pb-10 pt-20 text-white sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.25fr_0.75fr_0.65fr]">
                    <div>
                        <Logo inverted className="mb-7" />
                        <h2 className="max-w-xl font-heading text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                            Clearer systems for the work behind a service business.
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                            Websites, CRM and job operations, automation, practical AI, and custom systems.
                            Texas first, with remote engagements available nationwide.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link to="/start" className="button-primary">
                                Start a system review
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <a
                                href="mailto:theprovidersystem@gmail.com"
                                className="button-ghost-dark"
                            >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                Email John
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
                        <a href="mailto:theprovidersystem@gmail.com" className="transition hover:text-white">
                            theprovidersystem@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
