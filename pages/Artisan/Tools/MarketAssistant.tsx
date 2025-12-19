
import React, { useState, useRef } from 'react';
import { geminiService } from '../../../services/gemini';
import { Camera, Mic, Sparkles, Loader2, Save, DollarSign, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const MarketAssistant: React.FC = () => {
  const { addProduct, user } = useApp();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ name: string; description: string; category: string } | null>(null);
  const [price, setPrice] = useState<string>('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setSaved(false);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!previewUrl) return;
    setLoading(true);
    setSaved(false);
    try {
      const base64Data = previewUrl.split(',')[1];
      const details = await geminiService.generateProductDetails(base64Data);
      setResult(details);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = () => {
    if (!result || !previewUrl) return;
    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: result.name,
      description: result.description,
      category: result.category,
      price: parseFloat(price) || 0,
      imageUrl: previewUrl,
      artisanId: user?.uid || 'user-default',
      artisanName: user?.displayName || 'Artisan Ally User',
      verified: false,
      canBargain: true
    });
    setSaved(true);
    // Auto reset after success
    setTimeout(() => {
      setResult(null);
      setPreviewUrl(null);
      setPrice('');
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-amber-50 rounded-2xl">
          <Sparkles className="text-amber-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Listing Co-Pilot</h2>
          <p className="text-stone-500 text-sm font-medium">Multimodal AI analysis for traditional crafts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative aspect-square rounded-[2.5rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all overflow-hidden"
          >
            {previewUrl ? (
              <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera size={32} className="text-stone-300" />
                </div>
                <p className="text-stone-900 font-bold mb-1">Capture Product</p>
                <p className="text-stone-400 text-xs">Upload or take a photo of your craft</p>
              </div>
            )}
            {previewUrl && !loading && (
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
          
          <div className="flex space-x-3">
            <button 
              disabled={loading || !previewUrl}
              onClick={handleGenerate}
              className="flex-1 bg-stone-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl shadow-stone-200 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-amber-400" />}
              <span>{loading ? 'Analyzing Craft...' : 'Generate Details'}</span>
            </button>
            <button className="p-4 bg-stone-50 text-stone-400 rounded-2xl hover:bg-stone-100 transition-colors">
              <Mic size={24} />
            </button>
          </div>
        </div>

        <div className="bg-stone-50/50 rounded-[2.5rem] p-8 border border-stone-100 flex flex-col min-h-[400px]">
          <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-8">AI Analysis Output</h3>
          
          {result ? (
            <div className="space-y-6 flex-grow animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Refined Name</label>
                <p className="text-2xl font-serif font-bold text-stone-900">{result.name}</p>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Category</label>
                <span className="inline-flex items-center bg-white border border-stone-100 px-4 py-1.5 rounded-full text-xs font-bold text-amber-600">
                  {result.category}
                </span>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Craft Story</label>
                <p className="text-stone-600 text-sm leading-relaxed italic border-l-2 border-amber-200 pl-4">
                  {result.description}
                </p>
              </div>

              <div className="pt-4">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Set List Price</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors">
                    <DollarSign size={18} />
                  </div>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-stone-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 outline-none transition-all font-bold text-stone-900"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveProduct}
                disabled={saved}
                className={`w-full mt-4 py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-xl ${
                  saved 
                  ? 'bg-emerald-500 text-white shadow-emerald-200' 
                  : 'bg-stone-900 text-white shadow-stone-200 hover:bg-stone-800'
                }`}
              >
                {saved ? <CheckCircle2 size={22} /> : <Save size={22} />}
                <span>{saved ? 'Added to Storefront' : 'Publish to Market'}</span>
              </button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-stone-100/50 rounded-full flex items-center justify-center mb-4 relative">
                <Sparkles size={32} className="text-stone-200" />
                {loading && <div className="absolute inset-0 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>}
              </div>
              <p className="text-stone-400 text-sm font-medium italic">
                {loading ? 'Decrypting the craft...' : 'Awaiting multimodal input...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketAssistant;
