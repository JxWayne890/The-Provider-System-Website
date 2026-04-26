import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Existing pages
const Home = lazy(() => import('./pages/Home'));
const ProjectsArchive = lazy(() => import('./pages/ProjectsArchive'));
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

// Services
const ServicesIndex = lazy(() => import('./pages/ServicesIndex'));
const ServicePage = lazy(() => import('./pages/ServicePage'));

// Industries
const IndustriesIndex = lazy(() => import('./pages/IndustriesIndex'));
const IndustryPage = lazy(() => import('./pages/IndustryPage'));
const IndustryServicePage = lazy(() => import('./pages/IndustryServicePage'));

// Use Cases
const UseCasesIndex = lazy(() => import('./pages/UseCasesIndex'));
const UseCasePage = lazy(() => import('./pages/UseCasePage'));

// Platforms
const PlatformsIndex = lazy(() => import('./pages/PlatformsIndex'));
const PlatformPage = lazy(() => import('./pages/PlatformPage'));

// Guides
const GuidesIndex = lazy(() => import('./pages/GuidesIndex'));
const GuidePage = lazy(() => import('./pages/GuidePage'));

// About
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));

// Blue-Collar
const BlueCollarHub = lazy(() => import('./pages/BlueCollarHub'));
const BlueCollarTradePage = lazy(() => import('./pages/BlueCollarTradePage'));

// Blog
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Misc
const FAQHubPage = lazy(() => import('./pages/FAQHubPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));

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
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Services */}
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/:slug" element={<ServicePage />} />

            {/* Industries — triple-segment route before double */}
            <Route path="/industries/:industrySlug/:serviceSlug" element={<IndustryServicePage />} />
            <Route path="/industries" element={<IndustriesIndex />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />

            {/* Use Cases */}
            <Route path="/use-cases" element={<UseCasesIndex />} />
            <Route path="/use-cases/:slug" element={<UseCasePage />} />

            {/* Platforms */}
            <Route path="/platforms" element={<PlatformsIndex />} />
            <Route path="/platforms/:slug" element={<PlatformPage />} />

            {/* Guides */}
            <Route path="/guides" element={<GuidesIndex />} />
            <Route path="/guides/:slug" element={<GuidePage />} />

            {/* About — specific sub-routes before the index */}
            <Route path="/about/process" element={<ProcessPage />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/about/technology" element={<TechnologyPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Blue-Collar */}
            <Route path="/blue-collar" element={<BlueCollarHub />} />
            <Route path="/blue-collar/:slug" element={<BlueCollarTradePage />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Projects / Diagnostic / FAQ */}
            <Route path="/projects" element={<ProjectsArchive />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Hub & Resources */}
            <Route path="/faq-hub" element={<FAQHubPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
