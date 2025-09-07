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
  const [gallery, setGallery] = useState(getGalleryById(galleryId));

  useEffect(() => {
    const sessionPin = sessionStorage.getItem(`pin_${galleryId}`);
    const currentGallery = getGalleryById(galleryId);
    if (currentGallery && sessionPin === currentGallery.pin) {
      setGallery(currentGallery);
      setIsAuthenticated(true);
    }
  }, [galleryId]);

  const handleLoginSuccess = () => {
    const currentGallery = getGalleryById(galleryId);
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

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Check for admin session on initial load
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        setIsAdminAuthenticated(true);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAdminLoginSuccess = () => {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
      sessionStorage.removeItem('admin_authenticated');
      setIsAdminAuthenticated(false);
  };

  let content;

  if (route.startsWith('#/client/')) {
    const galleryId = route.split('/')[2];
    content = <ClientPortal galleryId={galleryId} />;
  } else if (route === '#/admin') {
    content = (
      <>
        <Header navLinks={[]} scrollToSection={() => {}} isHomePage={false} />
        {isAdminAuthenticated ? (
            <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
            <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
        )}
        <Footer />
      </>
    );
  } else {
    content = <HomePage />;
  }

  return <div className="bg-slate-900">{content}</div>;
};

export default App;