import React from 'react';
import { Terminal, FileText, Compass, Sparkles, Binary, Volume2, VolumeX, Mail } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface HeroQuickDockProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onToggleMatrix: () => void;
  isMatrixActive: boolean;
}

export const HeroQuickDock: React.FC<HeroQuickDockProps> = ({
  onOpenTerminal,
  onOpenResume,
  onToggleMatrix,
  isMatrixActive,
}) => {
  const triggerRecruiterCheer = () => {
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.3 },
    });
    // Smooth scroll to contact or open mailto
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCosmos = () => {
    soundFx.playClick();
    const cosmosEl = document.querySelector('section.bg-\\[\\#07060b\\]');
    if (cosmosEl) {
      cosmosEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2">
      {/* Recruiter Priority Action */}
      <button
        onClick={triggerRecruiterCheer}
        className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-950 to-zinc-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono text-[11px] sm:text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all"
        title="Immediate Recruiter Contact & Priority Dispatch"
      >
        <Sparkles size={13} className="text-emerald-400" />
        <span>Recruiter Priority</span>
      </button>

      {/* Zero-G Cosmos Jump */}
      <button
        onClick={scrollToCosmos}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors"
        title="Jump to Interactive Floating Language Cosmos"
      >
        <Compass size={13} className="text-rose-400" />
        <span>Zero-G Cosmos</span>
      </button>

      {/* Terminal CLI */}
      <button
        onClick={() => {
          soundFx.playClick();
          onOpenTerminal();
        }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors"
        title="Launch Interactive Terminal (Ctrl + K)"
      >
        <Terminal size={13} className="text-amber-400" />
        <span>CLI ^K</span>
      </button>

      {/* Curriculum Vitae */}
      <button
        onClick={() => {
          soundFx.playClick();
          onOpenResume();
        }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors"
        title="View Formatted Curriculum Vitae"
      >
        <FileText size={13} className="text-blue-400" />
        <span>Resume CV</span>
      </button>

      {/* Matrix Mode Toggle */}
      <button
        onClick={() => {
          soundFx.playClick();
          onToggleMatrix();
        }}
        className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border font-mono text-[11px] sm:text-xs flex items-center gap-1.5 transition-all ${
          isMatrixActive
            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300 font-bold'
            : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-emerald-400'
        }`}
        title="Toggle Matrix Digital Rain"
      >
        <Binary size={13} />
        <span>Matrix Mode</span>
      </button>
    </div>
  );
};

