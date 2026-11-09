import React from 'react';
import { ArrowUp, Terminal, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#07060a] border-t border-zinc-900 py-12 text-zinc-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-rose-500/80 bg-rose-500/10 flex items-center justify-center font-mono font-bold text-sm text-rose-500">
              T.
            </div>
            <div className="text-xs font-bold text-white tracking-widest">
              TARE<span className="text-rose-500">/</span>DEV
            </div>
          </div>

          {/* Center philosophy */}
          <div className="text-center text-zinc-400 text-[11px] tracking-wider">
            DESIGNED & ENGINEERED WITH MODERN TYPESCRIPT & REACT.
          </div>

          {/* Back to top */}
          <a
            href="#home"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </a>
        </div>

        {/* Bottom row: Shortcuts & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <div>
            © {new Date().getFullYear()} Tariku Meseret (Tare). Built for the future.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
            >
              <Terminal size={12} className="text-rose-400" />
              <span>Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300">Ctrl+K</kbd> for CLI</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

