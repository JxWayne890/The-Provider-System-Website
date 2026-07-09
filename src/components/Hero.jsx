import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList } from 'lucide-react';

const proofPoints = [
    'Built for contractors and service businesses',
    'Websites, lead capture, CRM, follow-up',
    'Selective custom apps for serious operators',
];

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] w-full flex items-end pb-20 px-6 md:px-16 overflow-hidden bg-primary">
            <div className="absolute inset-0 z-0 bg-primary" />
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
            <div className="absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-[#050b16] to-transparent" />

            <div className="absolute inset-y-24 right-[-8rem] z-0 hidden w-[58rem] rotate-[-4deg] lg:block">
                <div className="absolute right-20 top-0 h-24 w-72 rounded-lg border border-white/10 bg-white/[0.045] backdrop-blur">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                        <span className="font-data text-[10px] uppercase tracking-[0.18em] text-accent">Website</span>
                        <span className="h-2 w-16 rounded-full bg-white/20" />
                    </div>
                    <div className="space-y-2 px-5 py-4">
                        <span className="block h-2 w-44 rounded-full bg-white/20" />
                        <span className="block h-2 w-56 rounded-full bg-white/10" />
                    </div>
                </div>

                <div className="absolute right-80 top-36 h-40 w-80 rounded-lg border border-white/10 bg-white/[0.055] p-5 backdrop-blur">
                    <div className="mb-5 flex items-center justify-between">
                        <span className="font-data text-[10px] uppercase tracking-[0.18em] text-accent">Lead Intake</span>
                        <span className="rounded-full border border-accent/40 px-3 py-1 font-data text-[10px] uppercase tracking-[0.12em] text-accent">New</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <span className="h-16 rounded-md bg-white/10" />
                        <span className="h-16 rounded-md bg-white/15" />
                        <span className="h-16 rounded-md bg-accent/25" />
                    </div>
                </div>

                <div className="absolute right-0 top-72 h-56 w-[30rem] rounded-lg border border-white/10 bg-[#08172d]/85 p-5 shadow-2xl backdrop-blur">
                    <div className="mb-5 flex items-center justify-between">
                        <span className="font-data text-[10px] uppercase tracking-[0.18em] text-accent">CRM Pipeline</span>
                        <span className="h-2 w-20 rounded-full bg-white/20" />
                    </div>
                    <div className="grid h-36 grid-cols-3 gap-4">
                        {['Captured', 'Quoted', 'Follow-Up'].map((label, index) => (
                            <div key={label} className="rounded-md border border-white/10 bg-white/[0.045] p-3">
                                <span className="font-data text-[9px] uppercase tracking-[0.14em] text-white/45">{label}</span>
                                <span className="mt-4 block h-3 rounded-full bg-white/15" />
                                <span className="mt-2 block h-3 w-2/3 rounded-full bg-white/10" />
                                {index === 2 && <span className="mt-4 block h-8 rounded-md bg-accent/30" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute right-96 top-[30rem] h-32 w-72 rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
                    <span className="font-data text-[10px] uppercase tracking-[0.18em] text-accent">Follow-Up</span>
                    <span className="mt-5 block h-2 w-52 rounded-full bg-white/20" />
                    <span className="mt-3 block h-2 w-36 rounded-full bg-white/10" />
                </div>
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
