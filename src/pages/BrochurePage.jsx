import { useNavigate, useSearchParams } from 'react-router-dom';
import BrochureViewer from '../components/BrochureViewer';
import SEO from '../components/SEO';

export default function BrochurePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const startPage = Math.max(0, Math.min(11, Number(params.get('page') || 1) - 1));

  return (
    <>
      <SEO
        title="Company Profile Brochure"
        description="Browse TechYenthra's 12-page company profile: our story, services, technology stack, and the team behind every digital solution."
        path="/brochure"
      />
      {/* The viewer is all images; give the page a real heading for search engines and screen readers */}
      <h1 style={{
        position: 'absolute', width: '1px', height: '1px', overflow: 'hidden',
        clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap',
      }}>
        TechYenthra Technologies Company Profile Brochure
      </h1>
      <BrochureViewer
        isOpen
        startPage={startPage}
        onClose={() => navigate('/')}
      />
    </>
  );
}
