import React, { useState } from 'react';
import { Project, CoreLanguageType } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { EchoesOfTheWildDemo } from './EchoesOfTheWildDemo';
import { SafarMusicDemo } from './SafarMusicDemo';
import { TaskManagerDemo } from './TaskManagerDemo';
import { ArrowUpRight, Terminal, Sparkles, Code2, PlayCircle, Eye } from 'lucide-react';

interface SelectedWorksSectionProps {
  onOpenDoc: (projectId: string) => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({ onOpenDoc }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeLiveDemoId, setActiveLiveDemoId] = useState<string>('echoes-of-the-wild');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeTab === 'all') return true;
    return proj.languages.includes(activeTab as CoreLanguageType);
  });

  return (
    <section id="selected-works" className="py-24 bg-stone-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title matching screenshot format */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold mb-2">
            / Best Projects
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-stone-900 tracking-tight">
            Selected Works
          </h2>
          <p className="text-stone-600 mt-4 text-sm sm:text-base">
            Engineered with low-level C memory routines, Python graph theory, semantic HTML5 audio synthesis, and responsive CSS systems.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['all', 'C', 'Python', 'HTML', 'CSS'].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeTab === lang
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {lang === 'all' ? 'All Projects (3)' : `${lang} Language`}
            </button>
          ))}
        </div>

        {/* Live Interactive Sandbox Drawer / Switcher */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
                Interactive Live Demo Arena
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveLiveDemoId(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    activeLiveDemoId === p.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{p.title}</span>
                  <span className="sm:hidden">{p.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Live Demo Component */}
          <div className="transition-all duration-300">
            {activeLiveDemoId === 'echoes-of-the-wild' && (
              <EchoesOfTheWildDemo onOpenDoc={() => onOpenDoc('echoes-of-the-wild')} />
            )}
            {activeLiveDemoId === 'safar-music' && (
              <SafarMusicDemo onOpenDoc={() => onOpenDoc('safar-music')} />
            )}
            {activeLiveDemoId === 'task-manager-dashboard' && (
              <TaskManagerDemo onOpenDoc={() => onOpenDoc('task-manager-dashboard')} />
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Languages Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-stone-100 text-stone-800 border border-stone-200/80"
                    >
                      {lang}
                    </span>
                  ))}
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold ml-auto">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold font-sans text-stone-900 group-hover:text-emerald-700 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-stone-500 mt-1 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Optional Project Screenshot / Art Preview */}
                {project.imageUrl && (
                  <div className="mb-4 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs relative group/img aspect-video bg-black">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs"
                      >
                        <PlayCircle className="w-5 h-5 text-[#b4f34d]" />
                        <span>Play Full Game ↗</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <span className="text-[10px] font-mono text-stone-400 block uppercase">
                        {m.label}
                      </span>
                      <span className="text-xs font-bold font-mono text-stone-800">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveLiveDemoId(project.id);
                      const el = document.getElementById('selected-works');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-emerald-600" />
                    <span>Demo</span>
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition"
                    >
                      <span>Play Game</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onOpenDoc(project.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-medium transition cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Tech Docs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
