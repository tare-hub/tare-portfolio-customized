import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '0123456789ABCDEFТАРИКУ0101<>/{};*#+~λπ∑LARAVEL_VUE3_MYSQL';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Semi-transparent fade
      ctx.fillStyle = 'rgba(7, 6, 11, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is bright white-emerald
        ctx.fillStyle = '#6ee7b7';
        ctx.fillText(text, x, y);

        // Body character
        ctx.fillStyle = '#10b981';
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-black/60 backdrop-blur-xs animate-fadeIn">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Exit Pill */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="px-4 py-2 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 hover:text-white font-mono text-xs flex items-center gap-2 shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={14} />
          <span>Exit Matrix Mode (ESC)</span>
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

