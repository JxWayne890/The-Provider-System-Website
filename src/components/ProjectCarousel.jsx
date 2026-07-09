import { Link } from 'react-router-dom';
import { GeoComparisonTable, GeoQuestionGrid } from './GeoBlocks';

// Only taking the FIRST project from each category for the home page carousel
const premierProjects = [
    {
        id: 'total-quality-plumbing',
        title: 'Total Quality Plumbing',
        category: 'Local Service Website',
        image: 'https://www.totalqualityplumbingtx.com/og-image.png',
        link: 'https://totalqualityplumbingtx.com/'
    },
    {
        id: 'flowos',
        title: 'FlowOS',
        category: 'Custom Operating System',
        image: 'https://www.flowosapp.com/flowos-og.png',
        link: 'https://www.flowosapp.com/'
    },
    {
        id: 'offer-hero',
        title: 'The Offer Hero',
        category: 'Custom App',
        image: 'https://www.theofferhero.com/og-image.png',
        link: 'https://www.theofferhero.com/'
    },
    {
        id: 'roller-rink-usa',
        title: 'Roller Rink USA',
        category: 'Booking System',
        image: 'https://www.rollerrinkusa.com/assets/roller-rink-hero.png',
        link: 'https://rollerrinkusa.com/'
    },
    {
        id: 'weathersbee',
        title: 'Weathersbee Electric Co.',
        category: 'Industrial Service Website',
        image: '/images/projects/weathersbee.png',
        link: 'https://weathersbeeelectric.com/'
    }
];

const buildModelColumns = ['Factor', 'Owned Provider System', 'Scattered Tools'];
const buildModelRows = [
    [
        'Lead capture',
        'Calls, forms, bookings, and quote requests move into one defined path.',
        'Leads sit across voicemail, inboxes, texts, DMs, and memory.'
    ],
    [
        'Follow-up',
        'The next step is visible and can be automated where it makes sense.',
        'Follow-up depends on whoever remembers to check back.'
    ],
    [
        'Ownership',
        'The business keeps control of its domain, data, content, accounts, and delivered system terms.',
        'The business becomes dependent on disconnected subscriptions or a vendor black box.'
    ],
    [
        'Best fit',
        'Blue-collar businesses and serious operators with repeatable lead or workflow problems.',
        'Owners who just need another generic page or another generic app subscription.'
    ]
];

const projectQuestions = [
    {
        question: 'What kinds of systems are shown here?',
        answer: 'The featured work includes local service websites, booking flows, lead-oriented sites, and custom internal systems built around real operating needs.'
    },
    {
        question: 'Why keep the custom app examples?',
        answer: 'Blue-collar is the main lane, but custom systems like FlowOS and The Offer Hero prove the deeper capability when a workflow is valuable enough to build.'
    }
];

export default function ProjectCarousel() {
    return (
        <section id="projects" className="py-32 bg-white relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <span className="carousel-header block font-data text-accent tracking-[0.2em] text-sm uppercase mb-4">Recent Work</span>
                    <h2 className="carousel-header font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight">
                        Websites and systems already shipped.
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

            {/* Horizontal Auto-Scrolling Marquee Track */}
            <div className="carousel-track-wrapper overflow-hidden pb-12 w-full select-none cursor-default">
                <div className="flex gap-6 w-max animate-scroll hover:[animation-play-state:paused]">
                    {[...premierProjects, ...premierProjects].map((project, index) => (
                        <a
                            key={`${project.id}-${index}`}
                            href={project.link}
                            target={project.link.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="carousel-item flex-none w-[85vw] sm:w-[500px] md:w-[700px] lg:w-[800px] aspect-[4/3] md:aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-primary relative isolate group shadow-xl block"
                        >
                            {project.image ? (
                                <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                                    <div className="absolute inset-0 bg-primary/30 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent z-20"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-[#050810] z-0"></div>
                            )}

                            <div className="relative z-30 mt-auto p-6 md:p-8 flex flex-col gap-2 transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-2 group-hover:translate-y-0 h-full justify-end">
                                <span className="font-data text-accent uppercase tracking-widest text-xs font-bold block mb-1">{project.category}</span>
                                <h3 className="font-heading text-white font-bold text-xl md:text-3xl leading-tight">{project.title}</h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-8 items-start">
                <GeoComparisonTable
                    eyebrow="System Comparison"
                    title="Owned systems vs scattered tools"
                    intro="The point is not more technology. The point is a clearer path from first contact to booked work, tracked status, and reliable follow-up."
                    columns={buildModelColumns}
                    rows={buildModelRows}
                    note="Why this matters: the website, CRM, follow-up, and operating workflow should support the same business path instead of creating more places for work to disappear."
                />
                <GeoQuestionGrid
                    eyebrow="Portfolio Context"
                    title="What these projects show"
                    items={projectQuestions}
                />
            </div>

            {/* Global style for continuous loop animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 12px)); } /* 12px is half of the gap-6 (24px) */
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}} />
        </section>
    );
}
