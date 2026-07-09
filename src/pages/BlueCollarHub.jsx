import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQSection from '../components/FAQSection'
import ContactFormSection from '../components/ContactFormSection'
import { buildBreadcrumbSchema, buildFAQSchema, buildOrganizationSchema } from '../components/SchemaMarkup'
import { blueCollarTrades } from '../data/blueCollarTrades'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'
import {
    Boxes,
    Bug,
    Calendar,
    Car,
    Database,
    DoorOpen,
    Droplets,
    Fence,
    Flower2,
    Globe,
    Hammer,
    HardHat,
    Home,
    Mail,
    Paintbrush,
    Phone,
    Sparkles,
    SprayCan,
    Star,
    Sun,
    Thermometer,
    Trash2,
    TreePine,
    Truck,
    Waves,
    Wrench,
    Zap,
} from 'lucide-react'

const iconMap = {
    Boxes,
    Bug,
    Calendar,
    Car,
    Database,
    DoorOpen,
    Droplets,
    Fence,
    Flower2,
    Globe,
    Hammer,
    HardHat,
    Home,
    Mail,
    Paintbrush,
    Phone,
    Sparkles,
    SprayCan,
    Star,
    Sun,
    Thermometer,
    Trash2,
    TreePine,
    Truck,
    Waves,
    Wrench,
    Zap,
}

const features = [
    {
        icon: 'Globe',
        title: 'Service-Area SEO Websites',
        description:
            'Most contractor websites have a few generic pages and do not explain every service area clearly. We build service and location pages around the actual work you do and the areas you serve, so searchers have a better path to find and trust you.',
    },
    {
        icon: 'Database',
        title: 'Lead Intake via API to CRM',
        description:
            'Every form submission on your website hits our API and goes straight into your custom CRM. No more checking email inboxes, no more lost leads sitting in spam. Every inquiry is tracked, timestamped, and ready for follow-up the second it comes in.',
    },
    {
        icon: 'Mail',
        title: 'Automated Follow-Up Sequences',
        description:
            'Your CRM automatically follows up with new leads via text and email on a schedule you set. No more forgetting to call someone back. No more losing a job because you were on a roof and couldn\'t get to your phone. The system handles it.',
    },
    {
        icon: 'Phone',
        title: 'AI Phone Agent & Receptionist',
        description:
            'AI-assisted phone intake can answer common calls, qualify leads, ask the right questions, schedule appointments, and escalate when a real person needs to step in.',
    },
    {
        icon: 'Calendar',
        title: 'Job Scheduling & Dispatch',
        description:
            'Manage your crew schedules, assign jobs, and optimize routes from one dashboard. No more sticky notes on the truck dash, no more texting your guys at 6am. Everyone knows where they need to be and when.',
    },
    {
        icon: 'Star',
        title: 'Automated Review Requests',
        description:
            'After every completed job, the system automatically sends a review request to your customer via text and email. You build your Google reputation on autopilot without having to awkwardly ask every homeowner to leave a review.',
    },
]

const comparisonRows = [
    { aspect: 'Website Pages', without: '5-10 generic pages', with: 'Service and area pages built around what you actually offer' },
    { aspect: 'Lead Response Time', without: 'Hours or next day', with: 'Fast notifications and assisted follow-up' },
    { aspect: 'Missed Calls', without: 'Voicemail and callback gaps', with: 'AI-assisted intake and escalation options' },
    { aspect: 'Follow-Up', without: 'Manual, inconsistent', with: 'Automated sequences via text & email' },
    { aspect: 'Google Visibility', without: 'A few broad pages', with: 'More useful service-area coverage' },
    { aspect: 'Appointment Booking', without: 'Phone tag, back-and-forth', with: 'Booking paths based on your availability rules' },
    { aspect: 'Customer Reviews', without: 'Manually ask (or forget)', with: 'Automated after every job' },
    { aspect: 'Lead Tracking', without: 'Spreadsheet or memory', with: 'Full CRM with pipeline view' },
    { aspect: 'Revenue Impact', without: 'Hard to see what is slipping away', with: 'Cleaner visibility into leads, follow-up, and booked work' },
]

const steps = [
    {
        title: 'Free Consultation',
        description:
            'We get on a call, learn about your business, what services you offer, and every city or area you serve. No pressure, no pitch deck — just a straight conversation about where you are and where you want to be.',
    },
    {
        title: 'Custom Website Build',
        description:
            'We build a website structured around your exact services and service areas. Pages are written with real, locally relevant content designed to help customers understand what you do and where you work.',
    },
    {
        title: 'CRM & Lead Intake Setup',
        description:
            'We wire up your website forms to hit our API, feeding every lead directly into your custom CRM. Automated follow-up sequences go live so no lead sits untouched for more than a few minutes.',
    },
    {
        title: 'AI Phone Agent Deployment',
        description:
            'Your AI-assisted phone intake can go live to answer common calls, qualify leads, schedule appointments, and make handoffs clearer when a human needs to step in.',
    },
    {
        title: 'Launch & Optimize',
        description:
            'Everything goes live. We monitor your rankings, lead flow, and conversion rates. We optimize pages, tweak follow-up sequences, and make sure the system gets better every month.',
    },
]

const faqs = [
    {
        q: 'How much does the full system cost?',
        a: 'It depends on how many services you offer and how many areas you serve. A plumber covering 30 cities is a different build than a roofer covering 200. We give you a clear quote on our first call — no hidden fees, no surprises halfway through.',
    },
    {
        q: 'How long does it take to build?',
        a: 'Most full systems are live within 4-6 weeks. The website build takes the longest because we\'re writing hundreds of unique pages. CRM setup and AI phone agent deployment usually happen in parallel during weeks 2-3.',
    },
    {
        q: 'Do I need to be tech-savvy to use this?',
        a: 'Not at all. If you can check a text message and look at a dashboard, you can run this system. We build it so you and your team can use it without any technical background. We also train you on everything before we hand it over.',
    },
    {
        q: 'How does the AI phone agent actually work?',
        a: 'It answers your business phone line just like a real receptionist. It greets callers, asks qualifying questions (what service they need, their address, timeline), schedules appointments on your calendar, and logs everything in your CRM. It works 24/7, including weekends and holidays.',
    },
    {
        q: 'What if I serve multiple cities or states?',
        a: 'That\'s exactly what we\'re built for. The more areas you serve, the more pages we create, and the more keywords you rank for. We\'ve built sites covering entire states and multi-state regions. More coverage means more leads.',
    },
    {
        q: 'I already have a website. Can you work with it?',
        a: 'We can, but honestly, most existing contractor sites aren\'t built for what we do. If your current site has 5-10 pages, there\'s no way to bolt 300+ pages onto it without a rebuild. We\'ll tell you straight on the call whether it makes sense to keep it or start fresh.',
    },
    {
        q: 'How many leads can I expect?',
        a: 'It depends on your market and competition. What we can tell you is that most contractors we work with go from ranking for almost nothing to showing up for hundreds of local searches within 3-6 months. More visibility means more calls, more form fills, and more booked jobs.',
    },
    {
        q: 'What trades do you work with?',
        a: 'We specialize in blue-collar and home service businesses — HVAC, plumbing, electrical, roofing, landscaping, painting, concrete, fencing, pest control, cleaning, auto repair, and more. If you run crews and serve a local area, we can build your system.',
    },
]

export default function BlueCollarHub() {
    return (
        <>
            <SEO
                title="Websites, CRMs & Follow-Up for Blue-Collar Businesses"
                description="Websites, CRM, lead intake, AI-assisted phone support, and automated follow-up systems for blue-collar trades and service businesses."
                url="/blue-collar"
                schemas={[
                    buildOrganizationSchema(),
                    buildFAQSchema(faqs),
                    buildBreadcrumbSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Blue-Collar' },
                    ]),
                ]}
            />

            {/* ── Hero ── */}
            <section className="bg-primary pt-32 pb-16 px-6 md:px-16">
                <div className="max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'Blue-Collar' },
                        ]}
                        theme="dark"
                    />

                    <h1 className="font-drama text-4xl md:text-5xl text-white leading-tight mt-4">
                        The Complete Digital System for Blue-Collar Businesses
                    </h1>

                    <p className="text-gray-300 font-heading text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
                        Custom websites, lead intake, CRM follow-up, and AI-assisted phone support. Built specifically for contractors and trade businesses that are tired of losing opportunities between the website, phone, inbox, and text messages.
                    </p>

                    <p className="text-gray-500 font-data text-sm tracking-wide mt-4">
                        Currently serving nationwide in America, Puerto Rico, and the United Kingdom.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-10">
                        <Link
                            to="/#contact"
                            className="bg-accent text-white font-heading font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
                        >
                            Book a Free Consultation
                        </Link>
                        <Link
                            to="/diagnostic"
                            className="border border-white text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
                        >
                            Take the Free Diagnostic
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── What We Build ── */}
            <section className="bg-background py-20 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            What You Get
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                            A Complete System, Not Just a Website
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => {
                            const Icon = iconMap[feature.icon]
                            return (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/40 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                                        {Icon && <Icon className="w-6 h-6 text-accent" />}
                                    </div>
                                    <h3 className="font-heading font-bold text-xl text-primary mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="font-heading text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── SEO Breakdown ── */}
            <section className="bg-white py-20 px-6 md:px-16">
                <div className="max-w-3xl mx-auto">
                    <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                        The SEO Strategy
                    </span>
                    <h2 className="font-drama text-3xl md:text-5xl text-primary tracking-tight mb-10 leading-tight">
                            How We Build Service-Area Pages for Blue-Collar Businesses
                    </h2>

                    <div className="space-y-6 font-heading text-gray-700 text-lg leading-relaxed">
                        <p>
                            Here's the problem with most contractor websites: they have a homepage, an about page, a services page, a contact page, and maybe a gallery. That's 5-10 pages total. Google looks at that and has no idea where you work or what specific services you provide in each area. You end up ranking for your business name and nothing else.
                        </p>
                        <p>
                            Our approach is simple. We take every real service you offer and every city or area you serve, then build useful pages around those combinations where it makes sense. If you cover many services and many cities, that can become a large service-area library.
                        </p>
                        <p>
                            But we're not creating thin, copy-paste garbage. Every single page has unique, locally-relevant content. The page about AC repair in Dallas is different from the page about AC repair in Fort Worth. We write about the local climate, the common housing types, the specific problems homeowners in that area deal with. Google sees it as legitimate, helpful content — because it is.
                        </p>
                        <p>
                            The goal is to give your business more chances to show up for real local searches and give visitors a page that matches what they were looking for.
                        </p>
                        <p>
                            Most owners do not need random blog posts first. They need clear service pages, location relevance, trust signals, calls to action, and a follow-up system behind the website.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Comparison Table ── */}
            <section className="bg-primary py-20 px-6 md:px-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Before & After
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight">
                            What Changes When You Get The Full System
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-accent/20">
                                    <th className="text-left font-data text-xs uppercase tracking-widest text-accent px-6 py-4">
                                        Aspect
                                    </th>
                                    <th className="text-left font-data text-xs uppercase tracking-widest text-gray-400 px-6 py-4">
                                        Without Our System
                                    </th>
                                    <th className="text-left font-data text-xs uppercase tracking-widest text-accent px-6 py-4">
                                        With The Provider System
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, i) => (
                                    <tr
                                        key={row.aspect}
                                        className={cn(
                                            'border-t border-white/5',
                                            i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'
                                        )}
                                    >
                                        <td className="px-6 py-4 font-heading font-bold text-white text-sm">
                                            {row.aspect}
                                        </td>
                                        <td className="px-6 py-4 font-heading text-gray-400 text-sm">
                                            {row.without}
                                        </td>
                                        <td className="px-6 py-4 font-heading text-accent text-sm font-semibold">
                                            {row.with}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── Trades Grid ── */}
            <section className="bg-background py-20 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Our Specialties
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                            Industries We Specialize In
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {blueCollarTrades.map((trade) => {
                            const Icon = iconMap[trade.icon] || Wrench
                            return (
                                <Link
                                    key={trade.slug}
                                    to={`/blue-collar/${trade.slug}`}
                                    className="bg-white rounded-xl p-6 text-center border-2 border-transparent hover:border-accent hover:shadow-lg transition-all group"
                                >
                                    <div className="flex justify-center mb-3">
                                        {Icon && (
                                            <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                                        )}
                                    </div>
                                    <span className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors">
                                        {trade.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="bg-white py-20 px-6 md:px-16">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            The Process
                        </span>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                            How We Build Your System
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <div key={step.title} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-accent text-white font-heading font-bold text-lg flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-primary mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="font-heading text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Service Areas ── */}
            <section className="bg-background py-12 px-6 md:px-16 text-center">
                <p className="font-heading text-gray-600 text-lg max-w-2xl mx-auto">
                    Currently serving blue-collar businesses nationwide across the United States, Puerto Rico, and the United Kingdom.
                </p>
            </section>

            {/* ── FAQ ── */}
            <FAQSection faqs={faqs} title="Frequently Asked Questions" theme="light" />

            {/* ── Contact ── */}
            <ContactFormSection
                heading="Let's Build Your System"
                subheading="Tell us about your business. We'll show you exactly what the full system looks like for your trade and service area."
            />
        </>
    )
}
