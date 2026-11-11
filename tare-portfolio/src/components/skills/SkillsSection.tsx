import React, { useState } from 'react';
import { skillsData } from '../../data/skillsData';
import { SkillItem } from '../../types';
import { Terminal, Cpu, Layers, Code2, Palette, Database, GitBranch, Layout, ExternalLink, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface SkillsSectionProps {
  onSelectSkill: (skill: SkillItem) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={22} />,
  Cpu: <Cpu size={22} />,
  Layers: <Layers size={22} />,
  Code2: <Code2 size={22} />,
  Palette: <Palette size={22} />,
  Database: <Database size={22} />,
  GitBranch: <GitBranch size={22} />,
  Layout: <Layout size={22} />,
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectSkill }) => {
  const [filter, setFilter] = useState<'all' | 'backend' | 'frontend' | 'database' | 'devops' | 'architecture'>('all');

  const filteredSkills = filter === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === filter);

  const handleFilterClick = (cat: typeof filter) => {
    soundFx.playClick();
    setFilter(cat);
  };

  return (
    <section id="skills" className="py-24 border-b border-zinc-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center gap-4 text-xs font-mono text-rose-500 mb-8">
          <span className="font-bold tracking-widest">02 / TOOLKIT</span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Tools I use to <br />
              <span className="text-rose-500">bring ideas alive.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm font-mono leading-relaxed">
            Continuously advancing. Click on any technology card to view production code patterns and implementation patterns.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10 text-[11px] sm:text-xs font-mono">
          {[
            { id: 'all', label: 'ALL SKILLS' },
            { id: 'backend', label: 'BACKEND & PHP' },
            { id: 'frontend', label: 'FRONTEND & VUE' },
            { id: 'database', label: 'DATABASE & SQL' },
            { id: 'devops', label: 'DEVOPS & GIT' },
            { id: 'architecture', label: 'DESIGN & UI/UX' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id as typeof filter)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${
                filter === cat.id
                  ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/40'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              onClick={() => {
                soundFx.playClick();
                onSelectSkill(skill);
              }}
              className="group p-6 rounded-2xl bg-[#0f0e15] border border-zinc-800/90 hover:border-rose-500/60 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                  <span className="text-rose-400/80">0{index + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 text-[10px]">
                    {skill.experience}
                  </span>
                </div>

                <div className="text-rose-500 mb-4 p-3 rounded-xl bg-zinc-900/80 w-fit group-hover:scale-110 group-hover:text-white group-hover:bg-rose-600 transition-all">
                  {ICON_MAP[skill.icon] || <Code2 size={22} />}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {skill.description}
                </p>
              </div>

              <div>
                {/* Proficiency Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                    <span>Proficiency</span>
                    <span className="text-zinc-300 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-rose-400 group-hover:text-rose-300">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} /> Inspect Code Pattern
                  </span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

