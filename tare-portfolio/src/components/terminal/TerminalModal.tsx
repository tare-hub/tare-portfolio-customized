import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { downloadVCard } from '../../utils/vcard';
import { AccentTheme } from '../../types';
import confetti from 'canvas-confetti';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AccentTheme;
  onThemeChange: (theme: AccentTheme) => void;
  onSelectProject: (projectId: string) => void;
  onOpenResume?: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string | React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  onSelectProject,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: 'system',
      text: (
        <div>
          <span className="text-zinc-500">Tare DevOS v2.4.0 (x86_64-tare-kernel)</span>
          <br />
          Type <span className="text-amber-400 font-bold">help</span> to view available commands, or <span className="text-emerald-400 font-bold">sudo hire</span> for quick recruiter access.
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundFx.playClick();
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `$ ${trimmed}` }];
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
              <div><span className="text-amber-400 font-bold">about</span>: Developer bio & mission</div>
              <div><span className="text-amber-400 font-bold">skills</span>: Technical competencies</div>
              <div><span className="text-amber-400 font-bold">projects</span>: Selected case studies</div>
              <div><span className="text-amber-400 font-bold">view [id]</span>: Deep inspect project (e.g. view pharmajiji)</div>
              <div><span className="text-amber-400 font-bold">cube</span>: Inspect interactive 3D developer photo cube</div>
              <div><span className="text-amber-400 font-bold">space</span>: Launch Zero-Gravity Tech Cosmos</div>
              <div><span className="text-amber-400 font-bold">contact</span>: Contact channels & direct email</div>
              <div><span className="text-amber-400 font-bold">theme [color]</span>: crimson | cyan | emerald | purple | amber</div>
              <div><span className="text-amber-400 font-bold">sound [on|off]</span>: Toggle audio synthesizer</div>
              <div><span className="text-amber-400 font-bold">vcard</span>: Download digital contact card</div>
              <div><span className="text-amber-400 font-bold">sudo hire</span>: Recruiter instant action</div>
              <div><span className="text-amber-400 font-bold">clear</span>: Clear terminal window</div>
              <div><span className="text-amber-400 font-bold">exit</span>: Close terminal CLI</div>
            </div>
          ),
        });
        break;

      case 'about':
      case 'bio':
        newLogs.push({
          type: 'output',
          text: 'Tariku Meseret (Tare) — Full-Stack Web Developer based in Addis Ababa, Ethiopia. Passionate about building robust Laravel backends, modern reactive Vue/React frontends, and dependable database architectures that solve meaningful problems.',
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div>PHP / Laravel 13 &nbsp;&nbsp;&nbsp;&nbsp;[████████████████░░] 92%</div>
              <div>JavaScript / TypeScript [███████████████░░░] 89%</div>
              <div>Vue 3 & Pinia &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[███████████████░░░] 88%</div>
              <div>MySQL & MariaDB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[██████████████░░░░] 87%</div>
              <div>REST APIs & Architecture [████████████████░░] 90%</div>
              <div>Modern CSS & Tailwind &nbsp;[████████████████░░] 93%</div>
            </div>
          ),
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div>1. <span className="text-white font-bold">pharmajiji</span> - Multi-Vendor Healthcare Marketplace (Laravel + Vue 3)</div>
              <div>2. <span className="text-white font-bold">autodrive</span> - Fleet Rental & Dealership Management (Laravel + MySQL)</div>
              <div>3. <span className="text-white font-bold">media-works</span> - Immersive Multimedia Storytelling Platform</div>
              <div>4. <span className="text-white font-bold">devpulse</span> - Cloud Microservices Telemetry Sentinel</div>
              <div className="text-zinc-500 pt-1">Type 'view pharmajiji' to open architecture modal.</div>
            </div>
          ),
        });
        break;

      case 'view':
        if (!args[0]) {
          newLogs.push({ type: 'error', text: 'Usage: view <pharmajiji | autodrive | media-works | devpulse>' });
        } else {
          const target = args[0].toLowerCase();
          onSelectProject(target);
          newLogs.push({ type: 'success', text: `Opening project architecture: ${target}` });
          onClose();
        }
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs">
              <div>Email: <a href="mailto:meserettariku921@gmail.com" className="text-amber-400 underline">meserettariku921@gmail.com</a></div>
              <div>GitHub: <a href="https://github.com/tare-hub" target="_blank" rel="noreferrer" className="text-amber-400 underline">https://github.com/tare-hub</a></div>
              <div>LinkedIn: <a href="https://www.linkedin.com/in/tariku-meseret-b9165741b" target="_blank" rel="noreferrer" className="text-amber-400 underline">tariku-meseret-b9165741b</a></div>
              <div>Location: Addis Ababa, Ethiopia (UTC+3)</div>
            </div>
          ),
        });
        break;

      case 'theme':
        if (!args[0]) {
          newLogs.push({ type: 'output', text: `Current theme: ${currentTheme}. Options: crimson, cyan, emerald, purple, amber.` });
        } else {
          const chosen = args[0].toLowerCase() as AccentTheme;
          if (['crimson', 'cyan', 'emerald', 'purple', 'amber'].includes(chosen)) {
            onThemeChange(chosen);
            newLogs.push({ type: 'success', text: `Theme accent switched to: ${chosen}` });
          } else {
            newLogs.push({ type: 'error', text: `Unknown theme '${args[0]}'. Choose from: crimson, cyan, emerald, purple, amber` });
          }
        }
        break;

      case 'sound':
        if (args[0] === 'on') {
          soundFx.setEnabled(true);
          newLogs.push({ type: 'success', text: 'Audio synthesizer enabled.' });
        } else if (args[0] === 'off') {
          soundFx.setEnabled(false);
          newLogs.push({ type: 'output', text: 'Audio synthesizer muted.' });
        } else {
          newLogs.push({ type: 'output', text: `Sound is currently: ${soundFx.enabled ? 'ON' : 'OFF'}. Use 'sound on' or 'sound off'.` });
        }
        break;

      case 'vcard':
        downloadVCard();
        newLogs.push({ type: 'success', text: 'Downloading Tariku Meseret contact card (.vcf)...' });
        break;

      case 'resume':
      case 'cv':
        if (onOpenResume) {
          onOpenResume();
          newLogs.push({ type: 'success', text: 'Opening Tariku Meseret Curriculum Vitae modal...' });
          onClose();
        } else {
          downloadVCard();
          newLogs.push({ type: 'success', text: 'Triggered contact card download.' });
        }
        break;

      case 'sudo':
        if (args[0] === 'hire') {
          soundFx.playSuccess();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          newLogs.push({
            type: 'success',
            text: (
              <div className="border border-emerald-500/50 bg-emerald-950/40 p-3 rounded my-2 text-emerald-300">
                <div className="font-bold flex items-center gap-2">
                  <Sparkles size={16} /> ACCESS GRANTED: PRIORITY RECRUITER CHANNEL
                </div>
                <div className="mt-1 text-xs">
                  Tariku is available for full-time roles, contract work, and impactful engineering opportunities.
                  <br />
                  Direct line: <a href="mailto:meserettariku921@gmail.com" className="underline font-bold text-white">meserettariku921@gmail.com</a>
                </div>
              </div>
            ),
          });
        } else {
          newLogs.push({ type: 'error', text: `User 'guest' is not in the sudoers file. Try 'sudo hire'.` });
        }
        break;

      case 'cube':
      case '3d':
        newLogs.push({
          type: 'output',
          text: (
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="text-rose-400 font-bold font-mono">✦ 3D INTERACTIVE DEVELOPER CUBE</div>
              <p>A 190px interactive 3D CSS cube featuring Tariku Meseret&apos;s developer portrait across all 6 faces with drag-to-rotate interaction.</p>
              <div className="text-[11px] text-zinc-400">Faces: TARE/DEV, FULL-STACK, ETHIOPIA, SYSTEM ARCHITECT, LARAVEL 13, VUE 3</div>
            </div>
          ),
        });
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'space':
      case 'cosmos':
      case 'gravity':
        newLogs.push({
          type: 'output',
          text: (
            <div className="space-y-1 text-xs text-cyan-300 font-mono">
              <div>✦ ZERO-GRAVITY TECH COSMOS</div>
              <div className="text-zinc-400">Navigating to floating physics space below ticker...</div>
            </div>
          ),
        });
        document.getElementById('space')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: '${command}'. Type 'help' to see valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.playKeypress();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0c0b10] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#13121a] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="ml-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <TerminalIcon size={14} className="text-zinc-500" />
              <span>tare@dev-machine:~ (CLI v2.4)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">Press ESC to exit</span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 bg-[#09080d]/95 text-zinc-300 min-h-[300px]"
        >
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log.type === 'input' && <div className="text-amber-400 font-semibold">{log.text}</div>}
              {log.type === 'output' && <div className="text-zinc-300 pl-2">{log.text}</div>}
              {log.type === 'error' && <div className="text-rose-400 pl-2">{log.text}</div>}
              {log.type === 'success' && <div className="text-emerald-400 pl-2">{log.text}</div>}
              {log.type === 'system' && <div className="text-zinc-400 mb-2 border-b border-zinc-800/80 pb-2">{log.text}</div>}
            </div>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#100f16] border-t border-zinc-800">
          <span className="text-emerald-400 font-mono text-xs">tare@work:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'projects', 'sudo hire'..."
            className="flex-1 bg-transparent border-0 outline-none font-mono text-xs text-white placeholder-zinc-600 focus:ring-0"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Execute"
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

