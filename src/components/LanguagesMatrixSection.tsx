import React, { useState } from 'react';
import { CORE_LANGUAGES } from '../data/portfolioData';
import { CoreLanguageType } from '../types';
import { Terminal, Code, Cpu, Layers, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface LanguagesMatrixSectionProps {
  onOpenDoc: (projectId?: string) => void;
}

export const LanguagesMatrixSection: React.FC<LanguagesMatrixSectionProps> = ({ onOpenDoc }) => {
  const [selectedLang, setSelectedLang] = useState<CoreLanguageType>('C');

  const currentInfo = CORE_LANGUAGES.find((l) => l.id === selectedLang) || CORE_LANGUAGES[0];

  return (
    <section id="core-languages" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold mb-2">
            / Core Competencies
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-stone-900 tracking-tight">
            The 4 Foundational Languages
          </h2>
          <p className="text-stone-600 mt-4 text-sm sm:text-base">
            Deep technical grounding in systems programming, backend algorithmic problem solving, and modern semantic web architecture.
          </p>
        </div>

        {/* 4 Language Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CORE_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`p-5 rounded-3xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg scale-102'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200/80 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {lang.id}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-400' : 'text-stone-500'}`}>
                    {lang.version}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg">{lang.name}</h3>
                  <p className={`text-xs mt-1 font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {lang.level}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Language Deep-Dive Card */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Deep-Dive: {currentInfo.name}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-stone-900 tracking-tight">
                {currentInfo.tagline}
              </h4>
            </div>

            {/* Core Focus Areas */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-3">
                Key Engineering Focus Areas
              </h5>
              <div className="flex flex-wrap gap-2">
                {currentInfo.focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Architectural Concepts */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-3">
                Architectural Concepts Mastered
              </h5>
              <ul className="space-y-2">
                {currentInfo.concepts.map((concept, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where Applied */}
            <div className="pt-2">
              <button
                onClick={() => onOpenDoc(currentInfo.projectIds[0])}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Technical Specification in Docs →</span>
              </button>
            </div>
          </div>

          {/* Right Code Highlight */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950">
              <div className="bg-stone-900 px-4 py-3 flex items-center justify-between text-xs text-stone-300 border-b border-stone-800">
                <span className="font-mono font-medium text-emerald-400">
                  {currentInfo.codeHighlight.title}
                </span>
                <span className="text-[10px] font-mono uppercase bg-stone-800 px-2 py-0.5 rounded text-stone-400">
                  {currentInfo.codeHighlight.language}
                </span>
              </div>
              <pre className="p-4 sm:p-5 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed">
                <code>{currentInfo.codeHighlight.code}</code>
              </pre>
              <div className="bg-stone-900/90 px-4 py-3 text-xs text-stone-400 border-t border-stone-800 font-sans">
                <span className="text-emerald-400 font-semibold font-mono text-[11px] block sm:inline mr-2">
                  // Rationale:
                </span>
                {currentInfo.codeHighlight.notes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
