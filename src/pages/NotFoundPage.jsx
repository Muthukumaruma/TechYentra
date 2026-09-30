import SEO from '../components/SEO';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="page-wrapper">
      <SEO title="Page Not Found" path="/404" noindex />
      <section style={{ padding: '140px 0 120px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>404</h1>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.8 }}>
            Sorry, the page you are looking for does not exist.
          </p>
          <Button href="/">Back to Home</Button>
        </div>
      </section>
    </div>
  );
}
