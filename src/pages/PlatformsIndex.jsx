import { Link } from 'react-router';
import * as LucideIcons from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { cn } from '../lib/cn';
import { toolsPlatforms } from '../data/toolsPlatforms';

const CATEGORY_META = {
    automation: { label: 'Automation', icon: 'Workflow' },
    ai: { label: 'AI & Machine Learning', icon: 'Brain' },
    crm: { label: 'CRM & Sales', icon: 'Users' },
    communication: { label: 'Communication', icon: 'MessageSquare' },
    database: { label: 'Database & Storage', icon: 'Database' },
    payment: { label: 'Payment Processing', icon: 'CreditCard' },
    ecommerce: { label: 'Ecommerce', icon: 'ShoppingCart' },
    development: { label: 'Development', icon: 'Code' },
};

const CATEGORY_ORDER = [
    'automation', 'ai', 'crm', 'communication', 'database', 'payment', 'ecommerce', 'development',
];

const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Platforms' },
];

function groupByCategory(platforms) {
    const groups = {};
    for (const p of platforms) {
        const cat = p.category || 'other';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(p);
    }
    return groups;
}

export default function PlatformsIndex() {
    const grouped = groupByCategory(toolsPlatforms);

    const schemas = [
        {
            "@type": "WebPage",
            "@id": "https://theprovidersystem.com/platforms/#webpage",
            "url": "https://theprovidersystem.com/platforms",
            "name": "Tools & Platforms We Work With | The Provider System",
            "description": "We integrate and build on the platforms your business already uses. Explore our expertise across automation, AI, CRM, communication, and development tools.",
            "isPartOf": { "@id": "https://theprovidersystem.com/#website" },
        },
        buildBreadcrumbSchema(breadcrumbs),
    ];

    return (
        <div className="bg-background min-h-screen font-body text-primary selection:bg-accent selection:text-dark">
            <SEO
                title="Tools & Platforms We Work With"
                description="We integrate and build on the platforms your business already uses. Explore our expertise across automation, AI, CRM, communication, and development tools."
                url="/platforms"
                schemas={schemas}
            />

            <main>
                {/* Hero */}
                <section className="bg-primary pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <Breadcrumbs items={breadcrumbs} theme="dark" />
                        <h1 className="font-drama font-bold text-4xl md:text-6xl text-white tracking-tight mt-6">
                            Tools &amp; Platforms
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
                            We build on the tools your business already runs. From workflow engines and AI APIs
                            to CRMs and payment processors, our integration expertise spans every layer of
                            your tech stack.
                        </p>
                    </div>
                </section>

                {/* Category Sections */}
                {CATEGORY_ORDER.map((catKey) => {
                    const platforms = grouped[catKey];
                    if (!platforms || platforms.length === 0) return null;
                    const meta = CATEGORY_META[catKey] || { label: catKey, icon: 'Boxes' };
                    const CatIcon = LucideIcons[meta.icon] || LucideIcons.Boxes;

                    return (
                        <section key={catKey} className="py-20 md:py-24 px-6 md:px-16 border-b border-muted/10 last:border-b-0">
                            <div className="max-w-6xl mx-auto">
                                <div className="flex items-center gap-3 mb-12">
                                    <CatIcon className="w-6 h-6 text-accent" />
                                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
                                        {meta.label}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {platforms.map((platform) => {
                                        const PIcon = LucideIcons[platform.icon] || LucideIcons.Boxes;
                                        return (
                                            <Link
                                                key={platform.slug}
                                                to={`/platforms/${platform.slug}`}
                                                className={cn(
                                                    'group block bg-white rounded-2xl border border-muted/10 p-8',
                                                    'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5',
                                                    'transition-all duration-300'
                                                )}
                                            >
                                                <div className="flex items-start justify-between mb-5">
                                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                        <PIcon className="w-6 h-6 text-accent" />
                                                    </div>
                                                    <span className="font-data text-xs tracking-wider uppercase text-muted bg-background px-3 py-1 rounded-full">
                                                        {meta.label}
                                                    </span>
                                                </div>
                                                <h3 className="font-heading font-bold text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                                                    {platform.name}
                                                </h3>
                                                <p className="font-heading text-muted text-sm leading-relaxed">
                                                    {platform.excerpt}
                                                </p>
                                                <span className="inline-flex items-center gap-1.5 font-data text-accent text-sm mt-6 group-hover:gap-3 transition-all">
                                                    Learn more
                                                    <LucideIcons.ArrowRight className="w-4 h-4" />
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* Contact */}
                <ContactFormSection />
            </main>
        </div>
    );
}
