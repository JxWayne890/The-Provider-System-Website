import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to resolve links based on current path
    const getLink = (hash) => {
        return isHome ? hash : `/${hash}`;
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-4">
            <nav
                className={cn(
                    "transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "flex items-center justify-between px-6 py-3 rounded-[3rem]",
                    "w-full max-w-5xl",
                    (isScrolled || !isHome)
                        ? "bg-background/80 backdrop-blur-xl border border-muted/20 text-primary shadow-lg"
                        : "bg-transparent text-white border-transparent"
                )}
            >
                <Link to="/" className="flex items-center">
                    <Logo className={cn("h-16 w-auto transition-all", (!isHome && !isScrolled) ? "" : "")} />
                </Link>

                <div className="hidden md:flex items-center gap-8 font-heading text-sm font-medium">
                    <a href={getLink("#features")} className="hover:-translate-y-[1px] transition-transform">Systems</a>
                    <a href={getLink("#philosophy")} className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
                    <a href={getLink("#protocol")} className="hover:-translate-y-[1px] transition-transform">Protocol</a>
                    <Link to="/projects" className="hover:-translate-y-[1px] transition-transform">Projects</Link>
                </div>

                <a
                    href={getLink("#contact")}
                    className="group relative overflow-hidden rounded-[2rem] bg-accent text-white px-6 py-2.5 font-heading text-sm font-semibold hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                >
                    <span className="relative z-10">Book a consultation</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                </a>
            </nav>
        </div>
    );
}
