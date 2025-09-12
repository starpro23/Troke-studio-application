import React, { useState } from 'react';
import { getGalleryById } from '../utils/galleryService';

interface ClientLoginProps {
  galleryId: string;
  clientName: string;
  onLoginSuccess: () => void;
}

const ClientLogin: React.FC<ClientLoginProps> = ({ galleryId, clientName, onLoginSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
        const gallery = getGalleryById(galleryId);
        if (gallery && gallery.pin === pin.toUpperCase()) {
            onLoginSuccess();
        } else {
            setError('Invalid PIN. Please try again.');
        }
        setIsLoading(false);
        setPin('');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=2&grayscale&blur=2')" }}>
       <div className="absolute inset-0 bg-black opacity-60"></div>
       <div className="relative z-10 w-full max-w-md mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold tracking-wider text-cyan-400 mb-4">TROKE STUDIOS</h1>
            <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-semibold text-white mb-2">Private Gallery for</h2>
                <p className="text-xl text-slate-300 mb-6">{clientName}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="pin" className="block text-slate-400 mb-2">Enter Your 5-Character PIN</label>
                    <input
                        type="text"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        maxLength={5}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md py-3 px-4 text-white text-center text-2xl tracking-[0.5em] uppercase font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                    {error && <p className="text-red-400 mt-3">{error}</p>}
                    <button 
                        type="submit" 
                        disabled={isLoading || pin.length < 5}
                        className="mt-6 w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-md text-lg hover:bg-cyan-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Unlocking...' : 'View My Photos'}
                    </button>
                </form>
            </div>
       </div>
    </div>
  );
};

export default ClientLogin;
