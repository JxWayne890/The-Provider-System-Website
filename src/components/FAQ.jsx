import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function FAQItem({ question, answer, isOpen, onToggle }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                height: isOpen ? contentRef.current.scrollHeight : 0,
                opacity: isOpen ? 1 : 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-white/10 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-6 md:py-8 text-left group"
                aria-expanded={isOpen}
            >
                <h3 className="font-heading font-bold text-lg md:text-xl text-white group-hover:text-accent transition-colors pr-4">
                    {question}
                </h3>
                <ChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <p className="font-heading text-white/70 text-base leading-relaxed pb-6 md:pb-8 max-w-3xl">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQ({ faqs = [] }) {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-anim',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="py-24 md:py-32 px-6 md:px-16 bg-primary relative overflow-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section heading */}
                <div className="faq-anim mb-4">
                    <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                        Knowledge Base
                    </span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>
                <p className="faq-anim font-heading text-white/50 text-lg md:text-xl mb-12 md:mb-16 max-w-2xl">
                    Common questions about our AI automation services, process, and what to expect when working with The Provider's System.
                </p>

                {/* FAQ items */}
                <div className="faq-anim">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

                {/* CTA after FAQ */}
                <div className="faq-anim mt-12 md:mt-16 text-center">
                    <p className="font-heading text-white/40 text-sm mb-6">Still have questions?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 font-heading font-bold text-accent hover:text-white transition-colors"
                    >
                        Get in touch with our team →
                    </a>
                </div>
            </div>
        </section>
    );
}
