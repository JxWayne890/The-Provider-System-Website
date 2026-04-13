import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/cn';
import { services } from '../data/services';
import { industries } from '../data/industries';

const HOVER_DELAY = 150;

function Dropdown({ label, items, isScrolled, isHome }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);
    const containerRef = useRef(null);

    const handleEnter = () => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), HOVER_DELAY);
    };

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-1 hover:-translate-y-[1px] transition-transform"
            >
                {label}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                    <div className="bg-white shadow-lg rounded-lg border border-gray-100 py-2 min-w-[220px]">
                        {items.map((item, i) =>
                            item.divider ? (
                                <div key={`div-${i}`} className="border-t border-gray-100 my-1" />
                            ) : (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileAccordion({ label, items, onNavigate }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center justify-between w-full py-3 text-lg font-medium"
            >
                {label}
                <ChevronDown className={cn("w-5 h-5 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <div className="pl-4 pb-2 space-y-1">
                    {items
                        .filter((item) => !item.divider)
                        .map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={onNavigate}
                                className="block py-2 text-base text-gray-600 hover:text-accent transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                </div>
            )}
        </div>
    );
}

// Build dropdown item arrays
const servicesItems = [
    { label: 'All Services', to: '/services' },
    { divider: true },
    ...services.map((s) => ({ label: s.shortName || s.name, to: `/services/${s.slug}` })),
];

const displayedIndustries = industries.slice(0, 10);
const industriesItems = [
    { label: 'All Industries', to: '/industries' },
    { divider: true },
    ...displayedIndustries.map((ind) => ({ label: ind.shortName || ind.name, to: `/industries/${ind.slug}` })),
    ...(industries.length > 10 ? [{ label: 'View All \u2192', to: '/industries' }] : []),
];

const aboutItems = [
    { label: 'Company Overview', to: '/about' },
    { label: 'Our Process', to: '/about/process' },
    { label: 'Why Choose Us', to: '/about/why-choose-us' },
    { label: 'Technology', to: '/about/technology' },
    { label: 'Projects', to: '/projects' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Close mobile menu on Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const getLink = (hash) => (isHome ? hash : `/${hash}`);

    return (
        <>
            {/* Main nav bar */}
            <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4">
                <nav
                    className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                        "flex items-center justify-between px-6 py-3 rounded-[3rem]",
                        "w-full max-w-5xl",
                        isScrolled || !isHome
                            ? "bg-background/80 backdrop-blur-xl border border-muted/20 text-primary shadow-lg"
                            : "bg-transparent text-white border-transparent"
                    )}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <Logo className="h-16 w-auto transition-all" />
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden lg:flex items-center gap-6 font-heading text-sm font-medium">
                        <Link to="/blue-collar" className="hover:-translate-y-[1px] transition-transform">Blue-Collar</Link>
                        <Dropdown label="Services" items={servicesItems} isScrolled={isScrolled} isHome={isHome} />
                        <Dropdown label="Industries" items={industriesItems} isScrolled={isScrolled} isHome={isHome} />
                        <Link to="/use-cases" className="hover:-translate-y-[1px] transition-transform">Use Cases</Link>
                        <Dropdown label="About" items={aboutItems} isScrolled={isScrolled} isHome={isHome} />
                        <Link to="/blog" className="hover:-translate-y-[1px] transition-transform">Blog</Link>
                        <Link to="/faq" className="hover:-translate-y-[1px] transition-transform">FAQ</Link>
                    </div>

                    {/* Desktop CTA */}
                    <a
                        href={getLink('#contact')}
                        className="hidden lg:block group relative overflow-hidden rounded-[2rem] bg-accent text-white px-6 py-2.5 font-heading text-sm font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    >
                        <span className="relative z-10">Book a Call</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden p-2 -mr-2"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </nav>
            </div>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[100] bg-white text-primary overflow-y-auto">
                    <div className="flex items-center justify-between px-6 py-6">
                        <Link to="/" onClick={closeMobile} className="flex items-center">
                            <Logo className="h-14 w-auto" />
                        </Link>
                        <button onClick={closeMobile} aria-label="Close menu" className="p-2 -mr-2">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="px-6 pb-10 space-y-1">
                        <Link to="/blue-collar" onClick={closeMobile} className="block py-3 text-lg font-medium">
                            Blue-Collar
                        </Link>

                        <MobileAccordion label="Services" items={servicesItems} onNavigate={closeMobile} />
                        <MobileAccordion label="Industries" items={industriesItems} onNavigate={closeMobile} />

                        <Link to="/use-cases" onClick={closeMobile} className="block py-3 text-lg font-medium">
                            Use Cases
                        </Link>

                        <MobileAccordion label="About" items={aboutItems} onNavigate={closeMobile} />

                        <Link to="/blog" onClick={closeMobile} className="block py-3 text-lg font-medium">
                            Blog
                        </Link>

                        <Link to="/faq" onClick={closeMobile} className="block py-3 text-lg font-medium">
                            FAQ
                        </Link>

                        <div className="pt-6">
                            <a
                                href={getLink('#contact')}
                                onClick={closeMobile}
                                className="block w-full text-center rounded-[2rem] bg-accent text-white px-6 py-3 font-heading text-base font-semibold"
                            >
                                Book a Call
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
