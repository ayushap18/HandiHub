
import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { HeartHandshake, Plus, Search, Users, Clock, CheckCircle, ArrowUpRight, Zap } from 'lucide-react';

const VolunteerManager: React.FC = () => {
  const { state, addProject, user } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', skills: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      id: Math.random().toString(36).substr(2, 9),
      title: newProject.title,
      description: newProject.description,
      skills: newProject.skills.split(',').map(s => s.trim()),
      artisanId: user?.uid || 'user-1',
      artisanName: user?.displayName || 'Master Artisan',
      status: 'OPEN',
      postedAt: new Date().toLocaleDateString(),
    });
    setNewProject({ title: '', description: '', skills: '' });
    setIsAdding(false);
  };

  const artisanProjects = state.projects.filter(p => p.artisanId === user?.uid);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-indigo-50 rounded-[1.5rem] border border-indigo-100">
            <HeartHandshake className="text-indigo-600" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Volunteer Hub</h2>
            <p className="text-stone-500 text-sm font-medium">Connect with skilled professionals to grow your business.</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 transition-all shadow-xl active:scale-95"
        >
          {isAdding ? <span>Cancel</span> : <><Plus size={20} /><span>Request Help</span></>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-12 p-8 bg-stone-50 rounded-[2rem] border border-stone-100 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Project Title</label>
                <input 
                  required
                  type="text" 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-stone-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-stone-900"
                  placeholder="e.g. Website Design or Logo Branding"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Skills Required (Comma separated)</label>
                <input 
                  required
                  type="text" 
                  value={newProject.skills}
                  onChange={e => setNewProject({...newProject, skills: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-stone-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-stone-900"
                  placeholder="e.g. Graphic Design, Marketing"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Describe Your Needs</label>
              <textarea 
                required
                value={newProject.description}
                onChange={e => setNewProject({...newProject, description: e.target.value})}
                className="w-full h-full min-h-[160px] px-5 py-4 rounded-2xl bg-white border border-stone-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-medium text-stone-700 resize-none"
                placeholder="How can a volunteer help you?"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            Post Project to Marketplace
          </button>
        </form>
      )}

      <div className="space-y-8">
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">Your Active Requests</h3>
        
        {artisanProjects.length === 0 ? (
          <div className="p-16 border-2 border-dashed border-stone-100 rounded-[2.5rem] text-center">
            <Users className="mx-auto text-stone-200 mb-4" size={48} />
            <p className="text-stone-400 text-sm font-medium italic">You haven't requested any help yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artisanProjects.map(p => (
              <div key={p.id} className="group bg-stone-50/50 p-8 rounded-[2.5rem] border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 bg-white rounded-full border border-stone-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {p.status}
                  </div>
                  <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{p.postedAt}</span>
                </div>
                
                <h4 className="text-xl font-serif font-bold text-stone-900 mb-3">{p.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">{p.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div className="flex items-center text-stone-400 text-xs font-bold">
                    <Users size={14} className="mr-2" />
                    <span>{p.applicantIds?.length || 0} Applicants</span>
                  </div>
                  <button className="text-[10px] font-black text-stone-900 uppercase tracking-widest flex items-center group/btn">
                    Review Applications
                    <ArrowUpRight size={14} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerManager;
