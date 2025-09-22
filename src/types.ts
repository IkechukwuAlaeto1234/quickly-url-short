export interface User {
  id: string;
  email: string;
}

export interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortSlug: string;
  createdAt: string;
  userId: string;
}

export type BlogCategory = 'Marketing' | 'Technology' | 'Tips';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: BlogCategory;
  content: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured: boolean;
}