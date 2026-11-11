import React, { useState, useEffect } from 'react';
import { AccentTheme, Project, SkillItem } from './types';
import { ParticleCanvas } from './components/background/ParticleCanvas';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { InteractiveTechSpace } from './components/space/InteractiveTechSpace';
import { AboutSection } from './components/about/AboutSection';
import { InteractiveSystemDiagram } from './components/architecture/InteractiveSystemDiagram';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { TechNotesSection } from './components/blog/TechNotesSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { TerminalModal } from './components/terminal/TerminalModal';
import { ProjectDetailsModal } from './components/projects/ProjectDetailsModal';
import { SkillCodeModal } from './components/skills/SkillCodeModal';
import { TechNoteModal } from './components/blog/TechNoteModal';
import { ResumeModal } from './components/resume/ResumeModal';
import { MatrixRain } from './components/background/MatrixRain';
import { ShortcutsModal } from './components/layout/ShortcutsModal';
import { Toast } from './components/contact/Toast';
import { projectsData } from './data/projectsData';
import { TechNote } from './data/techNotesData';
import { soundFx } from './utils/audio';

const THEME_ACCENT_MAP: Record<AccentTheme, { primary: string; glow: string }> = {
  crimson: { primary: '#e84a4a', glow: 'rgba(232, 74, 74, 0.15)' },
  cyan: { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.15)' },
  emerald: { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.15)' },
  purple: { primary: '#a855f7', glow: 'rgba(168, 85, 247, 0.15)' },
  amber: { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.15)' },
};

export const App: React.FC = () => {
  const [theme, setTheme] = useState<AccentTheme>('crimson');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [selectedNote, setSelectedNote] = useState<TechNote | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      // Toggle CLI: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playClick();
        setIsTerminalOpen((prev) => !prev);
      }

      // Quick Theme Cycle: 'T'
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundFx.playClick();
        const themes: AccentTheme[] = ['crimson', 'cyan', 'emerald', 'purple', 'amber'];
        setTheme((curr) => {
          const nextIndex = (themes.indexOf(curr) + 1) % themes.length;
          const nextTheme = themes[nextIndex];
          setToastMessage(`Theme: ${nextTheme.toUpperCase()}`);
          return nextTheme;
        });
      }

      // Resume CV: 'R'
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundFx.playClick();
        setIsResumeOpen((prev) => !prev);
      }

      // Matrix Mode: 'X'
      if (e.key.toLowerCase() === 'x' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundFx.playClick();
        setIsMatrixMode((prev) => {
          setToastMessage(!prev ? 'Matrix Mode Activated' : 'Matrix Mode Disabled');
          return !prev;
        });
      }

      // Jump to 3D Cube: 'C'
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundFx.playClick();
        const el = document.getElementById('home');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setToastMessage('Navigated to 3D Developer Cube');
        }
      }

      // Zero-Gravity Space: 'Z'
      if (e.key.toLowerCase() === 'z' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        soundFx.playClick();
        const el = document.getElementById('space');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setToastMessage('Navigated to Zero-Gravity Tech Space');
        }
      }

      // Escape closes modals
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsResumeOpen(false);
        setIsMatrixMode(false);
        setIsShortcutsOpen(false);
        setSelectedProject(null);
        setSelectedSkill(null);
        setSelectedNote(null);
      }

      // '?' opens shortcuts cheatsheet
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        soundFx.playClick();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProjectById = (projectId: string) => {
    const found = projectsData.find(
      (p) => p.id.toLowerCase() === projectId.toLowerCase() || p.title.toLowerCase() === projectId.toLowerCase()
    );
    if (found) {
      setSelectedProject(found);
    } else {
      setToastMessage(`Project '${projectId}' not found.`);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#07070a] text-zinc-100 selection:bg-rose-650 selection:text-white relative overflow-x-hidden font-sans"
      style={
        {
          '--accent-color': THEME_ACCENT_MAP[theme].primary,
          '--accent-glow': THEME_ACCENT_MAP[theme].glow,
        } as React.CSSProperties
      }
    >
      {/* 60FPS Interactive WebGL/Canvas Particle Mesh */}
      <ParticleCanvas theme={theme} />

      {/* Cybernetic Radial Ambient Lights */}
      <div
        className="fixed top-0 right-0 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 z-0 opacity-25"
        style={{ background: THEME_ACCENT_MAP[theme].primary }}
      />
      <div
        className="fixed top-[45%] -left-32 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 z-0 opacity-15"
        style={{ background: THEME_ACCENT_MAP[theme].primary }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 z-0 opacity-15"
        style={{ background: THEME_ACCENT_MAP[theme].primary }}
      />

      {/* Navigation Header */}
      <Header
        currentTheme={theme}
        onThemeChange={(newTheme) => {
          setTheme(newTheme);
          setToastMessage(`Switched accent color to ${newTheme}`);
        }}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleMatrix={() => {
            setIsMatrixMode((prev) => !prev);
            setToastMessage(!isMatrixMode ? 'Matrix Mode Activated' : 'Matrix Mode Disabled');
          }}
          isMatrixActive={isMatrixMode}
        />

        {/* The Interactive Tech Space with Floating Language Icons (Right below the ticker!) */}
        <InteractiveTechSpace />

        <AboutSection />

        {/* Enterprise Architecture Topology Pipeline */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <InteractiveSystemDiagram />
        </div>

        <SkillsSection onSelectSkill={(skill) => setSelectedSkill(skill)} />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Engineering Case Studies / Architecture Notes */}
        <TechNotesSection onSelectNote={(note) => setSelectedNote(note)} />

        <ContactSection onShowToast={(msg) => setToastMessage(msg)} />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Matrix Mode Rain Canvas Overlay */}
      <MatrixRain
        isActive={isMatrixMode}
        onClose={() => setIsMatrixMode(false)}
      />

      {/* Interactive Modals */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
        onSelectProject={handleSelectProjectById}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <SkillCodeModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />

      <TechNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};
