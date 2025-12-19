
import React, { useState, useRef } from 'react';
import { geminiService } from '../../../services/gemini';
import { Image as ImageIcon, Sparkles, Loader2, Download, RefreshCw, Sun, Contrast, Droplet, Layers } from 'lucide-react';

const themes = [
  { id: 'minimalist', label: 'Minimalist White', prompt: 'Place this product in a professional, bright minimalist white studio setting with soft shadows.' },
  { id: 'bohemian', label: 'Bohemian Lifestyle', prompt: 'Place this product in a warm, cozy bohemian room with plants and soft natural sunlight.' },
  { id: 'industrial', label: 'Industrial Loft', prompt: 'Place this product on a concrete surface in a modern industrial loft setting.' },
  { id: 'nature', label: 'Natural/Outdoor', prompt: 'Place this product on a weathered wooden surface in a lush green garden setting.' },
  { id: 'luxury', label: 'Luxury Boutique', prompt: 'Place this product in a high-end luxury boutique with marble floors, gold trim, and warm spotlighting.' },
  { id: 'art-deco', label: 'Art Deco Glam', prompt: 'Place this product in a glamorous 1920s Art Deco interior with geometric patterns and rich brass accents.' },
  { id: 'cyberpunk', label: 'Neon Cyberpunk', prompt: 'Place this product on a rain-slicked futuristic street with neon purple and blue holographic signs.' },
  { id: 'zen', label: 'Zen Garden', prompt: 'Place this product on a smooth black stone in a peaceful Japanese Zen garden with raked sand and bamboo.' }
];

const PhotoStudio: React.FC = () => {
  const [sourceImg, setSourceImg] = useState<string | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
  
  // Adjustment states (-100 to 100)
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImg(reader.result as string);
        setResultImg(null); // Clear result when new source is added
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTransform = async () => {
    if (!sourceImg) return;
    setLoading(true);
    try {
      const theme = themes.find(t => t.id === selectedTheme);
      
      // Build a comprehensive prompt that includes the adjustments
      const adjustmentPrompt = `
        Primary Style: ${theme!.prompt}
        Image Adjustments: 
        - Brightness shift: ${brightness > 0 ? 'increase' : 'decrease'} (Value: ${brightness})
        - Contrast shift: ${contrast > 0 ? 'increase' : 'decrease'} (Value: ${contrast})
        - Saturation shift: ${saturation > 0 ? 'increase' : 'decrease'} (Value: ${saturation})
        Please refine the image lighting and colors accordingly while maintaining the product's integrity.
      `;
      
      const res = await geminiService.transformImage(sourceImg, adjustmentPrompt);
      if (res) setResultImg(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-rose-50 rounded-2xl">
          <ImageIcon className="text-rose-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">AI Photo Studio</h2>
          <p className="text-stone-500 text-sm font-medium">Professional e-commerce photography in seconds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Controls */}
        <div className="space-y-8">
          {/* Upload Area */}
          <div 
            onClick={() => !loading && fileInputRef.current?.click()}
            className="group relative aspect-video bg-stone-50 rounded-[2rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100 transition-all overflow-hidden"
          >
            {sourceImg ? (
              <img src={sourceImg} className="w-full h-full object-cover" alt="Source" />
            ) : (
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} className="text-stone-300" />
                </div>
                <p className="text-stone-900 font-bold text-sm">Upload Raw Photo</p>
                <p className="text-stone-400 text-xs mt-1">Best results with neutral backgrounds</p>
              </div>
            )}
            {sourceImg && !loading && (
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Replace Image</p>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />

          {/* Theme Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center">
                <Layers size={12} className="mr-2" />
                Background Themes
              </label>
              <span className="text-[10px] font-bold text-rose-600 px-2 py-0.5 bg-rose-50 rounded-full">8 Styles</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`py-3 px-2 rounded-xl text-[10px] font-bold transition-all border text-center leading-tight ${
                    selectedTheme === theme.id 
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg' 
                    : 'bg-white text-stone-500 border-stone-100 hover:border-stone-300'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Adjustments Sliders */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-100 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Refine Lighting & Color</label>
              <button 
                onClick={resetAdjustments}
                className="text-[10px] font-bold text-stone-400 hover:text-stone-900 transition-colors underline decoration-dotted underline-offset-4"
              >
                Reset
              </button>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                  <div className="flex items-center"><Sun size={12} className="mr-2" /> Brightness</div>
                  <span>{brightness > 0 ? `+${brightness}` : brightness}</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="1" 
                  value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                  <div className="flex items-center"><Contrast size={12} className="mr-2" /> Contrast</div>
                  <span>{contrast > 0 ? `+${contrast}` : contrast}</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="1" 
                  value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                  <div className="flex items-center"><Droplet size={12} className="mr-2" /> Saturation</div>
                  <span>{saturation > 0 ? `+${saturation}` : saturation}</span>
                </div>
                <input 
                  type="range" min="-100" max="100" step="1" 
                  value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleTransform}
            disabled={loading || !sourceImg}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-stone-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-rose-400" />}
            <span>{loading ? 'Reimagining Craft...' : 'Generate Studio Shot'}</span>
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="flex flex-col">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Studio Output</label>
          <div className="flex-grow aspect-square lg:aspect-auto bg-stone-900 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group border border-stone-800 shadow-inner">
            {resultImg ? (
              <>
                <img src={resultImg} className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700" alt="Result" />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 backdrop-blur-sm">
                  <button className="p-4 bg-white rounded-2xl text-stone-900 hover:scale-110 transition-transform shadow-2xl">
                    <Download size={20} />
                  </button>
                  <button onClick={() => setResultImg(null)} className="p-4 bg-white rounded-2xl text-stone-900 hover:scale-110 transition-transform shadow-2xl">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-stone-800 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-stone-700/50">
                  <Sparkles size={32} className="text-stone-600" />
                </div>
                <p className="text-stone-500 text-sm font-medium italic">Your professional product shot will materialize here.</p>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-rose-500/20 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mt-6">Developing Scene</p>
                <p className="text-stone-500 text-[9px] font-medium mt-2 animate-pulse">Consulting light and material science...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoStudio;
