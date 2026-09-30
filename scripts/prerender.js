// Renders every route in ROUTES to static HTML so search engines get real
// content, titles and canonical URLs without running JavaScript.
// Also writes dist/404.html and a fresh dist/sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://www.techyenthra.com';

const { render, ROUTES } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr/entry-server.js')).href);
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function page(url) {
  const { html, head } = render(url);
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

for (const { path: route } of ROUTES) {
  // /about -> about.html, served at /about by Vercel's cleanUrls
  const file = path.join(DIST, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  fs.writeFileSync(file, page(route));
  console.log(`prerendered ${route}`);
}

fs.writeFileSync(path.join(DIST, '404.html'), page('/404'));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(r => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
console.log(`sitemap.xml: ${ROUTES.length} URLs`);

fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
