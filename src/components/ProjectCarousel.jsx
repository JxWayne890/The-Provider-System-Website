import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Only taking the FIRST project from each category for the home page carousel
const premierProjects = [
    {
        id: 'offer-hero',
        title: 'The Offer Hero',
        category: 'SaaS Application',
        image: 'https://www.theofferhero.com/og-image.png',
    },
    {
        id: 'mansfield',
        title: 'Mansfield Mining',
        category: 'Dynamic Corporate Site',
        image: 'https://i.imgur.com/lSxsj0X.png',
    },
    {
        id: 'adrian',
        title: "Adrian's Custom Services",
        category: 'Static Site',
        image: 'https://i.imgur.com/ocZW1Qc.png',
    },
    {
        id: 'billnest',
        title: 'BillNest Craft',
        category: 'Private Project',
        image: null, // Private project uses text-only dark card fallback
    }
];

export default function ProjectCarousel() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.carousel-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

            gsap.from('.carousel-item', {
                scrollTrigger: {
                    trigger: '.carousel-track',
                    start: 'top 75%',
                },
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className="py-32 bg-white relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <span className="carousel-header block font-data text-accent tracking-[0.2em] text-sm uppercase mb-4">Live Instruments</span>
                    <h2 className="carousel-header font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight">
                        Featured Systems.
                    </h2>
                </div>
                <div className="carousel-header">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-3 text-primary font-heading font-bold hover:text-accent transition-colors"
                    >
                        <span>View All Projects</span>
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="carousel-track flex gap-6 px-6 md:px-16 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {premierProjects.map((project) => (
                    <div
                        key={project.id}
                        className="carousel-item flex-none w-[85vw] md:w-[400px] h-[450px] rounded-[2rem] overflow-hidden bg-primary relative snap-center isolate group shadow-xl"
                    >
                        {project.image ? (
                            <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                                <div className="absolute inset-0 bg-primary/30 mix-blend-multiply z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-20"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-[#050810] z-0"></div>
                        )}

                        <div className="relative z-30 mt-auto p-8 flex flex-col gap-2 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-4 group-hover:translate-y-0 h-full justify-end">
                            <span className="font-data text-accent uppercase tracking-widest text-xs font-bold block mb-1">{project.category}</span>
                            <h3 className="font-heading text-white font-bold text-2xl leading-tight">{project.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global style to hide scrollbar for webkit (Chrome/Safari) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
}
