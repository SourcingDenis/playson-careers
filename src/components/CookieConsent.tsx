import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('playson-cookie-consent');
    if (!consent) {
      // Small delay to not overwhelm user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('playson-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('playson-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-playson-red/10 rounded-lg">
                  <Cookie className="w-5 h-5 text-playson-red" />
                </div>
                <h3 className="font-bold text-white">Cookie Settings</h3>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-playson-red hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
              >
                Decline
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-center">
              <a href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors">
                <ShieldCheck className="w-3 h-3" /> Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
