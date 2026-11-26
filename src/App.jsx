import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { legacyBlogRedirects, legacyTradeRedirects } from './data/legacyRoutes';

const Home = lazy(() => import('./pages/Home'));
const ServicesHub = lazy(() => import('./pages/ServicesHub'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const IndustriesHub = lazy(() => import('./pages/IndustriesHub'));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage'));
const TexasHub = lazy(() => import('./pages/TexasHub'));
const RegionPage = lazy(() => import('./pages/RegionPage'));
const WorkHub = lazy(() => import('./pages/WorkHub'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const PlaybooksIndex = lazy(() => import('./pages/PlaybooksIndex'));
const PlaybookPage = lazy(() => import('./pages/PlaybookPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const StartPage = lazy(() => import('./pages/StartPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const SmsConsentPage = lazy(() => import('./pages/SmsConsentPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function LoadingFallback() {
    return (
        <div role="status" className="grid min-h-[70dvh] place-items-center bg-background pt-32">
            <div className="flex items-center gap-3 text-sm font-bold text-muted">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" aria-hidden="true" />
                Loading page…
            </div>
        </div>
    );
}

function LegacyBlogRedirect() {
    const { slug } = useParams();
    return <Navigate to={legacyBlogRedirects[slug] || '/playbooks'} replace />;
}

function LegacyTradeRedirect() {
    const { slug } = useParams();
    return <Navigate to={legacyTradeRedirects[slug] || '/industries'} replace />;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <a
                href="#main-content"
                className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-sun px-5 py-3 text-sm font-bold text-primary shadow-lg transition focus:translate-y-0"
            >
                Skip to main content
            </a>
            <div className="min-h-screen bg-background text-dark">
                <Navbar />
                <div id="main-content" tabIndex="-1">
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<ServicesHub />} />
                            <Route path="/services/:slug" element={<ServiceDetailPage />} />
                            <Route path="/industries" element={<IndustriesHub />} />
                            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
                            <Route path="/texas" element={<TexasHub />} />
                            <Route path="/texas/:slug" element={<RegionPage />} />
                            <Route path="/work" element={<WorkHub />} />
                            <Route path="/work/:slug" element={<CaseStudyPage />} />
                            <Route path="/playbooks" element={<PlaybooksIndex />} />
                            <Route path="/playbooks/:slug" element={<PlaybookPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/process" element={<ProcessPage />} />
                            <Route path="/start" element={<StartPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                            <Route path="/sms-consent" element={<SmsConsentPage />} />

                            <Route path="/websites" element={<Navigate to="/services/websites" replace />} />
                            <Route path="/lead-crm-system" element={<Navigate to="/services/crm-jobber-alternatives" replace />} />
                            <Route path="/custom-systems" element={<Navigate to="/services/custom-systems" replace />} />
                            <Route path="/projects" element={<Navigate to="/work" replace />} />
                            <Route path="/diagnostic" element={<Navigate to="/start" replace />} />
                            <Route path="/about/process" element={<Navigate to="/process" replace />} />
                            <Route path="/about/why-choose-us" element={<Navigate to="/about" replace />} />
                            <Route path="/about/technology" element={<Navigate to="/services" replace />} />
                            <Route path="/blue-collar" element={<Navigate to="/industries" replace />} />
                            <Route path="/blue-collar/:slug" element={<LegacyTradeRedirect />} />
                            <Route path="/blog" element={<Navigate to="/playbooks" replace />} />
                            <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
                            <Route path="/automations" element={<Navigate to="/services/automation" replace />} />
                            <Route path="/services/website-development" element={<Navigate to="/services/websites" replace />} />
                            <Route path="/services/custom-saas-development" element={<Navigate to="/services/custom-systems" replace />} />
                            <Route path="/services/ai-workflow-automation" element={<Navigate to="/services/automation" replace />} />
                            <Route path="/services/chatbot-development" element={<Navigate to="/services/ai-chatbots" replace />} />
                            <Route path="/services/lead-generation-automation" element={<Navigate to="/services/lead-generation" replace />} />
                            <Route path="/services/business-process-automation" element={<Navigate to="/services/automation" replace />} />
                            <Route path="/services/ai-consulting-strategy" element={<Navigate to="/services/ai-growth-systems" replace />} />
                            <Route path="/services/integration-development" element={<Navigate to="/services/automation" replace />} />
                            <Route path="/resources" element={<Navigate to="/playbooks" replace />} />
                            <Route path="/guides" element={<Navigate to="/playbooks" replace />} />
                            <Route path="/guides/:slug" element={<Navigate to="/playbooks" replace />} />
                            <Route path="/use-cases" element={<Navigate to="/services" replace />} />
                            <Route path="/use-cases/:slug" element={<Navigate to="/services" replace />} />
                            <Route path="/platforms" element={<Navigate to="/services" replace />} />
                            <Route path="/platforms/:slug" element={<Navigate to="/services" replace />} />
                            <Route path="/reviews" element={<Navigate to="/work" replace />} />
                            <Route path="/faq-hub" element={<Navigate to="/faq" replace />} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
