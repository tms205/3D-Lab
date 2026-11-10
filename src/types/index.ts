export type PageRoute = 'home' | 'story' | 'products' | 'diy-lab' | 'workshop' | 'cart';

export interface CakeLayer {
  name: string;
  description: string;
  color: string;
  texture: string;
  glowColor?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'banh-pia-don' | 'hop-qua-trung-thu' | 'phien-ban-gioi-han' | 'combo-lab';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  tagline: string;
  description: string;
  origin: string;
  weight: string;
  shelfLife: string;
  sweetness: number; // 1 - 5
  richness: number; // 1 - 5
  flakiness: number; // 1 - 5 (độ tách lớp)
  rating: number;
  reviewCount: number;
  layers: {
    crust: CakeLayer;
    filling: CakeLayer;
    core: CakeLayer;
    stamp: string;
  };
  flavorNotes: string[];
  pairing: string; // Trà kết hợp gợi ý
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart
  product: Product;
  quantity: number;
  customDetails?: {
    isDiy: boolean;
    crustName: string;
    fillingName: string;
    coreName: string;
    stampText: string;
    boxColor: string;
  };
}

export interface WorkshopSession {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  price: number;
  totalSpots: number;
  bookedSpots: number;
  leadArtisan: {
    name: string;
    role: string;
    experience: string;
  };
  curriculum: string[];
  takeaways: string[];
}

export interface DiyOptions {
  crust: {
    id: string;
    name: string;
    color: string;
    wireColor: string;
    description: string;
    price: number;
  };
  filling: {
    id: string;
    name: string;
    color: string;
    description: string;
    sweetness: string;
    price: number;
  };
  core: {
    id: string;
    name: string;
    color: string;
    description: string;
    glow: string;
    price: number;
  };
  stamp: {
    id: string;
    text: string;
    meaning: string;
    price: number;
  };
}
