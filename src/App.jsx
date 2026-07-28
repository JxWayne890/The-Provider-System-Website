import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const ProjectsArchive = lazy(() => import('./pages/ProjectsArchive'));
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));
const BlueCollarHub = lazy(() => import('./pages/BlueCollarHub'));
const BlueCollarTradePage = lazy(() => import('./pages/BlueCollarTradePage'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const WebsitesPage = lazy(() => import('./pages/WebsitesPage'));
const LeadCrmSystemPage = lazy(() => import('./pages/LeadCrmSystemPage'));
const CustomSystemsPage = lazy(() => import('./pages/CustomSystemsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const SmsConsentPage = lazy(() => import('./pages/SmsConsentPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative w-full min-h-screen bg-background text-dark overflow-x-hidden selection:bg-accent selection:text-white">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/lead-crm-system" element={<LeadCrmSystemPage />} />
            <Route path="/custom-systems" element={<CustomSystemsPage />} />
            <Route path="/about/process" element={<ProcessPage />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/about/technology" element={<TechnologyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blue-collar" element={<BlueCollarHub />} />
            <Route path="/blue-collar/:slug" element={<BlueCollarTradePage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsArchive />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/sms-consent" element={<SmsConsentPage />} />

            {/* Legacy broad-agency routes now point to the focused offer ladder. */}
            <Route path="/services/website-development" element={<Navigate to="/websites" replace />} />
            <Route path="/services/custom-saas-development" element={<Navigate to="/custom-systems" replace />} />
            <Route path="/services/*" element={<Navigate to="/lead-crm-system" replace />} />
            <Route path="/services" element={<Navigate to="/lead-crm-system" replace />} />
            <Route path="/industries/*" element={<Navigate to="/blue-collar" replace />} />
            <Route path="/industries" element={<Navigate to="/blue-collar" replace />} />
            <Route path="/use-cases/*" element={<Navigate to="/lead-crm-system" replace />} />
            <Route path="/use-cases" element={<Navigate to="/lead-crm-system" replace />} />
            <Route path="/platforms/*" element={<Navigate to="/custom-systems" replace />} />
            <Route path="/platforms" element={<Navigate to="/custom-systems" replace />} />
            <Route path="/guides/*" element={<Navigate to="/blog" replace />} />
            <Route path="/guides" element={<Navigate to="/blog" replace />} />
            <Route path="/resources" element={<Navigate to="/blog" replace />} />
            <Route path="/reviews" element={<Navigate to="/projects" replace />} />
            <Route path="/faq-hub" element={<Navigate to="/faq" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
