import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/cn';

/**
 * Breadcrumb navigation component.
 *
 * @param {{ name: string, href?: string }[]} items - Ordered breadcrumb items. The last item is treated as current page (no link).
 * @param {"light" | "dark"} [theme="dark"] - Visual theme
 */
export default function Breadcrumbs({ items = [], theme = 'dark' }) {
    const isDark = theme === 'dark';

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-data text-xs tracking-widest uppercase">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <ChevronRight
                                    className={cn(
                                        'w-3 h-3 flex-shrink-0',
                                        isDark ? 'text-white/30' : 'text-muted/40'
                                    )}
                                />
                            )}
                            {isLast || !item.href ? (
                                <span
                                    className={cn(
                                        isDark ? 'text-accent' : 'text-accent'
                                    )}
                                >
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className={cn(
                                        'transition-colors hover:text-accent',
                                        isDark ? 'text-white/50' : 'text-muted/60'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
