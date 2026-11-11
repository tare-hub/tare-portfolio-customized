import React, { useState, useEffect } from 'react';
import { AccentTheme } from '../../types';
import { Terminal, Palette, Menu, X, ArrowUpRight, Sparkles, Keyboard } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface HeaderProps {
  currentTheme: AccentTheme;
  onThemeChange: (theme: AccentTheme) => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenShortcuts?: () => void;
}

const THEME_OPTIONS: { id: AccentTheme; label: string; bg: string }[] = [
  { id: 'crimson', label: 'Crimson', bg: 'bg-[#e84a4a]' },
  { id: 'cyan', label: 'Cyber Cyan', bg: 'bg-[#06b6d4]' },
  { id: 'emerald', label: 'Matrix Green', bg: 'bg-[#10b981]' },
  { id: 'purple', label: 'Electric Violet', bg: 'bg-[#a855f7]' },
  { id: 'amber', label: 'Solar Amber', bg: 'bg-[#f59e0b]' },
];

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChange,
  onOpenTerminal,
  onOpenResume,
  onOpenShortcuts,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ethiopiaTime, setEthiopiaTime] = useState('');

  // Real-time clock for Addis Ababa, Ethiopia (UTC+3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setEthiopiaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = () => {
    soundFx.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08070d]/85 backdrop-blur-xl border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg border border-rose-500/80 bg-rose-500/10 flex items-center justify-center font-mono font-bold text-base text-rose-500 shadow-lg shadow-rose-950/30 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all">
            T.
          </div>
          <div className="font-mono text-xs tracking-widest font-bold text-white flex items-center gap-1">
            <span>TARE</span>
            <span className="text-rose-500">/</span>
            <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">DEV</span>
          </div>
        </a>

        {/* Live Addis Ababa Clock & Status (Desktop) */}
        <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 font-mono text-[11px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ADDIS ABABA (UTC+3)</span>
          <span className="text-zinc-200 font-semibold">{ethiopiaTime || '14:45:00'}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Sparkles size={11} /> AVAILABLE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-zinc-400">
          <a
            href="#about"
            onClick={handleNavClick}
            className="hover:text-white transition-colors"
          >
            01/ABOUT
          </a>
          <a
            href="#skills"
            onClick={handleNavClick}
            className="hover:text-white transition-colors"
          >
            02/TOOLKIT
          </a>
          <a
            href="#projects"
            onClick={handleNavClick}
            className="hover:text-white transition-colors"
          >
            03/WORK
          </a>
          <a
            href="#notes"
            onClick={handleNavClick}
            className="hover:text-white transition-colors hidden lg:inline"
          >
            04/NOTES
          </a>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="hover:text-white transition-colors"
          >
            05/CONTACT
          </a>
        </nav>

        {/* Action Controls: Sound, Theme, Terminal CLI */}
        <div className="flex items-center gap-2">
          {/* CV / Resume Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors text-xs font-mono"
            title="View Curriculum Vitae"
          >
            <span>CV</span>
          </button>

          {/* CLI Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors text-xs font-mono"
            title="Open Interactive Terminal (Ctrl + K)"
          >
            <Terminal size={14} className="text-rose-400" />
            <span className="hidden sm:inline">CLI</span>
            <span className="hidden lg:inline text-[10px] text-zinc-500 bg-zinc-800 px-1 rounded">
              ^K
            </span>
          </button>

          {/* Keyboard Shortcuts Cheatsheet Trigger */}
          {onOpenShortcuts && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenShortcuts();
              }}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors hidden sm:flex items-center justify-center"
              title="Keyboard Shortcuts Cheatsheet (?)"
            >
              <Keyboard size={16} />
            </button>
          )}

          {/* Theme Accent Picker */}
          <div className="relative group">
            <button
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Change Accent Theme"
            >
              <Palette size={16} />
            </button>
            <div className="absolute right-0 mt-2 p-2 bg-[#12111a] border border-zinc-800 rounded-xl shadow-2xl hidden group-hover:flex flex-col gap-1.5 min-w-[140px] z-50 animate-fadeIn">
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5">ACCENT THEME</span>
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundFx.playClick();
                    onThemeChange(opt.id);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors text-left ${
                    currentTheme === opt.id
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${opt.bg}`} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95"
          >
            <span>Let's talk</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 md:hidden rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0d0c13] px-6 py-6 font-mono text-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs text-zinc-400">
            <span>ADDIS ABABA (UTC+3)</span>
            <span className="text-white font-bold">{ethiopiaTime}</span>
          </div>

          <a
            href="#about"
            onClick={handleNavClick}
            className="block text-zinc-300 hover:text-white"
          >
            01 / ABOUT
          </a>
          <a
            href="#skills"
            onClick={handleNavClick}
            className="block text-zinc-300 hover:text-white"
          >
            02 / TOOLKIT
          </a>
          <a
            href="#projects"
            onClick={handleNavClick}
            className="block text-zinc-300 hover:text-white"
          >
            03 / SELECTED WORK
          </a>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="block text-zinc-300 hover:text-white"
          >
            04 / CONTACT
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-zinc-800 text-white flex items-center justify-center gap-2 text-xs"
            >
              <Terminal size={14} className="text-rose-400" />
              <span>Launch Terminal CLI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

