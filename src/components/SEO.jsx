import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.techyenthra.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo-dark.png`;
const SITE_NAME = 'TechYenthra Technologies';

export default function SEO({
  title,
  description,
  keywords = '',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) {
  const fullTitle = title
    ? `${title} | TechYenthra Technologies`
    : 'TechYenthra Technologies Private Limited | AI, Web & Mobile Development India';
  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Page-specific JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
