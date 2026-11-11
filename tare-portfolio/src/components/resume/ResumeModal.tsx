import React from 'react';
import { X, Printer, Download, MapPin, Mail, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { downloadVCard } from '../../utils/vcard';
import { soundFx } from '../../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0c0b12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 sm:py-4 bg-[#14121d] border-b border-zinc-800">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-white font-bold truncate">TARIKU MESERET — CV</span>
            </div>
            <button
              onClick={onClose}
              className="sm:hidden p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer size={13} />
              <span className="hidden xs:inline">Print / PDF</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                downloadVCard();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-mono text-white flex items-center gap-1.5 font-bold transition-colors"
            >
              <Download size={13} />
              <span>vCard</span>
            </button>
            <button
              onClick={onClose}
              className="hidden sm:inline-flex p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-6 sm:space-y-8 bg-[#09080e] text-zinc-300 font-sans print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-rose-500/50 shadow-md flex-shrink-0 bg-zinc-900">
                  <img
                    src="/assets/tariku-profile.jpg"
                    alt="Tariku Meseret"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/profile-placeholder.svg';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">Tariku Meseret</h1>
                  <p className="text-sm font-mono text-rose-400 font-semibold mt-0.5">
                    Full-Stack Web Developer & Backend Systems Specialist
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={12} className="text-rose-500" />
                  <span>Addis Ababa, Ethiopia (UTC+3)</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={12} className="text-rose-500" />
                  <a href="mailto:meserettariku921@gmail.com" className="text-white hover:underline">
                    meserettariku921@gmail.com
                  </a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <GithubIcon size={12} />
                  <a href="https://github.com/tare-hub" target="_blank" rel="noreferrer" className="text-white hover:underline">
                    github.com/tare-hub
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-2">
              Results-driven Full-Stack Web Developer with 3+ years of experience engineering secure REST APIs, normalized relational databases, and reactive frontend experiences. Strong emphasis on concurrency control, sub-100ms API response latency, and maintainable software architecture.
            </p>
          </div>

          {/* Technical Competencies Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-white font-bold block mb-1">Backend & Languages:</span>
                <span className="text-zinc-400">PHP 8.3+, Laravel 11/12/13, RESTful APIs, OOP, Design Patterns</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-white font-bold block mb-1">Frontend Engineering:</span>
                <span className="text-zinc-400">Vue 3, React 18, TypeScript, Pinia, Tailwind CSS, HTML5, Web Audio</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-white font-bold block mb-1">Databases & Caching:</span>
                <span className="text-zinc-400">MySQL, MariaDB, Redis, EXPLAIN Query Tuning, Spatial GIS</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-white font-bold block mb-1">DevOps & Workflow:</span>
                <span className="text-zinc-400">Git/GitHub, CI/CD Actions, Linux/Bash, Docker, VS Code, Figma</span>
              </div>
            </div>
          </div>

          {/* Major Engineering Case Studies */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Featured Production Architectures
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold text-sm">PharmaJiji — Multi-Vendor Healthcare Marketplace</span>
                  <span className="text-rose-400">Laravel 13 · Vue 3 · MariaDB</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Architected a multi-tenant pharmacy marketplace supporting prescription fulfillment, geolocated drug availability queries, and courier dispatch.
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Implemented pessimistic concurrency locking (\`SELECT FOR UPDATE\`) preventing medication stock-depletion race conditions.</li>
                  <li>Tuned MariaDB spatial indexes, achieving sub-65ms search latency across 5,000+ catalog items.</li>
                  <li>Built responsive Vue 3 Composition API frontend with real-time debounced searches and optimistic UI updates.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold text-sm">AutoDrive — Fleet Rental & Dealership Management System</span>
                  <span className="text-rose-400">Laravel · PHP 8.3 · MySQL · Redis</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Engineered vehicle availability booking calendars, telemetry odometer tracking, and automated PDF contracts.
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Formulated composite database indexing on (status, category, daily_rate) eliminating full table scans.</li>
                  <li>Implemented tag-based Redis caching that dropped API response times from 340ms to 42ms.</li>
                  <li>Built automated queue workers for overdue reservation alerts and payment webhook integrations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-white font-bold text-sm">Media Works — Immersive Storytelling & Advocacy Platform</span>
                  <span className="text-rose-400">HTML5 · CSS3 · Modern JS · Web Audio</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  Engineered high-performance editorial publication featuring magazine typography, interactive audio waveforms, and zero layout shift.
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Achieved 100/100 Lighthouse performance and accessibility scores across mobile and desktop.</li>
                  <li>Engineered procedural Web Audio playback and accessible responsive design.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Values */}
          <div className="border-t border-zinc-800 pt-4 flex flex-col sm:flex-row justify-between gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-white font-bold block mb-1">Education & Focus:</span>
              <span>Computer Science & Software Engineering Foundations</span>
            </div>
            <div>
              <span className="text-white font-bold block mb-1">Availability:</span>
              <span className="text-emerald-400">Open for Full-Time Roles & High-Impact Contracts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
