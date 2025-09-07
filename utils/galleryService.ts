import { ClientGallery } from '../types';

// NOTE: This implementation uses localStorage for data persistence.
// This is suitable for a client-side-only demo but is NOT secure for a real production application.
// In a real-world scenario, this data should be stored and managed on a secure server with a proper database.

const GALLERIES_KEY = 'troke_studios_galleries';

export const getGalleries = (): ClientGallery[] => {
  try {
    const galleriesJson = localStorage.getItem(GALLERIES_KEY);
    return galleriesJson ? JSON.parse(galleriesJson) : [];
  } catch (error) {
    console.error("Failed to parse galleries from localStorage", error);
    return [];
  }
};

export const saveGalleries = (galleries: ClientGallery[]): void => {
  localStorage.setItem(GALLERIES_KEY, JSON.stringify(galleries));
};

export const getGalleryById = (id: string): ClientGallery | undefined => {
  const galleries = getGalleries();
  return galleries.find(gallery => gallery.id === id);
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const generatePin = (): string => {
  const digits = Math.floor(1000 + Math.random() * 9000).toString();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return digits + letter;
};

export const createGallery = (clientName: string, photos: string[]): ClientGallery => {
    const newGallery: ClientGallery = {
        id: generateUniqueId(),
        clientName,
        pin: generatePin(),
        photos
    };
    const galleries = getGalleries();
    galleries.unshift(newGallery); // Add to the beginning
    saveGalleries(galleries);
    return newGallery;
};

export const updateGallery = (id: string, clientName: string, photos: string[]): ClientGallery | undefined => {
    let galleries = getGalleries();
    const galleryIndex = galleries.findIndex(gallery => gallery.id === id);

    if (galleryIndex !== -1) {
        const originalGallery = galleries[galleryIndex];
        const updatedGallery = {
            ...originalGallery,
            clientName: clientName.trim(),
            photos: photos,
        };
        galleries[galleryIndex] = updatedGallery;
        saveGalleries(galleries);
        return updatedGallery;
    }
    return undefined;
};

export const deleteGallery = (id: string): void => {
    let galleries = getGalleries();
    galleries = galleries.filter(gallery => gallery.id !== id);
    saveGalleries(galleries);
};