/**
 * Pre-render script for The Provider System
 *
 * Renders every route to static HTML using Puppeteer so that search engines,
 * social-media crawlers, and AI bots receive fully-rendered pages without
 * needing to execute JavaScript.
 *
 * Usage:  node scripts/prerender.mjs          (after `vite build`)
 *   or:   npm run build   (which chains build + prerender automatically)
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve Chromium: use @sparticuz/chromium on Linux (Vercel/CI),
// local Chrome on macOS/Windows for development.
async function getBrowserOptions() {
  if (platform() === 'linux') {
    const chromium = (await import('@sparticuz/chromium')).default;
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  }
  // Local dev — find Chrome
  const paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const found = paths.find((p) => existsSync(p));
  if (!found) throw new Error('Chrome not found locally. Install Chrome or run on CI.');
  return {
    executablePath: found,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
}
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4173;

// ── Collect every route from the data files ────────────────────────────

async function getAllRoutes() {
  const routes = [
    // Static pages
    '/',
    '/services',
    '/industries',
    '/use-cases',
    '/platforms',
    '/guides',
    '/about',
    '/about/process',
    '/about/why-choose-us',
    '/about/technology',
    '/blue-collar',
    '/blog',
    '/projects',
    '/diagnostic',
    '/faq',
    '/faq-hub',
    '/resources',
    '/reviews',
    '/privacy-policy',
  ];

  // Dynamic imports of data files
  const { services }          = await import(join(ROOT, 'src/data/services.js'));
  const { industries }        = await import(join(ROOT, 'src/data/industries.js'));
  const { useCases }           = await import(join(ROOT, 'src/data/useCases.js'));
  const { toolsPlatforms }     = await import(join(ROOT, 'src/data/toolsPlatforms.js'));
  const { costGuides }         = await import(join(ROOT, 'src/data/costGuides.js'));
  const { blueCollarTrades }   = await import(join(ROOT, 'src/data/blueCollarTrades.js'));
  const { blogPosts }          = await import(join(ROOT, 'src/data/blogPosts.js'));

  // /services/:slug
  for (const s of services) routes.push(`/services/${s.slug}`);

  // /industries/:slug  +  /industries/:industrySlug/:serviceSlug
  for (const ind of industries) {
    routes.push(`/industries/${ind.slug}`);
    if (ind.relatedServices) {
      for (const svcSlug of ind.relatedServices) {
        routes.push(`/industries/${ind.slug}/${svcSlug}`);
      }
    }
  }

  // /use-cases/:slug
  for (const uc of useCases) routes.push(`/use-cases/${uc.slug}`);

  // /platforms/:slug
  for (const p of toolsPlatforms) routes.push(`/platforms/${p.slug}`);

  // /guides/:slug
  for (const g of costGuides) routes.push(`/guides/${g.slug}`);

  // /blue-collar/:slug
  for (const t of blueCollarTrades) routes.push(`/blue-collar/${t.slug}`);

  // /blog/:slug
  for (const bp of blogPosts) routes.push(`/blog/${bp.slug}`);

  return routes;
}

// ── Minimal static-file server for the built dist/ folder ──────────────

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.ico':  'image/x-icon',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
      if (!existsSync(filePath)) filePath = join(DIST, 'index.html'); // SPA fallback
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.listen(PORT, () => {
      console.log(`  Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ── Render one route and write the HTML ────────────────────────────────

async function renderRoute(page, route) {
  const url = `http://localhost:${PORT}${route}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait a moment for React lazy chunks + GSAP animations to settle
  await page.evaluate(() => new Promise((r) => setTimeout(r, 800)));

  const html = await page.content();

  // Write to dist/  e.g.  /about → dist/about/index.html
  const outDir = join(DIST, route === '/' ? '' : route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  console.log('\n⚡ Pre-rendering all routes…\n');

  const routes = await getAllRoutes();
  console.log(`  Found ${routes.length} routes to pre-render.\n`);

  const server = await startServer();

  const browserOpts = await getBrowserOptions();
  const browser = await puppeteer.launch(browserOpts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  let done = 0;
  for (const route of routes) {
    try {
      await renderRoute(page, route);
      done++;
      process.stdout.write(`\r  Rendered ${done}/${routes.length}  ${route}`);
    } catch (err) {
      console.error(`\n  Failed: ${route} — ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\n\n  Pre-rendered ${done}/${routes.length} pages.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
