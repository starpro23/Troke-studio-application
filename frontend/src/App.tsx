import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import ClientLogin from './pages/ClientLogin';
import ClientGallery from './pages/ClientGallery';
import AdminLogin from './pages/AdminLogin';
import { getGalleryById } from './utils/galleryService';
import { HashRouter as Router, Routes, Route } from "react-router-dom";




const HomePage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', ref: homeRef },
    { name: 'About', ref: aboutRef },
    { name: 'Services', ref: servicesRef },
    { name: 'Portfolio', ref: portfolioRef },
    { name: 'Contact', ref: contactRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header navLinks={navLinks} scrollToSection={scrollToSection} isHomePage={true} />
      <main>
        <div ref={homeRef}>
          <Hero scrollToContact={() => scrollToSection(contactRef)} />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={servicesRef}>
          <Services />
        </div>
        <div ref={portfolioRef}>
          <Portfolio />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
};

const ClientPortal: React.FC<{ galleryId: string }> = ({ galleryId }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gallery, setGallery] = useState<any>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const sessionPin = sessionStorage.getItem(`pin_${galleryId}`);
      const currentGallery = await getGalleryById(galleryId);
      if (currentGallery && sessionPin === currentGallery.pin) {
        setGallery(currentGallery);
        setIsAuthenticated(true);
      } else {
        setGallery(currentGallery);
      }
    };
    fetchGallery();
  }, [galleryId]);

  const handleLoginSuccess = async () => {
    const currentGallery = await getGalleryById(galleryId);
    if (currentGallery) {
        sessionStorage.setItem(`pin_${galleryId}`, currentGallery.pin);
        setGallery(currentGallery);
        setIsAuthenticated(true);
    }
  };

  if (!gallery) {
    return (
        <div className="h-screen flex items-center justify-center text-center">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Gallery Not Found</h1>
                <p className="text-slate-400 mb-8">The gallery you are looking for does not exist or has been moved.</p>
                <a href="/#" className="text-cyan-400 hover:text-cyan-300 font-semibold">Return to Homepage</a>
            </div>
        </div>
    );
  }
  
  if (isAuthenticated) {
    return <ClientGallery gallery={gallery} />;
  }
  
  return <ClientLogin galleryId={galleryId} clientName={gallery.clientName} onLoginSuccess={handleLoginSuccess} />;
};

// ClientPortalWrapper to extract galleryId from URL params
const ClientPortalWrapper: React.FC = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  if (!galleryId) return <div>Gallery ID missing</div>;
  return <ClientPortal galleryId={galleryId} />;
};

const AdminWrapper: React.FC<{ isAdminAuthenticated: boolean; onLoginSuccess: () => void; onLogout: () => void; }> = ({ isAdminAuthenticated, onLoginSuccess, onLogout }) => {
  return (
    <>
      <Header navLinks={[]} scrollToSection={() => {}} isHomePage={false} />
      {isAdminAuthenticated ? (
          <AdminDashboard onLogout={onLogout} />
      ) : (
          <AdminLogin onLoginSuccess={onLoginSuccess} />
      )}
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLoginSuccess = () => {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
      sessionStorage.removeItem('admin_authenticated');
      setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <div className="bg-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/client/:galleryId" element={<ClientPortalWrapper />} />
          <Route path="/admin" element={
            <AdminWrapper 
              isAdminAuthenticated={isAdminAuthenticated}
              onLoginSuccess={handleAdminLoginSuccess}
              onLogout={handleAdminLogout}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};



export default App;