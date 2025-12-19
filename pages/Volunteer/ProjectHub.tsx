
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Clock, CheckCircle2, Award, Zap, ArrowUpRight, CheckCircle, Search, Filter, User } from 'lucide-react';
import { Project } from '../../types';

const ProjectHub: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by skill, technique, or artisan name..."
            className="w-full pl-16 pr-8 py-5 bg-white border border-stone-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all text-lg"
          />
        </div>
        <button className="flex items-center space-x-3 px-8 py-5 bg-stone-900 text-white rounded-[1.5rem] font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200">
          <Filter size={18} />
          <span>Refine</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Filter by Expertise</h3>
            <div className="space-y-4">
              {['Design', 'Photography', 'Marketing', 'Legal', 'Technology'].map(skill => (
                <label key={skill} className="flex items-center space-x-4 cursor-pointer group">
                  <div className="relative w-5 h-5 border-2 border-stone-200 rounded-lg group-hover:border-indigo-500 transition-all">
                     <input type="checkbox" className="sr-only peer" />
                     <div className="absolute inset-0 bg-indigo-600 scale-0 peer-checked:scale-100 rounded-md transition-transform flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                     </div>
                  </div>
                  <span className="text-sm font-bold text-stone-50 group-hover:text-stone-900 transition-colors">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
               <Zap className="text-amber-400 mb-4" size={24} />
               <h4 className="font-bold mb-2">Impact Matching</h4>
               <p className="text-xs text-indigo-200 leading-relaxed">Our AI found 3 projects that perfectly match your Graphic Design profile.</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-stone-900">{state.projects.length} Open Opportunities</h2>
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Sorted by Most Recent</div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {state.projects.map(project => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => {
  const { applyToProject, user } = useApp();
  const [applied, setApplied] = useState(project.applicantIds?.includes(user?.uid || '') || false);

  const handleApply = () => {
    if (user) {
      applyToProject(project.id, user.uid);
      setApplied(true);
    }
  };

  return (
    <div className="group bg-white rounded-[2.5rem] p-8 border border-stone-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-indigo-600 transition-colors tracking-tight">
              {project.title}
            </h3>
            <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100">
              Verified Artisan
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
            {/* Added User icon from lucide-react */}
            <span className="flex items-center"><User size={12} className="mr-2" /> {project.artisanName}</span>
            <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
            <span className="flex items-center"><Clock size={12} className="mr-2" /> {project.postedAt}</span>
          </div>
        </div>
        
        <button 
          onClick={handleApply}
          disabled={applied}
          className={`px-10 py-4 rounded-2xl text-sm font-bold transition-all flex items-center space-x-3 shadow-xl ${
            applied 
            ? 'bg-emerald-500 text-white shadow-emerald-200' 
            : 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-200 active:scale-95'
          }`}
        >
          {applied ? <><CheckCircle size={18} /><span>Application Sent</span></> : <span>Express Interest</span>}
        </button>
      </div>

      <p className="text-stone-500 text-base leading-relaxed mb-10 max-w-3xl">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-3 pt-8 border-t border-stone-50">
        {project.skills.map(skill => (
          <span key={skill} className="bg-stone-50 text-stone-600 border border-stone-100 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectHub;
