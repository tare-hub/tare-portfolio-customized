import React, { useState } from 'react';
import { techNotesData, TechNote } from '../../data/techNotesData';
import { BookOpen, Clock, ArrowUpRight, Tag, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface TechNotesSectionProps {
  onSelectNote: (note: TechNote) => void;
}

export const TechNotesSection: React.FC<TechNotesSectionProps> = ({ onSelectNote }) => {
  return (
    <section id="notes" className="py-24 border-b border-zinc-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center gap-4 text-xs font-mono text-rose-500 mb-8">
          <span className="font-bold tracking-widest">04 / SYSTEM DESIGN NOTES</span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Engineering case studies <br />
              <span className="text-rose-500">& architectural notes.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm font-mono leading-relaxed">
            Written breakdowns of real-world backend challenges, query optimization plans, and concurrency safeguards implemented across production systems.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techNotesData.map((note, idx) => (
            <article
              key={note.slug}
              onClick={() => {
                soundFx.playClick();
                onSelectNote(note);
              }}
              className="group p-6 rounded-2xl bg-[#0f0e16] border border-zinc-800/90 hover:border-rose-500/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-rose-400 font-bold">
                    {note.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock size={11} /> {note.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-rose-400 transition-colors leading-snug">
                  {note.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {note.excerpt}
                </p>
              </div>

              <div>
                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9px] font-mono rounded bg-zinc-900/80 border border-zinc-800/80 text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-rose-400 group-hover:text-rose-300">
                  <span className="flex items-center gap-1">
                    <BookOpen size={13} /> Read Case Study
                  </span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

