
import React, { useState } from 'react';
import { X, Sparkles, Loader2, Wand2 } from 'lucide-react';
import { geminiService } from '../../services/gemini';
import { Product } from '../../types';

interface StylistModalProps {
  product: Product;
  onClose: () => void;
}

const aesthetics = [
  { id: 'minimalist', label: 'Minimalist', prompt: 'Visualize this product in a clean, bright minimalist living room with white walls and natural oak furniture.' },
  { id: 'bohemian', label: 'Bohemian', prompt: 'Visualize this product in a vibrant bohemian space with colorful textiles, plants, and warm textures.' },
  { id: 'scandinavian', label: 'Scandinavian', prompt: 'Visualize this product in a cozy Scandinavian kitchen with light wood, grey tones, and hygge vibes.' },
  { id: 'rustic', label: 'Rustic Cabin', prompt: 'Visualize this product in a rustic wooden cabin with fireplace light and cozy earth tones.' }
];

const StylistModal: React.FC<StylistModalProps> = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [visualizedImg, setVisualizedImg] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(aesthetics[0].id);

  const handleVisualize = async () => {
    setLoading(true);
    try {
      const style = aesthetics.find(s => s.id === selectedStyle);
      const res = await geminiService.transformImage(product.imageUrl, style!.prompt);
      if (res) setVisualizedImg(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white md:text-stone-500 rounded-full">
          <X size={24} />
        </button>

        <div className="md:w-1/2 bg-stone-900 flex items-center justify-center p-4 overflow-hidden">
          {loading ? (
            <div className="text-center text-white">
              <Loader2 className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-stone-400 text-sm">AI Stylist is redesigning your room...</p>
            </div>
          ) : visualizedImg ? (
            <img src={visualizedImg} className="w-full h-full object-contain rounded-xl" alt="Visualized" />
          ) : (
            <img src={product.imageUrl} className="w-full h-full object-contain opacity-50 grayscale rounded-xl" alt="Original" />
          )}
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Wand2 className="text-amber-600" size={20} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">AI Stylist</h2>
          </div>

          <p className="text-stone-500 text-sm mb-6 leading-relaxed">
            Unsure how this <strong>{product.name}</strong> fits your home? Choose an aesthetic style below and our AI will visualize it in a professionally designed space.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {aesthetics.map(style => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-2xl text-left border-2 transition-all ${
                  selectedStyle === style.id 
                  ? 'border-amber-600 bg-amber-50 shadow-sm' 
                  : 'border-stone-100 hover:border-stone-200'
                }`}
              >
                <p className={`text-sm font-bold ${selectedStyle === style.id ? 'text-amber-900' : 'text-stone-700'}`}>
                  {style.label}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={handleVisualize}
            disabled={loading}
            className="mt-auto w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-stone-800 disabled:opacity-50 active:scale-95 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-amber-400" />}
            <span>{loading ? 'Visualizing...' : 'See in My Room'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistModal;
