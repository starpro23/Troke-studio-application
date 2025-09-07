import React from 'react';
import { CameraIcon, VideoCameraIcon, UsersIcon } from './IconComponents';

const services = [
  {
    icon: <CameraIcon className="w-12 h-12 text-cyan-400" />,
    title: "Photography",
    description: "From portraits to products, we provide high-resolution images that capture the essence of the subject with professional lighting and composition.",
  },
  {
    icon: <VideoCameraIcon className="w-12 h-12 text-cyan-400" />,
    title: "Videography",
    description: "We produce cinematic 4K videos for weddings, corporate events, and commercials, complete with professional editing and sound design.",
  },
  {
    icon: <UsersIcon className="w-12 h-12 text-cyan-400" />,
    title: "Event Coverage",
    description: "Comprehensive photo and video coverage for concerts, conferences, and private parties, ensuring no moment is missed.",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-bold uppercase text-cyan-400 tracking-widest mb-2">What We Do</h2>
        <h3 className="text-4xl font-bold text-white mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-slate-900 p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group">
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h4 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">{service.title}</h4>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;