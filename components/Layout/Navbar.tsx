
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { logout } from '../../services/firebase';
import { Hammer, Users, ShoppingBag, Menu, LogOut, ChevronDown, User as UserIcon, X, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const { state, setRole, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const roles = [
    { id: UserRole.ARTISAN, label: 'Artisan', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: UserRole.VOLUNTEER, label: 'Volunteer', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: UserRole.CUSTOMER, label: 'Customer', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const currentRoleObj = roles.find(r => r.id === state.role);
  
  // Handle anonymous/guest user names
  const displayName = user?.isAnonymous ? 'Guest' : (user?.displayName?.split(' ')[0] || 'User');

  return (
    <nav className="glass sticky top-0 z-50 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <Sparkles className="text-amber-400" size={20} />
            </div>
            <span className="text-xl font-serif font-bold text-stone-900 tracking-tight hidden sm:block">
              Artisan Ally
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="bg-stone-100/50 p-1.5 rounded-2xl flex items-center shadow-inner">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-widest ${
                    state.role === r.id 
                    ? 'bg-white shadow-xl text-stone-900' 
                    : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <r.icon size={14} className={state.role === r.id ? r.color : ''} />
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
            
            <div className="h-6 w-[1px] bg-stone-200"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-stone-50 transition-colors group"
              >
                <div className="relative">
                  {user?.photoURL ? (
                    <img src={user.photoURL} className="w-9 h-9 rounded-xl object-cover ring-2 ring-stone-100 group-hover:ring-amber-200 transition-all" alt="Profile" />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400">
                      <UserIcon size={18} />
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${currentRoleObj?.bg} border-2 border-white rounded-full flex items-center justify-center`}>
                    <currentRoleObj.icon size={6} className={currentRoleObj.color} />
                  </div>
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-black text-stone-900 leading-none mb-0.5">{displayName}</p>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.1em]">{state.role}</p>
                </div>
                <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-stone-900' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-stone-100 p-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="px-5 py-4 bg-stone-50 rounded-2xl mb-2">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Account Holder</p>
                    <p className="text-sm font-bold text-stone-900 truncate">{user?.displayName || (user?.isAnonymous ? 'Guest User' : 'Standard User')}</p>
                    <p className="text-xs text-stone-500 truncate">{user?.email || 'Anonymous Access'}</p>
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={() => logout()}
                      className="w-full flex items-center space-x-3 px-4 py-3.5 text-stone-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all font-bold text-sm"
                    >
                      <LogOut size={18} />
                      <span>End Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-50 text-stone-900"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 p-6 space-y-8 animate-in slide-in-from-right duration-300">
          <div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4 px-2">Workspace Type</p>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setIsOpen(false); }}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all ${
                    state.role === r.id ? 'bg-stone-900 text-white shadow-xl' : 'bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <r.icon size={20} />
                    <span className="font-bold">{r.label} View</span>
                  </div>
                  {state.role === r.id && <div className="w-2 h-2 bg-amber-400 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-6 border-t border-stone-100 flex items-center justify-between px-2">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400">
                 {user?.photoURL ? <img src={user.photoURL} className="w-10 h-10 rounded-xl" alt="" /> : <UserIcon size={20} />}
               </div>
               <div>
                 <p className="text-sm font-bold text-stone-900">{displayName}</p>
                 <p className="text-xs text-stone-400">Settings</p>
               </div>
             </div>
            <button 
              onClick={() => logout()}
              className="p-3 text-rose-600 bg-rose-50 rounded-xl"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
