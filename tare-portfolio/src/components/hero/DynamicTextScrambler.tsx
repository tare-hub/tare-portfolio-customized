import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const WORDS = [
  'digital platforms',
  'enterprise backends',
  'scalable REST APIs',
  'modern web apps',
  'resilient systems',
  'useful solutions',
];

const GLYPHS = '!<>-_/[]{}*#01';

export const DynamicTextScrambler: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(WORDS[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleTo = (targetWord: string) => {
    setIsScrambling(true);
    soundFx.playKeypress();

    let iteration = 0;
    const maxIterations = targetWord.length * 2;

    const interval = setInterval(() => {
      setDisplayText(
        targetWord
          .split('')
          .map((char, i) => {
            if (i < iteration / 2) {
              return char;
            }
            if (char === ' ') return ' ';
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(targetWord);
        setIsScrambling(false);
      }

      iteration++;
    }, 28);
  };

  const nextWord = () => {
    soundFx.playClick();
    const nextIdx = (index + 1) % WORDS.length;
    setIndex(nextIdx);
    scrambleTo(WORDS[nextIdx]);
  };

  // Auto-cycle periodically if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % WORDS.length;
        scrambleTo(WORDS[next]);
        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <span
      onClick={nextWord}
      onMouseEnter={() => soundFx.playHover()}
      title="Click to cycle engineering focus"
      className="inline-flex items-center gap-1.5 cursor-pointer text-rose-500 hover:text-rose-400 underline decoration-rose-500/40 underline-offset-8 transition-colors select-none group whitespace-nowrap"
    >
      <span>{displayText}</span>
      <span className="inline-block p-1 rounded-md bg-rose-500/10 text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all text-xs align-middle">
        <RefreshCw size={12} className={isScrambling ? 'animate-spin' : ''} />
      </span>
    </span>
  );
};

