import React from 'react';
import { ArrowDownRight, ArrowUpRight, Terminal, Sparkles, MapPin, Code2 } from 'lucide-react';
import { InteractiveCodeRunner } from './InteractiveCodeRunner';
import { DynamicTextScrambler } from './DynamicTextScrambler';
import { HeroStatsStrip } from './HeroStatsStrip';
import { HeroQuickDock } from './HeroQuickDock';
import { TiltCardWrapper } from './TiltCardWrapper';
import { Interactive3DCube } from './Interactive3DCube';
import { soundFx } from '../../utils/audio';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onToggleMatrix: () => void;
  isMatrixActive: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenResume,
  onToggleMatrix,
  isMatrixActive,
}) => {
  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Interactive Controls */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="tracking-widest uppercase text-[10px]">AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            {/* Intro Header */}
            <div>
              <p className="text-xs sm:text-sm font-mono text-rose-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                <span>HELLO, I'M TARE</span>
                <span className="text-zinc-600">✳</span>
                <span className="text-zinc-400">TARIKU MESERET</span>
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                I build <br />
                <DynamicTextScrambler /> <br />
                that make an impact.
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-xl shadow-rose-950/50 hover:scale-105 active:scale-95 transition-all"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDownRight size={16} />
              </a>

              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Interactive Quick Dock */}
            <HeroQuickDock
              onOpenTerminal={onOpenTerminal}
              onOpenResume={onOpenResume}
              onToggleMatrix={onToggleMatrix}
              isMatrixActive={isMatrixActive}
            />

            {/* Interactive Performance Metric Strip */}
            <HeroStatsStrip />

            {/* Meta Strip */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-6 text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-rose-500" />
                <span>BASED IN ETHIOPIA</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">/</span>
              <div className="flex items-center gap-1.5">
                <Code2 size={13} className="text-rose-500" />
                <span>LARAVEL · VUE 3 · MYSQL</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline">/</span>
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-rose-500" />
                <span>REST APIS · UI/UX</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Cube + Code Runner & Profile Art */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center gap-6">
            {/* Ambient Background Glows */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

            {/* Interactive 3D Cube with Drag Physics & Photo of Tare (in space above < creative thinking />) */}
            <div className="w-full flex justify-center pt-1">
              <Interactive3DCube />
            </div>

            {/* Code Runner Wrapper with < creative thinking /> tag and Tilt wrapper */}
            <div className="relative w-full max-w-lg">
              {/* Floating Top Tag */}
              <div
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="hidden sm:block absolute -top-4 right-3 z-30 px-3.5 py-1.5 rounded-lg bg-[#14121b] border border-zinc-800 shadow-xl font-mono text-[10px] text-zinc-300 rotate-2 cursor-pointer hover:scale-110 hover:border-rose-500 transition-all select-none"
              >
                &lt; creative thinking /&gt;
              </div>

              {/* 3D Tilt Wrapper around Code Runner and Profile Card */}
              <TiltCardWrapper>
                {/* The Live Interactive Code Runner */}
                <InteractiveCodeRunner />

                {/* Floating Profile Photo Card */}
                <div
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="absolute -bottom-8 -right-3 sm:-right-6 z-20 w-28 sm:w-32 p-2 bg-[#121118]/90 border border-rose-500/40 rounded-xl shadow-2xl backdrop-blur-md transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-[#1e1a26] border border-zinc-800">
                    <img
                      src="/assets/tariku-bw-profile.jpg"
                      alt="Tariku Meseret"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/profile-placeholder.svg';
                      }}
                    />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-md shadow-emerald-500/50" />
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-center text-zinc-300 pt-1.5 font-bold uppercase truncate group-hover:text-rose-400 transition-colors">
                    TARE · DEV
                  </div>
                </div>
              </TiltCardWrapper>

              {/* Floating Bottom Tag */}
              <div
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="hidden sm:flex items-center gap-2 absolute -bottom-5 left-2 z-30 px-3.5 py-1.5 rounded-lg bg-[#14121b] border border-zinc-800 shadow-xl font-mono text-[10px] text-zinc-300 -rotate-2 cursor-pointer hover:scale-110 hover:border-rose-500 transition-all select-none"
              >
                <span className="text-rose-500">✦</span>
                <span>BUILD. LEARN. SCALE.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Marquee Ticker */}
      <div className="mt-20 border-y border-zinc-800/80 bg-[#0c0b11] py-4 overflow-hidden select-none">
        <div className="flex whitespace-nowrap font-mono text-xs tracking-widest text-zinc-400 animate-marquee">
          <span className="mx-4 text-zinc-200">DESIGN MINDED</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">CODE DRIVEN</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">LARAVEL & PHP 8.3</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">VUE 3 & REACT</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">DATABASE ARCHITECTURE</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">REST APIS & MICROSERVICES</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">ACCESSIBILITY FIRST</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">DESIGN MINDED</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">CODE DRIVEN</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">LARAVEL & PHP 8.3</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">VUE 3 & REACT</span>
          <span className="mx-4 text-rose-500">✳</span>
          <span className="mx-4 text-zinc-200">DATABASE ARCHITECTURE</span>
          <span className="mx-4 text-rose-500">✳</span>
        </div>
      </div>
    </section>
  );
};
