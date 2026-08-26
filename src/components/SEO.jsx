import { useEffect } from 'react';

/**
 * SEO Component — handles meta tags, OG tags, canonical, and JSON-LD schema injection.
 * 
 * @param {string} title - Page title (appended to site title)
 * @param {string} description - Meta description
 * @param {string} url - Canonical URL path (e.g., "/projects")
 * @param {string} image - OG image URL
 * @param {string} type - Open Graph type
 * @param {boolean} noindex - Prevent indexing for utility/error pages
 * @param {object} schema - Single JSON-LD schema object (backwards compat)
 * @param {object[]} schemas - Array of JSON-LD objects, rendered inside an @graph block
 */
export default function SEO({
    title,
    description,
    url,
    image,
    type = 'website',
    noindex = false,
    schema,
    schemas,
}) {
    // Base configuration
    const siteTitle = 'The Provider System';
    const defaultDescription = 'The Provider System builds websites and lead systems for West Texas service businesses, connecting local visibility, CRM, and follow-up.';
    const defaultUrl = 'https://theprovidersystem.com';
    const defaultImage = `${defaultUrl}/og-fallback.png`;
    const titleAlreadyBranded = title?.includes(siteTitle);

    // Computed values
    const seo = {
        title: title ? (titleAlreadyBranded ? title : `${title} | ${siteTitle}`) : siteTitle,
        description: description || defaultDescription,
        url: url ? `${defaultUrl}${url}` : defaultUrl,
        image: image || defaultImage,
    };

    useEffect(() => {
        // Update standard meta tags
        document.title = seo.title;

        const setMetaTag = (attr, key, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[${attr}="${key}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const setLinkTag = (rel, href) => {
            if (!href) return;
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        // Standard Meta
        setMetaTag('name', 'title', seo.title);
        setMetaTag('name', 'description', seo.description);
        setMetaTag(
            'name',
            'robots',
            noindex
                ? 'noindex, nofollow'
                : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        );
        setLinkTag('canonical', seo.url);

        // Open Graph
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:url', seo.url);
        setMetaTag('property', 'og:title', seo.title);
        setMetaTag('property', 'og:description', seo.description);
        setMetaTag('property', 'og:image', seo.image);
        setMetaTag('property', 'og:site_name', siteTitle);

        // Twitter
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:url', seo.url);
        setMetaTag('name', 'twitter:title', seo.title);
        setMetaTag('name', 'twitter:description', seo.description);
        setMetaTag('name', 'twitter:image', seo.image);

        // JSON-LD Schema — supports both single `schema` and `schemas` array via @graph
        let scriptElement = document.querySelector('#seo-schema');
        const schemaData = schemas && schemas.length > 0
            ? { "@context": "https://schema.org", "@graph": schemas }
            : schema
                ? (schema["@context"] ? schema : { "@context": "https://schema.org", ...schema })
                : null;

        if (schemaData) {
            if (!scriptElement) {
                scriptElement = document.createElement('script');
                scriptElement.type = 'application/ld+json';
                scriptElement.id = 'seo-schema';
                document.head.appendChild(scriptElement);
            }
            scriptElement.textContent = JSON.stringify(schemaData);
        } else if (scriptElement) {
            scriptElement.remove();
        }

    }, [seo.title, seo.description, seo.url, seo.image, type, noindex, schema, schemas]);

    return null;
}
