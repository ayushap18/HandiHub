
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { MapPin, Search, Navigation, ExternalLink, Loader2, Package } from 'lucide-react';

const LogisticsHub: React.FC = () => {
  const [material, setMaterial] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async () => {
    if (!material || !location) return;
    setLoading(true);
    try {
      const res = await geminiService.findLocalMaterials(location, material);
      setResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-emerald-50 rounded-2xl">
          <MapPin className="text-emerald-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Logistics Hub</h2>
          <p className="text-stone-500 text-sm font-medium">Sustainable material sourcing & routing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Material Needed</label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                value={material}
                onChange={e => setMaterial(e.target.value)}
                placeholder="e.g. Organic Hemp Fabric"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-stone-900"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Your Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
              <input 
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Chiang Mai, Thailand"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-stone-900"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || !material || !location}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
            <span>{loading ? 'Querying Maps...' : 'Find Suppliers'}</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100 flex flex-col min-h-[400px]">
          <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Supply Chain Analysis</h3>
          
          {results ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="prose prose-sm max-w-none text-stone-600 whitespace-pre-line leading-relaxed">
                {results.text}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-200">
                {results.sources.map((s: any, i: number) => (
                  <a key={i} href={s.maps?.uri} target="_blank" rel="noreferrer" className="bg-white p-4 rounded-2xl border border-stone-100 flex items-center justify-between hover:border-emerald-500 group transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Navigation size={14} />
                      </div>
                      <span className="text-xs font-bold text-stone-900 truncate max-w-[150px]">{s.maps?.title || 'Supplier Location'}</span>
                    </div>
                    <ExternalLink size={14} className="text-stone-300 group-hover:text-emerald-500" />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30">
              <Navigation size={48} className="mb-4" />
              <p className="text-sm italic">Local supply routes will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsHub;
