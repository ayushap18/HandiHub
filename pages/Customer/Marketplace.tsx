
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Heart, ShieldCheck, Tag, Wand2, Star, Search, Filter, ExternalLink } from 'lucide-react';
import { Product } from '../../types';
import StylistModal from '../../components/Marketplace/StylistModal';
import BargainChat from '../../components/Marketplace/BargainChat';
import CertificateModal from '../../components/Marketplace/CertificateModal';

const Marketplace: React.FC = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState('All');
  const [selectedForStylist, setSelectedForStylist] = useState<Product | null>(null);
  const [selectedForBargain, setSelectedForBargain] = useState<Product | null>(null);
  const [selectedForCert, setSelectedForCert] = useState<Product | null>(null);

  const categories = ['All', 'Textiles', 'Ceramics', 'Kitchenware', 'Jewelry', 'Art'];

  const filteredProducts = filter === 'All' 
    ? state.products 
    : state.products.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Search and Hero Section */}
      <div className="flex flex-col space-y-12 mb-20">
        <div className="max-w-3xl">
          <p className="text-amber-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Curation: Global Artisan Network</p>
          <h1 className="text-7xl font-serif font-bold text-stone-900 mb-6 tracking-tighter">The Atelier.</h1>
          <p className="text-stone-500 text-xl font-medium leading-relaxed">
            Discover artifacts of human creativity, authenticated and reimagined.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by technique, material, or artisan..."
              className="w-full pl-16 pr-8 py-5 bg-white border border-stone-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 outline-none transition-all text-lg"
            />
          </div>
          <button className="flex items-center space-x-3 px-8 py-5 bg-stone-900 text-white rounded-[1.5rem] font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200">
            <Filter size={18} />
            <span>Refine</span>
          </button>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                filter === c 
                ? 'bg-amber-600 text-white shadow-2xl shadow-amber-600/30 -translate-y-1' 
                : 'bg-white border border-stone-100 text-stone-400 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onStylist={() => setSelectedForStylist(product)}
            onBargain={() => setSelectedForBargain(product)}
            onViewCert={() => setSelectedForCert(product)}
          />
        ))}
      </div>

      {selectedForStylist && (
        <StylistModal 
          product={selectedForStylist} 
          onClose={() => setSelectedForStylist(null)} 
        />
      )}

      {selectedForBargain && (
        <BargainChat 
          product={selectedForBargain} 
          onClose={() => setSelectedForBargain(null)} 
        />
      )}

      {selectedForCert && (
        <CertificateModal
          product={selectedForCert}
          onClose={() => setSelectedForCert(null)}
        />
      )}
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  onStylist: () => void, 
  onBargain: () => void,
  onViewCert: () => void
}> = ({ product, onStylist, onBargain, onViewCert }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-stone-100/50 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 relative overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500"></div>
        
        {/* Floating Actions */}
        <div className="absolute top-6 right-6 flex flex-col space-y-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="p-3 bg-white/95 backdrop-blur-md rounded-2xl text-stone-400 hover:text-rose-500 transition-all shadow-xl hover:scale-110 active:scale-90">
            <Heart size={20} />
          </button>
          <button 
            onClick={onStylist}
            className="p-3 bg-amber-600 text-white rounded-2xl transition-all shadow-xl hover:scale-110 active:scale-90"
          >
            <Wand2 size={20} />
          </button>
        </div>

        {product.verified && (
          <button 
            onClick={onViewCert}
            className="absolute top-6 left-6 flex items-center bg-stone-900/95 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in slide-in-from-left-4 hover:bg-stone-800 hover:scale-105 transition-all group/cert"
          >
            <ShieldCheck size={12} className="mr-2 text-amber-400" />
            Authenticated
            <ExternalLink size={10} className="ml-2 opacity-0 group-hover/cert:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{product.category}</p>
          <div className="flex text-amber-400">
            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
          </div>
        </div>

        <h3 className="font-serif font-bold text-2xl text-stone-900 group-hover:text-amber-800 transition-colors leading-none mb-2">
          {product.name}
        </h3>
        
        <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center">
          <span className="w-1.5 h-1.5 bg-stone-200 rounded-full mr-2"></span>
          Master {product.artisanName}
        </p>

        <p className="text-stone-500 text-sm line-clamp-2 mb-8 leading-relaxed italic">
          "{product.description}"
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-6 border-t border-stone-50 pt-8">
          <div className="flex flex-col">
            <span className="text-stone-300 text-[9px] font-black uppercase tracking-widest mb-1">Value</span>
            <span className="font-serif font-bold text-3xl text-stone-900">${product.price}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {product.canBargain && (
              <button 
                onClick={onBargain}
                className="p-4 bg-stone-50 text-stone-600 rounded-2xl hover:bg-amber-100 hover:text-amber-800 transition-all active:scale-95"
              >
                <Tag size={18} />
              </button>
            )}
            <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 hover:bg-stone-800 active:scale-95 transition-all shadow-2xl shadow-stone-200">
              <ShoppingCart size={16} />
              <span>Acquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
