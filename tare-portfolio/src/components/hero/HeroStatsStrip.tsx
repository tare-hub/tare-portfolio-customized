import React, { useState } from 'react';
import { Zap, Clock, ShieldCheck, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface StatItem {
  id: string;
  value: string;
  label: string;
  badge: string;
  deepInfo: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    id: 'exp',
    value: '3+ Yrs',
    label: 'Full-Stack Engineering',
    badge: 'PHP 8.3 · Laravel · Vue 3',
    deepInfo: '1,200+ days designing REST APIs, normalized schemas, and reactive user interfaces.',
    icon: <Clock size={14} className="text-rose-400" />,
  },
  {
    id: 'perf',
    value: '< 65ms',
    label: 'Target API Latency',
    badge: 'Redis & Compound Indexes',
    deepInfo: 'Sub-second catalog searches using MariaDB spatial indexes and tag-based Redis caching.',
    icon: <Zap size={14} className="text-amber-400" />,
  },
  {
    id: 'concurrency',
    value: '99.9%',
    label: 'Zero Overlap Concurrency',
    badge: 'Pessimistic DB Locks',
    deepInfo: 'Eliminates inventory and booking race conditions through atomic transaction isolation.',
    icon: <ShieldCheck size={14} className="text-emerald-400" />,
  },
];

export const HeroStatsStrip: React.FC = () => {
  const [activeStat, setActiveStat] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
      {STATS.map((stat) => {
        const isHovered = activeStat === stat.id;
        return (
          <div
            key={stat.id}
            onMouseEnter={() => {
              soundFx.playHover();
              setActiveStat(stat.id);
            }}
            onMouseLeave={() => setActiveStat(null)}
            onClick={() => soundFx.playClick()}
            className="p-3.5 rounded-xl bg-[#0f0e16]/80 border border-zinc-800/90 hover:border-rose-500/50 transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-lg"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 text-zinc-500">
              <span className="flex items-center gap-1.5">
                {stat.icon}
                <span className="font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {stat.label}
                </span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            </div>

            {/* Value */}
            <div className="text-2xl font-extrabold font-mono text-white group-hover:text-rose-400 transition-colors">
              {stat.value}
            </div>

            {/* Badge */}
            <div className="text-[10px] font-mono text-zinc-400 pt-1 truncate">
              {stat.badge}
            </div>

            {/* Hover tooltip overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-[#12111d] p-3 flex flex-col justify-center text-[10px] font-mono text-zinc-300 leading-snug border border-rose-500/50 rounded-xl animate-fadeIn z-10">
                <div className="flex items-center gap-1 text-rose-400 font-bold mb-1">
                  <Sparkles size={11} /> ARCHITECTURAL STANDARD
                </div>
                <div>{stat.deepInfo}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

