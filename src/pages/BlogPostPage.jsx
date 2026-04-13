import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import ContactFormSection from '../components/ContactFormSection';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '../components/SchemaMarkup';
import { blogPosts } from '../data/blogPosts';
import { cn } from '../lib/cn';

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="bg-dark min-h-screen font-body text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading font-bold text-4xl mb-4">Post Not Found</h1>
                    <p className="font-heading text-white/60 mb-8">The article you are looking for does not exist.</p>
                    <Link to="/blog" className="font-heading text-accent hover:text-accent/80 transition-colors">
                        Back to Blog &rarr;
                    </Link>
                </div>
            </div>
        );
    }

    // Build heading lookup: paragraphIndex -> heading text
    const headingMap = {};
    if (post.headings) {
        post.headings.forEach((h) => {
            headingMap[h.paragraphIndex] = h.text;
        });
    }

    // Related articles: same category first, then others, exclude current, limit 3
    const relatedPosts = [
        ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
        ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
    ].slice(0, 3);

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title },
        ]),
        buildArticleSchema({
            title: post.title,
            description: post.metaDescription || post.excerpt,
            url: `/blog/${post.slug}`,
            datePublished: post.publishDate,
            authorName: 'John W Johnson',
        }),
        ...(post.faqs && post.faqs.length > 0 ? [buildFAQSchema(post.faqs)] : []),
    ];

    return (
        <div className="bg-dark min-h-screen font-body text-white selection:bg-accent selection:text-dark">
            <SEO
                title={post.metaTitle || post.title}
                description={post.metaDescription || post.excerpt}
                url={`/blog/${post.slug}`}
                schemas={schemas}
            />

            <main className="pt-32 pb-0">
                {/* Header */}
                <section className="px-6 md:px-16 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <Breadcrumbs
                            items={[
                                { name: 'Home', href: '/' },
                                { name: 'Blog', href: '/blog' },
                                { name: post.title },
                            ]}
                            theme="dark"
                        />

                        {/* Category badge */}
                        <span className="inline-block font-data text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6">
                            {post.category}
                        </span>

                        <h1 className="font-drama text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-4 font-data text-white/40 text-sm">
                            <span>{post.publishDate}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>John W Johnson</span>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <article className="px-6 md:px-16 mb-16">
                    <div className="max-w-4xl mx-auto">
                        {post.content && post.content.map((paragraph, i) => (
                            <div key={i}>
                                {/* Insert heading if this paragraph index matches */}
                                {headingMap[i] && (
                                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mt-14 mb-6">
                                        {headingMap[i]}
                                    </h2>
                                )}
                                <p className="font-heading text-white/75 text-base md:text-lg leading-relaxed mb-6">
                                    {paragraph}
                                </p>
                            </div>
                        ))}

                        {/* Tables */}
                        {post.tables && post.tables.length > 0 && (
                            <div className="mt-16 space-y-12">
                                {post.tables.map((table, ti) => (
                                    <div key={ti}>
                                        {table.caption && (
                                            <h3 className="font-heading font-bold text-xl text-white mb-4">
                                                {table.caption}
                                            </h3>
                                        )}
                                        <div className="overflow-x-auto rounded-xl border border-white/10">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-white/[0.06]">
                                                        {table.headers.map((header, hi) => (
                                                            <th
                                                                key={hi}
                                                                className="font-heading font-bold text-sm text-white px-5 py-4 border-b border-white/10 whitespace-nowrap"
                                                            >
                                                                {header}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.rows.map((row, ri) => (
                                                        <tr
                                                            key={ri}
                                                            className={cn(
                                                                'border-b border-white/5',
                                                                ri % 2 === 1 ? 'bg-white/[0.02]' : ''
                                                            )}
                                                        >
                                                            {row.map((cell, ci) => (
                                                                <td
                                                                    key={ci}
                                                                    className="font-heading text-white/60 text-sm px-5 py-3.5"
                                                                >
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stats */}
                        {post.stats && post.stats.length > 0 && (
                            <div className="mt-16 bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10">
                                <h3 className="font-heading font-bold text-xl text-white mb-8">
                                    Key Statistics
                                </h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {post.stats.map((stat, si) => (
                                        <div key={si} className="text-center">
                                            <p className="font-drama text-3xl md:text-4xl text-accent mb-2">
                                                {stat.value}
                                            </p>
                                            <p className="font-heading text-white/70 text-sm leading-snug mb-2">
                                                {stat.label}
                                            </p>
                                            {stat.source && (
                                                <p className="font-data text-white/30 text-[10px] tracking-wide">
                                                    {stat.source}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Citations */}
                        {post.citations && post.citations.length > 0 && (
                            <div className="mt-16 pt-10 border-t border-white/10">
                                <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-accent" />
                                    Sources &amp; References
                                </h3>
                                <ol className="space-y-3 list-decimal list-inside">
                                    {post.citations.map((citation, ci) => (
                                        <li
                                            key={ci}
                                            className="font-heading text-white/50 text-sm leading-relaxed"
                                        >
                                            {citation}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                </article>

                {/* FAQ */}
                {post.faqs && post.faqs.length > 0 && (
                    <FAQSection faqs={post.faqs} theme="dark" />
                )}

                {/* Related Services */}
                {post.relatedServices && post.relatedServices.length > 0 && (
                    <section className="px-6 md:px-16 py-12 border-t border-white/5">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="font-heading font-bold text-lg text-white mb-4">
                                Related Services
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {post.relatedServices.map((svc) => (
                                    <Link
                                        key={svc}
                                        to={`/services/${svc}`}
                                        className="font-data text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-white/10 text-white/60 hover:border-accent/40 hover:text-accent transition-colors"
                                    >
                                        {svc.replace(/-/g, ' ')}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="px-6 md:px-16 py-24 bg-primary/50 border-y border-white/5">
                        <div className="max-w-6xl mx-auto">
                            <span className="font-data text-accent tracking-[0.2em] text-sm uppercase block mb-4">
                                Keep Reading
                            </span>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight mb-12">
                                Related Articles
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedPosts.map((rp) => (
                                    <Link
                                        key={rp.slug}
                                        to={`/blog/${rp.slug}`}
                                        className="group bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:border-accent/30 transition-colors flex flex-col"
                                    >
                                        <span className="inline-block font-data text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4 self-start">
                                            {rp.category}
                                        </span>
                                        <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                            {rp.title}
                                        </h3>
                                        <p className="font-heading text-white/50 text-sm leading-relaxed line-clamp-2 flex-1">
                                            {rp.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 font-data text-white/40 text-xs">
                                            <span>{rp.publishDate}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span>{rp.readTime}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Back to blog */}
                <section className="px-6 md:px-16 py-10 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 font-heading font-bold text-accent hover:text-accent/80 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all articles
                    </Link>
                </section>

                {/* Contact */}
                <ContactFormSection
                    heading="Ready to Put This Into Practice?"
                    subheading="Book a free consultation and let us build the automation systems described in this article for your business."
                    theme="dark"
                />
            </main>
        </div>
    );
}
