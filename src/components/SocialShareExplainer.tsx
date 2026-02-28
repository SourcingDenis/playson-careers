import { Download, Share2, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

interface SocialShareExplainerProps {
  onDownload: () => void;
  isGenerating: boolean;
}

export default function SocialShareExplainer({ onDownload, isGenerating }: SocialShareExplainerProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-playson-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-playson-red/10 rounded-lg">
                <Share2 className="w-4 h-4 text-playson-red" />
            </div>
            <h3 className="text-lg font-bold text-white">Share with your network</h3>
        </div>
        
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          Create a professional, branded image for this role to stand out on your social feed.
        </p>

        {/* Mini Preview Card Visual */}
        <div 
            onClick={onDownload}
            className="cursor-pointer relative aspect-[1.91/1] bg-zinc-950 rounded-xl border border-zinc-800 mb-6 overflow-hidden shadow-2xl transform group-hover:scale-[1.02] group-hover:border-zinc-700 transition-all duration-500"
        >
            {/* Mock Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-80">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-playson-red" />
                    <div className="h-1.5 w-16 bg-zinc-800 rounded-full" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded" />
                    <div className="h-2 w-1/2 bg-zinc-800/50 rounded" />
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-zinc-800 border border-zinc-700/50" />
                        <div className="h-6 w-6 rounded-md bg-zinc-800 border border-zinc-700/50" />
                    </div>
                    <div className="h-3 w-20 bg-playson-red/20 rounded-full" />
                </div>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Download className="w-3 h-3" /> Preview
                </div>
            </div>
        </div>

        <button 
            onClick={onDownload}
            disabled={isGenerating}
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-white/5"
        >
            {isGenerating ? (
                <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Download className="w-4 h-4" />
                    Download Social Card
                </>
            )}
        </button>
        
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> Best for LinkedIn</span>
            <span className="flex items-center gap-1"><Twitter className="w-3 h-3" /> & Twitter</span>
        </div>
      </div>
    </div>
  );
}
