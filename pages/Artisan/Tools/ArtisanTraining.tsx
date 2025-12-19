
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { GraduationCap, Sparkles, Loader2, BookOpen, CheckCircle, ArrowRight, Zap, Target, Globe } from 'lucide-react';

const ArtisanTraining: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState<string | null>(null);

  const generateModule = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const prompt = `Act as an AI Business Mentor for traditional artisans. Generate a structured training module for: "${topic}".
      Include:
      1. Market Opportunity
      2. Step-by-Step Implementation for Craftspeople
      3. Digital Tools to Use
      4. Tips for maintaining cultural authenticity while scaling.
      Tone: Encouraging, practical, and respectful of heritage.`;
      const res = await geminiService.complexReasoning(prompt);
      setModule(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const tracks = [
    { title: "Exporting Your Craft", icon: Globe, color: "text-blue-500" },
    { title: "Instagram for Artisans", icon: Sparkles, color: "text-amber-500" },
    { title: "Product Storytelling", icon: BookOpen, color: "text-emerald-500" },
    { title: "Eco-Friendly Sourcing", icon: Target, color: "text-rose-500" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="space-y-8">
        <div className="bg-white rounded-[2.5rem] border border-stone-100 p-10 shadow-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <GraduationCap className="text-emerald-600" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">AI Mentor</h3>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-1">Digital Mastery Track</p>
            </div>
          </div>
          
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            What business skill would help you reach a global audience today? Our AI will build a personalized curriculum for you.
          </p>

          <div className="space-y-4 mb-8">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Area of Learning</label>
            <input 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. EU Craft Regulations"
              className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-bold text-stone-900"
            />
          </div>

          <button
            onClick={generateModule}
            disabled={loading || !topic}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all shadow-xl active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="text-emerald-400" />}
            <span>{loading ? 'Curating Content...' : 'Build Module'}</span>
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-4">Recommended for You</label>
          <div className="grid grid-cols-1 gap-3">
            {tracks.map((track, i) => (
              <button
                key={i}
                onClick={() => setTopic(track.title)}
                className="w-full text-left p-5 bg-white border border-stone-100 rounded-2xl flex items-center justify-between group hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl bg-stone-50 ${track.color}`}>
                    <track.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-stone-600 group-hover:text-stone-900">{track.title}</span>
                </div>
                <ArrowRight size={14} className="text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-stone-900 rounded-[3rem] p-12 min-h-[600px] text-white relative overflow-hidden flex flex-col shadow-2xl">
          <div className="relative z-10 flex-grow">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold">Atelier Training Studio</h3>
                  <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Generative Learning Environment</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-emerald-500/20"></div>)}
              </div>
            </div>

            {module ? (
              <div className="prose prose-invert prose-sm max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 whitespace-pre-line leading-relaxed pb-12 font-medium text-stone-300">
                {module}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-30 pt-20">
                <GraduationCap size={100} className="mb-8 text-stone-600" />
                <h4 className="text-3xl font-serif font-bold mb-4">Empower Your Heritage</h4>
                <p className="max-w-xs mx-auto text-sm italic">Define a learning goal to generate a comprehensive guide for your artisan business.</p>
              </div>
            )}
          </div>
          
          {module && (
            <button className="mt-auto bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl shadow-emerald-900">
              <CheckCircle size={20} />
              <span>Complete Module & Earn Certificate</span>
            </button>
          )}

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanTraining;
