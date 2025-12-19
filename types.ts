
export enum UserRole {
  ARTISAN = 'ARTISAN',
  VOLUNTEER = 'VOLUNTEER',
  CUSTOMER = 'CUSTOMER'
}

export interface Certificate {
  id: string;
  productId: string;
  artisanId: string;
  issueDate: string;
  story: string;
  qrCode: string; // Mock QR data
}

export interface Campaign {
  id: string;
  title: string;
  goal: number;
  raised: number;
  description: string;
  artisanId: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  artisanId: string;
  artisanName: string;
  verified: boolean;
  canBargain: boolean;
  certificate?: Certificate;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  artisanId: string;
  artisanName: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  postedAt: string;
  applicantIds?: string[];
}

export interface AppState {
  role: UserRole;
  user: {
    name: string;
    id: string;
  } | null;
  products: Product[];
  projects: Project[];
  campaigns: Campaign[];
}

export interface PricingComparison {
  title: string;
  price: number;
  source: string;
  url: string;
}
