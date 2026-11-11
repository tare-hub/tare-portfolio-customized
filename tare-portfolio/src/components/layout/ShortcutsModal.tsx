import React from 'react';
import { X, Keyboard, Sparkles, Terminal } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], desc: 'Open Interactive Developer CLI / Command Palette' },
  { keys: ['T'], desc: 'Quick cycle accent theme (Crimson, Cyan, Emerald, etc.)' },
  { keys: ['R'], desc: 'Open formatted Curriculum Vitae / Resume' },
  { keys: ['X'], desc: 'Toggle Cyber Matrix Digital Rain mode' },
  { keys: ['C'], desc: 'Jump to 3D Developer Photo Cube' },
  { keys: ['Z'], desc: 'Jump to Zero-Gravity Tech Cosmos' },
  { keys: ['Esc'], desc: 'Close any active modal or return to default view' },
  { keys: ['?'], desc: 'Display this keyboard shortcuts cheatsheet' },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0e0d16] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#14121e] border-b border-zinc-800">
          <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-300">
            <Keyboard size={16} className="text-rose-500" />
            <span className="font-bold text-white">KEYBOARD SHORTCUTS CHEATSHEET</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-2.5 font-mono text-xs">
          {SHORTCUTS.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <span className="text-zinc-300 text-[11px]">{item.desc}</span>
              <div className="flex items-center gap-1 shrink-0 ml-3">
                {item.keys.map((k) => (
                  <kbd
                    key={k}
                    className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-[10px] shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 bg-[#111019] border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Engineered for power users & developers</span>
          <span className="text-rose-400">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

