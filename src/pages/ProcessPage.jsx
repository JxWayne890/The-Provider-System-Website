import { Search, Target, Hammer, FlaskConical, Rocket, Headphones } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildHowToSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';

const steps = [
    {
        icon: Search,
        number: '01',
        title: 'Discovery',
        description: 'We start by listening. In a focused discovery call, we map your website, lead flow, follow-up, tools, and operational bottlenecks. No proposal until we understand the problem.',
    },
    {
        icon: Target,
        number: '02',
        title: 'Strategy',
        description: 'Based on discovery, we build a prioritized automation roadmap. You get a clear scope document with architecture diagrams, platform recommendations, timeline, and transparent pricing before any build work begins.',
    },
    {
        icon: Hammer,
        number: '03',
        title: 'Build',
        description: 'We architect and build your workflows, integrations, and applications iteratively. You see working systems early and often, with regular checkpoints to validate that the build matches your operational reality.',
    },
    {
        icon: FlaskConical,
        number: '04',
        title: 'Test',
        description: 'Every system goes through rigorous testing with real data. We validate edge cases, stress-test under load, verify error handling paths, and confirm that every integration behaves correctly in production conditions.',
    },
    {
        icon: Rocket,
        number: '05',
        title: 'Launch',
        description: 'Deployment includes full documentation, runbooks for common scenarios, and a guided handoff so your team knows exactly how the system works. We do not disappear after going live.',
    },
    {
        icon: Headphones,
        number: '06',
        title: 'Support',
        description: 'Post-launch, we monitor system health, handle platform updates, and optimize performance as your needs evolve. Ongoing support packages are available for businesses that want continuous improvement.',
    },
];

export default function ProcessPage() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
            { name: 'Our Process' },
        ]),
        buildHowToSchema(
            'How The Provider System Builds Websites and Lead Systems',
            steps.map((s) => `${s.title}: ${s.description}`)
        ),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Our Process | The Provider System"
                description="Learn how The Provider System takes blue-collar website, CRM, and custom system projects from discovery through deployment."
                url="/about/process"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'About', href: '/about' },
                                { name: 'Our Process' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            How We Work
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Our Process
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Every engagement follows a practical process designed to clarify the bottleneck, reduce guesswork, and deliver a system your business can actually use.
                        </p>
                    </div>
                </section>

                {/* Timeline / Stepper */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                            <div className="space-y-12 md:space-y-16">
                                {steps.map((step, index) => (
                                    <div key={step.number} className="relative flex gap-6 md:gap-10 items-start">
                                        {/* Number circle */}
                                        <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                                            <step.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                                        </div>

                                        {/* Content */}
                                        <div className="pt-1 md:pt-3">
                                            <span className="font-data text-accent/60 text-xs tracking-widest uppercase">
                                                Step {step.number}
                                            </span>
                                            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mt-1 mb-3">
                                                {step.title}
                                            </h2>
                                            <p className="font-heading text-white/60 text-base leading-relaxed max-w-2xl">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Ready to Start the Process?"
                    subheading="Book a discovery call and we will map the fastest path to a better website, lead system, or custom operating tool."
                    theme="dark"
                />
            </main>
        </div>
    );
}
