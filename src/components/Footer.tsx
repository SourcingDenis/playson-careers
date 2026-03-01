import { motion } from 'motion/react';
import { Gamepad2, Mail, Globe, Linkedin, Facebook, Instagram, Youtube, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 pt-24 pb-12 overflow-hidden border-t border-zinc-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-playson-red/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* CTA Section */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Ready to shape the future?
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Join our team of creators, engineers, and innovators building the next generation of iGaming entertainment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/#openings"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95"
              >
                View Open Roles
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="mailto:recruiting@playson.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-medium transition-colors hover:bg-zinc-800"
              >
                Contact Recruiting
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-16" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-playson-red hover:text-red-500 transition-colors">
              <Gamepad2 className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-tight text-white">Playson</span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              A leading game developer supplying cutting-edge innovative content to over 17 regulated jurisdictions and beyond.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/playson" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-playson-red hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/playson.official" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/playson_official" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCp1qRk-xU_Y-8q_Z-Z_Z_Z" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://playson.com/about" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2 group">
                  About Us <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://playson.com/games" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2 group">
                  Our Games <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://playson.com/news" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2 group">
                  News & Events <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://playson.com/partners" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2 group">
                  Partners <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:recruiting@playson.com" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  recruiting@playson.com
                </a>
              </li>
              <li>
                <a href="https://playson.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  playson.com
                </a>
              </li>
              <li className="text-zinc-500 text-sm pt-2">
                Sliema, Malta • Kyiv, Ukraine • Bratislava, Slovakia
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://playson.com/privacy" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-playson-red transition-colors">
                  Privacy & Cookie Policy
                </a>
              </li>
              <li>
                <span className="text-zinc-500 text-sm">
                  Licensed and regulated by the UK Gambling Commission, ONJN, HGC, and other major authorities.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} Playson Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-zinc-400 text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
