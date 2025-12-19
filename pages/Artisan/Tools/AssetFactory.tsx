
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { Box, Sparkles, Loader2, Download, Maximize, LayoutGrid } from 'lucide-react';

const AssetFactory: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspect, setAspect] = useState<"1:1" | "16:9" | "9:16">("1:1");

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await geminiService.generateAsset(prompt, aspect);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-rose-50 rounded-2xl">
          <Box className="text-rose-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Asset Factory</h2>
          <p className="text-stone-500 text-sm font-medium">Create high-quality brand assets from text.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Creative Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'A high-end minimal lifestyle photograph of a clay vase on a marble table with soft afternoon shadows, 8k resolution, boutique aesthetic.'"
              className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500/50 outline-none text-stone-700 resize-none transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Format / Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-3">
              {(["1:1", "16:9", "9:16"] as const).map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspect(ratio)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    aspect === ratio 
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg' 
                    : 'bg-white text-stone-500 border-stone-100 hover:border-stone-300'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-stone-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-rose-400" />}
            <span>{loading ? 'Dreaming...' : 'Generate Asset'}</span>
          </button>
        </div>

        <div className="bg-stone-100 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group border border-stone-200">
          {result ? (
            <>
              <img src={result} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Generated Asset" />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button className="p-4 bg-white rounded-2xl text-stone-900 hover:scale-110 transition-transform shadow-2xl">
                  <Download size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <LayoutGrid size={32} className="text-stone-300" />
              </div>
              <p className="text-stone-400 text-sm font-medium italic">High-fidelity visualization will appear here.</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-rose-600 mb-4" size={40} />
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Assembling Pixels</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetFactory;
