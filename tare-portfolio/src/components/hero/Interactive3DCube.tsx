import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';
import { Move, RotateCcw, Cpu, Globe, ShieldCheck, Activity, Briefcase, Sparkles } from 'lucide-react';

const CUBE_SIZE = 190; // 190px cube
const HALF_SIZE = CUBE_SIZE / 2; // 95px

const INITIAL_ROT_X = -16;
const INITIAL_ROT_Y = 30;

export const Interactive3DCube: React.FC = () => {
  const [rotX, setRotX] = useState<number>(INITIAL_ROT_X);
  const [rotY, setRotY] = useState<number>(INITIAL_ROT_Y);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle Dragging via pointer / mouse / touch
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const deltaX = clientX - lastPosRef.current.x;
      const deltaY = clientY - lastPosRef.current.y;

      // Smooth drag rotation
      setRotY((prev) => prev + deltaX * 0.65);
      setRotX((prev) => prev - deltaY * 0.65);

      lastPosRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        soundFx.playHover();
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerUp);
    };
  }, []);

  // Mouse Down Trigger
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  // Touch Start Trigger
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    soundFx.playClick();
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Reset to default angle
  const handleReset = () => {
    soundFx.playClick();
    setRotX(INITIAL_ROT_X);
    setRotY(INITIAL_ROT_Y);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-3 select-none">
      {/* Visual Ambient Backlight */}
      <div className="absolute inset-0 max-w-[280px] h-[260px] -top-8 mx-auto rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

      {/* 3D Scene Viewport - Only rotates when dragged */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="touch-none cursor-grab active:cursor-grabbing p-8 relative flex items-center justify-center"
        style={{ perspective: '1100px' }}
        title="Click and drag to rotate the 3D cube"
      >
        {/* The 3D Cube Container */}
        <div
          style={{
            width: `${CUBE_SIZE}px`,
            height: `${CUBE_SIZE}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative"
        >
          {/* ========================================================= */}
          {/* FACE 1: FRONT - TARIKU'S DEVELOPER PORTRAIT */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#121019]/95 border-2 border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.35)] flex flex-col justify-between p-2 backdrop-blur-md backface-visible"
          >
            {/* Tariku's Photo */}
            <div className="relative w-full h-[138px] rounded-xl overflow-hidden bg-[#181523] border border-white/10 group">
              <img
                src="/assets/tariku-bw-profile.jpg"
                alt="Tariku Meseret"
                className="w-full h-full object-cover object-top pointer-events-none select-none"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (!img.src.includes('tariku-bw-profile.jpg')) {
                    img.src = '/assets/tariku-bw-profile.jpg';
                  } else {
                    img.src = '/assets/profile-placeholder.svg';
                  }
                }}
              />

              {/* Holographic Scanline Sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 border border-emerald-500/50 backdrop-blur-sm shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span className="font-mono text-[8px] text-emerald-300 font-bold uppercase tracking-wider">
                  PRO
                </span>
              </div>

              {/* Viewfinder brackets */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-white/50 pointer-events-none" />
            </div>

            {/* Bottom Tag */}
            <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-rose-950/85 text-rose-300 border border-rose-500/40 backdrop-blur-sm shadow-sm">
              <span className="font-mono text-[10px] font-extrabold tracking-wider uppercase truncate">
                TARE / DEV
              </span>
              <span className="font-mono text-[7px] text-rose-200/80 uppercase tracking-widest hidden sm:inline">
                FULL-STACK
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FACE 2: BACK - CORE TECH STACK & ARCHITECTURE */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `rotateY(180deg) translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0d131f]/95 border-2 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.35)] flex flex-col justify-between p-2.5 backdrop-blur-md backface-visible"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Cpu size={14} className="text-cyan-400" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider">TECH STACK</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[7px] font-mono text-cyan-300 font-bold">
                CORE
              </span>
            </div>

            {/* Content List */}
            <div className="space-y-1.5 py-1 font-mono text-[9px] text-zinc-300">
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">Laravel 13 & PHP 8.3</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">Vue 3, React & TS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">MySQL & Redis 7 Cache</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">REST APIs & Queues</span>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="text-center font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 truncate">
              ENTERPRISE BACKEND & UI
            </div>
          </div>

          {/* ========================================================= */}
          {/* FACE 3: RIGHT - LOCATION, TIMEZONE & ROOTS */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `rotateY(90deg) translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0c1712]/95 border-2 border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex flex-col justify-between p-2.5 backdrop-blur-md backface-visible"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Globe size={14} className="text-emerald-400" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider">LOCATION</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[7px] font-mono text-emerald-300 font-bold">
                UTC+3
              </span>
            </div>

            {/* Content List */}
            <div className="space-y-1.5 py-1 font-mono text-[9px] text-zinc-300">
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate font-semibold text-white">Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">Global Remote Ready</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">English & Amharic</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">Real-time & Async Sync</span>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="text-center font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 truncate">
              WORLDWIDE COLLABORATION
            </div>
          </div>

          {/* ========================================================= */}
          {/* FACE 4: LEFT - ENGINEERING STANDARDS & PHILOSOPHY */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `rotateY(-90deg) translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#181308]/95 border-2 border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex flex-col justify-between p-2.5 backdrop-blur-md backface-visible"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-1.5 text-amber-400">
                <ShieldCheck size={14} className="text-amber-400" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider">STANDARDS</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-[7px] font-mono text-amber-300 font-bold">
                RIGOR
              </span>
            </div>

            {/* Content List */}
            <div className="space-y-1.5 py-1 font-mono text-[9px] text-zinc-300">
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate font-semibold text-white">&lt; 65ms API Response</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">Pessimistic DB Locks</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">WCAG Accessibility (a11y)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">Defensive Sanitization</span>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="text-center font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 truncate">
              HIGH-IMPACT ARCHITECTURE
            </div>
          </div>

          {/* ========================================================= */}
          {/* FACE 5: TOP - PRODUCTION IMPACT & KEY METRICS */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `rotateX(90deg) translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#180a0c]/95 border-2 border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.35)] flex flex-col justify-between p-2.5 backdrop-blur-md backface-visible"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-500/30 pb-1.5">
              <div className="flex items-center gap-1.5 text-red-400">
                <Activity size={14} className="text-red-400" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider">METRICS</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-red-950 border border-red-500/40 text-[7px] font-mono text-red-300 font-bold">
                PROVEN
              </span>
            </div>

            {/* Content List */}
            <div className="space-y-1.5 py-1 font-mono text-[9px] text-zinc-300">
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="truncate font-semibold text-white">4+ Enterprise Platforms</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="truncate">99.9% Uptime Target</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="truncate">1,500+ Req/s Throughput</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="truncate">Zero-Downtime Releases</span>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="text-center font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/40 truncate">
              PRODUCTION TRACK RECORD
            </div>
          </div>

          {/* ========================================================= */}
          {/* FACE 6: BOTTOM - STATUS & DIRECT COLLABORATION */}
          {/* ========================================================= */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              transform: `rotateX(-90deg) translateZ(${HALF_SIZE}px)`,
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#140b1e]/95 border-2 border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.35)] flex flex-col justify-between p-2.5 backdrop-blur-md backface-visible"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-1.5">
              <div className="flex items-center gap-1.5 text-purple-400">
                <Briefcase size={14} className="text-purple-400" />
                <span className="font-mono text-[10px] font-extrabold tracking-wider">STATUS</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-[7px] font-mono text-purple-300 font-bold">
                OPEN
              </span>
            </div>

            {/* Content List */}
            <div className="space-y-1.5 py-1 font-mono text-[9px] text-zinc-300">
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate font-semibold text-emerald-400">Available For Hire</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate">Full-Time / Contract</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate text-purple-300">meserettariku921@...</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-1 rounded border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate">GitHub: @tare-hub</span>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="text-center font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 truncate">
              LET&apos;S BUILD SOMETHING GREAT
            </div>
          </div>
        </div>
      </div>

      {/* Helper Pill & Reset Control */}
      <div className="flex flex-col items-center gap-2 -mt-3">
        <div className="flex items-center gap-2.5">
          {/* Drag Hint Pill */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono transition-all ${
              isDragging
                ? 'bg-rose-950/80 border-rose-500/80 text-rose-300 scale-105 shadow-md shadow-rose-950/60'
                : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <Move size={12} className={`${isDragging ? 'text-rose-400' : 'text-rose-500'}`} />
            <span>{isDragging ? 'ROTATING 3D CUBE...' : 'DRAG TO ROTATE SIDES'}</span>
          </div>

          {/* Reset Orientation Button */}
          <button
            onClick={handleReset}
            title="Reset cube view to front photo"
            aria-label="Reset cube view to front photo"
            className="p-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/50 hover:scale-110 active:scale-95 transition-all"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        {/* Quick Face Presets */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {[
            { label: 'Photo', x: INITIAL_ROT_X, y: INITIAL_ROT_Y, color: 'hover:text-rose-400 hover:border-rose-500/50' },
            { label: 'Stack', x: 0, y: 180, color: 'hover:text-cyan-400 hover:border-cyan-500/50' },
            { label: 'Roots', x: 0, y: -90, color: 'hover:text-emerald-400 hover:border-emerald-500/50' },
            { label: 'Standards', x: 0, y: 90, color: 'hover:text-amber-400 hover:border-amber-500/50' },
            { label: 'Metrics', x: -90, y: 0, color: 'hover:text-red-400 hover:border-red-500/50' },
            { label: 'Contact', x: 90, y: 0, color: 'hover:text-purple-400 hover:border-purple-500/50' },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                soundFx.playClick();
                setRotX(preset.x);
                setRotY(preset.y);
              }}
              className={`px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800/80 text-[9px] font-mono text-zinc-400 ${preset.color} hover:bg-zinc-800 transition-all`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
