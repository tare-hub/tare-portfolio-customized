import React from 'react';
import { TechNote } from '../../data/techNotesData';
import { X, Clock, Calendar, Tag, BookOpen, Share2, ArrowLeft } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface TechNoteModalProps {
  note: TechNote | null;
  onClose: () => void;
}

export const TechNoteModal: React.FC<TechNoteModalProps> = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0d0c14] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-zinc-900 via-[#161422] to-zinc-900 border-b border-zinc-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-black/40 text-zinc-400 hover:text-white hover:bg-black/80 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400 mb-2 sm:mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/40">
              {note.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {note.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {note.publishedDate}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {note.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {note.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-6 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
          <div className="prose prose-invert max-w-none space-y-4">
            {note.content.split('\n\n').map((paragraph, idx) => {
              // Code block formatting
              if (paragraph.startsWith('```')) {
                const lines = paragraph.split('\n');
                const lang = lines[0].replace('```', '') || 'code';
                const codeBody = lines.slice(1, -1).join('\n');

                return (
                  <div key={idx} className="my-4 rounded-xl overflow-hidden border border-zinc-800 bg-[#09080e]">
                    <div className="px-4 py-1.5 bg-[#14121a] border-b border-zinc-800 text-[11px] font-mono text-zinc-500 flex justify-between">
                      <span>{lang.toUpperCase()}</span>
                      <span>UTF-8</span>
                    </div>
                    <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                      {codeBody}
                    </pre>
                  </div>
                );
              }

              // Headings
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold text-white pt-4 text-rose-400 font-mono">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 text-zinc-300 text-sm font-mono">
                    {paragraph}
                  </div>
                );
              }

              return (
                <p key={idx} className="text-zinc-300 leading-relaxed text-sm">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#111019] border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Author: Tariku Meseret</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

