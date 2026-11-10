import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal, Sparkles, FileText, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenDoc: (projectId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenDoc }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-black/[0.04] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-baseline gap-2 text-2xl font-serif italic text-stone-900 tracking-tight"
          >
            <span>{PERSONAL_INFO.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] group-hover:scale-150 transition-transform"></span>
          </a>
        </div>

        {/* Central Laurel Badge / Title (from reference) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 border border-stone-200/60 text-xs font-medium text-stone-600 shadow-xs">
          <span className="text-amber-500 font-serif">🏆</span>
          <span>Google Website Of The Day 2026</span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500">Software Engineer</span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600" aria-label="Main Navigation">
          <button
            onClick={() => scrollTo('selected-works')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Selected Works
          </button>
          <button
            onClick={() => scrollTo('core-languages')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Core Languages
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Engineering Approach
          </button>
          <button
            onClick={() => onOpenDoc()}
            className="flex items-center gap-1.5 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Technical Docs</span>
          </button>
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 text-sm font-medium hover:bg-black transition-all shadow-sm hover:shadow cursor-pointer active:scale-98"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full hover:bg-stone-100 text-stone-800 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available for new opportunities</span>
          </div>
          <div className="flex flex-col space-y-3 pt-2 text-base font-medium text-stone-700">
            <button
              onClick={() => scrollTo('selected-works')}
              className="text-left py-2 hover:text-black border-b border-stone-100"
            >
              Selected Works
            </button>
            <button
              onClick={() => scrollTo('core-languages')}
              className="text-left py-2 hover:text-black border-b border-stone-100"
            >
              Core Languages (C, Python, HTML, CSS)
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-2 hover:text-black border-b border-stone-100"
            >
              Engineering Approach
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDoc();
              }}
              className="text-left py-2 hover:text-black flex items-center justify-between border-b border-stone-100"
            >
              <span>Technical Documentation</span>
              <Terminal className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-stone-900 text-white font-medium text-sm shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch with Joydeep</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
