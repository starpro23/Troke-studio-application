import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/800/600?random=1" 
              alt="Troke Studios Team" 
              className="rounded-lg shadow-2xl object-cover w-full h-full border-4 border-slate-800" 
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-sm font-bold uppercase text-cyan-400 tracking-widest mb-2">About Troke Studios</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Crafting Visual Legacies</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Troke Studios is a full-service multimedia production company specializing in photography, videography, video editing, event coverage, LED panels hire, Sounds and live streaming services. With a passion for storytelling and a commitment to quality, we help clients capture their most memorable moments and create visually stunning content. Whether it's a corporate event, wedding, product launch, or live broadcast, we bring professionalism, creativity, and cutting-edge technology to every project, ensuring a polished final product.
            </p>
            <p className="text-slate-300 leading-relaxed">
              From intimate portraits to grand celebrations, we are dedicated to capturing the essence of your narrative. We work closely with our clients to understand their vision and bring it to life with stunning clarity and creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;