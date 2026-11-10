import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Download, Award, Sparkles, Terminal, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onGetInTouch: () => void;
  onExploreProjects: () => void;
  onOpenDoc: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetInTouch,
  onExploreProjects,
  onOpenDoc,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pb-24 bg-gradient-to-b from-[#fbfdfa] via-white to-white">
      {/* Radiant vibrant lime-green aura glow mesh (matching reference screenshot) */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[580px] md:w-[1100px] md:h-[720px] rounded-full animate-glow-mesh -z-10"
        style={{
          background: 'radial-gradient(circle closest-side, rgba(190, 248, 60, 0.65) 0%, rgba(132, 237, 137, 0.45) 45%, rgba(74, 222, 128, 0.2) 70%, rgba(251, 253, 250, 0) 90%)',
          filter: 'blur(54px)',
        }}
      />
      {/* Top left ambient lime glow */}
      <div 
        className="pointer-events-none absolute -top-12 -left-20 w-96 h-96 rounded-full -z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Top right ambient mint glow */}
      <div 
        className="pointer-events-none absolute -top-12 -right-20 w-96 h-96 rounded-full -z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Laurel Tagline */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs md:text-sm text-stone-700 font-medium backdrop-blur-sm">
            <span className="text-amber-500 font-serif">🌿</span>
            <span className="font-semibold text-stone-900">Google Website Of The Day 2026</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-semibold">
              Software Engineer
            </span>
            <span className="text-amber-500 font-serif">🌿</span>
          </div>
        </div>

        {/* Giant Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stone-900 font-bold font-sans">
            Hi I'm Joydeep
            <span className="block font-serif italic font-normal text-stone-850 mt-1 sm:mt-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-800">
              Software Engineer
            </span>
          </h1>
        </div>

        {/* Hero Interactive Centerpiece & Portrait Card */}
        <div className="relative max-w-4xl mx-auto mt-6">
          {/* Floating Pill Left: "Available for new opportunities" */}
          <div className="sm:absolute sm:left-4 sm:top-12 z-20 mb-4 sm:mb-0 flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-md text-xs sm:text-sm font-medium text-stone-800">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>
          </div>

          {/* Floating Blurb Right: "Passionate about low-level memory efficiency..." */}
          <div className="lg:absolute lg:right-0 lg:top-28 z-20 max-w-xl lg:max-w-[220px] mx-auto mb-6 lg:mb-0 text-center lg:text-right">
            <p className="text-sm md:text-base text-stone-700 font-normal leading-relaxed bg-white/70 backdrop-blur-sm lg:bg-transparent p-3 lg:p-0 rounded-2xl">
              passionate about low-level memory efficiency, algorithmic rigor, and crafting intuitive software experiences that connect users with value.
            </p>
          </div>

          {/* Central Portrait with Real Photo & Glowing Backdrop (matching reference screenshot) */}
          <div className="relative mx-auto w-72 sm:w-80 md:w-96 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-lime-100/70 via-stone-50 to-white flex items-end justify-center">
              {/* Subtle background tech code */}
              <div className="absolute top-4 left-4 font-mono text-[11px] text-emerald-800/35 pointer-events-none select-none z-0">
                <div>#include &lt;stdio.h&gt;</div>
                <div>void* arena_alloc();</div>
                <div>def topological_sort():</div>
              </div>

              {/* Real photo of Joydeep Sasmal */}
              <img
                src="/assets/aistudio/file_0000000025508211a087065bea908f59_031c9fd3.png"
                alt="Joydeep Sasmal - Software Engineer"
                width={1110}
                height={1424}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-[94%] h-auto object-cover object-top relative z-10 filter contrast-[1.03] brightness-[1.01] drop-shadow-xl select-none"
              />

              {/* Bottom fade overlay for seamless blend into card */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />

              {/* Floating tech badge on avatar */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-stone-200/90 shadow-lg flex items-center justify-between text-xs z-30">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-stone-900">Joydeep Sasmal</span>
                </div>
                <span className="text-stone-500 font-mono text-[11px]">C • Py • Web</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Action Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-stone-200/60">
            {/* Recruiter Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-stone-800 text-white font-medium text-xs flex items-center justify-center font-mono">
                  C99
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-blue-600 text-white font-medium text-xs flex items-center justify-center font-mono">
                  Py
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-orange-600 text-white font-medium text-xs flex items-center justify-center font-mono">
                  &lt;/&gt;
                </div>
              </div>
              <div className="text-left text-xs sm:text-sm">
                <p className="font-semibold text-stone-900">Recruiter-Ready Codebase</p>
                <p className="text-stone-500 text-xs">Verified projects with algorithmic docs & interactive demos</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onGetInTouch}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-stone-900 text-white font-medium text-sm hover:bg-black transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreProjects}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white border border-stone-300 text-stone-800 font-medium text-sm hover:bg-stone-50 transition-all shadow-xs cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Explore Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack Ticker (matching bottom brand bar in screenshot) */}
        <div className="mt-16 pt-8 border-t border-stone-200/70">
          <p className="text-center text-xs font-semibold tracking-wider text-stone-400 uppercase mb-6 font-mono">
            Core Engineering Stack & Capabilities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-stone-600">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200/60 font-semibold text-xs sm:text-sm text-stone-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>C Language (Low-Level Systems)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200/60 font-semibold text-xs sm:text-sm text-stone-800">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Python (Graph Algorithms & DAG)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200/60 font-semibold text-xs sm:text-sm text-stone-800">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>HTML5 (Semantic & Canvas API)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200/60 font-semibold text-xs sm:text-sm text-stone-800">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>CSS3 (Modern Responsive & Tokens)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200/60 font-semibold text-xs sm:text-sm text-stone-800">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Data Structures & Complexity Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
