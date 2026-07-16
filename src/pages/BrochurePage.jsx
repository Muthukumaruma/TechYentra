import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrochureViewer from '../components/BrochureViewer';
import SEO from '../components/SEO';

export default function BrochurePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const startPage = Math.max(0, Math.min(11, Number(params.get('page') || 1) - 1));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 9989 }}
    >
      <SEO
        title="Company Profile — TechYenthra Technologies"
        description="Browse TechYenthra's 12-page company profile: our story, services, technology stack, and the team behind every digital solution."
        canonical="https://www.techyenthra.com/brochure"
      />
      <BrochureViewer
        isOpen
        startPage={startPage}
        onClose={() => navigate('/', { state: { scrollTo: 'hero' } })}
      />
    </motion.div>
  );
}
