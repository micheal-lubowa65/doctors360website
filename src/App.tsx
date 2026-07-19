import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Home page sections
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import InsurancePartners from './sections/InsurancePartners';
import NewsPreview from './components/NewsPreview';

// Full pages
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import GalleryPage from './pages/GalleryPage';
import DonatePage from './pages/DonatePage';
import UnsubscribePage from './pages/UnsubscribePage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <InsurancePartners />
      <NewsPreview />
      <Contact />
    </main>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950">
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
