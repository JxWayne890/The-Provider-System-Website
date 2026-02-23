import { useEffect } from 'react';

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
        setLinkTag('canonical', seo.url);

        // Open Graph
        setMetaTag('property', 'og:type', 'website');
        setMetaTag('property', 'og:url', seo.url);
        setMetaTag('property', 'og:title', seo.title);
        setMetaTag('property', 'og:description', seo.description);
        setMetaTag('property', 'og:image', seo.image);

        // Twitter
        setMetaTag('property', 'twitter:card', 'summary_large_image');
        setMetaTag('property', 'twitter:url', seo.url);
        setMetaTag('property', 'twitter:title', seo.title);
        setMetaTag('property', 'twitter:description', seo.description);
        setMetaTag('property', 'twitter:image', seo.image);

        // JSON-LD Schema
        let scriptElement = document.querySelector('#seo-schema');
        if (schema) {
            if (!scriptElement) {
                scriptElement = document.createElement('script');
                scriptElement.type = 'application/ld+json';
                scriptElement.id = 'seo-schema';
                document.head.appendChild(scriptElement);
            }
            scriptElement.textContent = JSON.stringify(schema);
        } else if (scriptElement) {
            scriptElement.remove();
        }

    }, [seo.title, seo.description, seo.url, seo.image, schema]);

    // React 19 allows title/meta in standard component returns, but standard useEffect injection is safer for deep replacements in SPAs
    return null;
}
