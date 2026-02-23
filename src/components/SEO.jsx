import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, image, schema }) {
    // Base configuration
    const siteTitle = 'The Provider\'s System';
    const defaultDescription = 'A high-performance digital architecture and consulting group specializing in AI-driven SaaS, dynamic corporate sites, and custom process automation.';
    const defaultUrl = 'https://theprovidersystem.com'; // Adjust to actual production URL
    const defaultImage = `${defaultUrl}/og-fallback.png`; // Fallback OpenGraph image

    // Computed values
    const seo = {
        title: title ? `${title} | ${siteTitle}` : siteTitle,
        description: description || defaultDescription,
        url: url ? `${defaultUrl}${url}` : defaultUrl,
        image: image || defaultImage,
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={seo.image} />

            {/* AEO / LLM Context Directives */}
            {/* Schema.org JSON-LD structured data for search engines and answer engines (AEO) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
