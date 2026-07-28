import { cn } from '../lib/cn';

export default function Logo({ className = '', inverted = false, compact = false }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-3 leading-none',
                inverted ? 'text-white' : 'text-primary',
                className
            )}
        >
            <span
                aria-hidden="true"
                className="relative grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
            >
                <span className="absolute h-4 w-4 rotate-45 rounded-[3px] border-2 border-white" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-sun" />
            </span>
            <span className="flex flex-col">
                <span className="font-heading text-[0.93rem] font-bold uppercase tracking-[0.12em]">
                    The Provider
                </span>
                <span
                    className={cn(
                        'mt-1 font-data text-[0.62rem] font-bold uppercase tracking-[0.3em]',
                        inverted ? 'text-white/55' : 'text-accent'
                    )}
                >
                    {compact ? 'System' : 'Digital Systems'}
                </span>
            </span>
        </span>
    );
}
