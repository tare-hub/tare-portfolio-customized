import React, { useState } from 'react';
import { SkillItem } from '../../types';
import { X, Copy, Check, Code2, Info } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface SkillCodeModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export const SkillCodeModal: React.FC<SkillCodeModalProps> = ({ skill, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!skill) return null;

  const handleCopy = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(skill.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#0e0d14] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#14131d] border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-800 text-rose-400">
              <Code2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-base">{skill.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  {skill.experience} Exp
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">{skill.codeSnippet.filename}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 font-mono"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#07060a]">
          <pre className="font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto whitespace-pre p-4 bg-[#0c0b11] rounded-xl border border-zinc-800/80">
            {skill.codeSnippet.code}
          </pre>

          {/* Rationale Box */}
          <div className="mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
            <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                Engineering Rationale
              </h5>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {skill.codeSnippet.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

