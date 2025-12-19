
import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, Award, Sparkles, Loader2, CheckCircle, FileText, ArrowRight, Fingerprint } from 'lucide-react';
import { geminiService } from '../../../services/gemini';
import { Product } from '../../../types';

const ProvenanceHub: React.FC = () => {
  const { state, mintCertificate } = useApp();
  const [mintingId, setMintingId] = useState<string | null>(null);
  const [draftingCert, setDraftingCert] = useState<{ productId: string, story: string } | null>(null);

  const handleDraft = async (product: Product) => {
    setMintingId(product.id);
    try {
      const story = await geminiService.generateCertificate(product);
      setDraftingCert({ productId: product.id, story });
    } catch (e) {
      console.error(e);
    } finally {
      setMintingId(null);
    }
  };

  const handleConfirmMint = (product: Product) => {
    if (!draftingCert) return;
    
    const certificate = {
      id: `CERT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      productId: product.id,
      artisanId: product.artisanId,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      story: draftingCert.story,
      qrCode: `ally://verify/${product.id}`
    };
    
    mintCertificate(product.id, certificate);
    setDraftingCert(null);
  };

  const unverifiedProducts = state.products.filter(p => !p.certificate);
  const verifiedProducts = state.products.filter(p => p.certificate);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-rose-50 rounded-[1.5rem] border border-rose-100">
            <ShieldCheck className="text-rose-600" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Provenance Registry</h2>
            <p className="text-stone-500 text-sm font-medium">Generate immutable proof of craftsmanship.</p>
          </div>
        </div>
        
        <div className="flex items-center bg-stone-50 px-6 py-3 rounded-2xl border border-stone-100">
          <Fingerprint className="text-stone-300 mr-3" size={20} />
          <span className="text-xs font-black text-stone-400 uppercase tracking-widest">
            {verifiedProducts.length} Secured Assets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Unverified Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">Awaiting Digital Identity</h3>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{unverifiedProducts.length} Pending</span>
          </div>

          <div className="space-y-4">
            {unverifiedProducts.length === 0 ? (
              <div className="p-12 border-2 border-dashed border-stone-100 rounded-[2rem] text-center">
                <CheckCircle className="mx-auto text-emerald-200 mb-4" size={40} />
                <p className="text-stone-400 text-sm font-medium italic">Every masterpiece is currently secured.</p>
              </div>
            ) : (
              unverifiedProducts.map(p => (
                <div key={p.id} className="group p-5 bg-stone-50/50 rounded-[2rem] border border-stone-100 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                        <img src={p.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{p.name}</p>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{p.category}</p>
                      </div>
                    </div>

                    {draftingCert?.productId === p.id ? (
                      <button 
                        onClick={() => handleConfirmMint(p)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
                      >
                        <CheckCircle size={14} />
                        <span>Confirm Mint</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDraft(p)}
                        disabled={mintingId === p.id}
                        className="bg-stone-900 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95"
                      >
                        {mintingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-400" />}
                        <span>{mintingId === p.id ? 'Drafting...' : 'Draft Provenance'}</span>
                      </button>
                    )}
                  </div>

                  {draftingCert?.productId === p.id && (
                    <div className="mt-5 p-5 bg-white rounded-2xl border border-emerald-50 animate-in slide-in-from-top-2">
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center">
                        <FileText size={10} className="mr-2" />
                        AI Generated Heritage Story
                      </p>
                      <p className="text-stone-600 text-xs italic leading-relaxed font-serif">
                        "{draftingCert.story}"
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Verified Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">Authenticated Archive</h3>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Secure</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {verifiedProducts.map(p => (
              <div key={p.id} className="group relative p-8 bg-stone-900 rounded-[2.5rem] border border-stone-800 overflow-hidden">
                <Award className="absolute -right-8 -top-8 text-white/5 group-hover:text-white/10 transition-colors duration-700" size={180} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full border border-stone-700 p-1">
                        <img src={p.imageUrl} className="w-full h-full rounded-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="text-white font-serif font-bold text-lg">{p.name}</p>
                        <div className="flex items-center space-x-2">
                          <ShieldCheck size={10} className="text-amber-500" />
                          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">ID: {p.certificate?.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                      {p.certificate?.issueDate}
                    </div>
                  </div>

                  <p className="text-stone-400 text-xs italic leading-relaxed font-serif mb-6 line-clamp-2 pr-12">
                    "{p.certificate?.story}"
                  </p>

                  <div className="flex items-center space-x-4">
                    <button className="text-[10px] font-black text-white uppercase tracking-widest flex items-center group/btn">
                      <span>View Full Certificate</span>
                      <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvenanceHub;
