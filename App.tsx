
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole } from './types';
import Navbar from './components/Layout/Navbar';
import Marketplace from './pages/Customer/Marketplace';
import VolunteerDashboard from './pages/Volunteer/Dashboard';
import ArtisanDashboard from './pages/Artisan/Dashboard';
import AuthGate from './components/Auth/AuthGate';

const AppContent: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <AuthGate>
        <Navbar />
        <main className="flex-grow">
          {state.role === UserRole.CUSTOMER && <Marketplace />}
          {state.role === UserRole.VOLUNTEER && <VolunteerDashboard />}
          {state.role === UserRole.ARTISAN && <ArtisanDashboard />}
        </main>
        
        <footer className="bg-white border-t border-stone-200 py-16">
          <div className="max-w-7xl auto px-4 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-stone-900 font-serif font-bold text-lg mb-4">
              <span className="text-amber-600">A</span>rtisan Ally
            </div>
            <p className="text-stone-400 text-xs font-medium uppercase tracking-[0.2em]">
              &copy; 2024 Artisan Ally &bull; Empowering craftsmanship through ethical AI.
            </p>
          </div>
        </footer>
      </AuthGate>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
