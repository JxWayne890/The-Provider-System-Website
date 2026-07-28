import { cn } from '../lib/cn';

export default function Logo({ className = '', inverted = false, compact = false }) {
    return (
        <span
            role="img"
            aria-label="The Provider System"
            className={cn(
                'inline-flex items-center leading-none',
                inverted ? 'text-white' : 'text-primary',
                className
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'relative block flex-none',
                    compact ? 'h-[3rem] w-[9.1rem]' : 'h-[3.25rem] w-[10.75rem]'
                )}
            >
                <span
                    className={cn(
                        'absolute inset-x-0 top-0 text-center font-drama italic tracking-[-0.04em]',
                        compact ? 'text-[0.82rem]' : 'text-[0.9rem]'
                    )}
                >
                    The
                </span>
                <span
                    className={cn(
                        'absolute inset-x-0 text-center font-drama uppercase tracking-[-0.035em]',
                        compact ? 'top-[0.85rem] text-[1.32rem]' : 'top-[0.92rem] text-[1.5rem]'
                    )}
                >
                    Provider
                </span>
                <span
                    className={cn(
                        'absolute inset-x-0 bottom-0 text-center font-heading font-bold uppercase text-sun',
                        compact
                            ? 'text-[0.55rem] tracking-[0.45em]'
                            : 'text-[0.61rem] tracking-[0.5em]'
                    )}
                >
                    System
                </span>
            </span>
        </span>
    );
}
