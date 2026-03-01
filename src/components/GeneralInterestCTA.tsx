import { motion } from 'motion/react';
import { Sparkles, Send } from 'lucide-react';

export default function GeneralInterestCTA() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 md:p-12 text-center md:text-left group"
    >
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 transition-colors duration-500 group-hover:from-zinc-900 group-hover:via-zinc-800/50 group-hover:to-zinc-900" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-playson-red/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 group-hover:opacity-70" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 transition-opacity duration-700 group-hover:opacity-70" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-playson-red" />
            <span>Future Opportunities</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Don’t see your role listed?
          </h3>
          <p className="text-lg text-zinc-400 leading-relaxed">
            We’re always looking for exceptional talent to join our team. Submit your information and we’ll reach out when a matching position opens up.
          </p>
        </div>

        <a 
          href="https://jobs.ashbyhq.com/playson/form/general-interest" 
          target="_blank" 
          rel="noreferrer" 
          className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] whitespace-nowrap overflow-hidden"
        >
          <span className="relative z-10">Submit Application</span>
          <Send className="relative z-10 w-5 h-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </a>
      </div>
    </motion.div>
  );
}
