import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold mb-2">
            / Social Proof & Endorsements
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-stone-900 tracking-tight">
            Trusted by Engineering Leads
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-stone-50/80 rounded-3xl p-8 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div>
                <Quote className="w-8 h-8 text-stone-300 mb-4" />
                <p className="text-sm text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 font-serif italic text-base flex items-center justify-center font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{t.author}</h4>
                  <p className="text-xs text-stone-500 font-mono">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
