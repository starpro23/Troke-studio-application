export const API_URL = import.meta.env.VITE_API_URL;

export async function getGalleryById(galleryId: string) {
  const response = await fetch(`${API_URL}/api/gallery/${galleryId}`);
  if (!response.ok) return null;
  return response.json();
}

export async function clientLogin(galleryId: string, pin: string) {
  const response = await fetch(`${API_URL}/api/client-login/${galleryId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  return response.json();
}

// Add these for AdminDashboard
export async function getGalleries() {
  const response = await fetch(`${API_URL}/api/admin/galleries`);
  return response.json();
}

export async function createGallery(galleryData: any) {
  const response = await fetch(`${API_URL}/api/admin/galleries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(galleryData),
  });
  return response.json();
}

export async function updateGallery(id: string, galleryData: any) {
  const response = await fetch(`${API_URL}/api/admin/galleries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(galleryData),
  });
  return response.json();
}

export async function deleteGallery(id: string) {
  const response = await fetch(`${API_URL}/api/admin/galleries/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
