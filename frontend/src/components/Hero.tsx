import React from 'react';

interface HeroProps {
  scrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToContact }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=2&grayscale&blur=2')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="text-[#FF0000]">Troke</span>{' '}
          <span className="text-[#0040FF]">Studios</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
          Meru's premier multimedia production company, specializing in photography, videography, event coverage.
        </p>
        <button onClick={scrollToContact} className="bg-[#FF0000] text-[#FFFFFF] font-bold py-3 px-8 rounded-full text-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30">
          View packages
        </button>
        <button onClick={scrollToContact} className="bg-[#0040FF] text-[#FFFFFF] font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30">
          Call now
        </button>
      </div>
    </section>
  );
};

export default Hero;