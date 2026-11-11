import React, { useState, useEffect, useRef } from 'react';
import {
  LaravelIcon,
  PhpIcon,
  VueIcon,
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  MySqlIcon,
  RedisIcon,
  DockerIcon,
  TailwindIcon,
  GitIcon,
  RestApiIcon,
} from '../icons/TechBrandIcons';
import {
  Sun,
  Orbit,
  Zap,
  RotateCcw,
  Compass,
  Play,
  Pause,
  X,
  Radio,
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export interface PlanetaryNode {
  id: string;
  name: string;
  shortName: string;
  category: string;
  role: string;
  description: string;
  color: string;
  glow: string;
  orbitIndex: number; // 0 (inner) to 3 (outer)
  orbitTier: string;
  angleOffset: number; // Initial radian position
  speed: number;       // Base angular velocity in rad/frame
  iconRenderer: (size: number) => React.ReactNode;
}

export const PLANETARY_NODES: PlanetaryNode[] = [
  // Orbit 0: Core Backend & Data Persistence (Innermost)
  {
    id: 'laravel',
    name: 'Laravel 13',
    shortName: 'Laravel',
    category: 'Backend Architecture',
    role: 'Primary Enterprise Architecture',
    description: 'Tariku\'s core backend framework for enterprise-grade applications. Powers clean MVC architectures, queued background workers, Eloquent database models, and resilient RESTful APIs.',
    color: '#FF2D20',
    glow: 'rgba(255, 45, 32, 0.45)',
    orbitIndex: 0,
    orbitTier: 'Orbit I • Core Backend',
    angleOffset: 0,
    speed: 0.0075,
    iconRenderer: (s) => <LaravelIcon size={s} />,
  },
  {
    id: 'php',
    name: 'PHP 8.3+',
    shortName: 'PHP',
    category: 'Server Language',
    role: 'High-Performance Server Logic',
    description: 'Modern, strictly-typed server-side language leveraging JIT compilation, enums, fibers, and strict type safety to execute performant backend services and business logic.',
    color: '#777BB4',
    glow: 'rgba(119, 123, 180, 0.45)',
    orbitIndex: 0,
    orbitTier: 'Orbit I • Core Backend',
    angleOffset: (2 * Math.PI) / 3, // 120 deg
    speed: 0.0075,
    iconRenderer: (s) => <PhpIcon size={s} />,
  },
  {
    id: 'mysql',
    name: 'MySQL / MariaDB',
    shortName: 'MySQL',
    category: 'Database Tier',
    role: 'ACID Relational Persistence',
    description: 'Normalized relational schema architecture, composite indexing strategies, transaction isolation, and query optimization for high-scale structured data integrity.',
    color: '#00758F',
    glow: 'rgba(0, 117, 143, 0.45)',
    orbitIndex: 0,
    orbitTier: 'Orbit I • Core Backend',
    angleOffset: (4 * Math.PI) / 3, // 240 deg
    speed: 0.0075,
    iconRenderer: (s) => <MySqlIcon size={s} />,
  },

  // Orbit 1: Modern Frontend & Reactive UIs
  {
    id: 'react',
    name: 'React 18',
    shortName: 'React',
    category: 'Frontend Library',
    role: 'Component Architecture & State',
    description: 'Declarative user interfaces with concurrent rendering, custom hooks, atomic state management, and reusable enterprise design systems.',
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.45)',
    orbitIndex: 1,
    orbitTier: 'Orbit II • Modern Frontend',
    angleOffset: Math.PI / 6, // 30 deg offset
    speed: 0.0052,
    iconRenderer: (s) => <ReactIcon size={s} />,
  },
  {
    id: 'vue',
    name: 'Vue 3',
    shortName: 'Vue',
    category: 'Frontend Framework',
    role: 'Composition API & Pinia Store',
    description: 'Reactive single-page application framework utilizing the Composition API, script setup syntax, Pinia store state management, and fluid transitions.',
    color: '#42B883',
    glow: 'rgba(66, 184, 131, 0.45)',
    orbitIndex: 1,
    orbitTier: 'Orbit II • Modern Frontend',
    angleOffset: Math.PI / 6 + (2 * Math.PI) / 3, // 150 deg
    speed: 0.0052,
    iconRenderer: (s) => <VueIcon size={s} />,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    shortName: 'Tailwind',
    category: 'UI Engineering',
    role: 'Atomic Responsive Styling',
    description: 'Utility-first CSS framework enabling bespoke dark-mode design systems, fluid typography, mobile-first layouts, and zero runtime CSS overhead.',
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.45)',
    orbitIndex: 1,
    orbitTier: 'Orbit II • Modern Frontend',
    angleOffset: Math.PI / 6 + (4 * Math.PI) / 3, // 270 deg
    speed: 0.0052,
    iconRenderer: (s) => <TailwindIcon size={s} />,
  },

  // Orbit 2: Strict Languages & In-Memory Cache
  {
    id: 'ts',
    name: 'TypeScript',
    shortName: 'TypeScript',
    category: 'Type System',
    role: 'Strict Type-Safe Systems',
    description: 'End-to-end static type safety preventing runtime production errors, providing contract guarantees between frontend client interfaces and backend models.',
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.45)',
    orbitIndex: 2,
    orbitTier: 'Orbit III • Languages & Cache',
    angleOffset: Math.PI / 3, // 60 deg offset
    speed: 0.0036,
    iconRenderer: (s) => <TypeScriptIcon size={s} />,
  },
  {
    id: 'js',
    name: 'JavaScript ESNext',
    shortName: 'JavaScript',
    category: 'Core Engine',
    role: 'Modern Asynchronous Engine',
    description: 'Deep mastery of ECMAScript standards: asynchronous event loops, promises, functional pipelines, DOM performance, and Web APIs.',
    color: '#F7DF1E',
    glow: 'rgba(247, 223, 30, 0.45)',
    orbitIndex: 2,
    orbitTier: 'Orbit III • Languages & Cache',
    angleOffset: Math.PI / 3 + (2 * Math.PI) / 3, // 180 deg
    speed: 0.0036,
    iconRenderer: (s) => <JavaScriptIcon size={s} />,
  },
  {
    id: 'redis',
    name: 'Redis 7',
    shortName: 'Redis',
    category: 'In-Memory Store',
    role: 'Sub-2ms High-Speed Caching',
    description: 'High-performance in-memory key-value data store used for API response caching, active user sessions, distributed rate limiting, and pub/sub queues.',
    color: '#DC382D',
    glow: 'rgba(220, 56, 45, 0.45)',
    orbitIndex: 2,
    orbitTier: 'Orbit III • Languages & Cache',
    angleOffset: Math.PI / 3 + (4 * Math.PI) / 3, // 300 deg
    speed: 0.0036,
    iconRenderer: (s) => <RedisIcon size={s} />,
  },

  // Orbit 3: DevOps, Workflows & Stateless APIs (Outermost)
  {
    id: 'docker',
    name: 'Docker',
    shortName: 'Docker',
    category: 'Containerization',
    role: 'Containerized Deployment',
    description: 'Multi-stage container definitions and Docker Compose orchestrations ensuring identical runtime environments between local dev, testing, and production servers.',
    color: '#2496ED',
    glow: 'rgba(36, 150, 237, 0.45)',
    orbitIndex: 3,
    orbitTier: 'Orbit IV • DevOps & Contracts',
    angleOffset: Math.PI / 2, // 90 deg offset
    speed: 0.0022,
    iconRenderer: (s) => <DockerIcon size={s} />,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    shortName: 'Git',
    category: 'Version Control',
    role: 'Version Control & CI/CD',
    description: 'Structured Git workflows, conventional commits, feature-branch pull requests, code reviews, and automated GitHub Actions deployment pipelines.',
    color: '#F05032',
    glow: 'rgba(240, 80, 50, 0.45)',
    orbitIndex: 3,
    orbitTier: 'Orbit IV • DevOps & Contracts',
    angleOffset: Math.PI / 2 + (2 * Math.PI) / 3, // 210 deg
    speed: 0.0022,
    iconRenderer: (s) => <GitIcon size={s} />,
  },
  {
    id: 'rest',
    name: 'REST APIs',
    shortName: 'REST API',
    category: 'Architecture',
    role: 'Stateless Service Contracts',
    description: 'Strict HTTP specifications, idempotency, standard status codes, payload validation, pagination standards, and comprehensive OpenAPI documentation.',
    color: '#4ADE80',
    glow: 'rgba(74, 222, 128, 0.45)',
    orbitIndex: 3,
    orbitTier: 'Orbit IV • DevOps & Contracts',
    angleOffset: Math.PI / 2 + (4 * Math.PI) / 3, // 330 deg
    speed: 0.0022,
    iconRenderer: (s) => <RestApiIcon size={s} />,
  },
];

// Helper to compute responsive orbit radii based on canvas size
const getOrbitRadii = (orbitIdx: number, width: number, height: number) => {
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const maxRx = Math.min((width - (isMobile ? 50 : 80)) / 2, 430);
  const maxRy = Math.min((height - (isMobile ? 60 : 90)) / 2, 245);
  const minRx = isMobile ? 62 : isTablet ? 90 : 118;
  const minRy = isMobile ? 44 : isTablet ? 62 : 80;

  const t = orbitIdx / 3; // 0, 1/3, 2/3, 1
  const rx = minRx + t * (maxRx - minRx);
  const ry = minRy + t * (maxRy - minRy);
  return { rx, ry };
};

export const InteractiveTechSpace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isAligning, setIsAligning] = useState<boolean>(false);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 560,
  });

  const anglesRef = useRef<number[]>(PLANETARY_NODES.map((p) => p.angleOffset));
  const speedMultiplierRef = useRef<number>(1);
  const isAligningRef = useRef<boolean>(false);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 800, height: 560 });
  const lastTimeRef = useRef<number>(performance.now());
  const selectedIdRef = useRef<string | null>(null);

  // Sync state to refs for high-performance animation loop
  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    isAligningRef.current = isAligning;
  }, [isAligning]);

  useEffect(() => {
    dimensionsRef.current = dimensions;
  }, [dimensions]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  // Window resize observer to adapt orbit dimensions dynamically
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || 560;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Keyboard shortcut: Escape clears centered node
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 60 FPS Celestial Orbital Simulation Loop (Keplerian Planetary Mechanics)
  useEffect(() => {
    let animId: number;

    const tick = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      const speed = speedMultiplierRef.current;
      const aligning = isAligningRef.current;
      const currentSelected = selectedIdRef.current;
      const { width, height } = dimensionsRef.current;
      const cx = width / 2;
      const cy = height / 2;
      const isMobile = width < 640;

      PLANETARY_NODES.forEach((planet, i) => {
        const el = planetRefs.current[i];
        if (!el) return;

        // When a node is selected, it displays in the center, so hide its orbiting duplicate
        if (currentSelected === planet.id) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          return;
        }

        // Restore visibility for orbiting planets
        el.style.pointerEvents = 'auto';

        // Update planetary angle
        if (aligning) {
          // Smoothly pull angle toward 0 rad for cosmic syzygy
          let current = anglesRef.current[i];
          let diff = 0 - current;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          anglesRef.current[i] = current + diff * 0.08;
        } else if (speed > 0) {
          anglesRef.current[i] =
            (anglesRef.current[i] + planet.speed * speed * (dt * 60)) % (Math.PI * 2);
        }

        const angle = anglesRef.current[i];
        const { rx, ry } = getOrbitRadii(planet.orbitIndex, width, height);

        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);

        // 3D pseudo-depth perspective based on upper vs lower orbital hemisphere
        const isBack = y < cy;
        const depthScale = isBack ? 0.92 : 1.05;
        const depthOpacity = isBack ? 0.85 : 1.0;
        const zIndex = isBack ? 10 : 25;

        // Visual radius of the planet card
        const elRadius = isMobile ? 24 : 32;

        el.style.transform = `translate3d(${x - elRadius}px, ${y - elRadius}px, 0px) scale(${depthScale})`;
        el.style.zIndex = `${zIndex}`;
        el.style.opacity = `${depthOpacity}`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Click on a planet node: docks in center; if already centered, returns to orbit
  const handleSelectPlanet = (id: string) => {
    soundFx.playClick();
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Planetary Alignment Syzygy (aligns all planets along an orbital ray)
  const triggerPlanetaryAlignment = () => {
    soundFx.playClick();
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
    }, 2800);
  };

  // Solar Shockwave Pulse
  const triggerSolarPulse = () => {
    soundFx.playSuccess();
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
    }, 1200);
  };

  // Reset entire solar system to default state
  const resetSystem = () => {
    soundFx.playClick();
    setSelectedId(null);
    setSpeedMultiplier(1);
    setIsAligning(false);
  };

  const selectedNode = PLANETARY_NODES.find((p) => p.id === selectedId) || null;
  const hoveredNode = PLANETARY_NODES.find((p) => p.id === hoveredId) || null;
  const isMobile = dimensions.width < 640;
  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;

  return (
    <section
      id="space"
      className="relative w-full border-b border-zinc-850 bg-[#07060b] overflow-hidden select-none"
    >
      {/* Background Deep Space Starfield & Ambient Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-[#07060b] to-[#040407] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
              <Orbit size={14} className="animate-spin [animation-duration:12s]" />
              <span>SOLAR TECH COSMOS • ORBITAL GRAVITY FIELD</span>
            </div>
            <h3 className="text-white font-extrabold text-xl mt-0.5">
              Planetary Tech System — Click any technology to dock in center
            </h3>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
            {/* Speed Toggle: Normal / Cosmic / Paused */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-0.5">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setSpeedMultiplier(1);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  speedMultiplier === 1
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Normal Orbital Speed"
              >
                <Play size={11} /> 1x
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setSpeedMultiplier(2);
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  speedMultiplier === 2
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Cosmic 2x Speed"
              >
                <Compass size={11} /> 2x
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setSpeedMultiplier((prev) => (prev === 0 ? 1 : 0));
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  speedMultiplier === 0
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Pause / Resume Rotation"
              >
                <Pause size={11} />
              </button>
            </div>

            {/* Planetary Alignment Syzygy */}
            <button
              onClick={triggerPlanetaryAlignment}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-bold ${
                isAligning
                  ? 'bg-rose-600 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
              title="Align all planets along an orbital ray"
            >
              <Radio size={12} className={isAligning ? 'animate-pulse' : ''} />
              <span>Align</span>
            </button>

            {/* Solar Pulse Shockwave */}
            <button
              onClick={triggerSolarPulse}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-bold ${
                isPulsing
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
              }`}
              title="Trigger Solar Corona Shockwave"
            >
              <Zap size={12} className="fill-current" />
              <span>Pulse</span>
            </button>

            {/* Reset System */}
            <button
              onClick={resetSystem}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Reset Orbits & Deselect Center"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* The Solar System Canvas Field */}
        <div
          ref={containerRef}
          onClick={() => {
            // Clicking empty canvas space deselects centered node
            if (selectedId) {
              soundFx.playClick();
              setSelectedId(null);
            }
          }}
          className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-2xl overflow-hidden cursor-crosshair touch-none select-none"
        >
          {/* SVG Layer: Orbital Tracks, Glow Effects, and Alignments */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Concentric Elliptical Orbit Rings */}
            {[0, 1, 2, 3].map((orbitIdx) => {
              const { rx, ry } = getOrbitRadii(orbitIdx, dimensions.width, dimensions.height);
              const isContainingSelected = selectedNode && selectedNode.orbitIndex === orbitIdx;
              const isContainingHovered = hoveredNode && hoveredNode.orbitIndex === orbitIdx;

              return (
                <g key={orbitIdx}>
                  {/* Glowing orbital trail when hovered or selected */}
                  {(isContainingSelected || isContainingHovered) && (
                    <ellipse
                      cx={cx}
                      cy={cy}
                      rx={rx}
                      ry={ry}
                      fill="none"
                      stroke={isContainingSelected ? selectedNode.color : hoveredNode?.color}
                      strokeWidth="2.5"
                      strokeOpacity="0.45"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* Standard Celestial Dashed Orbit Ring */}
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke={isContainingSelected ? selectedNode.color : '#ffffff'}
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    strokeOpacity={isContainingSelected ? 0.6 : 0.12}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Planetary Alignment Ray */}
            {isAligning && (
              <line
                x1={cx}
                y1={cy}
                x2={cx + dimensions.width / 2}
                y2={cy}
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-pulse"
                strokeOpacity="0.7"
              />
            )}

            {/* Solar Shockwave Expanding Ripple */}
            {isPulsing && (
              <circle
                cx={cx}
                cy={cy}
                r={dimensions.width * 0.45}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                className="animate-ping"
                strokeOpacity="0.5"
              />
            )}
          </svg>

          {/* ============================================================
              CENTER COMPONENT: The Sun OR The Selected Spotlight Card
              ============================================================ */}
          {selectedNode ? (
            /* CENTER SPOTLIGHT CARD (When an item is clicked) */
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-40 select-none transition-all duration-300"
              style={{ left: `${cx}px`, top: `${cy}px` }}
            >
              {/* Giant ambient radial glow of this tech's brand color */}
              <div
                className="absolute -inset-10 rounded-full blur-2xl opacity-60 pointer-events-none transition-all duration-500"
                style={{ background: selectedNode.glow }}
              />

              {/* Orbiting dashed aura ring */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-3xl border border-dashed animate-spin [animation-duration:24s] pointer-events-none"
                style={{ borderColor: selectedNode.color, opacity: 0.35 }}
              />

              {/* The Spotlight Card */}
              <div
                className="relative w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl bg-[#0c0b16]/95 border border-white/20 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col"
                style={{
                  boxShadow: `0 0 50px ${selectedNode.glow}, 0 20px 40px rgba(0,0,0,0.85)`,
                }}
              >
                {/* Header with Large Icon, Title, and Close Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-2.5 bg-[#161424] border border-white/15 shrink-0 shadow-lg"
                      style={{ boxShadow: `0 0 24px ${selectedNode.glow}` }}
                    >
                      {selectedNode.iconRenderer(isMobile ? 24 : 32)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-extrabold text-base sm:text-lg leading-tight">
                          {selectedNode.name}
                        </h4>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-400">
                        {selectedNode.role}
                      </span>
                    </div>
                  </div>

                  {/* Close button to return to orbit */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedId(null);
                    }}
                    className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                    title="Return to Orbit (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed mt-3 pt-3 border-t border-zinc-800/80 font-sans">
                  {selectedNode.description}
                </p>

                {/* Footer with Tier Badge and Return to Orbit CTA */}
                <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ background: selectedNode.color }}
                    />
                    <span className="truncate max-w-[150px]">{selectedNode.orbitTier}</span>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedId(null);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-bold flex items-center gap-1 transition-all shadow-md active:scale-95"
                  >
                    <RotateCcw size={11} /> Return to Orbit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CENTRAL SUN / GRAVITATIONAL CORE (When no node is selected) */
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center transition-all duration-500 z-20 pointer-events-none select-none"
              style={{ left: `${cx}px`, top: `${cy}px` }}
            >
              {/* Outer Corona Flare Rings */}
              <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-amber-500/20 animate-spin [animation-duration:35s]" />
              <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-rose-500/30 border-dashed animate-spin [animation-duration:20s] [animation-direction:reverse]" />

              {/* Radiant Sun Corona Glow */}
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-500/30 via-rose-500/25 to-yellow-400/20 blur-xl animate-pulse" />

              {/* Solar Core Sphere */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-orange-600 shadow-[0_0_40px_rgba(244,63,94,0.6)] flex flex-col items-center justify-center border border-amber-200/40">
                <Sun size={isMobile ? 20 : 24} className="text-white animate-pulse" />
                <span className="text-[7.5px] sm:text-[9px] font-mono font-black tracking-widest text-white uppercase drop-shadow-md mt-0.5">
                  CORE
                </span>
              </div>
            </div>
          )}

          {/* ============================================================
              ORBITING PLANETARY NODES (Continuously Revolving Around Center)
              ============================================================ */}
          {PLANETARY_NODES.map((planet, index) => {
            const isHovered = hoveredId === planet.id;

            return (
              <div
                key={planet.id}
                ref={(el) => {
                  planetRefs.current[index] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlanet(planet.id);
                }}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setHoveredId(planet.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  boxShadow: isHovered
                    ? `0 0 32px ${planet.glow}`
                    : `0 0 16px ${planet.glow}`,
                }}
                className={`absolute w-12 h-12 sm:w-16 sm:h-16 rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center bg-[#0d0c16]/90 border transition-all duration-150 cursor-pointer ${
                  isHovered ? 'border-white scale-110 z-30' : 'border-white/15'
                }`}
              >
                {/* Brand Icon */}
                <div className="shrink-0 drop-shadow-md">
                  {planet.iconRenderer(isMobile ? 20 : 28)}
                </div>

                {/* Subtitle Badge */}
                <span className="text-[7.5px] sm:text-[9px] font-mono font-bold tracking-tight text-zinc-300 mt-1 truncate max-w-[46px] sm:max-w-[58px]">
                  {planet.shortName}
                </span>
              </div>
            );
          })}

          {/* Active Hover Hologram HUD Tooltip */}
          {hoveredNode && hoveredNode.id !== selectedId && (
            <div
              className="absolute pointer-events-none z-50 p-3 sm:p-3.5 rounded-xl bg-[#12111c]/95 border border-white/20 shadow-2xl backdrop-blur-xl max-w-xs transition-opacity duration-150"
              style={{
                left: Math.min(
                  Math.max(cx - 100, 20),
                  dimensions.width - (isMobile ? 220 : 280)
                ),
                top: 20,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: hoveredNode.color }}
                />
                <span className="text-white font-bold text-xs sm:text-sm">
                  {hoveredNode.name}
                </span>
                <span className="ml-auto text-[8.5px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {hoveredNode.category}
                </span>
              </div>

              <div className="text-[11px] sm:text-xs text-zinc-300 font-mono font-semibold mb-1">
                {hoveredNode.role}
              </div>

              <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono text-zinc-400 pt-1.5 border-t border-zinc-800">
                <span className="text-rose-400 font-bold">● Click to center</span>
                <span>{hoveredNode.orbitTier}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
