import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/cn';

function FAQAccordionItem({ question, answer, isOpen, onToggle, theme }) {
    const isDark = theme === 'dark';

    return (
        <div
            className={cn(
                'border-b last:border-b-0',
                isDark ? 'border-white/10' : 'border-muted/10'
            )}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-6 md:py-8 text-left group"
                aria-expanded={isOpen}
            >
                <h3
                    className={cn(
                        'font-heading font-bold text-lg md:text-xl transition-colors pr-4',
                        isDark
                            ? 'text-white group-hover:text-accent'
                            : 'text-primary group-hover:text-accent'
                    )}
                >
                    {question}
                </h3>
                <ChevronDown
                    className={cn(
                        'w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>
            <div
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-out',
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <p
                    className={cn(
                        'font-heading text-base leading-relaxed pb-6 md:pb-8 max-w-3xl',
                        isDark ? 'text-white/70' : 'text-muted'
                    )}
                >
                    {answer}
                </p>
            </div>
        </div>
    );
}

/**
 * Reusable FAQ accordion section with built-in FAQ schema generation.
 *
 * @param {{ q: string, a: string }[]} faqs - Array of FAQ items
 * @param {string} [title="Frequently Asked Questions"] - Section heading
 * @param {"light" | "dark"} [theme="light"] - Color theme
 */
export default function FAQSection({ faqs = [], title = 'Frequently Asked Questions', theme = 'light' }) {
    const [openIndex, setOpenIndex] = useState(0);
    const isDark = theme === 'dark';

    return (
        <section
            className={cn(
                'py-24 md:py-32 px-6 md:px-16 relative overflow-hidden',
                isDark ? 'bg-primary' : 'bg-white'
            )}
        >
            {isDark && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            )}

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="faq-section-anim mb-12 md:mb-16">
                    <span
                        className={cn(
                            'font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4'
                        )}
                    >
                        Knowledge Base
                    </span>
                    <h2
                        className={cn(
                            'font-heading font-bold text-3xl md:text-5xl tracking-tight',
                            isDark ? 'text-white' : 'text-primary'
                        )}
                    >
                        {title}
                    </h2>
                </div>

                <div className="faq-section-anim">
                    {faqs.map((faq, index) => (
                        <FAQAccordionItem
                            key={index}
                            question={faq.q}
                            answer={faq.a}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                            theme={theme}
                        />
                    ))}
                </div>

                <div className="faq-section-anim mt-12 md:mt-16 text-center">
                    <p
                        className={cn(
                            'font-heading text-sm mb-6',
                            isDark ? 'text-white/40' : 'text-muted/60'
                        )}
                    >
                        Still have questions?
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 font-heading font-bold text-accent hover:text-accent/80 transition-colors"
                    >
                        Get in touch with our team &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
}
