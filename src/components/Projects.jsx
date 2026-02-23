import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mockProjects = [
    {
        id: 1,
        title: 'The Offer Hero',
        category: 'SaaS Application',
        description: 'A full-scale React SaaS application designed for high-conversion offer creation.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', // Dashboard analytics
        link: 'https://www.theofferhero.com/'
    },
    {
        id: 2,
        title: 'Mansfield Mining',
        category: 'Dynamic Corporate Site',
        description: 'A responsive, dynamic web presence built for industrial and commercial scale operations.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // Industrial/Tech pattern
        link: 'https://www.mansfieldmining.com/'
    },
    {
        id: 3,
        title: 'Arki Design Studio',
        category: 'High-Fidelity Static',
        description: 'A high-performance static architecture portfolio built for speed and visual impact.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Modern Architecture
        link: 'https://landing.arkidesignstudio.com/'
    },
    {
        id: 4,
        title: 'Abilene Commercial',
        category: 'Commercial Real Estate',
        description: 'A localized, high-conversion commercial real estate platform optimizing lead generation.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', // Commercial interior
        link: 'https://abilenecommercial.com/'
    },
    {
        id: 5,
        title: 'BillNest Craft',
        category: 'Internal Invoice System',
        description: 'Private Tool: Dynamic invoice creation with manual overrides, PDF generation, and TanStack caching.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop', // Financial/Abstract data
        link: '#contact' // Links to contact since it's private
    },
    {
        id: 6,
        title: 'PodPrepGo',
        category: 'Internal Content System',
        description: 'Private Tool: Internal automation system for podcast preparation and workflow routing.',
        image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop', // Studio/Audio abstract
        link: '#contact' // Links to contact since it's private
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

            // Staggered fade and slide for project cards
            gsap.from('.proj-card', {
                scrollTrigger: {
                    trigger: '.proj-grid',
                    start: 'top 75%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
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

                <div className="proj-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockProjects.map((project) => (
                        <div key={project.id} className="proj-card group relative flex flex-col h-[500px] rounded-[2rem] overflow-hidden bg-primary cursor-pointer isolate">
                            {/* Background Image Container */}
                            <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110">
                                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"></div>
                                {/* Heavy gradient overlay to ensure text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-20"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-60 filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                                />
                            </div>

                            {/* Content Box (Bottom aligned) */}
                            <div className="relative z-30 mt-auto p-8 flex flex-col gap-4 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-4 group-hover:translate-y-0">
                                <div>
                                    <span className="font-data text-accent uppercase tracking-widest text-xs font-bold block mb-2">{project.category}</span>
                                    <h3 className="font-heading text-white font-bold text-2xl leading-tight">{project.title}</h3>
                                </div>

                                <p className="font-heading text-white/70 text-sm leading-relaxed opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    {project.description}
                                </p>

                                {/* Animated Link "Button" */}
                                <div className="pt-4 flex items-center gap-2 text-white font-heading font-semibold text-sm opacity-0 transform translate-x-[-10px] transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-x-0">
                                    <span className="border-b border-transparent group-hover:border-accent transition-colors">View Live System</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent relative top-[1px]">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>

                            {/* Full Card Click Target */}
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-40">
                                <span className="sr-only">View {project.title}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
