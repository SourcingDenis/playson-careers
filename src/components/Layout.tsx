import { Link, useLocation, useNavigate } from 'react-router-dom';
// Trigger rebuild
import { Gamepad2, ArrowUp, Briefcase } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showEngineeringLink, setShowEngineeringLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      // Show floating button if scrolled more than 40%
      if (scrollY > (docHeight - winHeight) * 0.4) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }

      // Show Engineering Link if scrolled past Hero (approx 80vh)
      if (scrollY > winHeight * 0.8) {
        setShowEngineeringLink(true);
      } else {
        setShowEngineeringLink(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOpportunities = () => {
    if (pathname !== '/') {
      navigate('/#openings');
      return;
    }
    
    const element = document.getElementById('openings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-playson-red/30">
      <header className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl transition-all duration-300">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 group-hover:border-playson-red/50 transition-colors shadow-lg shadow-black/20">
                <Gamepad2 className="w-6 h-6 text-playson-red group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-zinc-200 transition-colors">Playson <span className="text-zinc-500 font-medium">Careers</span></span>
          </Link>

          {/* Engineering Hub Link - Visible after scroll */}
          <AnimatePresence>
            {showEngineeringLink && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="hidden md:block"
              >
                <Link to="/engineering" className="group relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95">
                  {/* Lightning Border Animation */}
                  <span className="absolute inset-0 h-full w-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09090b_0%,#ef4444_50%,#09090b_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content Container */}
                  <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-zinc-900 group-hover:px-6 border border-zinc-800/50">
                    <Briefcase className="w-4 h-4 mr-2 text-playson-red group-hover:animate-pulse" />
                    <span className="whitespace-nowrap">
                      Engineering Hub
                    </span>
                    <span className="ml-2 opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300 ease-in-out">
                      <ArrowUp className="w-3 h-3 rotate-45" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* "Less even" border - Gradient fade out at edges */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent opacity-50" />
      </header>

      <main>
        {children}
      </main>
      
      <Footer />

      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToOpportunities}
            className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-playson-red text-white rounded-full shadow-[0_10px_40px_-10px_rgba(255,0,42,0.5)] border border-white/10 backdrop-blur-md group"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <ArrowUp className="w-6 h-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
