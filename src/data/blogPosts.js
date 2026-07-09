import { blogPostsBlueCollar } from './blogPostsBlueCollar.js';
import { blogPostsProviderFocus } from './blogPostsProviderFocus.js';
import { blogPostsGuides } from './blogPostsGuides.js';
import { blogPostsCaseStudies } from './blogPostsCaseStudies.js';
import { blogPostsComparisons } from './blogPostsComparisons.js';
import { blogPostsData } from './blogPostsData.js';
import { blogPostsThoughtLeadership } from './blogPostsThoughtLeadership.js';
import { blogPostsTips } from './blogPostsTips.js';
import { blogPostsTrends } from './blogPostsTrends.js';

const archiveCategoryBySlug = {
  'how-to-automate-your-business': 'Strategy',
  'how-to-build-first-n8n-workflow': 'Tools',
  'getting-started-ai-automation': 'Strategy',
  'automate-sales-pipeline': 'Lead Systems',
  'customer-onboarding-automation-guide': 'Lead Systems',
  'hvac-company-lead-routing': 'Case Studies',
  'n8n-vs-make-vs-zapier': 'Tools',
  'custom-automation-vs-off-the-shelf': 'Custom Systems',
  'in-house-vs-agency-automation': 'Strategy',
  'voiceflow-vs-vapi': 'Tools',
  'hubspot-vs-gohighlevel': 'CRM',
  'roi-of-ai-automation': 'Research',
  'time-wasted-manual-tasks': 'Research',
  'cost-of-not-automating': 'Research',
  'customer-experience-automation-statistics': 'Research',
  'why-ai-automation-projects-fail': 'Strategy',
  'myth-set-it-forget-it-automation': 'Strategy',
  'ai-is-not-magic': 'Strategy',
  'automation-strategy-not-just-tools': 'Strategy',
  'hidden-costs-manual-processes': 'Strategy',
  'signs-business-needs-ai-automation': 'Strategy',
  'automation-mistakes-waste-time-money': 'Strategy',
  'questions-before-hiring-automation-agency': 'Strategy',
  'calculate-roi-business-automation': 'Research',
  'workflows-every-small-business-should-automate': 'Strategy',
  'red-flags-evaluating-automation-tools': 'Tools',
  'rise-of-voice-ai': 'Lead Systems',
  'small-business-ai-competing': 'Strategy',
};

const selectedArchivePosts = [
  ...blogPostsGuides,
  ...blogPostsCaseStudies,
  ...blogPostsComparisons,
  ...blogPostsData,
  ...blogPostsThoughtLeadership,
  ...blogPostsTips,
  ...blogPostsTrends,
]
  .filter((post) => archiveCategoryBySlug[post.slug])
  .map((post) => ({
    ...post,
    category: archiveCategoryBySlug[post.slug],
    relatedServices: [],
  }));

export const blogPosts = [
  ...blogPostsProviderFocus,
  ...blogPostsBlueCollar.map((post) => ({ ...post, category: 'Blue-Collar' })),
  ...selectedArchivePosts,
].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

export const blogCategories = [
  { slug: 'blue-collar', name: 'Blue-Collar', description: 'Trade-specific websites, lead systems, and operations' },
  { slug: 'websites', name: 'Websites', description: 'Website ownership, trust, SEO, service pages, and conversion' },
  { slug: 'lead-systems', name: 'Lead Systems', description: 'Lead capture, missed calls, follow-up, booking, and intake' },
  { slug: 'crm', name: 'CRM', description: 'Pipelines, lead status, dashboards, and customer records' },
  { slug: 'custom-systems', name: 'Custom Systems', description: 'Custom apps, portals, dashboards, and operating tools' },
  { slug: 'tools', name: 'Tools', description: 'Platform choices and practical tool comparisons' },
  { slug: 'strategy', name: 'Strategy', description: 'Automation strategy, scope, ROI, and operational decisions' },
  { slug: 'case-studies', name: 'Case Studies', description: 'Realistic examples of lead and workflow systems' },
  { slug: 'research', name: 'Research', description: 'Numbers, benchmarks, and cost-of-inaction thinking' },
];
