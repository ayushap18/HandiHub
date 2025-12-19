
import React, { useState } from 'react';
import { MessageSquare, Send, User, Bot, Sparkles, Phone, Video, Search, Filter } from 'lucide-react';

const VolunteerChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const conversations = [
    { id: '1', name: 'Mali Thong', role: 'Artisan', lastMsg: "The indigo dye looks better now.", status: 'online', avatar: 'https://i.pravatar.cc/150?u=mali' },
    { id: '2', name: 'Somsak Woodworks', role: 'Artisan', lastMsg: "Could you review the logo draft?", status: 'offline', avatar: 'https://i.pravatar.cc/150?u=somsak' },
    { id: '3', name: 'Lina Ceramics', role: 'Artisan', lastMsg: "Thanks for the packaging tips!", status: 'online', avatar: 'https://i.pravatar.cc/150?u=lina' },
  ];

  return (
    <div className="bg-white rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden h-[700px] flex">
      {/* Sidebar */}
      <div className="w-96 border-r border-stone-100 flex flex-col bg-stone-50/30">
        <div className="p-8 border-b border-stone-100 bg-white">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border-stone-100 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">All</button>
            <button className="px-4 py-2 bg-white text-stone-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-stone-100 hover:text-stone-900 transition-colors">Pending</button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2 no-scrollbar">
          {conversations.map(c => (
            <button 
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                activeChat === c.id ? 'bg-white shadow-xl shadow-stone-200/50' : 'hover:bg-white/50'
              }`}
            >
              <div className="relative">
                <img src={c.avatar} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                {c.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="text-left flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-stone-900 text-sm truncate">{c.name}</p>
                  <span className="text-[9px] font-black text-stone-300 uppercase">2m</span>
                </div>
                <p className="text-xs text-stone-400 truncate">{c.lastMsg}</p>
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
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center overflow-hidden">
                  <img src={conversations.find(c => c.id === activeChat)?.avatar} alt="" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 leading-none">
                    {conversations.find(c => c.id === activeChat)?.name}
                  </h4>
                  <p className="text-xs text-emerald-500 font-bold mt-1">Actively working on Branding Project</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-3 bg-stone-50 text-stone-400 hover:text-indigo-600 rounded-xl transition-all"><Phone size={18} /></button>
                <button className="p-3 bg-stone-50 text-stone-400 hover:text-indigo-600 rounded-xl transition-all"><Video size={18} /></button>
              </div>
            </div>

            {/* AI Brief Bar */}
            <div className="bg-indigo-900/5 px-8 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="text-indigo-600" size={14} />
                <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">AI Context Co-Pilot</p>
              </div>
              <button className="text-[10px] font-bold text-indigo-600 hover:underline">View Project Summary</button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-stone-50/30">
               <div className="flex justify-start">
                 <div className="max-w-[70%] bg-white border border-stone-100 p-5 rounded-[1.5rem] rounded-tl-none shadow-sm text-sm text-stone-600 leading-relaxed">
                   Hello! I've been reviewing the logo drafts we discussed. The one with the simplified leaf pattern is my favorite. What do you think?
                 </div>
               </div>
               <div className="flex justify-end">
                 <div className="max-w-[70%] bg-indigo-900 text-white p-5 rounded-[1.5rem] rounded-tr-none shadow-xl text-sm leading-relaxed">
                   I agree! It captures the heritage perfectly. I'll finalize the color palette and send it over by tomorrow morning.
                 </div>
               </div>
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-stone-100">
              <div className="flex items-center space-x-4">
                <div className="flex-grow relative">
                  <input 
                    placeholder="Type your message..."
                    className="w-full pl-6 pr-12 py-5 rounded-[1.5rem] bg-stone-50 border-stone-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-medium"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-stone-300 hover:text-indigo-600">
                    <Sparkles size={18} />
                  </button>
                </div>
                <button className="bg-stone-900 text-white p-5 rounded-[1.5rem] shadow-xl hover:bg-stone-800 transition-all active:scale-95">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-20 opacity-30">
             <MessageSquare size={80} className="mb-6" />
             <h4 className="text-2xl font-serif font-bold">Your Conversations</h4>
             <p className="max-w-xs mx-auto text-sm italic">Select an artisan from the sidebar to begin collaborating on your social impact projects.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerChat;
