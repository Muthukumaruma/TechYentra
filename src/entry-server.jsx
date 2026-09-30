/* eslint-disable react-refresh/only-export-components -- build-time server entry, never hot-reloaded */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App.jsx';
import { ROUTES } from './routes.js';

export { ROUTES };

// With React 19, <Helmet> renders plain <title>/<meta>/<link>/<script> elements
// that React emits at the start of the markup. Move them into <head>.
const HOISTED = /^(?:<title>[^<]*<\/title>|<meta [^>]*\/?>|<link [^>]*\/?>|<script type="application\/ld\+json">[\s\S]*?<\/script>)/;

// Renders one URL to HTML for scripts/prerender.js (build time only).
export function render(url) {
  let html = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  );
  const head = [];
  let match;
  while ((match = html.match(HOISTED))) {
    head.push(match[0]);
    html = html.slice(match[0].length);
  }
  return { html, head: head.join('\n    ') };
}
