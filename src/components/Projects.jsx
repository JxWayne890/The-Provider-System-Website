import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        category: 'Non-visual projects',
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

export default function Projects() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Fade up admission for the header
            gsap.from('.proj-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Staggered fade and slide for project categories
            gsap.from('.proj-category-block', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className="py-32 px-6 md:px-16 bg-white relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <span className="proj-header block font-data text-accent tracking-[0.2em] text-sm uppercase mb-4">Live Instruments</span>
                        <h2 className="proj-header font-heading font-bold text-4xl md:text-6xl text-primary tracking-tight">
                            Deployed Systems.
                        </h2>
                    </div>
                    <p className="proj-header font-heading text-lg text-muted max-w-md md:justify-self-end md:text-right">
                        A selection of custom-built, functional architectures currently saving founders countless operational hours.
                    </p>
                </div>

                <div className="flex flex-col gap-24">
                    {projectCategories.map((group) => (
                        <div key={group.category} className="proj-category-block">
                            <h3 className="font-heading font-bold text-2xl text-primary border-b-2 border-primary/10 pb-4 mb-8">
                                {group.category}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {group.projects.map((project) => (
                                    <div key={project.id} className="group relative flex flex-col h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden bg-primary cursor-pointer isolate shadow-lg hover:shadow-2xl transition-shadow duration-500">

                                        {/* Background Image Container (only if image exists) */}
                                        {project.image ? (
                                            <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                                                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-20"></div>
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
                                                />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-[#050810] z-0"></div>
                                        )}

                                        {/* Content Box (Bottom aligned) */}
                                        <div className="relative z-30 mt-auto p-8 flex flex-col gap-4 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-4 group-hover:translate-y-0">
                                            <div>
                                                <span className="font-data text-accent uppercase tracking-widest text-xs font-bold block mb-2">{group.category}</span>
                                                <h4 className="font-heading text-white font-bold text-2xl leading-tight">{project.title}</h4>
                                            </div>

                                            <p className="font-heading text-white/80 text-sm leading-relaxed opacity-0 transition-opacity duration-500 group-hover:opacity-100 line-clamp-3">
                                                {project.description}
                                            </p>

                                            {/* Animated Link "Button" */}
                                            <div className="pt-4 flex items-center gap-2 text-white font-heading font-semibold text-sm opacity-0 transform translate-x-[-10px] transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-x-0">
                                                <span className="border-b border-transparent group-hover:border-accent transition-colors">
                                                    {project.image ? "View Live System" : "Inquire About System"}
                                                </span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent relative top-[1px]">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Full Card Click Target */}
                                        <a href={project.link} target={project.image ? "_blank" : "_self"} rel="noopener noreferrer" className="absolute inset-0 z-40">
                                            <span className="sr-only">View {project.title}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
