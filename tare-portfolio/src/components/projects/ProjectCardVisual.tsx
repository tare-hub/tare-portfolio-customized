import React, { useState } from 'react';
import { Project } from '../../types';
import { ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Search, Activity, Zap, Radio, MapPin, Pill, Car, Play, Volume2 } from 'lucide-react';

interface ProjectCardVisualProps {
  project: Project;
  index: number;
}

export const ProjectCardVisual: React.FC<ProjectCardVisualProps> = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const [activeView, setActiveView] = useState<'preview' | 'ui'>('preview');

  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[400px] flex flex-col justify-between p-5 sm:p-7 relative overflow-hidden group select-none">
      {/* Background ambient gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} opacity-90`} />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Bar inside card visual */}
      <div className="flex items-center justify-between relative z-10 text-[11px] font-mono text-zinc-300 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider">{project.title.toUpperCase()}</span>
        </div>
        <span className="text-zinc-400 text-[10px]">0{index + 1} / CASE STUDY</span>
      </div>

      {/* Actual Visual Representation */}
      <div className="relative z-10 my-auto py-3">
        {project.imageUrl && !imageError && activeView === 'preview' ? (
          /* Actual Real Image Screenshot / Mockup */
          <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black/60 group-hover:scale-[1.02] transition-transform duration-500">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#121118] border-b border-white/10 text-[10px] font-mono text-zinc-400">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <span className="text-zinc-500 truncate max-w-[160px]">{project.title.toLowerCase()}.dev</span>
              <div className="w-2" />
            </div>

            <div className="relative overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.imageAlt || project.title}
                onError={() => setImageError(true)}
                className="w-full h-[220px] sm:h-[250px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        ) : (
          /* Detailed High-Fidelity UI Interface Mockup */
          <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#0c0b12]/95 backdrop-blur-xl group-hover:scale-[1.02] transition-transform duration-500 text-left">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#161420] border-b border-white/10 text-[10px] font-mono text-zinc-400">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-zinc-400 truncate max-w-[180px]">
                https://{project.id}.app/live-preview
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                LIVE
              </span>
            </div>

            {/* Custom Interactive Mockup per Project Type */}
            {project.mockupType === 'pharma' && (
              <div className="p-3.5 space-y-2.5 font-mono text-xs">
                {/* Search bar inside mockup */}
                <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-zinc-900 border border-zinc-700/60 text-zinc-400 text-[11px]">
                  <Search size={12} className="text-rose-400" />
                  <span className="text-zinc-200">Amoxicillin 500mg</span>
                  <span className="ml-auto text-[9px] px-1 rounded bg-zinc-800 text-zinc-400">Rx Required</span>
                </div>

                {/* Medicine Catalog Card */}
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400">
                      <Pill size={16} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs">Amoxicillin Trihydrate</div>
                      <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
                        <MapPin size={9} className="text-rose-400" />
                        <span>St. Gabriel Pharmacy (1.2 km)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold text-xs">$4.80</div>
                    <span className="text-[9px] text-emerald-300 bg-emerald-950/60 px-1 rounded">In Stock</span>
                  </div>
                </div>

                {/* Pharmacy verification & order status */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                    <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                    <span>Rx Verified by Pharmacist</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                    <Zap size={12} className="text-amber-400 shrink-0" />
                    <span>Instant Courier Dispatch</span>
                  </div>
                </div>
              </div>
            )}

            {project.mockupType === 'autodrive' && (
              <div className="p-3.5 space-y-2.5 font-mono text-xs">
                {/* Vehicle header */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-cyan-400" />
                    <div>
                      <div className="text-white font-bold text-xs">Tesla Model 3 Long Range</div>
                      <div className="text-[10px] text-zinc-400">Fleet Asset #AD-849</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-bold text-xs">$85/day</div>
                    <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-1 rounded">Available</span>
                  </div>
                </div>

                {/* Booking Timeline & Telemetry */}
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Reservation Window</span>
                    <span className="text-zinc-200 font-bold">Nov 12 – Nov 17</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex">
                    <div className="w-1/3 bg-zinc-700" />
                    <div className="w-1/2 bg-cyan-500 rounded-full" />
                    <div className="w-1/6 bg-zinc-800" />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-500">
                    <span>Double-Booking Shield: Active</span>
                    <span className="text-emerald-400">Conflict-Free (Pessimistic Lock)</span>
                  </div>
                </div>

                {/* Telemetry stats */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-cyan-400 font-bold">98%</div>
                    <div className="text-[9px] text-zinc-500">Battery</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-emerald-400 font-bold">GPS</div>
                    <div className="text-[9px] text-zinc-500">Telemetry</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-amber-400 font-bold">0 Overlaps</div>
                    <div className="text-[9px] text-zinc-500">Integrity</div>
                  </div>
                </div>
              </div>
            )}

            {project.mockupType === 'media' && (
              <div className="p-3.5 space-y-2.5 font-mono text-xs">
                {/* Magazine Story Card */}
                <div className="p-3 rounded-lg bg-gradient-to-r from-stone-900 to-amber-950/40 border border-amber-900/40">
                  <div className="text-[9px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                    PHOTO ESSAY & SOUNDSCAPE
                  </div>
                  <div className="text-white font-bold text-sm leading-tight mb-1">
                    The Rift Valley Chronicles: Untold Narratives
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    By Tariku Meseret • 8 min read • 4K Documentary Audio
                  </div>
                </div>

                {/* Audio Waveform player */}
                <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
                  <button className="w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0">
                    <Play size={12} className="fill-current ml-0.5" />
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[9px] text-zinc-400">
                      <span>Field Recording Commentary</span>
                      <span>03:42 / 12:15</span>
                    </div>
                    {/* Simulated Waveform bars */}
                    <div className="flex items-center gap-1 h-3">
                      {[40, 70, 95, 30, 85, 60, 100, 45, 80, 65, 90, 50, 75, 35, 60, 80, 40].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-amber-400/80 rounded-full"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-400 px-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 size={11} /> 100/100 Lighthouse Performance
                  </span>
                  <span>WCAG 2.1 AA Compliant</span>
                </div>
              </div>
            )}

            {project.mockupType === 'devpulse' && (
              <div className="p-3.5 space-y-2.5 font-mono text-xs">
                {/* Metric status bar */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-cyan-400 animate-pulse" />
                    <span className="text-white font-bold text-xs">Global Gateway Latency</span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">p50: 18ms | p99: 46ms</span>
                </div>

                {/* Simulated Real-Time Wave Graph */}
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1">
                  <div className="flex justify-between text-[9px] text-zinc-500">
                    <span>10k events/sec</span>
                    <span className="text-emerald-400">WebSocket Lag: 4ms</span>
                  </div>
                  <div className="h-10 flex items-end gap-1 pt-1">
                    {[20, 25, 30, 22, 28, 45, 35, 20, 18, 22, 65, 38, 24, 20, 19, 22, 25, 30, 28, 22].map((v, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${v > 50 ? 'bg-amber-400' : 'bg-cyan-500/80'}`}
                        style={{ height: `${v}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Service health nodes */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-emerald-400 font-bold">99.99%</div>
                    <div className="text-[9px] text-zinc-500">Auth Service</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-emerald-400 font-bold">12ms</div>
                    <div className="text-[9px] text-zinc-500">DB Shard</div>
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-zinc-800">
                    <div className="text-cyan-400 font-bold">Healthy</div>
                    <div className="text-[9px] text-zinc-500">API Cluster</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar: Switch View (UI Mockup / Real Image) & Status */}
      <div className="flex items-center justify-between relative z-10 pt-3 border-t border-white/10 text-[10px] font-mono text-zinc-400">
        <span className="tracking-widest uppercase text-zinc-300 flex items-center gap-1.5">
          <Sparkles size={11} className="text-rose-400" />
          <span>PRODUCTION ARCHITECTURE</span>
        </span>

        {project.imageUrl && !imageError && (
          <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                activeView === 'preview' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Mockup Image
            </button>
            <button
              onClick={() => setActiveView('ui')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                activeView === 'ui' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Interactive UI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
