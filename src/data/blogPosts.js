import { blogPostsGuides } from './blogPostsGuides.js';
import { blogPostsComparisons } from './blogPostsComparisons.js';
import { blogPostsTrends } from './blogPostsTrends.js';
import { blogPostsTips } from './blogPostsTips.js';
import { blogPostsIndustry } from './blogPostsIndustry.js';
import { blogPostsCaseStudies } from './blogPostsCaseStudies.js';
import { blogPostsData } from './blogPostsData.js';
import { blogPostsThoughtLeadership } from './blogPostsThoughtLeadership.js';
import { blogPostsBlueCollar } from './blogPostsBlueCollar.js';

export const blogPosts = [
  ...blogPostsGuides,
  ...blogPostsComparisons,
  ...blogPostsTrends,
  ...blogPostsTips,
  ...blogPostsIndustry,
  ...blogPostsCaseStudies,
  ...blogPostsData,
  ...blogPostsThoughtLeadership,
  ...blogPostsBlueCollar,
].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

export const blogCategories = [
  { slug: 'guides', name: 'Guides', description: 'Step-by-step guides to AI automation' },
  { slug: 'comparisons', name: 'Comparisons', description: 'Platform and tool comparisons' },
  { slug: 'trends', name: 'Trends', description: 'AI automation industry trends' },
  { slug: 'tips', name: 'Tips', description: 'Practical automation tips' },
  { slug: 'industry', name: 'Industry', description: 'Industry-specific automation insights' },
  { slug: 'case-study', name: 'Case Studies', description: 'Real-world automation success stories' },
  { slug: 'data', name: 'Data & Research', description: 'Data-driven automation insights' },
  { slug: 'thought-leadership', name: 'Thought Leadership', description: 'Expert perspectives on automation' },
  { slug: 'blue-collar', name: 'Blue-Collar', description: 'Automation and websites for trades and contractors' },
];
