import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-stone-800/80">
          <div>
            <span className="font-serif italic text-2xl text-white font-normal">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs font-mono text-stone-400 mt-1 max-w-sm">
              Software Engineer specializing in C Systems, Python Algorithms, HTML5 & Modern CSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href="#selected-works"
              className="text-stone-300 hover:text-white transition"
            >
              Selected Works
            </a>
            <a
              href="#core-languages"
              className="text-stone-300 hover:text-white transition"
            >
              Core Languages
            </a>
            <a
              href="#how-it-works"
              className="text-stone-300 hover:text-white transition"
            >
              Engineering Approach
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-emerald-400 hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© {new Date().getFullYear()} Joydeep Sasmal. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with semantic HTML5, CSS3 & TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
