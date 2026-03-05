import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const projectCategories = [
    {
        category: 'SaaS',
        projects: [
            {
                id: 'offer-hero',
                title: 'The Offer Hero',
                description: 'A full-scale React SaaS application designed for high-conversion offer creation.',
                image: 'https://www.theofferhero.com/og-image.png',
                link: 'https://www.theofferhero.com/'
            }
        ]
    },
    {
        category: 'Dynamic Sites',
        projects: [
            {
                id: 'mansfield',
                title: 'Mansfield Mining',
                description: 'A responsive, dynamic web presence built for industrial and commercial scale operations.',
                image: 'https://i.imgur.com/lSxsj0X.png',
                link: 'https://www.mansfieldmining.com/'
            }
        ]
    },
    {
        category: 'Static Sites',
        projects: [
            {
                id: 'adrian',
                title: "Adrian's Custom Services",
                description: 'High-performance static site for local professional services.',
                image: 'https://i.imgur.com/ocZW1Qc.png',
                link: 'https://www.adrianscustomservices.org/'
            },
            {
                id: 'arki',
                title: 'Arki Design Studio',
                description: 'A high-performance static architecture portfolio built for speed and visual impact.',
                image: 'https://i.imgur.com/W9aTjyL.png',
                link: 'https://landing.arkidesignstudio.com/'
            },
            {
                id: 'abilene',
                title: 'Abilene Commercial',
                description: 'A localized, high-conversion commercial real estate platform optimizing lead generation.',
                image: 'https://abilenecommercial.com/og-image.png',
                link: 'https://abilenecommercial.com/'
            },
            {
                id: 'texas',
                title: 'Texas Commercial',
                description: 'Regional commercial real estate platform built for speed and SEO.',
                image: 'https://texas-commercial.com/og-image.png',
                link: 'https://texas-commercial.com/'
            },
            {
                id: 'scalifying',
                title: 'Scalifying AI',
                description: 'Advanced AI automation and consulting platform for scaling operations.',
                image: 'https://i.imgur.com/4LpuspF.png',
                link: 'https://scalifyingai.com/'
            }
        ]
    },
    {
        category: 'Private Projects',
        projects: [
            {
                id: 'billnest',
                title: 'BillNest Craft',
                description: 'Professional Invoice Management System designed for freelancers and small businesses to create, manage, and track financial documents with precision.',
                link: '#contact'
            },
            {
                id: 'podprep',
                title: 'PodPrepGo',
                description: 'Internal automation system for podcast preparation and workflow routing.',
                link: '#contact'
            }
        ]
    }
];

export default function ProjectsArchive() {
    const [activeCategory, setActiveCategory] = useState(projectCategories[0].category);
    const scrollContainerRef = useRef(null);

    const scrollToCategory = (category) => {
        setActiveCategory(category);
        const element = document.getElementById(`cat-${category.replace(/\s+/g, '-').toLowerCase()}`);
        if (element && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const observers = [];
        const container = scrollContainerRef.current;

        projectCategories.forEach((group) => {
            const id = `cat-${group.category.replace(/\s+/g, '-').toLowerCase()}`;
            const element = document.getElementById(id);
            if (element && container) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveCategory(group.category);
                        }
                    },
                    {
                        threshold: 0.1,
                        root: container,
                        rootMargin: '-5% 0px -80% 0px'
                    }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => observers.forEach(obs => obs.disconnect());
    }, []);

    return (
        <div className="h-screen bg-background overflow-hidden flex flex-col pt-32">
            <SEO
                title="Project Archive | Deployed Systems"
                description="Explore our portfolio of scalable SaaS applications, high-performance static sites, and automated internal tools."
                url="/projects"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Project Archive - The Provider's System",
                    "description": "Portfolio of deployed AI architectures and software systems."
                }}
            />
            <div className="max-w-7xl w-full mx-auto px-6 md:px-16 flex flex-col h-full">

                {/* Fixed Header */}
                <header className="mb-12 flex-none">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6 font-heading text-sm font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Systems
                    </Link>
                    <h1 className="font-heading font-bold text-5xl md:text-6xl text-primary tracking-tight mb-4">
                        Project Archive.
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
                        What deployed systems has The Provider's System built? Our archive catalogs a proven track record of high-performance SaaS applications, conversion-optimized static sites, and custom internal workflow tools designed to scale operations and eliminate manual bottlenecks for our partners.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-12 items-start flex-1 min-h-0 pb-12">
                    {/* Left Column: Fixed Category Sidebar */}
                    <aside className="md:w-64 flex-none hidden md:block">
                        <nav className="flex flex-col gap-2">
                            {projectCategories.map((group) => (
                                <button
                                    key={group.category}
                                    onClick={() => scrollToCategory(group.category)}
                                    className={`text-left px-5 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all ${activeCategory === group.category
                                        ? 'bg-primary text-white shadow-xl translate-x-1'
                                        : 'text-muted hover:bg-primary/5 hover:translate-x-1'
                                        }`}
                                >
                                    {group.category}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Right Column: Scrollable Project Pane */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 h-full overflow-y-auto space-y-24 pr-4 hide-scrollbar scroll-smooth"
                    >
                        {projectCategories.map((group) => (
                            <section
                                key={group.category}
                                id={`cat-${group.category.replace(/\s+/g, '-').toLowerCase()}`}
                                className="first:pt-0"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="font-heading font-bold text-xl text-primary whitespace-nowrap uppercase tracking-widest">
                                        {group.category}
                                    </h2>
                                    <div className="h-[1px] w-full bg-primary/10"></div>
                                </div>
                                <div className="flex flex-col gap-4 sm:gap-6">
                                    {group.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group flex flex-row sm:flex-row h-[120px] sm:h-auto md:h-[200px] rounded-2xl sm:rounded-3xl overflow-hidden bg-primary shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/10"
                                        >
                                            {/* Left side: Image Thumbnail */}
                                            {project.image ? (
                                                <div className="relative w-[120px] sm:w-[200px] md:w-[280px] h-full flex-shrink-0 overflow-hidden bg-[#050810]">
                                                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0 duration-500"></div>
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative w-[120px] sm:w-[200px] md:w-[280px] h-full flex-shrink-0 bg-gradient-to-br from-primary/80 to-[#050810]"></div>
                                            )}

                                            {/* Right side: Content */}
                                            <div className="flex-1 p-3 sm:p-5 md:p-8 flex flex-col justify-center bg-white min-w-0">
                                                <h3 className="font-heading text-primary font-bold text-base sm:text-xl md:text-2xl leading-tight sm:mb-2 truncate sm:whitespace-normal">
                                                    {project.title}
                                                </h3>
                                                <p className="font-heading text-muted text-xs sm:text-sm leading-relaxed mb-2 sm:mb-6 max-w-2xl hidden sm:block line-clamp-2 md:line-clamp-none">
                                                    {project.description}
                                                </p>
                                                <div className="mt-auto">
                                                    <a
                                                        href={project.link}
                                                        target={project.link === '#contact' ? '_self' : '_blank'}
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 sm:gap-2 text-accent font-heading font-bold text-[11px] sm:text-sm group/link hover:text-accent/80 transition-colors"
                                                    >
                                                        <span>{project.link === '#contact' ? 'Inquire for Details' : 'Explore System'}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 transition-transform sm:w-4 sm:h-4">
                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            <polyline points="12 5 19 12 12 19"></polyline>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
            `}} />
        </div>
    );
}
