import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { validateContactForm } from '../utils/engine';
import { Mail, Copy, Check, Send, CheckCircle2, Building, User, MessageSquare, ArrowUpRight, Sparkles, FileText } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Recruitment',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
    } catch {
      window.alert("Copy failed. Please select and copy the text manually.");
      return;
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleSendViaEmailClient = () => {
    const subject = encodeURIComponent(`[${formData.inquiryType}] Inquiring with Joydeep Sasmal from ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Hello Joydeep,\n\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact-section" className="py-24 bg-gradient-to-b from-white to-[#fbfdfa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-mono font-semibold mb-2">
            / Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-stone-900 tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-stone-600 mt-4 text-sm sm:text-base">
            Open to software engineering roles, systems programming discussions, and full-stack projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Recruiter Quick Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 rounded-3xl p-8 border border-stone-200/90 shadow-2xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-800">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Joydeep Sasmal</h3>
                  <p className="text-xs text-stone-500 font-mono">Software Engineer • Kolkata, India</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Direct Recruiter Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="min-w-0 break-all text-sm font-mono font-bold text-stone-900 hover:text-emerald-700 transition"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold">Actively Interviewing: Available for Full-Time & Contract</span>
              </div>

              {/* Quick Resume Download Callout */}
              <div className="pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Requesting%20Resume%20for%20Joydeep%20Sasmal`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Request Full CV & Academic Transcript</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Recruiter Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl relative">
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-stone-900">
                    Your email draft is ready, {formData.name}!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Nothing has been sent yet. Open your mail app below, then review and send your message to Joydeep. If no mail app opens, use the direct email address.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleSendViaEmailClient}
                      className="px-6 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span>Launch In Default Mail App</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Inquiry Type Chips */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-2">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Recruitment', 'Freelance', 'Engineering Chat', 'General'] as const).map(
                        (type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, inquiryType: type })}
                            className={`py-2 px-3 rounded-xl text-xs font-medium transition border cursor-pointer ${
                              formData.inquiryType === type
                                ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-xs'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                            errors.name
                              ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                              : 'border-stone-300 focus:ring-emerald-500'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                          name="email"
                          value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                            : 'border-stone-300 focus:ring-emerald-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold text-stone-700 mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                          name="company"
                          value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Stripe, DeepMind, or Startup"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 mb-1">
                      Message & Role Details *
                    </label>
                    <textarea
                      rows={4}
                      id="contact-message"
                          name="message"
                          value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity, engineering role, or technical challenge..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-emerald-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-black text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      <span>Prepare Email Draft</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

