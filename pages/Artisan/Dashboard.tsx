
import React, { useState } from 'react';
import MarketAssistant from './Tools/MarketAssistant';
import PricingAdvisor from './Tools/PricingAdvisor';
import PhotoStudio from './Tools/PhotoStudio';
import VideoCreator from './Tools/VideoCreator';
import ProvenanceHub from './Tools/ProvenanceHub';
import StrategyLab from './Tools/StrategyLab';
import AssetFactory from './Tools/AssetFactory';
import LogisticsHub from './Tools/LogisticsHub';
import InventoryScanner from './Tools/InventoryScanner';
import CrowdfundingHub from './Tools/CrowdfundingHub';
import VolunteerManager from './Tools/VolunteerManager';
import ArtisanTraining from './Tools/ArtisanTraining';
import ArtisanChat from './Tools/ArtisanChat';
import { 
  Sparkles, Image as ImageIcon, TrendingUp, Film, 
  ShieldCheck, BrainCircuit, Box, MapPin, FileSearch, 
  Coins, HeartHandshake, GraduationCap, MessageSquare, Plus
} from 'lucide-react';

const ArtisanDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('market');

  const tools = [
    { id: 'market', label: 'Listing Assistant', icon: Sparkles, color: 'amber' },
    { id: 'chat', label: 'Unified Inbox', icon: MessageSquare, color: 'emerald' },
    { id: 'finance', label: 'Finance Hub', icon: Coins, color: 'amber' },
    { id: 'volunteer', label: 'Volunteer Hub', icon: HeartHandshake, color: 'indigo' },
    { id: 'training', label: 'Artisan Training', icon: GraduationCap, color: 'emerald' },
    { id: 'pricing', label: 'Market IQ', icon: TrendingUp, color: 'emerald' },
    { id: 'studio', label: 'Visual Studio', icon: ImageIcon, color: 'rose' },
    { id: 'provenance', label: 'Provenance', icon: ShieldCheck, color: 'emerald' },
    { id: 'strategy', label: 'Strategy Lab', icon: BrainCircuit, color: 'indigo' },
    { id: 'video', label: 'Cinematic Ad', icon: Film, color: 'indigo' },
    { id: 'assets', label: 'Asset Factory', icon: Box, color: 'rose' },
    { id: 'logistics', label: 'Logistics Hub', icon: MapPin, color: 'emerald' },
    { id: 'scanner', label: 'Inv Scanner', icon: FileSearch, color: 'indigo' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
             <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></div>
             <span>Gemini 3 Pro Online</span>
          </div>
          <h1 className="text-6xl font-serif font-bold text-stone-900 mb-4 tracking-tighter">Your Studio.</h1>
          <p className="text-stone-500 text-xl font-medium max-w-xl leading-relaxed">
            Scalable intelligence for centuries of tradition.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-stone-900 text-white px-8 py-4 rounded-[1.25rem] font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 active:scale-95">
            <Plus size={20} />
            <span>New Masterwork</span>
          </button>
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-serif font-bold text-stone-900">Intelligence Suite</h2>
          <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center space-x-2">
            <span>Powered by Gemini 3 Network</span>
            <Sparkles size={12} className="text-amber-500" />
          </div>
        </div>
        
        <div className="flex space-x-3 p-2 bg-stone-100/50 rounded-3xl inline-flex mb-12 overflow-x-auto no-scrollbar max-w-full">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tool.id 
                ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-stone-900 font-bold scale-105 z-10' 
                : 'text-stone-500 hover:text-stone-700 font-semibold'
              }`}
            >
              <tool.icon size={18} className={activeTab === tool.id ? `text-${tool.color}-600` : ''} />
              <span className="text-sm tracking-tight">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          {activeTab === 'market' && <MarketAssistant />}
          {activeTab === 'chat' && <ArtisanChat />}
          {activeTab === 'finance' && <CrowdfundingHub />}
          {activeTab === 'volunteer' && <VolunteerManager />}
          {activeTab === 'training' && <ArtisanTraining />}
          {activeTab === 'strategy' && <StrategyLab />}
          {activeTab === 'assets' && <AssetFactory />}
          {activeTab === 'logistics' && <LogisticsHub />}
          {activeTab === 'scanner' && <InventoryScanner />}
          {activeTab === 'pricing' && <PricingAdvisor />}
          {activeTab === 'studio' && <PhotoStudio />}
          {activeTab === 'video' && <VideoCreator />}
          {activeTab === 'provenance' && <ProvenanceHub />}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
