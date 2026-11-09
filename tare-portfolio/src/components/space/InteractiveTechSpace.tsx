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
import { Sparkles, Radio, Zap, RotateCcw, Compass, Move } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface FloatingNode {
  id: string;
  name: string;
  category: string;
  role: string;
  color: string;
  glow: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  rotation: number;
  vRot: number;
  isDragging: boolean;
}

const INITIAL_NODES = [
  { id: 'laravel', name: 'Laravel 13', category: 'Backend Engine', role: 'Primary Enterprise Architecture', color: '#FF2D20', glow: 'rgba(255, 45, 32, 0.4)', icon: <LaravelIcon size={32} /> },
  { id: 'php', name: 'PHP 8.3+', category: 'Backend Language', role: 'High-Performance Web APIs', color: '#777BB4', glow: 'rgba(119, 123, 180, 0.4)', icon: <PhpIcon size={32} /> },
  { id: 'vue', name: 'Vue 3', category: 'Frontend Framework', role: 'Composition API & Pinia Store', color: '#42B883', glow: 'rgba(66, 184, 131, 0.4)', icon: <VueIcon size={32} /> },
  { id: 'react', name: 'React 18', category: 'Frontend Library', role: 'Component Architecture & State', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.4)', icon: <ReactIcon size={32} /> },
  { id: 'ts', name: 'TypeScript', category: 'Language', role: 'Strict Type-Safe Systems', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.4)', icon: <TypeScriptIcon size={32} /> },
  { id: 'js', name: 'JavaScript ESNext', category: 'Language', role: 'Modern Asynchronous Engine', color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.4)', icon: <JavaScriptIcon size={32} /> },
  { id: 'mysql', name: 'MySQL / MariaDB', category: 'Database', role: 'Normalized Relational Data', color: '#00758F', glow: 'rgba(0, 117, 143, 0.4)', icon: <MySqlIcon size={32} /> },
  { id: 'redis', name: 'Redis 7', category: 'Caching Layer', role: 'Sub-2ms Memory Storage', color: '#DC382D', glow: 'rgba(220, 56, 45, 0.4)', icon: <RedisIcon size={32} /> },
  { id: 'docker', name: 'Docker', category: 'DevOps', role: 'Containerized Deployment', color: '#2496ED', glow: 'rgba(36, 150, 237, 0.4)', icon: <DockerIcon size={32} /> },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'UI Design', role: 'Atomic Responsive Styling', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)', icon: <TailwindIcon size={32} /> },
  { id: 'git', name: 'Git & GitHub', category: 'Workflow', role: 'Version Control & CI/CD', color: '#F05032', glow: 'rgba(240, 80, 50, 0.4)', icon: <GitIcon size={32} /> },
  { id: 'rest', name: 'REST APIs', category: 'Architecture', role: 'Stateless Service Contracts', color: '#4ADE80', glow: 'rgba(74, 222, 128, 0.4)', icon: <RestApiIcon size={32} /> },
];

export const InteractiveTechSpace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes] = useState<FloatingNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<FloatingNode | null>(null);
  const [gravityMode, setGravityMode] = useState<'drift' | 'vortex' | 'repel'>('drift');

  const draggedNodeRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; isInside: boolean }>({ x: -1000, y: -1000, isInside: false });
  const nodesRef = useRef<FloatingNode[]>([]);

  // Initialize node positions across space
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = 480;

    const initial: FloatingNode[] = INITIAL_NODES.map((item, i) => {
      // Distribute evenly with orbital spacing
      const angle = (i / INITIAL_NODES.length) * Math.PI * 2;
      const radiusDist = Math.min(width, height) * 0.35 * (0.6 + (i % 3) * 0.2);
      const cx = width / 2;
      const cy = height / 2;

      return {
        ...item,
        x: cx + Math.cos(angle) * radiusDist + (Math.random() - 0.5) * 60,
        y: cy + Math.sin(angle) * radiusDist + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: 36,
        mass: 1.2,
        rotation: (Math.random() - 0.5) * 15,
        vRot: (Math.random() - 0.5) * 0.4,
        isDragging: false,
      };
    });

    nodesRef.current = initial;
    setNodes(initial);
  }, []);

  // Main 60 FPS Physics Simulation Loop
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height || 480;
      const mouse = mousePosRef.current;
      const mode = gravityMode;
      const dragged = draggedNodeRef.current;

      const current = nodesRef.current.map((node) => {
        if (dragged && dragged.id === node.id) {
          // Handled in mousemove
          return node;
        }

        let { x, y, vx, vy, rotation, vRot, radius } = node;

        // 1. Vortex Gravity: pull towards center in spiral
        if (mode === 'vortex') {
          const cx = width / 2;
          const cy = height / 2;
          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Tangential spiral force
          const tangentX = -dy / dist;
          const tangentY = dx / dist;

          vx += (dx / dist) * 0.18 + tangentX * 0.45;
          vy += (dy / dist) * 0.18 + tangentY * 0.45;
        }

        // 2. Mouse Repulsion / Gravity
        if (mouse.isInside) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150 && dist > 1) {
            const force = (150 - dist) / 150;
            const push = mode === 'repel' ? 1.6 : 0.8;
            vx += (dx / dist) * force * push;
            vy += (dy / dist) * force * push;
          }
        }

        // 3. Natural Damping (Friction)
        vx *= 0.985;
        vy *= 0.985;

        // 4. Update Position
        x += vx;
        y += vy;
        rotation += vRot;

        // 5. Boundary Bouncing
        const padding = radius + 10;
        if (x < padding) {
          x = padding;
          vx = Math.abs(vx) * 0.8;
        } else if (x > width - padding) {
          x = width - padding;
          vx = -Math.abs(vx) * 0.8;
        }

        if (y < padding) {
          y = padding;
          vy = Math.abs(vy) * 0.8;
        } else if (y > height - padding) {
          y = height - padding;
          vy = -Math.abs(vy) * 0.8;
        }

        return { ...node, x, y, vx, vy, rotation };
      });

      // Simple node-to-node soft repulsion to prevent overlap
      for (let i = 0; i < current.length; i++) {
        for (let j = i + 1; j < current.length; j++) {
          const n1 = current[i];
          const n2 = current[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = n1.radius + n2.radius + 15;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) * 0.04;
            const nx = dx / dist;
            const ny = dy / dist;

            if (!dragged || dragged.id !== n1.id) {
              n1.x -= nx * overlap;
              n1.y -= ny * overlap;
            }
            if (!dragged || dragged.id !== n2.id) {
              n2.x += nx * overlap;
              n2.y += ny * overlap;
            }
          }
        }
      }

      nodesRef.current = current;
      setNodes([...current]);

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [gravityMode]);

  // Handle Drag & Throw Interactivity (Mouse)
  const handleMouseDown = (e: React.MouseEvent, node: FloatingNode) => {
    e.stopPropagation();
    soundFx.playClick();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    draggedNodeRef.current = {
      id: node.id,
      offsetX: e.clientX - rect.left - node.x,
      offsetY: e.clientY - rect.top - node.y,
    };
  };

  const handleTouchStart = (e: React.TouchEvent, node: FloatingNode) => {
    e.stopPropagation();
    soundFx.playClick();
    const container = containerRef.current;
    if (!container || !e.touches[0]) return;

    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();
    draggedNodeRef.current = {
      id: node.id,
      offsetX: touch.clientX - rect.left - node.x,
      offsetY: touch.clientY - rect.top - node.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    mousePosRef.current = { x: mouseX, y: mouseY, isInside: true };

    if (draggedNodeRef.current) {
      const dragged = draggedNodeRef.current;
      nodesRef.current = nodesRef.current.map((n) => {
        if (n.id === dragged.id) {
          const newX = mouseX - dragged.offsetX;
          const newY = mouseY - dragged.offsetY;
          return {
            ...n,
            vx: (newX - n.x) * 0.5,
            vy: (newY - n.y) * 0.5,
            x: newX,
            y: newY,
            isDragging: true,
          };
        }
        return n;
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    mousePosRef.current = { x: touchX, y: touchY, isInside: true };

    if (draggedNodeRef.current) {
      const dragged = draggedNodeRef.current;
      nodesRef.current = nodesRef.current.map((n) => {
        if (n.id === dragged.id) {
          const newX = touchX - dragged.offsetX;
          const newY = touchY - dragged.offsetY;
          return {
            ...n,
            vx: (newX - n.x) * 0.5,
            vy: (newY - n.y) * 0.5,
            x: newX,
            y: newY,
            isDragging: true,
          };
        }
        return n;
      });
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      soundFx.playHover();
      draggedNodeRef.current = null;
      nodesRef.current = nodesRef.current.map((n) => ({ ...n, isDragging: false }));
    }
  };

  const handleTouchEnd = () => {
    if (draggedNodeRef.current) {
      soundFx.playHover();
      draggedNodeRef.current = null;
      nodesRef.current = nodesRef.current.map((n) => ({ ...n, isDragging: false }));
    }
    mousePosRef.current.isInside = false;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isInside = false;
    draggedNodeRef.current = null;
  };

  // Cosmic Shockwave: Explode outward from center
  const triggerCosmicShockwave = () => {
    soundFx.playSuccess();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    nodesRef.current = nodesRef.current.map((node) => {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const angle = Math.atan2(dy, dx);
      const power = 14 + Math.random() * 8;

      return {
        ...node,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power,
        vRot: (Math.random() - 0.5) * 4,
      };
    });
  };

  // Reset Orbits
  const resetOrbits = () => {
    soundFx.playClick();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    nodesRef.current = nodesRef.current.map((node, i) => {
      const angle = (i / nodesRef.current.length) * Math.PI * 2;
      const radiusDist = Math.min(rect.width, rect.height) * 0.35 * (0.6 + (i % 3) * 0.2);
      return {
        ...node,
        x: cx + Math.cos(angle) * radiusDist,
        y: cy + Math.sin(angle) * radiusDist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        rotation: 0,
      };
    });
  };

  return (
    <section className="relative w-full border-b border-zinc-850 bg-[#07060b] overflow-hidden select-none">
      {/* Background Starfield & Radial Nebula Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-[#07060b] to-[#050508] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Orbit Rings (Aesthetic SVG Background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <ellipse cx="50%" cy="50%" rx="32%" ry="38%" fill="none" stroke="#e84a4a" strokeWidth="1" strokeDasharray="6 8" />
        <ellipse cx="50%" cy="50%" rx="20%" ry="24%" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 6" />
        <ellipse cx="50%" cy="50%" rx="44%" ry="48%" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="4 12" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
              <Radio size={13} className="animate-pulse" />
              <span>INTERACTIVE TECH COSMOS • ZERO GRAVITY FIELD</span>
            </div>
            <h3 className="text-white font-extrabold text-xl mt-0.5">
              Drag, fling & explore the core tech stack.
            </h3>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => {
                soundFx.playClick();
                setGravityMode('drift');
              }}
              className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
                gravityMode === 'drift'
                  ? 'bg-rose-600 text-white font-bold border-rose-500'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Compass size={12} /> Zero-G
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setGravityMode(gravityMode === 'vortex' ? 'drift' : 'vortex');
              }}
              className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
                gravityMode === 'vortex'
                  ? 'bg-cyan-600 text-white font-bold border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Radio size={12} /> Vortex
            </button>

            <button
              onClick={triggerCosmicShockwave}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-all font-bold"
              title="Cosmic Shockwave Pulse"
            >
              <Zap size={12} className="fill-current" /> Pulse
            </button>

            <button
              onClick={resetOrbits}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Reset Orbits"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* The Zero-G Floating Playground */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[440px] sm:h-[480px] rounded-2xl cursor-grab active:cursor-grabbing overflow-hidden touch-none"
        >
          {/* Constellation Connector Lines to nearby floating nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map((n1, i) =>
              nodes.slice(i + 1).map((n2) => {
                const dx = n2.x - n1.x;
                const dy = n2.y - n1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                  const alpha = (1 - dist / 130) * 0.25;
                  return (
                    <line
                      key={`${n1.id}-${n2.id}`}
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                      stroke={n1.color}
                      strokeWidth="1"
                      strokeOpacity={alpha}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Render Floating Language Icons */}
          {nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDown(e, node)}
                onTouchStart={(e) => handleTouchStart(e, node)}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setHoveredNode(node);
                }}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  transform: `translate3d(${node.x - node.radius}px, ${node.y - node.radius}px, 0px) rotate(${node.rotation}deg) scale(${isHovered ? 1.25 : 1})`,
                  boxShadow: isHovered ? `0 0 35px ${node.glow}` : `0 0 18px ${node.glow}`,
                }}
                className={`absolute w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-3 flex flex-col items-center justify-center bg-[#100f18]/90 border border-white/20 backdrop-blur-md shadow-2xl transition-transform duration-100 cursor-pointer ${
                  node.isDragging ? 'scale-125 z-40 border-white' : 'z-20'
                }`}
              >
                {/* Brand Icon */}
                <div className="shrink-0 drop-shadow-md">{node.icon}</div>

                {/* Subtitle Badge */}
                <span className="text-[8px] font-mono font-bold tracking-tight text-zinc-300 mt-1 truncate max-w-[56px]">
                  {node.name.split(' ')[0]}
                </span>
              </div>
            );
          })}

          {/* Active Hover Hologram HUD */}
          {hoveredNode && (
            <div
              className="absolute pointer-events-none z-50 p-4 rounded-xl bg-[#12111c]/95 border border-white/20 shadow-2xl backdrop-blur-xl max-w-xs transition-opacity duration-150 animate-fadeIn"
              style={{
                left: Math.min(Math.max(hoveredNode.x - 120, 20), (containerRef.current?.clientWidth || 800) - 260),
                top: Math.max(hoveredNode.y - 120, 20),
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: hoveredNode.color }} />
                <span className="text-white font-bold text-sm">{hoveredNode.name}</span>
                <span className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {hoveredNode.category}
                </span>
              </div>

              <div className="text-xs text-zinc-300 font-mono font-semibold mb-1">
                {hoveredNode.role}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1.5 border-t border-zinc-800">
                <span>Drag & Toss Across Space</span>
                <span className="text-rose-400 font-bold">● Active Orbit</span>
              </div>
            </div>
          )}

          {/* Floating Helper Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-400 flex items-center gap-2 pointer-events-none">
            <Move size={12} className="text-rose-400" />
            <span>Click and drag any language icon to fling it in zero gravity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

