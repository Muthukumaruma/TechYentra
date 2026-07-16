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
        title="Company Profile — TechYenthra Technologies"
        description="Browse TechYenthra's 12-page company profile: our story, services, technology stack, and the team behind every digital solution."
        canonical="https://www.techyenthra.com/brochure"
      />
      <BrochureViewer
        isOpen
        startPage={startPage}
        onClose={() => navigate('/')}
      />
    </>
  );
}
