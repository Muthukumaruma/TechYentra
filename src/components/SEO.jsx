import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.techyenthra.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo-dark.png`;
// Short brand first: people search "TechYenthra", not the full legal name.
const SITE_NAME = 'TechYenthra';
const DEFAULT_DESCRIPTION = 'TechYenthra Technologies Pvt Ltd – software development company in India offering AI solutions, web development, mobile apps, cloud, OTT platforms, travel tech and enterprise software.';

// Search results truncate descriptions at ~155–160 characters.
function clip(text, max = 158) {
  if (!text || text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:–-]$/, '') + '…';
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = '',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : 'TechYenthra | AI, Web & Mobile App Development Company in Madurai, India';
  const canonical = `${BASE_URL}${path}`;
  const desc = clip(description);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex
        ? <meta name="robots" content="noindex, follow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      {!noindex && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Page-specific JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
