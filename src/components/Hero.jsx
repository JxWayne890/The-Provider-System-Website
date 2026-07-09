import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList } from 'lucide-react';

const proofPoints = [
    'Built for contractors and service businesses',
    'Websites, lead capture, CRM, follow-up',
    'Selective custom apps for serious operators',
];

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] w-full flex items-end pb-20 px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://www.totalqualityplumbingtx.com/og-image.png"
                    alt="Local service business website built by The Provider System"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/35" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
            </div>

            <div className="relative z-10 max-w-5xl text-white">
                <div className="hero-anim inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-data text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                    <ClipboardList className="h-4 w-4 text-accent" />
                    Websites + Lead Systems
                </div>

                <h1 className="hero-anim mt-8 font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] max-w-4xl">
                    Websites, CRMs, and follow-up systems for blue-collar businesses.
                </h1>

                <p className="hero-anim font-heading text-lg md:text-xl max-w-3xl text-white/80 mt-8 mb-10 font-light leading-relaxed">
                    The Provider System builds the website customers see and the back-end system your team uses to capture, track, follow up with, and manage every lead.
                </p>

                <div className="hero-anim flex flex-col sm:flex-row gap-4">
                    <a
                        href="#contact"
                        className="group inline-flex items-center justify-center gap-3 rounded-[2rem] bg-accent text-white px-8 py-4 font-heading text-lg font-semibold hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-accent/25"
                    >
                        Book a System Audit
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center rounded-[2rem] border border-white/25 bg-white/10 px-8 py-4 font-heading text-lg font-semibold text-white backdrop-blur hover:bg-white/15 transition-colors"
                    >
                        View Recent Work
                    </Link>
                </div>

                <div className="hero-anim mt-10 flex flex-wrap gap-3">
                    {proofPoints.map((point) => (
                        <span
                            key={point}
                            className="rounded-full border border-white/10 bg-primary/50 px-4 py-2 font-heading text-sm text-white/75 backdrop-blur"
                        >
                            {point}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
