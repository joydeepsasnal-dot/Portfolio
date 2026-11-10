import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/portfolioData';
import { Cpu, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (matching screenshot format) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold mb-2">
            / Engineering Approach
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-stone-900 tracking-tight">
            Here's how it works
          </h2>
          <p className="text-stone-600 mt-4 text-sm sm:text-base">
            From low-level memory planning to responsive recruiter-facing delivery, every project follows a disciplined engineering lifecycle.
          </p>
        </div>

        {/* 3 Step Cards with Playful Connecting Line */}
        <div className="relative">
          {/* Curving green thread SVG behind cards on large screens */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none -z-0">
            <svg className="w-full h-32" viewBox="0 0 1000 120" fill="none" preserveAspectRatio="none">
              <path
                d="M 120,60 C 280,10 400,110 520,60 C 640,10 780,110 900,60"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl sm:text-5xl font-sans font-bold text-stone-200 group-hover:text-emerald-500/80 transition-colors">
                    {step.step}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono">
                    {step.badge}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Production & Recruiter Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
