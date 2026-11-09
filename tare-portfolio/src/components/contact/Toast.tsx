import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12111a] border border-rose-500/60 shadow-2xl text-xs font-mono text-white animate-bounce">
      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="p-1 hover:text-zinc-400 text-zinc-600">
        <X size={14} />
      </button>
    </div>
  );
};

