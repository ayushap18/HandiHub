
import React, { useState } from 'react';
import { geminiService } from '../../../services/gemini';
import { Film, Play, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const VideoCreator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setVideoUrl(null);
    setProgress('Setting up scene...');
    
    // Simulate progress updates since video gen is slow
    const intervals = [
      { t: 2000, m: 'Connecting to Veo AI...' },
      { t: 15000, m: 'Dreaming up cinematic frames...' },
      { t: 30000, m: 'Polishing motion and light...' },
      { t: 45000, m: 'Finalizing your masterpiece...' }
    ];

    intervals.forEach(int => {
      setTimeout(() => { if (loading) setProgress(int.m); }, int.t);
    });

    try {
      const res = await geminiService.createVideoAd(prompt);
      if (res) setVideoUrl(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Film className="text-emerald-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-900">AI Video Ad Creator</h2>
          <p className="text-stone-500 text-sm">Generate cinematic social media ads from a story</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start space-x-3 mb-6">
        <AlertCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-800 leading-relaxed">
          <strong>Note:</strong> Video generation takes 1-2 minutes. You'll need to select a paid API key for Veo 3.1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell the story of your craft... e.g., 'A slow tracking shot of a ceramic bowl being glazed by hand, golden hour light, cinematic 4k.'"
            className="w-full h-40 p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-stone-700 resize-none"
          />
          
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-stone-800 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-amber-400" />}
            <span>{loading ? 'Generating Cinematic Video...' : 'Create Video Ad'}</span>
          </button>
          
          {loading && (
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-700 animate-pulse">{progress}</p>
              <div className="w-full bg-stone-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full animate-progress-indefinite"></div>
              </div>
            </div>
          )}
        </div>

        <div className="aspect-video bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 flex items-center justify-center">
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
          ) : (
            <div className="text-center opacity-40">
              <Play size={48} className="mx-auto mb-2 text-stone-400" />
              <p className="text-stone-500 text-sm">Your cinematic ad will appear here</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes progress-indefinite {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-indefinite {
          animation: progress-indefinite 2s infinite ease-in-out;
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default VideoCreator;
