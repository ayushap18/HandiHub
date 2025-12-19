
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, Product, Project, AppState, Campaign, Certificate } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS } from '../constants';
import { auth, onAuthStateChanged, User } from '../services/firebase';

interface AppContextType {
  state: AppState;
  setRole: (role: UserRole) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  applyToProject: (projectId: string, userId: string) => void;
  addCampaign: (campaign: Campaign) => void;
  mintCertificate: (productId: string, certificate: Certificate) => void;
  user: User | null;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<AppState>({
    role: UserRole.CUSTOMER,
    user: null,
    products: INITIAL_PRODUCTS,
    projects: INITIAL_PROJECTS,
    campaigns: [
      {
        id: 'c1',
        title: 'New Looms for Silk Weavers',
        goal: 5000,
        raised: 1250,
        description: 'We are expanding our workshop to include 4 more looms to train young women in the village.',
        artisanId: 'a1',
        imageUrl: 'https://picsum.photos/seed/loom/800/400'
      }
    ],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        setState(prev => ({ 
          ...prev, 
          user: { 
            name: firebaseUser.isAnonymous ? 'Guest Artisan' : (firebaseUser.displayName || 'User'), 
            id: firebaseUser.uid 
          } 
        }));
      } else {
        setState(prev => ({ ...prev, user: null }));
      }
    });

    return () => unsubscribe();
  }, []);

  const setRole = (role: UserRole) => setState(prev => ({ ...prev, role }));

  const addProduct = (product: Product) => 
    setState(prev => ({ ...prev, products: [product, ...prev.products] }));

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === productId ? { ...p, ...updates } : p)
    }));
  };

  const addProject = (project: Project) => 
    setState(prev => ({ ...prev, projects: [project, ...prev.projects] }));

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...p, ...updates } : p)
    }));
  };

  const applyToProject = (projectId: string, userId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id === projectId) {
          const applicantIds = p.applicantIds || [];
          if (!applicantIds.includes(userId)) {
            return { ...p, applicantIds: [...applicantIds, userId] };
          }
        }
        return p;
      })
    }));
  };

  const addCampaign = (campaign: Campaign) =>
    setState(prev => ({ ...prev, campaigns: [campaign, ...prev.campaigns] }));

  const mintCertificate = (productId: string, certificate: Certificate) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === productId ? { ...p, certificate, verified: true } : p)
    }));
  };

  return (
    <AppContext.Provider value={{ 
      state, setRole, addProduct, updateProduct, addProject, updateProject, 
      applyToProject, addCampaign, mintCertificate, user, loading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
