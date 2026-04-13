import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { Star, MessageSquareQuote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The Provider System completely transformed how we handle leads. We went from losing half our inbound inquiries to capturing and routing every single one automatically.",
    role: "Founder, Home Services Company",
    rating: 5,
  },
  {
    quote: "Our onboarding process used to take three days of back-and-forth emails. Now it runs on autopilot and clients are fully set up within hours.",
    role: "Operations Manager, Marketing Agency",
    rating: 5,
  },
  {
    quote: "I was skeptical about AI automation, but the team showed us exactly what was possible and delivered a system that paid for itself in the first month.",
    role: "Owner, Dental Practice",
    rating: 5,
  },
  {
    quote: "We needed a custom SaaS tool for our invoicing workflow. The Provider System built exactly what we needed — fast, clean, and easy for our team to use.",
    role: "CEO, Freelance Collective",
    rating: 5,
  },
  {
    quote: "The automation audit alone was worth it. They identified bottlenecks we didn't even realize were costing us money, then built the fix in under two weeks.",
    role: "Director of Operations, E-Commerce Brand",
    rating: 5,
  },
  {
    quote: "What I appreciated most was the transparency. No jargon, no upsells — just a clear plan and a system that works exactly as described.",
    role: "Managing Partner, Law Firm",
    rating: 5,
  },
];

export default function ReviewsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://theprovidersystem.com/' },
    { name: 'Reviews', url: 'https://theprovidersystem.com/reviews' },
  ];

  const schemas = [
    {
      '@type': 'WebPage',
      '@id': 'https://theprovidersystem.com/reviews',
      name: 'Client Reviews | The Provider System',
      description: 'Read what business owners say about working with The Provider System for AI automation, custom SaaS development, and workflow optimization.',
      url: 'https://theprovidersystem.com/reviews',
    },
    buildBreadcrumbSchema(breadcrumbItems),
  ];

  return (
    <>
      <SEO
        title="Client Reviews & Testimonials | The Provider System"
        description="Read what business owners say about working with The Provider System for AI automation, custom SaaS development, and workflow optimization."
        url="/reviews"
        schema={{ '@context': 'https://schema.org', '@graph': schemas }}
      />

      {/* Hero */}
      <section className="bg-primary pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Reviews' }]} theme="dark" />
          <h1 className="font-drama text-4xl md:text-5xl text-white mt-6 mb-4">Client Reviews</h1>
          <p className="text-lg text-gray-300 font-heading max-w-2xl mx-auto">
            Business owners share their experience working with The Provider System on AI automation, SaaS development, and workflow optimization projects.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <MessageSquareQuote className="w-8 h-8 text-accent/30 mb-3" />
                <p className="text-dark font-heading leading-relaxed mb-6">"{t.quote}"</p>
                <p className="text-sm text-muted font-data">{t.role}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg text-muted font-heading mb-6">
              Ready to see what AI automation can do for your business?
            </p>
            <Link
              to="/diagnostic"
              className="inline-flex items-center gap-2 bg-accent text-primary font-heading font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Take the Free Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}
