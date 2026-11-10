import React, { useState, useEffect, useRef } from 'react';
import { Project, TechnicalDoc } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { X, Copy, Check, Terminal, Cpu, FileCode2, Gauge, ShieldAlert, ArrowRight } from 'lucide-react';

interface TechnicalDocsModalProps {
  initialProjectId?: string;
  onClose: () => void;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({
  initialProjectId,
  onClose,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || PROJECTS[0].id
  );
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'benchmarks' | 'challenges'>('architecture');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex="0"]'
      ) ?? []).filter((item) => !item.hasAttribute('disabled') && item.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);

  const currentProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];
  const doc = currentProject.technicalDoc;

  const handleCopyCode = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      window.alert("Copy failed. Please select and copy the text manually.");
      return;
    }
    setCopiedSnippetIndex(idx);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Technical documentation" tabIndex={-1} className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-emerald-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                Technical Documentation & Architecture Hub
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                Engineering specs • Memory layout • Algorithm complexity proofs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-600 transition cursor-pointer"
            aria-label="Close Documentation Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Switcher Bar */}
        <div className="px-6 py-3 bg-white border-b border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-stone-400 uppercase tracking-wider mr-2">
            Select Spec:
          </span>
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                selectedProjectId === proj.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <span>{proj.title}</span>
              <span className="text-[10px] opacity-75 font-mono">
                ({proj.languages.join(', ')})
              </span>
            </button>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-stone-200 flex items-center gap-6 text-sm font-medium text-stone-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Architecture & Complexity</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Code Implementations</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`py-3 border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'benchmarks'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Benchmarks & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`py-3 border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'challenges'
                ? 'border-emerald-600 text-emerald-800 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Engineering Challenges</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Architecture & Complexity */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-2">
                  System Overview
                </h4>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                  {doc.overview}
                </p>
              </div>

              {/* Architecture Pipeline */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-2">
                  Pipeline Architecture
                </h4>
                <div className="bg-stone-900 text-stone-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-stone-800">
                  <span className="text-emerald-400 block mb-1.5">// Structural flow</span>
                  {doc.architectureSummary}
                </div>
              </div>

              {/* Asymptotic Complexity Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                  <span className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-bold block mb-1">
                    Time Complexity (Big-O)
                  </span>
                  <p className="text-sm font-semibold text-emerald-950 font-mono">
                    {doc.complexity.time}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                  <span className="text-xs font-mono text-blue-800 uppercase tracking-wider font-bold block mb-1">
                    Space Complexity (Memory)
                  </span>
                  <p className="text-sm font-semibold text-blue-950 font-mono">
                    {doc.complexity.space}
                  </p>
                </div>
              </div>

              {/* Algorithms & Data Structures lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-3">
                    Algorithms Implemented
                  </h4>
                  <ul className="space-y-2">
                    {doc.algorithmsUsed.map((algo, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{algo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-3">
                    Core Data Structures
                  </h4>
                  <ul className="space-y-2">
                    {doc.dataStructures.map((ds, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="text-blue-600 font-bold">❖</span>
                        <span>{ds}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Code Implementations */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              {doc.codeSnippets.map((snippet, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-stone-800 shadow-md">
                  <div className="bg-stone-900 px-4 py-2.5 flex items-center justify-between text-xs text-stone-300 border-b border-stone-800">
                    <span className="font-mono font-medium text-emerald-400">
                      {snippet.title}
                    </span>
                    <button
                      onClick={() => handleCopyCode(snippet.code, idx)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
                    >
                      {copiedSnippetIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-stone-950 p-4 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="bg-stone-900/90 px-4 py-2.5 text-xs text-stone-400 border-t border-stone-800/80">
                    <span className="text-stone-300 font-semibold">Engineering Note:</span> {snippet.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Benchmarks */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Benchmarks measured on Intel Core i7 / Chromium V8 runtime under deterministic test conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {doc.benchmarks.map((bench, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                    <span className="text-xs font-mono text-stone-500 block">
                      {bench.label}
                    </span>
                    <p className="text-2xl font-bold font-sans text-stone-900">
                      {bench.value}
                    </p>
                    <p className="text-xs text-stone-600">
                      {bench.comparison}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Challenges Solved */}
          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold">
                Technical Roadblocks & Engineering Solutions
              </h4>
              <div className="space-y-3">
                {doc.challengesSolved.map((chal, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {chal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-mono">
            Document Version: 2026.1 • Ready for Technical Recruiters
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-stone-900 hover:bg-black text-white font-medium transition cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

