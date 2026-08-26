import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { serviceGroups, services } from '../data/siteContent';
import { cn } from '../lib/cn';

const primaryNav = [
    { label: 'Work', to: '/work' },
    { label: 'West Texas', to: '/texas' },
    { label: 'Industries', to: '/industries' },
    { label: 'Process', to: '/process' },
    { label: 'About', to: '/about' },
];

const featuredServiceGroups = serviceGroups.filter((group) =>
    ['visibility', 'operations'].includes(group.id)
);

const featuredServices = featuredServiceGroups.flatMap((group) =>
    group.serviceSlugs
        .map((slug) => services.find((service) => service.slug === slug))
        .filter(Boolean)
);

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const location = useLocation();
    const mobileDialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key !== 'Escape') return;
            setServicesOpen(false);
            setMobileOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return undefined;

        previousFocusRef.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const dialog = mobileDialogRef.current;
        const trapFocus = (event) => {
            if (event.key !== 'Tab' || !dialog) return;
            const focusable = dialog.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        dialog?.addEventListener('keydown', trapFocus);
        return () => {
            document.body.style.overflow = '';
            dialog?.removeEventListener('keydown', trapFocus);
            previousFocusRef.current?.focus?.();
        };
    }, [mobileOpen]);

    const closeMenus = () => {
        setServicesOpen(false);
        setMobileOpen(false);
    };

    const isActive = (to) =>
        location.pathname === to || (to !== '/' && location.pathname.startsWith(`${to}/`));

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="bg-primary px-5 py-2 font-data text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/70">
                <div className="page-shell flex items-center justify-center gap-4 sm:justify-between">
                    <span>
                        San Angelo based <span className="mx-2 text-sun">•</span> Serving West Texas
                    </span>
                    <a
                        href="tel:+13252495191"
                        className="hidden items-center gap-2 text-white/80 transition hover:text-white sm:inline-flex"
                        aria-label="Call The Provider System at 325 249 5191"
                    >
                        <Phone className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
                        (325) 249-5191
                    </a>
                </div>
            </div>
            <nav
                aria-label="Primary navigation"
                className="border-b border-primary/10 bg-background/95 shadow-[0_10px_35px_rgba(8,27,44,0.06)] backdrop-blur-xl"
            >
                <div className="page-shell flex h-[4.6rem] items-center justify-between">
                    <Link to="/" onClick={closeMenus} aria-label="The Provider System home">
                        <Logo />
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setServicesOpen((open) => !open)}
                                aria-expanded={servicesOpen}
                                aria-controls="services-menu"
                                className={cn(
                                    'flex min-h-11 items-center gap-1 rounded-full px-4 text-sm font-semibold text-primary transition hover:bg-white',
                                    isActive('/services') && 'bg-white text-accent'
                                )}
                            >
                                Services
                                <ChevronDown
                                    className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
                                    aria-hidden="true"
                                />
                            </button>

                            {servicesOpen && (
                                <div
                                    id="services-menu"
                                    className="absolute left-0 top-[calc(100%+0.8rem)] w-[46rem] rounded-3xl border border-primary/10 bg-white p-3 shadow-lift"
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        {featuredServiceGroups.map((group) => (
                                            <div key={group.id} className="rounded-2xl bg-background/80 p-4">
                                                <p className="mb-3 font-data text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">
                                                    {group.number} — {group.name}
                                                </p>
                                                <div className="space-y-1">
                                                    {group.serviceSlugs.map((slug) => {
                                                        const service = services.find((item) => item.slug === slug);
                                                        return (
                                                            <Link
                                                                key={slug}
                                                                to={`/services/${slug}`}
                                                                onClick={closeMenus}
                                                                className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary transition hover:bg-white hover:text-accent"
                                                            >
                                                                {service.shortName}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        to="/services"
                                        onClick={closeMenus}
                                        className="mt-2 flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white transition hover:bg-dark"
                                    >
                                        View all services
                                        <ArrowUpRight className="h-4 w-4 text-sun" aria-hidden="true" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {primaryNav.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={closeMenus}
                                aria-current={isActive(item.to) ? 'page' : undefined}
                                className={cn(
                                    'flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-white',
                                    isActive(item.to) && 'text-accent'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden xl:block">
                        <Link to="/start" className="button-primary">
                            Request a website and lead-flow review
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 bg-white text-primary lg:hidden"
                        aria-label="Open navigation"
                        aria-expanded={mobileOpen}
                    >
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div
                    ref={mobileDialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className="fixed inset-0 z-[60] overflow-y-auto bg-background text-primary lg:hidden"
                >
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-background/95 px-5 py-4 backdrop-blur">
                        <Link to="/" onClick={closeMenus} aria-label="The Provider System home">
                            <Logo compact />
                        </Link>
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="grid h-11 w-11 place-items-center rounded-full border border-primary/15 bg-white"
                            aria-label="Close navigation"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="px-5 py-8">
                        <p className="eyebrow mb-4">Explore services</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {featuredServices.map((service) => (
                                <Link
                                    key={service.slug}
                                    to={`/services/${service.slug}`}
                                    onClick={closeMenus}
                                    className="flex min-h-12 items-center justify-between rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm font-bold"
                                >
                                    {service.shortName}
                                    <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>

                        <div className="my-8 h-px bg-primary/10" />
                        <div className="grid gap-1">
                            <Link
                                to="/services"
                                onClick={closeMenus}
                                className="rounded-xl py-3 text-xl font-semibold"
                            >
                                All services
                            </Link>
                            {primaryNav.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenus}
                                    className="rounded-xl py-3 text-xl font-semibold"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <Link to="/start" onClick={closeMenus} className="button-primary mt-8 w-full">
                            Request a website and lead-flow review
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
