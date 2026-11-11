import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { Search, ExternalLink, Cpu, Database, Activity, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { ProjectCardVisual } from './ProjectCardVisual';
import { soundFx } from '../../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projectsData.filter((proj) => {
    const matchesFilter = filter === 'all' || proj.category === filter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      proj.title.toLowerCase().includes(query) ||
      proj.subtitle.toLowerCase().includes(query) ||
      proj.tags.some((t) => t.toLowerCase().includes(query)) ||
      proj.shortDescription.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (cat: string) => {
    soundFx.playClick();
    setFilter(cat);
  };

  return (
    <section id="projects" className="py-24 border-b border-zinc-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center gap-4 text-xs font-mono text-rose-500 mb-8">
          <span className="font-bold tracking-widest">03 / SELECTED WORK</span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Some things I’ve <br />
              <span className="text-rose-500">been building.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm font-mono leading-relaxed">
            Real architectural projects spanning multi-vendor marketplaces, fleet operations, and multimedia engines. Click any project to inspect its system design.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['all', 'Full-Stack', 'Backend', 'Creative'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  filter === cat
                    ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-950/40'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {cat === 'all' ? 'ALL PROJECTS' : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. Laravel, Vue)..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-rose-500 transition-colors"
            />
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-8">
          {filteredProjects.map((project, idx) => {
            const isReverse = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="group rounded-3xl bg-[#0f0e15] border border-zinc-800/90 overflow-hidden shadow-2xl transition-all duration-300 hover:border-rose-500/60 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Actual Described Visual Preview */}
                <div
                  className={`lg:col-span-5 relative overflow-hidden bg-black/40 ${
                    isReverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ProjectCardVisual project={project} index={idx} />
                </div>

                {/* Info side */}
                <div
                  className={`lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5 sm:space-y-6 ${
                    isReverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-rose-500 mb-2">
                      <span className="font-bold tracking-widest uppercase">
                        {project.category}
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-zinc-400">{project.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 group-hover:text-rose-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                      {project.shortDescription}
                    </p>

                    {/* Quick Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                      {project.architecture.systemMetrics.map((met, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center"
                        >
                          <div className="text-xs font-mono font-bold text-rose-400">
                            {met.value}
                          </div>
                          <div className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">
                            {met.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onSelectProject(project);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 transition-all hover:scale-105 active:scale-95 text-center"
                    >
                      <Cpu size={14} />
                      <span>Inspect Architecture</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <GithubIcon size={14} />
                        <span>GitHub Profile ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800 text-zinc-400 font-mono text-sm">
              No projects found matching "{searchQuery}". Try searching for 'Laravel', 'Vue', or 'PHP'.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
