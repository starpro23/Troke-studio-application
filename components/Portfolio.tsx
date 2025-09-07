import React, { useState, useMemo } from 'react';
import { PortfolioItem, PortfolioCategory } from '../types';
import { PlayIcon } from './IconComponents';

const portfolioItems: PortfolioItem[] = [
  { id: 1, category: PortfolioCategory.Photography, imageUrl: 'https://picsum.photos/600/400?random=10', title: 'City Sunset', description: 'A breathtaking sunset over the city skyline.' },
  { id: 2, category: PortfolioCategory.Videography, imageUrl: 'https://picsum.photos/600/400?random=11', title: 'Ocean Waves', description: 'Cinematic drone footage of crashing waves.' },
  { id: 3, category: PortfolioCategory.Events, imageUrl: 'https://picsum.photos/600/400?random=12', title: 'Wedding Celebration', description: 'Capturing the joy of a special day.' },
  { id: 4, category: PortfolioCategory.Photography, imageUrl: 'https://picsum.photos/600/400?random=13', title: 'Mountain Majesty', description: 'A landscape shot from the peaks.' },
  { id: 5, category: PortfolioCategory.Photography, imageUrl: 'https://picsum.photos/600/400?random=14', title: 'Urban Portrait', description: 'A candid moment in the city streets.' },
  { id: 6, category: PortfolioCategory.Events, imageUrl: 'https://picsum.photos/600/400?random=15', title: 'Corporate Conference', description: 'Highlights from a major industry event.' },
  { id: 7, category: PortfolioCategory.Videography, imageUrl: 'https://picsum.photos/600/400?random=16', title: 'Product Showcase', description: 'Dynamic commercial for a new product.' },
  { id: 8, category: PortfolioCategory.Photography, imageUrl: 'https://picsum.photos/600/400?random=17', title: 'Forest Path', description: 'The serene beauty of nature.' },
];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>(PortfolioCategory.All);

  const filteredItems = useMemo(() => {
    if (activeFilter === PortfolioCategory.All) {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const filters = [PortfolioCategory.All, PortfolioCategory.Photography, PortfolioCategory.Videography, PortfolioCategory.Events];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-bold uppercase text-cyan-400 tracking-widest mb-2">Our Work</h2>
        <h3 className="text-4xl font-bold text-white mb-12">Explore Our Portfolio</h3>
        
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 ${activeFilter === filter ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 flex flex-col justify-end p-6">
                {item.category === PortfolioCategory.Videography && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <PlayIcon className="w-16 h-16 text-white text-opacity-80" />
                  </div>
                )}
                <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-cyan-300 text-sm">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;