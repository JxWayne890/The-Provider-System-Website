import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema } from '../components/SchemaMarkup';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { cn } from '../lib/cn';

export default function BlogIndex() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredPosts =
        activeCategory === 'all'
            ? blogPosts
            : blogPosts.filter(
                  (p) => p.category.toLowerCase() === blogCategories.find((c) => c.slug === activeCategory)?.name.toLowerCase()
              );

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog' },
        ]),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title="Blue-Collar Website & Lead System Blog"
                description="Practical articles on websites, lead capture, CRM, follow-up, and automation for contractors, trades, and blue-collar service businesses."
                url="/blog"
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Hero */}
                <section className="px-6 md:px-16 mb-12">
                    <div className="max-w-5xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'Blog' },
                            ]}
                            theme="dark"
                        />
                        <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                            Blog
                        </span>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            Blue-Collar Website &amp; Lead System Blog
                        </h1>
                        <p className="font-heading text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
                            Practical knowledge on contractor websites, lead capture, CRM, follow-up, reviews, and business systems for the trades.
                        </p>
                    </div>
                </section>

                {/* Category Filters */}
                <section className="px-6 md:px-16 mb-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={cn(
                                    'px-4 py-2 rounded-full font-data text-xs tracking-wider uppercase transition-colors border',
                                    activeCategory === 'all'
                                        ? 'bg-accent text-dark border-accent'
                                        : 'bg-transparent text-white/60 border-white/10 hover:border-accent/40 hover:text-white'
                                )}
                            >
                                All
                            </button>
                            {blogCategories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    className={cn(
                                        'px-4 py-2 rounded-full font-data text-xs tracking-wider uppercase transition-colors border',
                                        activeCategory === cat.slug
                                            ? 'bg-accent text-dark border-accent'
                                            : 'bg-transparent text-white/60 border-white/10 hover:border-accent/40 hover:text-white'
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Post Cards Grid */}
                <section className="px-6 md:px-16 pb-24">
                    <div className="max-w-6xl mx-auto">
                        {filteredPosts.length === 0 ? (
                            <p className="font-heading text-white/40 text-center py-20 text-lg">
                                No posts found in this category.
                            </p>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        to={`/blog/${post.slug}`}
                                        className="group bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:border-accent/30 transition-colors flex flex-col"
                                    >
                                        {/* Category badge + meta */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="font-data text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                                                {post.category}
                                            </span>
                                        </div>

                                        <h2 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="font-heading text-white/50 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-3 font-data text-white/40 text-xs">
                                                <span>{post.publishDate}</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Have a Project in Mind?"
                    subheading="Turn these insights into a website, CRM, follow-up system, or custom operating tool for your business."
                    theme="dark"
                />
            </main>
        </div>
    );
}
