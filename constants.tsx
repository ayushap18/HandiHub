
import { Product, Project, UserRole } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Hand-Woven Indigo Scarf',
    description: 'A luxurious scarf hand-dyed with natural indigo by local artisans in Chiang Mai. Each pattern is unique.',
    price: 45,
    category: 'Textiles',
    imageUrl: 'https://picsum.photos/seed/scarf/400/400',
    artisanId: 'a1',
    artisanName: 'Mali Thong',
    verified: true,
    canBargain: true,
  },
  {
    id: 'p2',
    name: 'Teak Wood Serving Bowl',
    description: 'Sustainably sourced teak wood, hand-carved to highlight the natural grain of the wood. Perfect for salads.',
    price: 32,
    category: 'Kitchenware',
    imageUrl: 'https://picsum.photos/seed/bowl/400/400',
    artisanId: 'a2',
    artisanName: 'Somsak Woodworks',
    verified: true,
    canBargain: false,
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj1',
    title: 'Logo Redesign for Pottery Workshop',
    description: 'Our traditional pottery shop needs a modern touch while keeping our heritage alive. Looking for a minimalist logo.',
    skills: ['Graphic Design', 'Branding'],
    artisanId: 'a3',
    artisanName: 'Lina Ceramics',
    status: 'OPEN',
    postedAt: '2024-05-15',
  }
];
