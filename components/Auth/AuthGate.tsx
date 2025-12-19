
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { loginWithGoogle, loginAnonymously } from '../../services/firebase';
import { LogIn, Sparkles, ShieldCheck, Heart, ArrowRight, UserCircle, Loader2 } from 'lucide-react';

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useApp();
  const [authLoading, setAuthLoading] = useState(false);

  const handleGuestLogin = async () => {
    setAuthLoading(true);
    try {
      await loginAnonymously();
    } catch (e) {
      console.error(e);
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-100 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px]">Preparing the Atelier</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-stone-50 overflow-hidden">
        {/* Left Side: Visual/Story */}
        <div className="relative hidden lg:block bg-stone-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:scale-105 transition-transform duration-[10s]" 
            alt="Artisan Craft" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
          <div className="absolute bottom-16 left-16 right-16">
            <h2 className="text-5xl font-serif text-white mb-6 leading-tight">Preserving heritage, <br/><span className="italic text-amber-400">empowering</span> creators.</h2>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed">
              Artisan Ally uses advanced AI to bridge the gap between ancient craftsmanship and the modern digital economy.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-md w-full">
            <div className="mb-12">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-amber-600/20">
                <Sparkles className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">Welcome Home</h1>
              <p className="text-stone-500 font-medium">Step into your digital workshop.</p>
            </div>

            <div className="space-y-4 mb-10">
              {[
                { icon: ShieldCheck, text: "Blockchain-verified digital provenance", color: "text-emerald-600" },
                { icon: Sparkles, text: "AI-powered creative marketing tools", color: "text-amber-600" },
                { icon: Heart, text: "Global community of skilled volunteers", color: "text-rose-600" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm transition-all hover:translate-x-1 group">
                  <div className={`p-2 rounded-xl bg-stone-50 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <p className="text-sm text-stone-600 font-semibold">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => loginWithGoogle()}
                disabled={authLoading}
                className="group w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-4 hover:bg-stone-800 transition-all active:scale-[0.98] shadow-2xl shadow-stone-200 disabled:opacity-50"
              >
                <LogIn size={20} />
                <span>Sign in with Google</span>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-stone-50 px-4 text-stone-400">Or experience as a visitor</span>
                </div>
              </div>

              <button 
                onClick={handleGuestLogin}
                disabled={authLoading}
                className="w-full bg-white border border-stone-200 text-stone-600 py-4 rounded-2xl font-bold flex items-center justify-center space-x-4 hover:bg-stone-50 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {authLoading ? <Loader2 className="animate-spin" size={20} /> : <UserCircle size={20} />}
                <span>Continue as Guest</span>
              </button>
            </div>

            <div className="mt-12 pt-12 border-t border-stone-100 text-center">
              <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.3em]">The New Standard for Traditional Crafts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
