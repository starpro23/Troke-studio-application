export enum PortfolioCategory {
  All = 'All',
  Photography = 'Photography',
  Videography = 'Videography',
  Events = 'Events'
}

export interface PortfolioItem {
  id: number;
  category: PortfolioCategory;
  imageUrl: string;
  title: string;
  description: string;
}

export interface ClientGallery {
  id: string;
  clientName: string;
  pin: string;
  photos: string[]; // Stored as base64 strings
}
