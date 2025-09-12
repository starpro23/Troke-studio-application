import React, { useState } from 'react';
import { ClientGallery } from '../types';
import { DownloadIcon } from '../components/IconComponents';
import ImageModal from '../components/ImageModal';

interface ClientGalleryProps {
  gallery: ClientGallery;
}

const ClientGalleryPage: React.FC<ClientGalleryProps> = ({ gallery }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleDownloadAll = () => {
        setIsDownloading(true);
        gallery.photos.forEach((photo, index) => {
            const link = document.createElement('a');
            link.href = photo;
            link.download = `${gallery.clientName.replace(/\s+/g, '_')}_${index + 1}.png`;
            setTimeout(() => {
                link.click();
            }, index * 300); // Stagger downloads to prevent browser blocking
        });
        setTimeout(() => {
            setIsDownloading(false);
        }, gallery.photos.length * 300);
    };

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setModalOpen(true);
    };

    return (
        <>
            <div className="container mx-auto px-6 py-24">
                <div className="text-center pt-12 mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Hello {gallery.clientName},</h1>
                    <p className="text-slate-300 max-w-3xl mx-auto">Welcome to your private gallery. Below are your images. You can preview them or download them using the button below.</p>
                </div>
                
                <div className="text-center mb-12">
                    <button 
                        onClick={handleDownloadAll} 
                        disabled={isDownloading}
                        className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                    >
                        <DownloadIcon className="w-6 h-6" />
                        {isDownloading ? 'Downloading...' : 'Download All Photos'}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.photos.map((photo, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer aspect-w-1 aspect-h-1" onClick={() => openModal(index)}>
                            <img src={photo} alt={`Client photo ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && (
                <ImageModal
                    images={gallery.photos}
                    startIndex={selectedImageIndex}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default ClientGalleryPage;
