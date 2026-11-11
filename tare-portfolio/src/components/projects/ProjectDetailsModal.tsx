import React, { useState } from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Database, Network, Cpu, CheckCircle2, Activity, Layout, Play } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { ProjectCardVisual } from './ProjectCardVisual';
import { LiveProjectSimulator } from './LiveProjectSimulator';
import { soundFx } from '../../utils/audio';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'visual' | 'playground' | 'schema' | 'api' | 'metrics'>('overview');

  if (!project) return null;

  const handleTabChange = (tab: 'overview' | 'visual' | 'playground' | 'schema' | 'api' | 'metrics') => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0e0d14] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className={`p-4 sm:p-8 bg-gradient-to-r ${project.accentGradient} border-b border-zinc-800/80 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-black/40 text-zinc-400 hover:text-white hover:bg-black/80 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              {project.category}
            </span>
            <span className="hidden sm:inline">SYSTEM ARCHITECTURE SPECIFICATION</span>
          </div>

          <h2 className="text-xl sm:text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-zinc-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded bg-black/50 border border-white/10 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-[#12111a] px-2 sm:px-4 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => handleTabChange('overview')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'overview'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu size={14} /> Overview & Features
          </button>
          <button
            onClick={() => handleTabChange('visual')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layout size={14} /> UI Mockup & Visuals
          </button>
          <button
            onClick={() => handleTabChange('playground')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'playground'
                ? 'border-rose-500 text-white font-bold'
                : 'border-transparent text-amber-400 hover:text-amber-300'
            }`}
          >
            <Play size={13} className="fill-current text-rose-500" /> Interactive Simulator
          </button>
          <button
            onClick={() => handleTabChange('schema')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'schema'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database size={14} /> Database Schema
          </button>
          <button
            onClick={() => handleTabChange('api')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'api'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Network size={14} /> API Endpoints ({project.architecture.apiEndpoints.length})
          </button>
          <button
            onClick={() => handleTabChange('metrics')}
            className={`py-3 sm:py-3.5 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'metrics'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Activity size={14} /> Metrics & Highlights
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6 text-zinc-300 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-wider text-rose-400 uppercase mb-2">
                  System Architectural Overview
                </h4>
                <p className="leading-relaxed text-zinc-300 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  {project.architecture.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
                  Key Production Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architecture.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono tracking-wider text-rose-400 uppercase">
                  Interface Design & Visual Mockup
                </h4>
                <span className="text-[11px] font-mono text-zinc-500">HD Screenshot & Component Spec</span>
              </div>

              {project.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                  <div className="px-4 py-2 bg-[#14121a] border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span>{project.title.toLowerCase()}.design-spec</span>
                    <span className="text-emerald-400 text-[10px]">RENDERED</span>
                  </div>
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    className="w-full max-h-[460px] object-cover object-top"
                  />
                </div>
              )}

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  UI/UX Engineering Rationales
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Engineered with atomic design principles in Vue 3 and Tailwind CSS. Employs high-contrast typography, WCAG 2.1 AA accessibility standards, responsive viewport fluid sizing, and sub-16ms layout calculations to eliminate Cumulative Layout Shift (CLS).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="space-y-6">
              <LiveProjectSimulator project={project} />
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  Normalized Relational Tables
                </h4>
                <span className="text-[11px] font-mono text-zinc-500">InnoDB / UTF8MB4</span>
              </div>
              <div className="space-y-2.5">
                {project.architecture.databaseSchema.map((tableDef, i) => {
                  const [tableName, cols] = tableDef.split(': ');
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#09080d] border border-zinc-800 font-mono text-xs"
                    >
                      <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                        <Database size={13} /> {tableName}
                      </div>
                      <div className="text-zinc-400 text-[11px] leading-relaxed pl-5 border-l-2 border-zinc-800">
                        {cols}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">
                Core REST Contract Routes
              </h4>
              <div className="space-y-2.5">
                {project.architecture.apiEndpoints.map((ep, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#09080d] border border-zinc-800 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ep.method === 'GET'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : ep.method === 'POST'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : ep.method === 'PATCH' || ep.method === 'PUT'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-zinc-200">{ep.path}</span>
                    </div>
                    <span className="text-zinc-400 text-[11px]">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
                  Telemetry & Benchmarks
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.architecture.systemMetrics.map((met, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center"
                    >
                      <div className="text-xl sm:text-2xl font-mono font-bold text-rose-400">
                        {met.value}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1 uppercase">
                        {met.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
                  Technical Architecture Highlights
                </h4>
                <ul className="space-y-2">
                  {project.architecture.technicalHighlights.map((hl, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2"
                    >
                      <span className="text-rose-400 font-mono font-bold">»</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#12111a] border-t border-zinc-800 flex items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-500">
            Author: <span className="text-zinc-300">Tariku Meseret</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <GithubIcon size={14} /> Repository
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors"
              >
                <ExternalLink size={14} /> Live View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
