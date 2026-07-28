import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { canonicalRouteEntries, legacyRedirectEntries } from './site-routes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://theprovidersystem.com';

function validateRedirectConfigs() {
    const expectedVercelRedirects = legacyRedirectEntries.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
    }));
    const vercelConfig = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));

    if (JSON.stringify(vercelConfig.redirects) !== JSON.stringify(expectedVercelRedirects)) {
        throw new Error('vercel.json redirects do not match scripts/site-routes.mjs');
    }

    const expectedNetlifyLines = legacyRedirectEntries.map(
        ({ source, destination }) => `${source} ${destination} 301`,
    );
    const netlifyLines = readFileSync(join(ROOT, 'public', '_redirects'), 'utf8')
        .split(/\r?\n/)
        .filter(Boolean);
    const expectedNetlifyConfig = [...expectedNetlifyLines, '/* /index.html 200'];

    if (JSON.stringify(netlifyLines) !== JSON.stringify(expectedNetlifyConfig)) {
        throw new Error('public/_redirects does not match scripts/site-routes.mjs');
    }
}

const escapeXml = (value) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');

const entries = canonicalRouteEntries
    .map(({ path, lastmod }) => {
        const location = escapeXml(`${BASE_URL}${path}`);
        const lastmodElement = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
        return `  <url><loc>${location}</loc>${lastmodElement}</url>`;
    })
    .join('\n');

validateRedirectConfigs();

writeFileSync(
    join(ROOT, 'public', 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
);

console.log(
    `Generated sitemap with ${canonicalRouteEntries.length} canonical URLs `
    + `and validated ${legacyRedirectEntries.length} exact redirects.`,
);
