
import React, { useState, useRef } from 'react';
import { geminiService } from '../../../services/gemini';
import { FileSearch, Camera, Loader2, Save, CheckCircle2, AlertCircle } from 'lucide-react';

const InventoryScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setData(null);
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      const res = await geminiService.scanDocument(preview.split(',')[1]);
      setData(res);
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
          <FileSearch className="text-indigo-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Inventory Scanner</h2>
          <p className="text-stone-500 text-sm font-medium">Automatic OCR & data extraction for materials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div 
            onClick={() => fileRef.current?.click()}
            className="aspect-[3/4] rounded-[2rem] bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:bg-stone-100 transition-all"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-contain" alt="Preview" />
            ) : (
              <div className="text-center p-8">
                <Camera size={40} className="text-stone-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-stone-900 font-bold">Scan Document</p>
                <p className="text-stone-400 text-xs mt-1">Upload receipts or inventory logs</p>
              </div>
            )}
          </div>
          <input type="file" ref={fileRef} className="hidden" onChange={handleUpload} accept="image/*" />

          <button
            onClick={handleScan}
            disabled={loading || !preview}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <FileSearch size={20} />}
            <span>{loading ? 'Analyzing Data...' : 'Extract Data'}</span>
          </button>
        </div>

        <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100 flex flex-col min-h-[400px]">
          <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Extraction Results</h3>
          
          {data ? (
            <div className="flex-grow flex flex-col">
              <div className="bg-white p-6 rounded-2xl border border-stone-100 prose prose-sm max-w-none text-stone-700 font-mono mb-8 animate-in fade-in">
                {data}
              </div>
              <button
                onClick={() => setSaved(true)}
                disabled={saved}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all ${
                  saved ? 'bg-emerald-500 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
                <span>{saved ? 'Inventory Updated' : 'Sync to Database'}</span>
              </button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30">
               <AlertCircle size={48} className="mb-4" />
               <p className="text-sm italic italic">Data analysis will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryScanner;
