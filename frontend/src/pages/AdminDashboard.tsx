import React, { useState, useEffect, useCallback } from 'react';
import { ClientGallery } from '../types';
import { getGalleries, createGallery, updateGallery, deleteGallery } from '../utils/galleryService';
import { UploadIcon, CopyIcon, TrashIcon, EditIcon, CloseIcon, LogoutIcon } from '../components/IconComponents';
import ConfirmationModal from '../components/ConfirmationModal';

interface ClientCardProps {
    gallery: ClientGallery;
    onCopy: (gallery: ClientGallery) => void;
    onDeleteRequest: (gallery: ClientGallery) => void;
    onEditRequest: (gallery: ClientGallery) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ gallery, onCopy, onDeleteRequest, onEditRequest }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        onCopy(gallery);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img src={gallery.photos[0]} alt={gallery.clientName} className="w-full h-48 object-cover" />
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{gallery.clientName}</h3>
                <div className="space-y-2 text-sm flex-grow">
                    <p className="text-slate-400"><strong>Link:</strong> <a href={`/#/client/${gallery.id}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all">{`${window.location.origin}/#/client/${gallery.id}`}</a></p>
                    <p className="text-slate-400"><strong>PIN:</strong> <span className="font-mono bg-slate-700 px-2 py-1 rounded">{gallery.pin}</span></p>
                </div>
                <div className="mt-4 flex gap-2">
                    <button onClick={handleCopy} className="flex-grow bg-cyan-500 text-slate-900 font-bold py-2 px-4 rounded-md text-sm hover:bg-cyan-400 transition-colors duration-300 flex items-center justify-center gap-2">
                        <CopyIcon className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy Info'}
                    </button>
                    <button onClick={() => onEditRequest(gallery)} aria-label="Edit gallery" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300">
                         <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDeleteRequest(gallery)} aria-label="Delete gallery" className="p-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-300">
                         <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [galleries, setGalleries] = useState<ClientGallery[]>([]);
  const [clientName, setClientName] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<ClientGallery | null>(null);
  const [editingGallery, setEditingGallery] = useState<ClientGallery | null>(null);

  useEffect(() => {
    setGalleries(getGalleries());
  }, []);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    setIsUploading(true);
    const filePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(base64Photos => {
      setPhotos(prev => [...prev, ...base64Photos]);
      setIsUploading(false);
    }).catch(error => {
      console.error("Error converting files to base64", error);
      setIsUploading(false);
    });
  };
  
  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos(currentPhotos => currentPhotos.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() && photos.length > 0) {
      if (editingGallery) {
        updateGallery(editingGallery.id, clientName, photos);
      } else {
        createGallery(clientName, photos);
      }
      setClientName('');
      setPhotos([]);
      setEditingGallery(null);
      setGalleries(getGalleries()); // Refresh gallery list
    }
  };
  
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }, []);
  
  const handleCopyInfo = (gallery: ClientGallery) => {
    const clientLink = `${window.location.origin}/#/client/${gallery.id}`;
    const textToCopy = `Client: ${gallery.clientName}\nLink: ${clientLink}\nPIN: ${gallery.pin}`;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleDeleteRequest = (gallery: ClientGallery) => {
      setGalleryToDelete(gallery);
  };

  const confirmDelete = () => {
      if (galleryToDelete) {
          deleteGallery(galleryToDelete.id);
          setGalleries(galleries => galleries.filter(g => g.id !== galleryToDelete.id));
          setGalleryToDelete(null);
      }
  };
  
  const handleEditRequest = (gallery: ClientGallery) => {
      setEditingGallery(gallery);
      setClientName(gallery.clientName);
      setPhotos(gallery.photos);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancelEdit = () => {
      setEditingGallery(null);
      setClientName('');
      setPhotos([]);
  };


  return (
    <>
        <div className="container mx-auto px-6 py-24 pt-32">
            <div className="relative text-center mb-8">
                <h2 className="text-4xl font-bold text-white">Admin Dashboard</h2>
                <button 
                    onClick={onLogout}
                    className="absolute top-0 right-0 flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-300"
                    aria-label="Logout"
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
            
            <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg mb-16">
                <h3 className="text-2xl font-semibold text-white mb-6">
                    {editingGallery ? `Editing Gallery for ${editingGallery.clientName}` : 'Create New Client Gallery'}
                </h3>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="clientName" className="block text-slate-400 mb-2">Client Full Name</label>
                    <input 
                    type="text" 
                    id="clientName" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-400 mb-2">Upload Photos</label>
                    <div 
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`relative border-2 border-dashed border-slate-600 rounded-lg p-8 text-center transition-colors ${isDragOver ? 'bg-slate-700 border-cyan-500' : ''}`}
                    >
                    <UploadIcon className="w-12 h-12 mx-auto text-slate-500" />
                    <p className="mt-2 text-slate-400">Drag & drop photos here, or click to select files</p>
                    <input 
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    </div>
                </div>
                
                {photos.length > 0 && (
                    <div className="mb-6">
                        <p className="text-slate-400 mb-2">{photos.length} photo(s) selected:</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {photos.map((photo, index) => (
                                <div key={index} className="relative group">
                                    <img src={photo} alt={`preview ${index + 1}`} className="w-full h-16 object-cover rounded"/>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(index)}
                                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                        aria-label="Remove image"
                                    >
                                        <CloseIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                    {editingGallery && (
                        <button 
                            type="button" 
                            onClick={handleCancelEdit}
                            className="w-full bg-slate-600 text-white font-bold py-3 rounded-md text-lg hover:bg-slate-500 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    )}
                    <button 
                        type="submit" 
                        disabled={!clientName.trim() || photos.length === 0 || isUploading}
                        className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-md text-lg hover:bg-cyan-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'Processing...' : (editingGallery ? 'Update Gallery' : 'Create Gallery')}
                    </button>
                </div>
                </form>
            </div>

            <div className="border-t border-slate-700 pt-12">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Existing Galleries</h3>
                {galleries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleries.map(gallery => 
                        <ClientCard 
                            key={gallery.id} 
                            gallery={gallery}
                            onCopy={handleCopyInfo}
                            onDeleteRequest={handleDeleteRequest} 
                            onEditRequest={handleEditRequest}
                        />
                    )}
                </div>
                ) : (
                <p className="text-center text-slate-400">No client galleries have been created yet.</p>
                )}
            </div>
        </div>
        <ConfirmationModal
            isOpen={!!galleryToDelete}
            onClose={() => setGalleryToDelete(null)}
            onConfirm={confirmDelete}
            title="Delete Gallery"
            message={`Are you sure you want to delete the gallery for ${galleryToDelete?.clientName}? This action cannot be undone.`}
        />
    </>
  );
};

export default AdminDashboard;