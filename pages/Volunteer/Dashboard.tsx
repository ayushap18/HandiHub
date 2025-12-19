
import React, { useState } from 'react';
import ProjectHub from './ProjectHub';
import TrainingCenter from './TrainingCenter';
import VolunteerChat from './VolunteerChat';
import { 
  Briefcase, GraduationCap, MessageSquare, Sparkles, 
  Trophy, Heart, Zap, Award, Search 
} from 'lucide-react';

const VolunteerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const tabs = [
    { id: 'projects', label: 'Project Marketplace', icon: Briefcase, color: 'indigo' },
    { id: 'training', label: 'AI Training Center', icon: GraduationCap, color: 'amber' },
    { id: 'chat', label: 'Artisan Chat', icon: MessageSquare, color: 'emerald' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
             <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
             <span>Active Impact Mode</span>
          </div>
          <h1 className="text-6xl font-serif font-bold text-stone-900 mb-4 tracking-tighter">Impact Hub.</h1>
          <p className="text-stone-500 text-xl font-medium max-w-xl leading-relaxed">
            Apply your professional skills to preserve human heritage.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center space-x-4">
          <div className="bg-white border border-stone-100 p-4 rounded-2xl flex items-center space-x-4 shadow-sm">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Impact Level</p>
              <p className="text-sm font-bold text-stone-900">Rising Contributor</p>
            </div>
          </div>
          <div className="bg-white border border-stone-100 p-4 rounded-2xl flex items-center space-x-4 shadow-sm">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Certificates</p>
              <p className="text-sm font-bold text-stone-900">3 Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-12">
        <div className="flex space-x-3 p-2 bg-stone-100/50 rounded-3xl inline-flex overflow-x-auto no-scrollbar max-w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-stone-900 font-bold scale-105 z-10' 
                : 'text-stone-500 hover:text-stone-700 font-semibold'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? `text-${tab.color}-600` : ''} />
              <span className="text-sm tracking-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
        {activeTab === 'projects' && <ProjectHub />}
        {activeTab === 'training' && <TrainingCenter />}
        {activeTab === 'chat' && <VolunteerChat />}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
