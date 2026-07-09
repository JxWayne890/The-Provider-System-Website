import { useParams, Link } from 'react-router-dom';
import {
    ArrowRight,
    Boxes,
    Bug,
    Car,
    DoorOpen,
    Droplets,
    Fence,
    Flower2,
    Hammer,
    HardHat,
    Home,
    Paintbrush,
    Sparkles,
    SprayCan,
    Sun,
    Thermometer,
    Trash2,
    TreePine,
    Truck,
    Waves,
    Wrench,
    Zap,
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { blueCollarTrades } from '../data/blueCollarTrades';
import { cn } from '../lib/cn';

const iconMap = {
    Boxes,
    Bug,
    Car,
    DoorOpen,
    Droplets,
    Fence,
    Flower2,
    Hammer,
    HardHat,
    Home,
    Paintbrush,
    Sparkles,
    SprayCan,
    Sun,
    Thermometer,
    Trash2,
    TreePine,
    Truck,
    Waves,
    Wrench,
    Zap,
};

export default function BlueCollarTradePage() {
    const { slug } = useParams();
    const trade = blueCollarTrades.find((t) => t.slug === slug);

    if (!trade) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-primary">
                <div className="text-center">
                    <h1 className="text-4xl font-drama text-white mb-4">Trade Not Found</h1>
                    <p className="font-heading text-white/60 mb-8">
                        The trade page you are looking for does not exist.
                    </p>
                    <Link
                        to="/blue-collar"
                        className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform"
                    >
                        Back to all trades
                    </Link>
                </div>
            </main>
        );
    }

    const Icon = iconMap[trade.icon] || Wrench;
    const relatedTradeObjects = (trade.relatedTrades || [])
        .map((rs) => blueCollarTrades.find((t) => t.slug === rs))
        .filter(Boolean)
        .slice(0, 3);

    const comparisonHeaders = trade.comparisonTable?.headers || ['Area', 'Without Us', 'With The Provider System'];

    const schemas = [
        {
            '@type': 'WebPage',
            name: trade.metaTitle,
            description: trade.metaDescription,
            url: `https://theprovidersystem.com/blue-collar/${trade.slug}`,
        },
        buildFAQSchema(trade.faqs || []),
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blue-Collar', url: '/blue-collar' },
            { name: trade.name },
        ]),
    ];

    return (
        <main className="bg-background min-h-screen">
            <SEO
                title={trade.metaTitle.replace(' | The Provider System', '')}
                description={trade.metaDescription}
                url={`/blue-collar/${trade.slug}`}
                schemas={schemas}
            />

            <section className="pt-32 pb-16 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', href: '/' },
                            { name: 'Blue-Collar', href: '/blue-collar' },
                            { name: trade.name },
                        ]}
                        theme="dark"
                    />
                    <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                            <Icon className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="font-drama text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        {trade.heroHeading}
                    </h1>
                    <p className="font-heading text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                        {trade.excerpt}
                    </p>
                </div>
            </section>

            <div>
                <section className="py-20 px-6 md:px-16 bg-background">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {trade.description.map((paragraph, i) => (
                            <p
                                key={i}
                                className="bct-anim font-heading text-base md:text-lg text-muted leading-relaxed"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>

                {trade.systemFeatures && trade.systemFeatures.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <span className="bct-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Built For You
                            </span>
                            <h2 className="bct-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                What We Build for {trade.fullName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {trade.systemFeatures.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="bct-anim bg-background rounded-xl p-8 border border-muted/10"
                                    >
                                        <h3 className="font-heading font-bold text-lg text-primary mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="font-heading text-sm text-muted leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {trade.painPoints && trade.painPoints.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                        <div className="max-w-6xl mx-auto relative z-10">
                            <span className="bct-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Problems &amp; Solutions
                            </span>
                            <h2 className="bct-anim font-heading font-bold text-3xl md:text-5xl tracking-tight mb-12">
                                Problems {trade.name} Face Every Day and How We Solve Them
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {trade.painPoints.map((pp, i) => (
                                    <div
                                        key={i}
                                        className="bct-anim bg-white/5 border border-white/10 rounded-2xl p-8"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start gap-3">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-red-400 flex-shrink-0" />
                                                <p className="font-heading text-base text-red-300 leading-relaxed">
                                                    {pp.problem}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center text-accent text-xl font-bold">
                                                &rarr;
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-400 flex-shrink-0" />
                                                <p className="font-heading text-base text-green-300 leading-relaxed">
                                                    {pp.solution}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {trade.comparisonTable?.rows && trade.comparisonTable.rows.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-background">
                        <div className="max-w-5xl mx-auto">
                            <span className="bct-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Side by Side
                            </span>
                            <h2 className="bct-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Running Your {trade.name} Business: With vs Without The Provider System
                            </h2>
                            <div className="bct-anim overflow-x-auto rounded-2xl border border-muted/10 shadow-sm">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-primary text-white">
                                            {comparisonHeaders.map((header) => (
                                                <th
                                                    key={header}
                                                    className="px-6 py-4 font-heading font-bold text-sm tracking-wide first:rounded-tl-2xl last:rounded-tr-2xl"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trade.comparisonTable.rows.map((row, i) => (
                                            <tr
                                                key={`${row[0]}-${i}`}
                                                className={cn(i % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                                            >
                                                <td className="px-6 py-4 font-heading font-bold text-sm text-primary">
                                                    {row[0]}
                                                </td>
                                                <td className="px-6 py-4 font-heading text-sm text-muted">
                                                    {row[1]}
                                                </td>
                                                <td className="px-6 py-4 font-heading text-sm text-accent font-medium">
                                                    {row[2]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {trade.serviceTypes && trade.serviceTypes.length > 0 && (
                    <section className="py-20 px-6 md:px-16 bg-white">
                        <div className="max-w-5xl mx-auto">
                            <span className="bct-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Your Service Pages
                            </span>
                            <h2 className="bct-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-12">
                                Service Pages We Create for Your {trade.name} Website
                            </h2>
                            <div className="bct-anim flex flex-wrap gap-3 mb-10">
                                {trade.serviceTypes.map((service, i) => (
                                    <span
                                        key={i}
                                        className="bg-primary/10 text-primary px-4 py-2 rounded-full font-data text-sm"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                            <p className="bct-anim font-heading text-base text-muted leading-relaxed max-w-3xl">
                                Each of these services can get its own optimized page for each city and area you serve.
                                If you offer {trade.serviceTypes.length} services across 20 cities, that creates{' '}
                                {trade.serviceTypes.length * 20}+ targeted service-area pages.
                            </p>
                        </div>
                    </section>
                )}

                {trade.faqs && trade.faqs.length > 0 && (
                    <FAQSection faqs={trade.faqs} title={`${trade.name} FAQ`} />
                )}

                {relatedTradeObjects.length > 0 && (
                    <section className="py-16 px-6 md:px-16 bg-background">
                        <div className="max-w-6xl mx-auto">
                            <span className="bct-anim font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                More Trades
                            </span>
                            <h2 className="bct-anim font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-10">
                                We Also Build Systems For
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                {relatedTradeObjects.map((related) => {
                                    const RelatedIcon = iconMap[related.icon] || Wrench;
                                    return (
                                        <Link
                                            key={related.slug}
                                            to={`/blue-collar/${related.slug}`}
                                            className="bct-anim group bg-white rounded-2xl p-8 border border-muted/10 hover:border-accent hover:shadow-lg transition-all duration-300 flex flex-col"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                                <RelatedIcon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-heading font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                                                {related.name}
                                            </h3>
                                            <p className="font-heading text-sm text-muted leading-relaxed flex-1 mb-4">
                                                {related.excerpt}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 font-data text-xs uppercase tracking-widest text-accent font-bold">
                                                Learn More <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="bct-anim text-center">
                                <Link
                                    to="/blue-collar"
                                    className="inline-flex items-center gap-2 font-heading font-bold text-accent hover:text-accent/80 transition-colors"
                                >
                                    See all trades we serve <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <ContactFormSection
                heading={`Get a Website System for Your ${trade.name} Business`}
                subheading={`Tell us about your ${trade.name.toLowerCase()} business and we will map the website, lead capture, and follow-up system that fits your service area.`}
            />
        </main>
    );
}
