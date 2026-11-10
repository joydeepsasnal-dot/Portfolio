import React from 'react';
import { Cpu, Terminal, Layers, Code, Sparkles, Compass } from 'lucide-react';

export const IntroPhilosophySection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50/60 border-y border-stone-200/60 relative overflow-hidden">
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-4">
          <span className="font-serif italic text-2xl md:text-3xl text-emerald-700">
            Hallo!
          </span>
        </div>

        {/* Floating Skill Chips (as seen in the reference screenshot) */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            C Programming & Arena Allocators
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Python Graph Theory & DAGs
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            HTML5 Canvas & Web Audio
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-purple-800">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Modern CSS Glassmorphism
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Algorithmic Rigor & Big-O
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-stone-800">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
            Technical Documentation
          </span>
        </div>

        {/* Central Bold Philosophy Statement */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl text-stone-800 font-normal tracking-tight leading-snug">
            focus is on blending{' '}
            <span className="font-semibold text-stone-950 underline decoration-emerald-400 decoration-wavy decoration-1 underline-offset-4">
              low-level memory efficiency
            </span>
            ,{' '}
            <span className="font-serif italic text-emerald-800">algorithmic rigor</span>, and{' '}
            <span className="font-semibold text-stone-950">clean frontend craft</span> to build resilient systems that solve real problems.
          </p>
        </div>
      </div>
    </section>
  );
};
