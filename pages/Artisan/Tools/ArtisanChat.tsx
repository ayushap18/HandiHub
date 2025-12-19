
import React, { useState } from 'react';
import { MessageSquare, Send, User, Bot, Sparkles, Phone, Video, Search, Filter, Tag, HeartHandshake } from 'lucide-react';

const ArtisanChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const inbox = [
    { id: 'c1', name: 'Alex Rivera', type: 'Customer', lastMsg: "Would you accept $40 for the scarf?", status: 'online', avatar: 'https://i.pravatar.cc/150?u=alex', category: 'Bargain' },
    { id: 'v1', name: 'James Wilson', type: 'Volunteer', lastMsg: "The logo concepts are ready!", status: 'online', avatar: 'https://i.pravatar.cc/150?u=james', category: 'Branding' },
    { id: 'c2', name: 'Sarah Chen', type: 'Customer', lastMsg: "Do you offer international shipping?", status: 'offline', avatar: 'https://i.pravatar.cc/150?u=sarah', category: 'General' },
  ];

  const currentChat = inbox.find(c => c.id === activeChat);

  return (
    <div className="bg-white rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden h-[750px] flex">
      {/* Sidebar */}
      <div className="w-96 border-r border-stone-100 flex flex-col bg-stone-50/30">
        <div className="p-8 border-b border-stone-100 bg-white">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border-stone-100 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-stone-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">All</button>
            <button className="px-4 py-2 bg-white text-stone-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-stone-100">Offers</button>
            <button className="px-4 py-2 bg-white text-stone-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-stone-100">Volunteers</button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2 no-scrollbar">
          {inbox.map(c => (
            <button 
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center space-x-4 p-5 rounded-[2rem] transition-all duration-300 ${
                activeChat === c.id ? 'bg-white shadow-xl shadow-stone-200/40 translate-x-2' : 'hover:bg-white/50'
              }`}
            >
              <div className="relative">
                <img src={c.avatar} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                {c.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="text-left flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-stone-900 text-sm truncate">{c.name}</p>
                  <span className="text-[9px] font-black text-stone-300 uppercase">Just now</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                    c.type === 'Customer' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {c.type}
                  </span>
                  <p className="text-xs text-stone-400 truncate">{c.lastMsg}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-white">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-8 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center overflow-hidden border border-stone-100">
                  <img src={currentChat?.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-stone-900 leading-none mb-1">
                    {currentChat?.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{currentChat?.type} • Active on {currentChat?.category}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-4 bg-stone-50 text-stone-400 hover:text-emerald-600 rounded-2xl transition-all"><Phone size={20} /></button>
                <button className="p-4 bg-stone-50 text-stone-400 hover:text-emerald-600 rounded-2xl transition-all"><Video size={20} /></button>
              </div>
            </div>

            {/* AI Assistant Context Bar */}
            <div className="bg-stone-900 px-8 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="text-amber-400" size={14} />
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">AI Context Review</p>
                <span className="text-[10px] text-amber-400 font-bold">This customer is interested in the Hand-Woven Scarf. Range: $38-$45.</span>
              </div>
              <button className="text-[10px] font-black text-white hover:text-amber-400 transition-colors uppercase tracking-widest">View Deal History</button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-10 overflow-y-auto space-y-8 bg-stone-50/30 no-scrollbar">
               <div className="flex justify-start">
                 <div className="max-w-[70%] bg-white border border-stone-100 p-6 rounded-[2rem] rounded-tl-none shadow-sm text-sm text-stone-600 leading-relaxed">
                   Hello! I saw your Indigo Scarf in the marketplace. It's beautiful. I'm a huge fan of traditional Thai weaving. 
                 </div>
               </div>
               <div className="flex justify-start">
                 <div className="max-w-[70%] bg-white border border-stone-100 p-6 rounded-[2rem] rounded-tl-none shadow-sm text-sm text-stone-600 leading-relaxed">
                   Would you be open to accepting $40 for it? I'm buying it as a gift for my mother.
                 </div>
               </div>
               <div className="flex justify-end">
                 <div className="max-w-[70%] bg-stone-900 text-white p-6 rounded-[2rem] rounded-tr-none shadow-2xl shadow-stone-200 text-sm leading-relaxed">
                   Thank you so much! I put many hours of work into the natural dyeing process. Let me check with my business co-pilot to see if we can accommodate that price for you.
                 </div>
               </div>
            </div>

            {/* Input Area */}
            <div className="p-10 border-t border-stone-100">
              <div className="flex items-center space-x-4">
                <div className="flex-grow relative">
                  <input 
                    placeholder="Type your message..."
                    className="w-full pl-8 pr-16 py-6 rounded-[2.5rem] bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium text-stone-700"
                  />
                  <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-stone-300 hover:text-emerald-600 transition-colors">
                    <Sparkles size={22} />
                  </button>
                </div>
                <button className="bg-stone-900 text-white p-6 rounded-[2.5rem] shadow-2xl hover:bg-stone-800 transition-all active:scale-95">
                  <Send size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-20">
             <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-8">
               <MessageSquare size={48} className="text-stone-200" />
             </div>
             <h4 className="text-3xl font-serif font-bold text-stone-900 mb-4">Unified Inbox</h4>
             <p className="max-w-xs mx-auto text-stone-400 text-sm italic">Select a conversation to manage your deals and volunteer projects in one place.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanChat;
