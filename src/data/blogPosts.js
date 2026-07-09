import { blogPostsBlueCollar } from './blogPostsBlueCollar.js';

export const blogPosts = [
  ...blogPostsBlueCollar,
].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

export const blogCategories = [
  { slug: 'blue-collar', name: 'Blue-Collar', description: 'Websites, lead systems, and operations for trades and contractors' },
];
