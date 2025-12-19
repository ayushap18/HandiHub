
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { BrainCircuit, Sparkles, Loader2, Send, Zap } from 'lucide-react';

const StrategyLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReason = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await geminiService.complexReasoning(prompt);
      setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <BrainCircuit className="text-indigo-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Strategy Lab</h2>
          <p className="text-stone-500 text-sm font-medium">Deep reasoning for complex artisan business logic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Thinking Objectives</h3>
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              Use this space for multi-step planning, supply chain optimization, or finding cultural niches for your products. This model "thinks" more before responding.
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'Plan a 6-month international expansion strategy for my ceramics workshop, focusing on eco-friendly logistics and boutique galleries in Europe.'"
              className="w-full h-48 p-4 bg-white border border-stone-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none text-stone-700 resize-none transition-all"
            />
          </div>

          <button
            onClick={handleReason}
            disabled={loading || !prompt}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-stone-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} className="text-indigo-400" />}
            <span>{loading ? 'Thinking Deeply...' : 'Initiate Reasoning'}</span>
          </button>
        </div>

        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white min-h-[400px] relative overflow-hidden flex flex-col">
          <div className="relative z-10 flex-grow">
            <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6">Strategy Output</h3>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Loader2 className="animate-spin mb-4 text-indigo-300" size={40} />
                <p className="text-indigo-200 font-medium italic animate-pulse">Consulting global markets and heritage archives...</p>
              </div>
            ) : response ? (
              <div className="prose prose-invert prose-sm max-w-none animate-in fade-in duration-700 whitespace-pre-line leading-relaxed">
                {response}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                <BrainCircuit size={48} className="mb-4" />
                <p className="text-sm italic">Deep thought results will appear here.</p>
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default StrategyLab;
