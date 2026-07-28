import { industries, regions, services } from '../src/data/siteContent.js';
import { legacyBlogRedirects, legacyTradeRedirects } from '../src/data/legacyRoutes.js';
import { playbooks } from '../src/data/playbooks.js';
import { projects } from '../src/data/projects.js';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function detailEntries(prefix, items, collectionName, includeLastmod = false) {
  return items.map((item) => {
    if (!item?.slug || !SLUG_PATTERN.test(item.slug)) {
      throw new Error(`Invalid ${collectionName} slug: ${String(item?.slug)}`);
    }

    const entry = { path: `${prefix}/${item.slug}` };
    if (includeLastmod) {
      const lastmod = item.dateModified || item.publishDate;
      if (!lastmod || !DATE_PATTERN.test(lastmod) || Number.isNaN(Date.parse(`${lastmod}T00:00:00Z`))) {
        throw new Error(`Invalid ${collectionName} lastmod for ${item.slug}: ${String(lastmod)}`);
      }
      entry.lastmod = lastmod;
    }
    return entry;
  });
}

const routeEntries = [
  { path: '/' },
  { path: '/services' },
  ...detailEntries('/services', services, 'service'),
  { path: '/industries' },
  ...detailEntries('/industries', industries, 'industry'),
  { path: '/texas' },
  ...detailEntries('/texas', regions, 'region'),
  { path: '/work' },
  ...detailEntries('/work', projects, 'project'),
  { path: '/playbooks' },
  ...detailEntries('/playbooks', playbooks, 'playbook', true),
  { path: '/about' },
  { path: '/process' },
  { path: '/start' },
  { path: '/faq' },
  { path: '/privacy-policy' },
  { path: '/sms-consent' },
];

const duplicatePaths = routeEntries
  .map(({ path }) => path)
  .filter((path, index, paths) => paths.indexOf(path) !== index);

if (duplicatePaths.length > 0) {
  throw new Error(`Duplicate canonical routes: ${[...new Set(duplicatePaths)].join(', ')}`);
}

export const canonicalRouteEntries = Object.freeze(
  routeEntries.map((entry) => Object.freeze(entry)),
);

export const canonicalRoutes = Object.freeze(
  canonicalRouteEntries.map(({ path }) => path),
);

const exactRedirects = [
  ['/websites', '/services/websites'],
  ['/lead-crm-system', '/services/crm-jobber-alternatives'],
  ['/custom-systems', '/services/custom-systems'],
  ['/projects', '/work'],
  ['/diagnostic', '/start'],
  ['/about/process', '/process'],
  ['/about/why-choose-us', '/about'],
  ['/about/technology', '/services'],
  ['/blue-collar', '/industries'],
  ['/blog', '/playbooks'],
  ['/automations', '/services/automation'],
  ['/resources', '/playbooks'],
  ['/guides', '/playbooks'],
  ['/use-cases', '/services'],
  ['/platforms', '/services'],
  ['/reviews', '/work'],
  ['/faq-hub', '/faq'],
];

const groupedRedirects = [
  {
    prefix: '/services',
    destination: '/services/automation',
    slugs: [
      'ai-workflow-automation',
      'business-process-automation',
      'integration-development',
    ],
  },
  {
    prefix: '/services',
    destination: '/services/ai-chatbots',
    slugs: ['chatbot-development'],
  },
  {
    prefix: '/services',
    destination: '/services/lead-generation',
    slugs: ['lead-generation-automation'],
  },
  {
    prefix: '/services',
    destination: '/services/custom-systems',
    slugs: ['custom-saas-development'],
  },
  {
    prefix: '/services',
    destination: '/services/websites',
    slugs: ['website-development'],
  },
  {
    prefix: '/services',
    destination: '/services/ai-growth-systems',
    slugs: ['ai-consulting-strategy'],
  },
  {
    prefix: '/industries',
    destination: '/industries/service-businesses',
    slugs: ['construction', 'automotive', 'manufacturing-logistics', 'home-services'],
  },
  {
    prefix: '/industries',
    destination: '/industries',
    slugs: [
      'healthcare',
      'legal',
      'real-estate',
      'ecommerce',
      'restaurants-hospitality',
      'financial-services',
      'insurance',
      'marketing-agencies',
      'education',
      'nonprofits',
      'saas-companies',
      'dental-optometry',
      'fitness-wellness',
      'recruiting-staffing',
      'accounting',
      'professional-services',
    ],
  },
  {
    prefix: '/use-cases',
    destination: '/services/lead-generation',
    slugs: ['lead-capture-qualification'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/automation',
    slugs: [
      'appointment-scheduling',
      'customer-onboarding',
      'invoice-payment-automation',
      'document-processing',
      'employee-onboarding',
      'proposal-quote-generation',
      'webhook-api-integration',
      'workflow-error-monitoring',
    ],
  },
  {
    prefix: '/use-cases',
    destination: '/services/ai-growth-systems',
    slugs: ['email-marketing-automation', 'reporting-analytics'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/ai-content-video',
    slugs: ['social-media-scheduling', 'ai-content-generation'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/lead-follow-up',
    slugs: [
      'review-reputation-management',
      'sms-whatsapp-automation',
      'multi-channel-communication',
    ],
  },
  {
    prefix: '/use-cases',
    destination: '/services/crm-jobber-alternatives',
    slugs: ['crm-data-enrichment', 'sales-pipeline-automation', 'data-migration-sync'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/custom-systems',
    slugs: ['inventory-alerts', 'client-portal-automation'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/ai-customer-support',
    slugs: ['customer-support-chatbots'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/ai-receptionist',
    slugs: ['voice-ai-agents'],
  },
  {
    prefix: '/use-cases',
    destination: '/services/ai-knowledge-bases',
    slugs: ['ai-training-data-pipelines'],
  },
  {
    prefix: '/platforms',
    destination: '/services/automation',
    slugs: ['n8n', 'make', 'zapier', 'airtable', 'notion', 'slack', 'google-sheets'],
  },
  {
    prefix: '/platforms',
    destination: '/services/ai-growth-systems',
    slugs: ['openai', 'anthropic-claude', 'google-gemini'],
  },
  {
    prefix: '/platforms',
    destination: '/services/ai-chatbots',
    slugs: ['voiceflow'],
  },
  {
    prefix: '/platforms',
    destination: '/services/ai-receptionist',
    slugs: ['vapi'],
  },
  {
    prefix: '/platforms',
    destination: '/services/crm-jobber-alternatives',
    slugs: ['hubspot', 'gohighlevel', 'salesforce'],
  },
  {
    prefix: '/platforms',
    destination: '/services/lead-follow-up',
    slugs: ['twilio', 'sendgrid'],
  },
  {
    prefix: '/platforms',
    destination: '/services/custom-systems',
    slugs: ['stripe', 'shopify'],
  },
  {
    prefix: '/platforms',
    destination: '/services/websites',
    slugs: ['wordpress'],
  },
  {
    prefix: '/guides',
    destination: '/services/automation',
    slugs: [
      'ai-workflow-automation-cost',
      'business-process-automation-cost',
      'integration-development-cost',
    ],
  },
  {
    prefix: '/guides',
    destination: '/services/ai-chatbots',
    slugs: ['chatbot-development-cost'],
  },
  {
    prefix: '/guides',
    destination: '/services/lead-generation',
    slugs: ['lead-generation-automation-cost'],
  },
  {
    prefix: '/guides',
    destination: '/services/custom-systems',
    slugs: ['custom-saas-development-cost'],
  },
  {
    prefix: '/guides',
    destination: '/services/websites',
    slugs: ['website-development-cost'],
  },
  {
    prefix: '/guides',
    destination: '/services/ai-growth-systems',
    slugs: ['ai-consulting-strategy-cost'],
  },
];

const legacyRedirects = [
  ...exactRedirects.map(([source, destination]) => ({ source, destination })),
  ...groupedRedirects.flatMap(({ prefix, destination, slugs }) =>
    slugs.map((slug) => ({ source: `${prefix}/${slug}`, destination }))),
  ...Object.entries(legacyBlogRedirects).map(([slug, destination]) => ({
    source: `/blog/${slug}`,
    destination,
  })),
  ...Object.entries(legacyTradeRedirects).map(([slug, destination]) => ({
    source: `/blue-collar/${slug}`,
    destination,
  })),
];

const redirectSources = new Set();
const canonicalRouteSet = new Set(canonicalRoutes);

for (const { source, destination } of legacyRedirects) {
  if (!source.startsWith('/') || !destination.startsWith('/')) {
    throw new Error(`Redirect paths must be root-relative: ${source} -> ${destination}`);
  }
  if (/[*:?()]/.test(source)) {
    throw new Error(`Redirect source must be exact: ${source}`);
  }
  if (redirectSources.has(source)) {
    throw new Error(`Duplicate redirect source: ${source}`);
  }
  if (canonicalRouteSet.has(source)) {
    throw new Error(`Canonical route cannot also redirect: ${source}`);
  }
  if (!canonicalRouteSet.has(destination)) {
    throw new Error(`Redirect target is not canonical: ${source} -> ${destination}`);
  }
  redirectSources.add(source);
}

for (const { source, destination } of legacyRedirects) {
  if (redirectSources.has(destination)) {
    throw new Error(`Redirect must be one hop: ${source} -> ${destination}`);
  }
}

export const legacyRedirectEntries = Object.freeze(
  legacyRedirects.map((entry) => Object.freeze(entry)),
);
