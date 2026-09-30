// Every indexable route. scripts/prerender.js renders each one to static HTML
// and builds sitemap.xml from this list.
export const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'yearly', priority: '0.7' },
  { path: '/brochure', changefreq: 'monthly', priority: '0.6' },
  { path: '/legal', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
  { path: '/security', changefreq: 'yearly', priority: '0.4' },
  { path: '/data-protection', changefreq: 'yearly', priority: '0.4' },
  { path: '/disclosure', changefreq: 'yearly', priority: '0.3' },
  { path: '/business-continuity', changefreq: 'yearly', priority: '0.3' },
  { path: '/refund', changefreq: 'yearly', priority: '0.4' },
  { path: '/acceptable-use', changefreq: 'yearly', priority: '0.3' },
  { path: '/sla', changefreq: 'yearly', priority: '0.4' },
];
