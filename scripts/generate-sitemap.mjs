import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { blueCollarTrades } from '../src/data/blueCollarTrades.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://theprovidersystem.com';

const staticRoutes = [
    '/',
    '/websites',
    '/lead-crm-system',
    '/custom-systems',
    '/blue-collar',
    '/projects',
    '/about',
    '/about/process',
    '/about/why-choose-us',
    '/about/technology',
    '/blog',
    '/diagnostic',
    '/faq',
    '/privacy-policy',
    '/sms-consent',
];

const routes = [
    ...staticRoutes,
    ...blueCollarTrades.map(({ slug }) => `/blue-collar/${slug}`),
    ...blogPosts.map(({ slug }) => `/blog/${slug}`),
];

const uniqueRoutes = [...new Set(routes)];
const entries = uniqueRoutes
    .map((route) => `  <url><loc>${BASE_URL}${route}</loc></url>`)
    .join('\n');

writeFileSync(
    join(ROOT, 'public', 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
);

console.log(`Generated sitemap with ${uniqueRoutes.length} canonical URLs.`);
