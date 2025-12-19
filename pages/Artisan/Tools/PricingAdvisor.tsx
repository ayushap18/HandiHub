
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { DollarSign, Search, ExternalLink, TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PricingAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const mockChartData = [
    { name: 'Low Market', price: 25 },
    { name: 'Median', price: 42 },
    { name: 'High Market', price: 65 },
    { name: 'Your Target', price: 38 },
  ];

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await geminiService.getPricingAdvice(query, "Handmade craft");
      setAdvice(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <TrendingUp className="text-indigo-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-900">AI Pricing Advisor</h2>
          <p className="text-stone-500 text-sm">Data-driven suggestions powered by Google Search</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder="What are you selling? e.g. 'Blue Silk Scarf'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Analyze Market'}
        </button>
      </div>

      {advice && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-stone-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
                <Info size={18} className="mr-2 text-indigo-500" />
                Market Analysis Summary
              </h3>
              <div className="prose prose-sm text-stone-600 max-w-none whitespace-pre-line leading-relaxed">
                {advice.text}
              </div>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">Pricing Sources Found</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {advice.sources?.map((chunk: any, i: number) => (
                  <a 
                    key={i} 
                    href={chunk.web?.uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-xl hover:border-indigo-400 transition-all group"
                  >
                    <span className="text-sm text-stone-700 truncate font-medium">{chunk.web?.title || 'Market Listing'}</span>
                    <ExternalLink size={14} className="text-stone-300 group-hover:text-indigo-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-indigo-200 text-sm font-medium mb-1">Suggested Price Range</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">$35 - $48</span>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-800 flex justify-between items-center">
                <span className="text-indigo-300 text-xs">Confidence Level</span>
                <span className="bg-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">High</span>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-2xl h-64">
              <h3 className="text-xs font-bold text-stone-400 uppercase mb-4">Comparison Chart</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f5f5f4'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Your Target' ? '#4f46e5' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingAdvisor;
