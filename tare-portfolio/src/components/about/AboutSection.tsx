import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-zinc-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center gap-4 text-xs font-mono text-rose-500 mb-8">
          <span className="font-bold tracking-widest">01 / ABOUT</span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Title & Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Curiosity turns <br />
                ideas into <br />
                <span className="text-rose-500">reality.</span>
              </h2>
              <p className="text-sm font-mono text-zinc-500 mt-2">
                ENGINEERING RESILIENT WEB PLATFORMS WITH PURPOSE.
              </p>
            </div>

            {/* Tariku Meseret Photo Card */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121019] p-3 shadow-2xl group max-w-sm">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/assets/tariku-about.jpg"
                  alt="Tariku Meseret"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm font-bold tracking-tight">Tariku Meseret</div>
                    <div className="text-[10px] font-mono text-rose-400">Full-Stack Web Developer</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 border border-emerald-500/50 text-[9px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl sm:text-2xl text-zinc-200 font-medium leading-relaxed">
              I’m a developer who enjoys turning ambiguous problems into intuitive, practical digital solutions.
            </p>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>
                My work spans the full software development lifecycle — from architecting normalized database schemas in MariaDB/MySQL and building secure REST APIs in Laravel, to crafting snappy, accessible interfaces in Vue 3 and modern JavaScript.
              </p>
              <p>
                Whether it's building a complex multi-vendor pharmaceutical marketplace like <span className="text-zinc-200 font-semibold">PharmaJiji</span> or structuring fleet telematics in <span className="text-zinc-200 font-semibold">AutoDrive</span>, I prioritize maintainability, defensive validation, and seamless user experiences.
              </p>
            </div>

            {/* Principle highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0f0e15] border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                  <Zap size={14} /> PERFORMANCE FIRST
                </div>
                <p className="text-xs text-zinc-400">
                  Sub-100ms API responses, optimized database indexes, and zero-layout-shift UI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f0e15] border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                  <ShieldCheck size={14} /> BULLETPROOF SECURITY
                </div>
                <p className="text-xs text-zinc-400">
                  Sanitized inputs, pessimistic concurrency locks, and strict RBAC authorization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f0e15] border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                  <CheckCircle2 size={14} /> MODULAR ARCHITECTURE
                </div>
                <p className="text-xs text-zinc-400">
                  Service-Repository patterns, reactive composables, and clean separation of concerns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f0e15] border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                  <HeartHandshake size={14} /> COLLABORATION READY
                </div>
                <p className="text-xs text-zinc-400">
                  Clear documentation, semantic Git workflows, and thoughtful pair programming.
                </p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 text-sm font-mono font-bold text-white border-b-2 border-rose-500 pb-1 hover:text-rose-400 transition-colors"
              >
                <span>Have a project or opportunity in mind? Let's talk</span>
                <ArrowUpRight size={14} className="text-rose-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

