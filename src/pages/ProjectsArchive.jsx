import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';

const projects = [
    {
        title: 'Total Quality Plumbing',
        category: 'Blue-Collar Website',
        description:
            'A local plumbing website built around trust, services, service-area relevance, reviews, and fast contact paths.',
        outcome:
            'Shows the core website lane: clear positioning for a service business, local search structure, and a simple path from visitor to lead.',
        image: 'https://www.totalqualityplumbingtx.com/og-image.png',
        link: 'https://totalqualityplumbingtx.com/',
        tags: ['Service pages', 'Local SEO', 'Trust sections', 'Lead capture'],
    },
    {
        title: 'FlowOS',
        category: 'Custom Operating System',
        description:
            'A custom operating system for barbershops with check-in, booking, client records, analytics, and shop workflows.',
        outcome:
            'Shows the deeper system lane: when a business workflow is valuable enough, The Provider System can build the app behind it.',
        image: 'https://www.flowosapp.com/flowos-og.png',
        link: 'https://www.flowosapp.com/',
        tags: ['Booking', 'CRM', 'Dashboard', 'Operations'],
    },
    {
        title: 'The Offer Hero',
        category: 'Custom App',
        description:
            'A command platform for real estate finance producers with borrower intake, pipeline visibility, quote workflows, and outreach support.',
        outcome:
            'Shows how a custom system can organize a complex sales process and give operators one place to see what needs attention.',
        image: 'https://www.theofferhero.com/og-image.png',
        link: 'https://www.theofferhero.com/',
        tags: ['Pipeline', 'Intake', 'Outreach', 'SaaS'],
    },
    {
        title: 'Roller Rink USA',
        category: 'Booking Website',
        description:
            'A venue website structured around parties, private events, packages, contact capture, and booking intent.',
        outcome:
            'Shows a practical booking path for a local business where the website needs to move people toward a scheduled event.',
        image: 'https://www.rollerrinkusa.com/assets/roller-rink-hero.png',
        link: 'https://rollerrinkusa.com/',
        tags: ['Packages', 'Booking path', 'Local venue', 'Forms'],
    },
    {
        title: 'Weathersbee Electric Co.',
        category: 'Industrial Website',
        description:
            'A focused website for an industrial electrical rebuilder with legacy positioning, service clarity, and direct contact paths.',
        outcome:
            'Shows the blue-collar credibility lane: make a serious trade business look established, clear, and easy to contact.',
        image: '/images/projects/weathersbee.png',
        link: 'https://weathersbeeelectric.com/',
        tags: ['Industrial', 'Service clarity', 'Legacy trust', 'Mobile site'],
    },
];

const proofPoints = [
    {
        label: 'Main lane',
        value: 'Blue-collar websites and lead systems for contractors, trades, and service businesses.',
    },
    {
        label: 'Selective lane',
        value: 'Custom CRMs, dashboards, booking tools, and operating systems when the workflow is worth building.',
    },
    {
        label: 'Ownership stance',
        value: 'Projects are structured so the client understands accounts, assets, handoff, and the system they are using.',
    },
];

export default function ProjectsArchive() {
    return (
        <main className="min-h-screen bg-background pt-28">
            <SEO
                title="Selected Work | The Provider System"
                description="Selected websites, lead systems, and custom operating tools built by The Provider System for blue-collar businesses and serious operators."
                url="/projects"
                schemas={[
                    {
                        '@type': 'CollectionPage',
                        '@id': 'https://theprovidersystem.com/projects',
                        name: 'Selected Work - The Provider System',
                        description:
                            'Selected websites, lead systems, and custom operating tools built for blue-collar businesses and serious operators.',
                        isPartOf: { '@id': 'https://theprovidersystem.com/#website' },
                    },
                    buildBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Projects' },
                    ]),
                ]}
            />

            <section className="px-6 md:px-16 pb-16">
                <div className="max-w-6xl mx-auto">
                    <Link
                        to="/"
                        className="font-heading text-sm font-semibold text-muted hover:text-accent transition-colors"
                    >
                        &larr; Back to home
                    </Link>
                    <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
                        <div>
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Selected Work
                            </span>
                            <h1 className="font-heading font-bold text-4xl md:text-6xl text-primary tracking-tight leading-tight">
                                Websites and systems already shipped.
                            </h1>
                        </div>
                        <p className="font-heading text-lg text-muted leading-relaxed">
                            The work below is intentionally focused: blue-collar websites, lead paths, booking
                            experiences, and custom systems that prove we can build the front end customers see and
                            the back end the business actually uses.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
                    {proofPoints.map((point) => (
                        <div key={point.label} className="bg-white border border-primary/10 rounded-lg p-6">
                            <div className="font-data text-xs uppercase tracking-[0.18em] text-accent mb-3">
                                {point.label}
                            </div>
                            <p className="font-heading text-primary/75 leading-relaxed">{point.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-lg overflow-hidden border border-primary/10 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="aspect-[16/9] bg-primary overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <span className="font-data text-xs uppercase tracking-[0.18em] text-accent">
                                        {project.category}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                                </div>
                                <h2 className="font-heading font-bold text-2xl text-primary mb-3">
                                    {project.title}
                                </h2>
                                <p className="font-heading text-muted leading-relaxed mb-5">
                                    {project.description}
                                </p>
                                <p className="font-heading text-sm text-primary/70 leading-relaxed mb-6">
                                    {project.outcome}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-background border border-primary/10 px-3 py-1 font-data text-[11px] uppercase tracking-[0.08em] text-primary/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <ContactFormSection
                heading="Have a project like this?"
                subheading="Tell us whether you need the website, the lead system, or the custom operating tool behind it."
            />
        </main>
    );
}
