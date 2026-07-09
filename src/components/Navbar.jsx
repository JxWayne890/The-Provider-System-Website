import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/cn';

const navItems = [
    { label: 'Blue-Collar', to: '/blue-collar' },
    { label: 'Websites', to: '/websites' },
    { label: 'Lead & CRM', to: '/lead-crm-system' },
    { label: 'Custom Systems', to: '/custom-systems' },
    { label: 'Work', to: '/projects' },
    { label: 'About', to: '/about' },
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

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const getContactLink = () => (isHome ? '#contact' : '/#contact');

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4">
                <nav
                    className={cn(
                        'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                        'flex items-center justify-between px-6 py-3 rounded-[3rem]',
                        'w-full max-w-6xl',
                        isScrolled || !isHome
                            ? 'bg-background/85 backdrop-blur-xl border border-muted/20 text-primary shadow-lg'
                            : 'bg-transparent text-white border-transparent'
                    )}
                >
                    <Link to="/" className="flex items-center" aria-label="The Provider System home">
                        <Logo className="h-16 w-auto transition-all" />
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 font-heading text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    'hover:-translate-y-[1px] transition-transform',
                                    location.pathname === item.to && 'text-accent'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <a
                        href={getContactLink()}
                        className="hidden lg:block group relative overflow-hidden rounded-[2rem] bg-accent text-white px-6 py-2.5 font-heading text-sm font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    >
                        <span className="relative z-10">Book a Call</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                    </a>

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden p-2 -mr-2"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </nav>
            </div>

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
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={closeMobile}
                                className="block py-3 text-lg font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="pt-6">
                            <a
                                href={getContactLink()}
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
