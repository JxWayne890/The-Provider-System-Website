const BASE_URL = 'https://theprovidersystem.com';

/**
 * Full Organization / ProfessionalService schema for The Provider System.
 */
export function buildOrganizationSchema() {
    return {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "The Provider System",
        "url": BASE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`,
            "width": 512,
            "height": 512,
        },
        "founder": {
            "@type": "Person",
            "name": "John W Johnson",
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "theprovidersystem@gmail.com",
            "contactType": "customer service",
            "availableLanguage": "English",
        },
        "knowsAbout": [
            "blue-collar websites",
            "local service business websites",
            "CRM workflows",
            "lead capture systems",
            "automated follow-up",
            "review request systems",
            "booking systems",
            "custom operating systems",
        ],
        "sameAs": [],
    };
}

/**
 * Schema for a service page.
 * @param {{ name: string, description: string, url: string, image?: string, provider?: object }} service
 */
export function buildServiceSchema(service) {
    return {
        "@type": "Service",
        "@id": `${BASE_URL}${service.url}/#service`,
        "name": service.name,
        "description": service.description,
        "url": `${BASE_URL}${service.url}`,
        ...(service.image && {
            "image": service.image.startsWith('http') ? service.image : `${BASE_URL}${service.image}`,
        }),
        "provider": service.provider || {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            "name": "The Provider System",
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States",
        },
    };
}

/**
 * FAQPage schema from an array of { q, a } objects.
 * @param {{ q: string, a: string }[]} faqs
 */
export function buildFAQSchema(faqs) {
    return {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
            },
        })),
    };
}

/**
 * BreadcrumbList from an array of { name, url } objects.
 * @param {{ name: string, url?: string }[]} items
 */
export function buildBreadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@id": item.url ? `${BASE_URL}${item.url}` : undefined,
                "name": item.name,
            },
        })),
    };
}

/**
 * Article schema for blog posts.
 * @param {{ title: string, description: string, url: string, image?: string, datePublished: string, dateModified?: string, authorName?: string }} post
 */
export function buildArticleSchema(post) {
    return {
        "@type": "Article",
        "@id": `${BASE_URL}${post.url}/#article`,
        "headline": post.title,
        "description": post.description,
        "url": `${BASE_URL}${post.url}`,
        ...(post.image && {
            "image": post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`,
        }),
        "datePublished": post.datePublished,
        "dateModified": post.dateModified || post.datePublished,
        "author": {
            "@type": "Person",
            "name": post.authorName || "John W Johnson",
        },
        "publisher": {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            "name": "The Provider System",
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo.png`,
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${BASE_URL}${post.url}`,
        },
    };
}

/**
 * HowTo schema from a title and array of step strings.
 * @param {string} title
 * @param {string[]} steps
 */
export function buildHowToSchema(title, steps) {
    return {
        "@type": "HowTo",
        "name": title,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "text": step,
        })),
    };
}

/**
 * WebSite schema with SearchAction (sitelinks search box).
 */
export function buildWebSiteSchema() {
    return {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "name": "The Provider System",
        "url": BASE_URL,
        "publisher": {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE_URL}/?s={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

/**
 * SoftwareApplication schema.
 * @param {{ name: string, description: string, url?: string, applicationCategory?: string, operatingSystem?: string, offers?: object }} app
 */
export function buildSoftwareApplicationSchema(app) {
    return {
        "@type": "SoftwareApplication",
        "name": app.name,
        "description": app.description,
        ...(app.url && { "url": app.url.startsWith('http') ? app.url : `${BASE_URL}${app.url}` }),
        "applicationCategory": app.applicationCategory || "BusinessApplication",
        "operatingSystem": app.operatingSystem || "Web",
        "offers": app.offers || {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
        },
        "author": {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            "name": "The Provider System",
        },
    };
}

/**
 * LocalBusiness / ProfessionalService schema.
 */
export function buildLocalBusinessSchema() {
    return {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${BASE_URL}/#localbusiness`,
        "name": "The Provider System",
        "url": BASE_URL,
        "logo": `${BASE_URL}/logo.png`,
        "image": `${BASE_URL}/og-fallback.png`,
        "email": "theprovidersystem@gmail.com",
        "founder": {
            "@type": "Person",
            "name": "John W Johnson",
        },
        "description": "The Provider System builds websites, CRMs, follow-up systems, and custom operating tools for blue-collar service businesses and select high-value operators.",
        "priceRange": "$$",
        "knowsAbout": [
            "blue-collar websites",
            "local service business websites",
            "CRM workflows",
            "lead capture systems",
            "automated follow-up",
            "booking systems",
            "custom operating systems",
        ],
        "areaServed": {
            "@type": "Country",
            "name": "United States",
        },
    };
}
