import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    ClipboardList,
    Code2,
    MessageSquareText,
    PhoneCall,
    Search,
    ShieldCheck,
    Wrench,
} from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCarousel from '../components/ProjectCarousel';
import GetStarted from '../components/GetStarted';
import SEO from '../components/SEO';

const offerCards = [
    {
        icon: Search,
        title: 'Website Foundation',
        price: 'Starts at $2,500 or $299/mo',
        description:
            'For blue-collar businesses that need a sharper website, clearer service pages, stronger trust, and a lead path that turns visitors into calls or quote requests.',
        href: '/websites',
        bullets: ['Service pages', 'Mobile-first design', 'Lead forms', 'Google profile connection'],
    },
    {
        icon: ClipboardList,
        title: 'Lead & CRM System',
        price: 'Starts at $6,500 or $750/mo',
        description:
            'For businesses that already get leads but lose track of them in texts, inboxes, voicemail, spreadsheets, or memory.',
        href: '/lead-crm-system',
        bullets: ['Lead pipeline', 'Notifications', 'Automated follow-up', 'Review requests'],
    },
    {
        icon: Code2,
        title: 'Custom Operating System',
        price: 'Custom quote after audit',
        description:
            'For serious operators who need a private app, booking system, client portal, quoting tool, dashboard, or workflow that normal software cannot cover.',
        href: '/custom-systems',
        bullets: ['Dashboards', 'Booking flows', 'Client portals', 'Internal tools'],
    },
];

const leakCards = [
    {
        icon: PhoneCall,
        title: 'Missed calls',
        text: 'A homeowner or business owner calls once, gets voicemail, and moves to the next provider.',
    },
    {
        icon: MessageSquareText,
        title: 'Slow follow-up',
        text: 'Forms, DMs, referrals, and calls land in different places with no reliable next step.',
    },
    {
        icon: BriefcaseBusiness,
        title: 'Scattered operations',
        text: 'Jobs, estimates, customers, notes, and status updates live across texts, spreadsheets, and memory.',
    },
];

const proofItems = [
    {
        title: 'Total Quality Plumbing',
        type: 'Local SEO Website',
        text: 'A service-heavy plumbing website with service pages, city pages, reviews, gallery, careers, and clear contact routing.',
        image: 'https://www.totalqualityplumbingtx.com/og-image.png',
    },
    {
        title: 'FlowOS',
        type: 'Operations SaaS',
        text: 'A barbershop operating system with kiosk check-in, queue management, booking, CRM, analytics, and SMS workflows.',
        image: 'https://www.flowosapp.com/flowos-og.png',
    },
    {
        title: 'The Offer Hero',
        type: 'Custom App',
        text: 'A command center for real estate finance producers with borrower intake, pipeline visibility, quote workflows, and outreach support.',
        image: 'https://www.theofferhero.com/og-image.png',
    },
];

const processSteps = [
    ['Audit the leaks', 'We review the website, lead flow, follow-up, tools, and manual bottlenecks.'],
    ['Map the system', 'We define what should happen when someone calls, submits a form, books, pays, or needs follow-up.'],
    ['Build the front and back end', 'We build the website, CRM, dashboard, automations, booking flow, or custom tool needed.'],
    ['Launch and support', 'We deploy it, document it, train you, and keep improving the system after launch.'],
];

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const targetId = hash.replace('#', '');
        const scrollTimer = setTimeout(() => {
            const element = document.getElementById(targetId);
            if (!element) return;

            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }, 600);

        return () => clearTimeout(scrollTimer);
    }, [hash]);

    const seoSchemas = [
        {
            '@type': 'Organization',
            '@id': 'https://theprovidersystem.com/#organization',
            name: 'The Provider System',
            url: 'https://theprovidersystem.com',
            description:
                'The Provider System builds websites, CRMs, follow-up systems, and custom operating tools for blue-collar service businesses and select high-value operators.',
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'theprovidersystem@gmail.com',
                availableLanguage: 'English',
            },
            knowsAbout: [
                'Blue-collar websites',
                'Local service business websites',
                'Lead capture systems',
                'CRM workflows',
                'Automated follow-up',
                'Custom business systems',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://theprovidersystem.com/#website',
            url: 'https://theprovidersystem.com',
            name: 'The Provider System',
            publisher: { '@id': 'https://theprovidersystem.com/#organization' },
        },
        {
            '@type': 'Service',
            '@id': 'https://theprovidersystem.com/#service-blue-collar-systems',
            name: 'Blue-Collar Website and Lead Systems',
            provider: { '@id': 'https://theprovidersystem.com/#organization' },
            serviceType: 'Website Development, CRM Setup, and Lead Follow-Up Systems',
            description:
                'Website, CRM, and follow-up systems for contractors, trades, and blue-collar service businesses.',
        },
    ];

    return (
        <main>
            <SEO
                title="Websites, CRMs & Follow-Up Systems"
                description="The Provider System builds websites, CRMs, and follow-up systems for blue-collar service businesses that need more leads and less operational chaos."
                url="/"
                schemas={seoSchemas}
            />
            <Hero />

            <section className="py-24 px-6 md:px-16 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-3xl mb-14">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            The Real Problem
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            Your business does not need more software. It needs fewer leaks.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            Most owners do not have a website problem by itself. They have a lead flow problem. The site, phone, forms, follow-up, CRM, schedule, and team all need to connect cleanly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {leakCards.map((item) => (
                            <div key={item.title} className="bg-white rounded-lg border border-muted/10 p-7 shadow-sm">
                                <item.icon className="w-8 h-8 text-accent mb-5" />
                                <h3 className="font-heading font-bold text-xl text-primary mb-3">{item.title}</h3>
                                <p className="font-heading text-muted leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-3xl mb-14">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Offer Ladder
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            Choose the system that matches where your business is right now.
                        </h2>
                        <p className="font-heading text-muted text-lg leading-relaxed">
                            Start with a website when that is the bottleneck. Step into a lead system when follow-up is leaking money. Build a custom operating system when normal tools cannot fit the work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {offerCards.map((offer) => (
                            <Link
                                key={offer.title}
                                to={offer.href}
                                className="group bg-background rounded-lg border border-muted/10 p-7 shadow-sm hover:border-accent/40 hover:shadow-xl transition-all flex flex-col"
                            >
                                <offer.icon className="w-9 h-9 text-accent mb-6" />
                                <h3 className="font-heading font-bold text-2xl text-primary mb-2">{offer.title}</h3>
                                <p className="font-data text-xs uppercase tracking-[0.16em] text-accent mb-5">{offer.price}</p>
                                <p className="font-heading text-muted leading-relaxed mb-6 flex-1">{offer.description}</p>
                                <div className="space-y-2 mb-7">
                                    {offer.bullets.map((bullet) => (
                                        <div key={bullet} className="flex items-center gap-2 font-heading text-sm text-primary/80">
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                            {bullet}
                                        </div>
                                    ))}
                                </div>
                                <span className="inline-flex items-center gap-2 font-heading font-bold text-accent group-hover:gap-3 transition-all">
                                    View offer <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-primary text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
                    <div>
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Focus
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-5">
                            Blue-collar is the main lane. Custom systems are the selective lane.
                        </h2>
                        <p className="font-heading text-white/65 text-lg leading-relaxed">
                            The public site should not pretend to serve every industry. The core offer is for contractors, trades, and blue-collar service businesses. Custom apps stay on the site as proof and as a higher-ticket path for the right project.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            'Plumbing, electrical, HVAC, roofing',
                            'Construction, concrete, fencing, painting',
                            'Landscaping, pest control, pressure washing',
                            'Auto detailing, towing, garage doors, handyman',
                            'Booking systems, quote systems, dashboards',
                            'Private apps when the operational value is real',
                        ].map((item) => (
                            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                                <Wrench className="w-5 h-5 text-accent mb-3" />
                                <p className="font-heading text-white/75">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-3xl mb-14">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Proof
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-5">
                            Real systems already built.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {proofItems.map((project) => (
                            <article key={project.title} className="overflow-hidden rounded-lg bg-white border border-muted/10 shadow-sm">
                                <div className="aspect-[16/10] overflow-hidden bg-primary">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="p-6">
                                    <p className="font-data text-xs uppercase tracking-[0.16em] text-accent mb-3">{project.type}</p>
                                    <h3 className="font-heading font-bold text-xl text-primary mb-3">{project.title}</h3>
                                    <p className="font-heading text-muted leading-relaxed">{project.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                        Process
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-14">
                        How the build works.
                    </h2>
                    <div className="space-y-8">
                        {processSteps.map(([title, text], index) => (
                            <div key={title} className="grid grid-cols-[56px_1fr] gap-5">
                                <div className="w-12 h-12 rounded-full bg-accent text-white font-heading font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="border-b border-muted/10 pb-8">
                                    <h3 className="font-heading font-bold text-xl text-primary mb-2">{title}</h3>
                                    <p className="font-heading text-muted leading-relaxed">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-16 bg-primary text-white">
                <div className="max-w-5xl mx-auto">
                    <ShieldCheck className="w-10 h-10 text-accent mb-6" />
                    <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-5">
                        Built for control, not hostage situations.
                    </h2>
                    <p className="font-heading text-white/70 text-lg leading-relaxed max-w-3xl mb-10">
                        You should own the important parts of your business: your domain, content, customer data, Google profile, accounts, and code when the project terms are complete.
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-heading font-bold text-white hover:border-accent hover:text-accent transition-colors"
                    >
                        Read the ownership stance <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <ProjectCarousel />
            <GetStarted />
        </main>
    );
}
