
import React from 'react';
import { X, ShieldCheck, Award, Calendar, Fingerprint, Download, Share2, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface CertificateModalProps {
  product: Product;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ product, onClose }) => {
  const cert = product.certificate;
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-stone-50 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-stone-200/50 animate-in zoom-in-95 duration-500">
        {/* Certificate Header Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 via-amber-600 to-amber-200"></div>
        
        <button onClick={onClose} className="absolute top-8 right-8 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <X size={24} />
        </button>

        <div className="p-12 md:p-16 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 relative border border-stone-100">
            <ShieldCheck className="text-amber-600" size={48} />
            <div className="absolute inset-0 rounded-full border-2 border-amber-600/20 animate-ping"></div>
          </div>

          <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] mb-4">Official Provenance Registry</h2>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">Certificate of Authenticity</h1>
          <p className="text-stone-400 text-sm font-medium mb-12">Artisan Ally Verified Masterwork</p>

          <div className="w-full bg-white rounded-[2rem] p-10 border border-stone-100 shadow-sm relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 p-4">
               <Fingerprint className="text-stone-100" size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-8 mb-10 text-left">
                <div>
                  <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Creation</label>
                  <p className="font-bold text-stone-900">{product.name}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Artisan</label>
                  <p className="font-bold text-stone-900">{product.artisanName}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Registry ID</label>
                  <p className="font-mono text-[10px] text-stone-600">{cert.id.toUpperCase()}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block mb-1">Issue Date</label>
                  <p className="font-bold text-stone-900">{cert.issueDate}</p>
                </div>
              </div>

              <div className="text-left border-t border-stone-50 pt-8">
                <label className="text-[9px] font-black text-amber-600 uppercase tracking-widest block mb-4 flex items-center">
                  <Sparkles size={10} className="mr-2" />
                  Ancestry & Heritage Story
                </label>
                <p className="text-stone-600 text-sm leading-relaxed italic font-serif">
                  "{cert.story}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <button className="flex-1 bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 active:scale-95">
              <Download size={20} />
              <span>Download PDF</span>
            </button>
            <button className="px-6 py-5 bg-white border border-stone-200 text-stone-600 rounded-2xl hover:bg-stone-50 transition-all">
              <Share2 size={20} />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-3 opacity-30 grayscale">
             <Award size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Secured by Gemini Blockchain Proof</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
