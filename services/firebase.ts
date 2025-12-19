
/**
 * Simulated Firebase Authentication Service
 * This mock implementation allows the app to function without a real Firebase API Key
 * while maintaining the exact interface required by the application.
 */

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}

type AuthObserver = (user: User | null) => void;
let currentObserver: AuthObserver | null = null;
let currentUser: User | null = null;

// Helper to notify the observer of state changes
const notify = () => {
  if (currentObserver) {
    currentObserver(currentUser);
  }
};

export const auth = {
  // Mock auth object if needed for type compatibility
};

export const loginWithGoogle = async (): Promise<User> => {
  // Simulate a delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));
  currentUser = {
    uid: 'google-user-' + Math.random().toString(36).substr(2, 9),
    displayName: 'Master Artisan',
    email: 'artisan@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=artisan',
    isAnonymous: false,
  };
  notify();
  return currentUser;
};

export const loginAnonymously = async (): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  currentUser = {
    uid: 'guest-' + Math.random().toString(36).substr(2, 9),
    displayName: 'Guest Artisan',
    email: null,
    photoURL: null,
    isAnonymous: true,
  };
  notify();
  return currentUser;
};

export const logout = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentUser = null;
  notify();
};

export const onAuthStateChanged = (authObj: any, callback: AuthObserver) => {
  currentObserver = callback;
  // Immediate initial check
  setTimeout(() => callback(currentUser), 0);
  return () => {
    currentObserver = null;
  };
};
