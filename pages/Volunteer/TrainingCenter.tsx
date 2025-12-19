
import React, { useState } from 'react';
import { geminiService } from '../../services/gemini';
import { GraduationCap, Sparkles, Loader2, BookOpen, CheckCircle2, Play, ArrowRight, Zap } from 'lucide-react';

const TrainingCenter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [module, setModule] = useState<string | null>(null);

  const generateModule = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const prompt = `Create a structured training module for a volunteer helping traditional artisans. Topic: "${topic}". Include: 
      1. Context for Artisan Needs
      2. Step-by-Step Methodology
      3. Cultural Sensitivity Tips.
      Keep it practical and high-impact.`;
      const res = await geminiService.complexReasoning(prompt);
      setModule(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const suggestedTopics = [
    "Digital Storytelling for Textiles",
    "Sustainable Packaging 101",
    "Product Photography on a Budget",
    "Ethical Supply Chain Management"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="space-y-8">
        <div className="bg-white rounded-[2rem] border border-stone-100 p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Sparkles className="text-amber-600" size={20} />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">AI Mentor</h3>
          </div>
          
          <p className="text-stone-500 text-sm mb-6 leading-relaxed">
            What skill would you like to master to better support our artisans? Our AI will curate a high-impact module for you.
          </p>

          <div className="space-y-4 mb-8">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Topic of Interest</label>
            <input 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Export Regulations for Crafts"
              className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-bold text-stone-900"
            />
          </div>

          <button
            onClick={generateModule}
            disabled={loading || !topic}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="text-amber-400" />}
            <span>{loading ? 'Curating Content...' : 'Generate Module'}</span>
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-2">Popular Paths</label>
          {suggestedTopics.map((t, i) => (
            <button
              key={i}
              onClick={() => setTopic(t)}
              className="w-full text-left p-4 bg-white border border-stone-100 rounded-2xl flex items-center justify-between group hover:border-amber-500 transition-all"
            >
              <span className="text-sm font-bold text-stone-600 group-hover:text-stone-900">{t}</span>
              <ArrowRight size={14} className="text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-stone-900 rounded-[3rem] p-12 min-h-[600px] text-white relative overflow-hidden flex flex-col">
          <div className="relative z-10 flex-grow">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-amber-500" size={24} />
                <h3 className="text-xl font-serif font-bold">Training Studio</h3>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-stone-700"></div>
                <div className="w-2 h-2 rounded-full bg-stone-700"></div>
              </div>
            </div>

            {module ? (
              <div className="prose prose-invert prose-sm max-w-none animate-in fade-in duration-700 whitespace-pre-line leading-relaxed pb-12">
                {module}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-30 pt-20">
                <GraduationCap size={80} className="mb-6 text-stone-600" />
                <h4 className="text-2xl font-serif font-bold mb-2">Knowledge Awaits</h4>
                <p className="max-w-xs mx-auto text-sm italic">Select a topic to generate your personalized social impact training module.</p>
              </div>
            )}
          </div>
          
          {module && (
            <button className="mt-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all">
              <CheckCircle2 size={20} className="text-emerald-400" />
              <span>Mark as Completed</span>
            </button>
          )}

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenter;
