
import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DollarSign, Plus, Loader2, Sparkles, TrendingUp, Users } from 'lucide-react';

const CrowdfundingHub: React.FC = () => {
  const { state, addCampaign, user } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ title: '', goal: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign({
      id: Math.random().toString(36).substr(2, 9),
      title: newCampaign.title,
      goal: parseFloat(newCampaign.goal),
      raised: 0,
      description: newCampaign.description,
      artisanId: user?.uid || 'user-1',
      imageUrl: `https://picsum.photos/seed/${newCampaign.title}/800/400`
    });
    setNewCampaign({ title: '', goal: '', description: '' });
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="text-indigo-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">Crowdfunding Campaigns</h2>
            <p className="text-stone-500 text-sm">Raise funds for materials and expansion</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 hover:bg-stone-800"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /><span>Launch Campaign</span></>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-10 p-6 bg-stone-50 rounded-3xl border border-stone-100 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Campaign Title</label>
                <input 
                  required
                  type="text" 
                  value={newCampaign.title}
                  onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                  className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Workshop Expansion 2024"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Funding Goal ($)</label>
                <input 
                  required
                  type="number" 
                  value={newCampaign.goal}
                  onChange={e => setNewCampaign({...newCampaign, goal: e.target.value})}
                  className="w-full p-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="5000"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Description & Story</label>
              <textarea 
                required
                value={newCampaign.description}
                onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
                className="w-full h-[124px] p-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Share your journey and why you need this support..."
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Start Fundraising
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {state.campaigns.map(c => {
          const percent = Math.min(100, (c.raised / c.goal) * 100);
          return (
            <div key={c.id} className="group flex flex-col bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={c.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-2">{c.title}</h3>
                <p className="text-stone-500 text-xs mb-6 line-clamp-2 leading-relaxed">{c.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-stone-400">Raised</span>
                    <span className="text-indigo-600">${c.raised} of ${c.goal}</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrowdfundingHub;
