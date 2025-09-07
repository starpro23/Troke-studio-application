import React, { useState, useEffect } from 'react';

interface NavLink {
  name: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface HeaderProps {
  navLinks: NavLink[];
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = ({ navLinks, scrollToSection, isHomePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLinkClick = (ref: React.RefObject<HTMLDivElement>) => {
    scrollToSection(ref);
    setIsMenuOpen(false);
  }

  const renderNavLinks = () => {
    if (isHomePage) {
        return (
            <>
                {navLinks.map((link) => (
                    <button key={link.name} onClick={() => scrollToSection(link.ref)} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
                        {link.name}
                    </button>
                ))}
            </>
        )
    }
    return (
        <a href="/#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
            Home
        </a>
    )
  }

  const renderMobileNavLinks = () => {
     if (isHomePage) {
        return (
             <>
                {navLinks.map((link) => (
                  <button key={link.name} onClick={() => handleLinkClick(link.ref)} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-lg">
                    {link.name}
                  </button>
                ))}
            </>
        )
    }
    return (
        <a href="/#" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-lg">
            Home
        </a>
    )
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-slate-900/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/#" className="text-2xl font-bold tracking-wider text-cyan-400">TROKE STUDIOS</a>
        <nav className="hidden md:flex space-x-8 items-center">
            {renderNavLinks()}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {renderMobileNavLinks()}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;