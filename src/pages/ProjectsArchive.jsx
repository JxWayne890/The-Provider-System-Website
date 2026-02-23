import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

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
                image: 'https://joshrader.com/og-image.png',
                link: 'https://abilenecommercial.com/'
            },
            {
                id: 'texas',
                title: 'Texas Commercial',
                description: 'Regional commercial real estate platform built for speed and SEO.',
                image: 'https://texas-commercial.com/og-image.png',
                link: 'https://texas-commercial.com/'
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
    const scrollRefs = useRef({});

    const scrollToCategory = (category) => {
        setActiveCategory(category);
        const element = document.getElementById(`cat-${category.replace(/\s+/g, '-').toLowerCase()}`);
        if (element) {
            const offset = 100; // Account for fixed navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const observers = [];

        projectCategories.forEach((group) => {
            const id = `cat-${group.category.replace(/\s+/g, '-').toLowerCase()}`;
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveCategory(group.category);
                        }
                    },
                    { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => observers.forEach(obs => obs.disconnect());
    }, []);

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <header className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-8 font-heading text-sm font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Systems
                    </Link>
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-primary tracking-tight mb-4">
                        Project Archive.
                    </h1>
                    <p className="font-heading text-xl text-muted max-w-2xl">
                        A comprehensive catalog of deployed architectures, internal tools, and high-performance digital environments.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left Column: Category Sidebar */}
                    <aside className="md:w-64 flex-none sticky top-32 z-20">
                        <nav className="flex flex-col gap-2">
                            {projectCategories.map((group) => (
                                <button
                                    key={group.category}
                                    onClick={() => scrollToCategory(group.category)}
                                    className={`text-left px-4 py-3 rounded-xl font-heading font-bold text-sm transition-all ${activeCategory === group.category
                                            ? 'bg-primary text-white shadow-lg translate-x-1'
                                            : 'text-muted hover:bg-primary/5 hover:translate-x-1'
                                        }`}
                                >
                                    {group.category}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Right Column: Project Grid */}
                    <div className="flex-1 space-y-24">
                        {projectCategories.map((group) => (
                            <section
                                key={group.category}
                                id={`cat-${group.category.replace(/\s+/g, '-').toLowerCase()}`}
                                className="scroll-mt-32"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="font-heading font-bold text-2xl text-primary whitespace-nowrap">
                                        {group.category}
                                    </h2>
                                    <div className="h-[1px] w-full bg-primary/10"></div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {group.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group relative flex flex-col h-[400px] rounded-[2rem] overflow-hidden bg-primary shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/5"
                                        >
                                            {project.image ? (
                                                <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                                                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-20"></div>
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-[#050810]"></div>
                                            )}

                                            <div className="relative z-30 mt-auto p-8 flex flex-col gap-3">
                                                <h3 className="font-heading text-white font-bold text-2xl leading-tight">{project.title}</h3>
                                                <p className="font-heading text-white/70 text-sm leading-relaxed line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="pt-2">
                                                    <a
                                                        href={project.link}
                                                        target={project.link === '#contact' ? '_self' : '_blank'}
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-accent font-heading font-bold text-sm group/link"
                                                    >
                                                        <span>{project.link === '#contact' ? 'Inquire for Details' : 'Explore System'}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 transition-transform">
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
        </div>
    );
}
