import React from 'react';
import { InstagramIcon, TwitterIcon, FacebookIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-slate-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Troke Studios. All Rights Reserved. <br />Created and developed by StarTech Group Solutions</p>
        <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><InstagramIcon /><p>Instagram</p></a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><TwitterIcon /><p>Twitter</p></a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"><FacebookIcon /><p>Facebook</p></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;