import React, { useState, useEffect } from 'react';
import { AccentTheme } from '../../types';
import { Terminal, Palette, Menu, X, ArrowUpRight, Sparkles, Keyboard, Check } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  // Scroll listener for sticky header styling & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'notes', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    soundFx.playClick();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#about', id: 'about', label: 'ABOUT' },
    { href: '#skills', id: 'skills', label: 'TOOLKIT' },
    { href: '#projects', id: 'projects', label: 'WORK' },
    { href: '#notes', id: 'notes', label: 'NOTES', extraClass: 'hidden lg:inline-flex' },
    { href: '#contact', id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08070d]/90 backdrop-blur-xl border-b border-zinc-800/90 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#08070d]/75 backdrop-blur-lg border-b border-zinc-800/50'
      }`}
    >
      {/* Subtle top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative w-9 h-9 rounded-xl border border-rose-500/40 bg-gradient-to-br from-rose-500/15 to-transparent flex items-center justify-center font-mono font-extrabold text-sm text-rose-400 shadow-md shadow-rose-950/40 group-hover:border-rose-500 group-hover:scale-105 group-hover:shadow-rose-500/20 group-hover:text-white group-hover:bg-rose-500 transition-all duration-300">
            T.
          </div>
          <div className="font-mono text-xs tracking-widest font-bold text-white flex items-center gap-1">
            <span className="group-hover:text-rose-400 transition-colors">TARE</span>
            <span className="text-rose-500">/</span>
            <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">DEV</span>
          </div>
        </a>

        {/* Live Addis Ababa Clock & Status (Desktop) */}
        <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 font-mono text-[11px] text-zinc-400 transition-all shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>ADDIS ABABA (UTC+3)</span>
          <span className="text-zinc-200 font-semibold">{ethiopiaTime || '14:45:00'}</span>
          <span className="text-zinc-700">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <Sparkles size={11} /> AVAILABLE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 flex items-center ${
                  link.extraClass || ''
                } ${
                  isActive
                    ? 'text-white bg-zinc-800/80 font-semibold border border-zinc-700/50 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: CV, CLI, Shortcuts, Theme, Contact */}
        <div className="flex items-center gap-2">
          {/* CV / Resume Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-mono shadow-sm active:scale-95"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-mono shadow-sm active:scale-95 group"
            title="Open Interactive Terminal (Ctrl + K)"
          >
            <Terminal size={14} className="text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">CLI</span>
            <span className="hidden lg:inline text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-700/60 px-1.5 py-0.2 rounded font-mono shadow-inner">
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
              className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all hidden sm:flex items-center justify-center active:scale-95 shadow-sm"
              title="Keyboard Shortcuts Cheatsheet (?)"
            >
              <Keyboard size={16} />
            </button>
          )}

          {/* Theme Accent Picker */}
          <div className="relative group">
            <button
              className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all active:scale-95 shadow-sm"
              title="Change Accent Theme"
            >
              <Palette size={16} />
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50 animate-fadeIn">
              <div className="p-2 bg-[#12111a]/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl flex flex-col gap-1.5 min-w-[155px]">
                <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 uppercase tracking-wider font-semibold">
                  ACCENT THEME
                </span>
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      soundFx.playClick();
                      onThemeChange(opt.id);
                    }}
                    className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                      currentTheme === opt.id
                        ? 'bg-zinc-800 text-white font-bold border border-zinc-700/60 shadow-sm'
                        : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${opt.bg} shadow-sm`} />
                      <span>{opt.label}</span>
                    </div>
                    {currentTheme === opt.id && <Check size={12} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-rose-950/40 hover:shadow-rose-600/20 hover:scale-105 active:scale-95 group"
          >
            <span>Let's talk</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 md:hidden rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0d0c13]/95 backdrop-blur-2xl px-5 py-5 font-mono text-sm space-y-3 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ADDIS ABABA (UTC+3)</span>
            </span>
            <span className="text-white font-bold">{ethiopiaTime}</span>
          </div>

          <div className="space-y-1 pt-1">
            <a
              href="#about"
              onClick={handleNavClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeSection === 'about'
                  ? 'bg-zinc-800/80 text-white font-semibold border border-zinc-700/60'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span>ABOUT</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
            <a
              href="#skills"
              onClick={handleNavClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeSection === 'skills'
                  ? 'bg-zinc-800/80 text-white font-semibold border border-zinc-700/60'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span>TOOLKIT</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
            <a
              href="#projects"
              onClick={handleNavClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeSection === 'projects'
                  ? 'bg-zinc-800/80 text-white font-semibold border border-zinc-700/60'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span>SELECTED WORK</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
            <a
              href="#notes"
              onClick={handleNavClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeSection === 'notes'
                  ? 'bg-zinc-800/80 text-white font-semibold border border-zinc-700/60'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span>NOTES</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeSection === 'contact'
                  ? 'bg-zinc-800/80 text-white font-semibold border border-zinc-700/60'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              <span>CONTACT</span>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-colors shadow-sm text-center"
              >
                View CV
              </button>
              <a
                href="#contact"
                onClick={handleNavClick}
                className="py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 text-center"
              >
                <span>Let's talk</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center gap-2 text-xs font-mono transition-colors shadow-sm"
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
