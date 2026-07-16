import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePage from './pages/CookiePage';
import SecurityPage from './pages/SecurityPage';
import DataProtectionPage from './pages/DataProtectionPage';
import DisclosurePage from './pages/DisclosurePage';
import BusinessContinuityPage from './pages/BusinessContinuityPage';
import RefundPage from './pages/RefundPage';
import AcceptableUsePage from './pages/AcceptableUsePage';
import SLAPage from './pages/SLAPage';
import LegalCenterPage from './pages/LegalCenterPage';
import BrochurePage from './pages/BrochurePage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Standalone full-screen brochure viewer — no navbar/footer */}
        <Route path="/brochure" element={<BrochurePage />} />

        {/* All other pages inside the shared Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/data-protection" element={<DataProtectionPage />} />
          <Route path="/disclosure" element={<DisclosurePage />} />
          <Route path="/business-continuity" element={<BusinessContinuityPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/acceptable-use" element={<AcceptableUsePage />} />
          <Route path="/sla" element={<SLAPage />} />
          <Route path="/legal" element={<LegalCenterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
