import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const InteractiveCodeRunner: React.FC = () => {
  const [developerState, setDeveloperState] = useState({
    name: 'Tariku Meseret',
    role: 'Full-Stack Web Dev',
    passion: 'Building High-Impact Systems',
    status: 'Available for hire',
    learning: true,
  });

  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    soundFx.playClick();
    setIsRunning(true);
    setConsoleOutput('Compiling developer module...');

    setTimeout(() => {
      soundFx.playSuccess();
      setIsRunning(false);
      setConsoleOutput(`[STDOUT: SUCCESS (0ms)]
> Loaded developer profile: ${developerState.name}
> Role: ${developerState.role}
> Status: ${developerState.status}
> Primary Focus: Enterprise Laravel & Reactive Vue 3
✓ Ready to build extraordinary digital products.`);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7, x: 0.75 },
      });
    }, 450);
  };

  const handleReset = () => {
    soundFx.playClick();
    setDeveloperState({
      name: 'Tariku Meseret',
      role: 'Full-Stack Web Dev',
      passion: 'Building High-Impact Systems',
      status: 'Available for hire',
      learning: true,
    });
    setConsoleOutput(null);
  };

  const handleCopy = () => {
    soundFx.playClick();
    const codeString = `const developer = ${JSON.stringify(developerState, null, 2)};\nconsole.log(developer);`;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-lg bg-[#0e0d14]/95 border border-zinc-800/90 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-zinc-700">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#14121b] border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400 ml-2">developer.ts</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
            title="Copy Code"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xs flex items-center gap-1"
            title="Reset Code"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs flex items-center gap-1.5 font-bold shadow-lg shadow-rose-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <Play size={10} className="fill-current" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300 space-y-1 overflow-x-auto">
        <div className="text-zinc-500">
          <span className="text-zinc-600 mr-3">01</span>
          <span className="text-purple-400">interface</span> <span className="text-amber-300">Developer</span> {'{'}
        </div>
        <div className="text-zinc-500 flex flex-wrap">
          <span className="text-zinc-600 mr-3">02</span>
          <span>&nbsp;&nbsp;name: <span className="text-emerald-300">string</span>; role: <span className="text-emerald-300">string</span>; status: <span className="text-emerald-300">string</span>;</span>
        </div>
        <div className="text-zinc-500">
          <span className="text-zinc-600 mr-3">03</span>
          {'}'}
        </div>
        <div className="pt-1">
          <span className="text-zinc-600 mr-3">04</span>
          <span className="text-purple-400">const</span> <span className="text-blue-300">developer</span>: <span className="text-amber-300">Developer</span> = {'{'}
        </div>
        <div>
          <span className="text-zinc-600 mr-3">05</span>
          &nbsp;&nbsp;name: <span className="text-emerald-400">'{developerState.name}'</span>,
        </div>
        <div>
          <span className="text-zinc-600 mr-3">06</span>
          &nbsp;&nbsp;role: <span className="text-emerald-400">'{developerState.role}'</span>,
        </div>
        <div>
          <span className="text-zinc-600 mr-3">07</span>
          &nbsp;&nbsp;passion: <span className="text-emerald-400">'{developerState.passion}'</span>,
        </div>
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-zinc-600 mr-3">08</span>
          <span>&nbsp;&nbsp;status:&nbsp;</span>
          <select
            value={developerState.status}
            onChange={(e) => {
              soundFx.playClick();
              setDeveloperState({ ...developerState, status: e.target.value });
            }}
            className="bg-zinc-900 border border-zinc-700 text-emerald-400 font-mono text-xs rounded px-1.5 py-0.5 outline-none hover:border-rose-500 cursor-pointer max-w-[155px] sm:max-w-none truncate"
          >
            <option value="Available for hire">Available for hire</option>
            <option value="Open for contract projects">Open for contract projects</option>
            <option value="Architecting PharmaJiji">Architecting PharmaJiji</option>
            <option value="Building high-impact systems">Building high-impact systems</option>
          </select>
        </div>
        <div>
          <span className="text-zinc-600 mr-3">09</span>
          &nbsp;&nbsp;learning: <span className="text-amber-400">{String(developerState.learning)}</span>
        </div>
        <div>
          <span className="text-zinc-600 mr-3">10</span>
          {'};'}
        </div>
        <div className="pt-1 text-zinc-400 flex items-center">
          <span className="text-zinc-600 mr-3">11</span>
          <span className="text-blue-400">console</span>.<span className="text-amber-300">log</span>(developer);
          <span className="inline-block w-1.5 h-3.5 bg-rose-500 ml-1.5 animate-pulse" />
        </div>
      </div>

      {/* Interactive Execution Output Console */}
      {consoleOutput && (
        <div className="border-t border-zinc-800 bg-[#08070b] p-3 text-[11px] font-mono text-emerald-400">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1.5">
            <span className="flex items-center gap-1">
              <Terminal size={11} /> OUTPUT CONSOLE
            </span>
            <span className="text-emerald-500 flex items-center gap-1">
              <Sparkles size={10} /> 0 errors / 0 warnings
            </span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">{consoleOutput}</pre>
        </div>
      )}
    </div>
  );
};

