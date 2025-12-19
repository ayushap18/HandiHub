
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Loader2, Sparkles, Volume2, Tag, Percent, MessageCircle } from 'lucide-react';
import { geminiService } from '../../services/gemini';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface BargainChatProps {
  product: Product;
  onClose: () => void;
}

const BargainChat: React.FC<BargainChatProps> = ({ product, onClose }) => {
  const { updateProduct } = useApp();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { 
      role: 'ai', 
      text: `Welcome! I'm the AI co-pilot for ${product.artisanName}. We take great pride in this "${product.name}". The craftsmanship involved is extensive. The current value is $${product.price}. Would you like to make a fair offer?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [dealPrice, setDealPrice] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true);
    const audioBuffer = await geminiService.textToSpeech(text);
    if (audioBuffer) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } else {
      setIsSpeaking(false);
    }
  };

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || input;
    if (!userMsg || loading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await geminiService.bargainChat(
        messages.map(m => ({ role: m.role, text: m.text })),
        userMsg,
        product
      );
      
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      
      // Check for deal confirmation
      if (response.toLowerCase().includes("it's a deal") || response.toLowerCase().includes("accept your offer")) {
        const match = response.match(/\$(\d+(\.\d+)?)/);
        if (match) {
          const newPrice = parseFloat(match[1]);
          setDealPrice(newPrice);
          updateProduct(product.id, { price: newPrice });
        }
      }

      // Auto-speak the response
      handleSpeak(response);

    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm experiencing some connectivity issues. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    `I'd like to offer $${Math.floor(product.price * 0.9)}`,
    "What's your best price for this piece?",
    "Is a bulk discount possible?"
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[60] w-[420px] bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-stone-200 overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className="bg-stone-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg transition-transform ${isSpeaking ? 'scale-110 animate-pulse' : ''}`}>
            {isSpeaking ? <Volume2 size={24} /> : <Bot size={24} />}
          </div>
          <div>
            <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] mb-0.5">Live Negotiation</p>
            <p className="font-bold text-base leading-none">Artisan Co-Pilot</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-stone-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`group relative max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-stone-900 text-white rounded-tr-none shadow-xl' 
              : 'bg-white border border-stone-100 text-stone-700 rounded-tl-none shadow-sm'
            }`}>
              {m.text}
              {m.role === 'ai' && (
                <button 
                  onClick={() => handleSpeak(m.text)}
                  className="absolute -right-12 top-0 p-3 text-stone-300 hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Volume2 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Consulting Artisan</span>
            </div>
          </div>
        )}

        {dealPrice && (
          <div className="bg-emerald-600 p-6 rounded-[2rem] text-white flex flex-col items-center text-center space-y-3 shadow-2xl shadow-emerald-200 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles size={24} className="text-amber-300" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Price Update Secured</p>
              <h4 className="text-2xl font-serif font-bold">It's a Deal!</h4>
              <p className="text-emerald-100 text-sm mt-1">Acquire this piece for <span className="font-bold text-white">${dealPrice}</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-stone-100 bg-white">
        {!dealPrice && messages.length < 3 && !loading && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-[10px] font-bold text-stone-500 hover:border-amber-500 hover:text-amber-600 transition-all flex items-center space-x-2"
              >
                <Tag size={12} />
                <span>{s}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex space-x-3">
          <div className="flex-grow relative">
            <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading || !!dealPrice}
              placeholder={dealPrice ? "Success! Proceed to checkout." : "Propose a new price..."}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-stone-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 outline-none text-sm transition-all font-medium disabled:opacity-50"
            />
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!input || loading || !!dealPrice}
            className="bg-stone-900 text-white p-4 rounded-2xl hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-90 shadow-lg shadow-stone-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BargainChat;
