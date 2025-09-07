import React from 'react';

interface HeroProps {
  scrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToContact }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=2&grayscale&blur=2')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Cinematic Storytelling
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
          We capture life's fleeting moments with artistry and passion, turning your stories into timeless visual narratives.
        </p>
        <button onClick={scrollToContact} className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
          Book a Consultation
        </button>
      </div>
    </section>
  );
};

export default Hero;