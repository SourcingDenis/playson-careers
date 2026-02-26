import { Link, useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
            <img 
              src="https://playson.com/frontend/img/logo-white.svg" 
              alt="Playson Logo" 
              className="h-8 w-auto" 
            />
            <span className="font-bold text-xl tracking-tight text-white">Careers</span>
          </Link>
          <nav>
            <a href="https://playson.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Main Website
            </a>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="border-t border-zinc-900 py-12 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Playson. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
