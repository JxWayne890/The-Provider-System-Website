import { Plus } from 'lucide-react';

export default function FaqAccordion({ items }) {
    return (
        <div className="divide-y divide-primary/10 border-y border-primary/10">
            {items.map((item) => (
                <details key={item.q} className="group">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-heading text-lg font-bold text-primary marker:content-none">
                        <span>{item.q}</span>
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-primary/15 bg-white">
                            <Plus
                                className="h-4 w-4 transition-transform group-open:rotate-45"
                                aria-hidden="true"
                            />
                        </span>
                    </summary>
                    <p className="max-w-3xl pb-6 pr-12 leading-7 text-muted">{item.a}</p>
                </details>
            ))}
        </div>
    );
}
