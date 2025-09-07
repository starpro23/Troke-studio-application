import React, { useState, useEffect, useCallback } from 'react';
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from './IconComponents';

interface ImageModalProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPrevious, goToNext, onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center" onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors z-50"
          aria-label="Close image viewer"
        >
          <CloseIcon className="w-10 h-10" />
        </button>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-colors z-50"
          aria-label="Previous image"
        >
          <ArrowLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full text-white hover:bg-white/20 transition-colors z-50"
          aria-label="Next image"
        >
          <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Image Display */}
        <div className="max-w-screen-lg max-h-full">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>

         {/* Counter */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
