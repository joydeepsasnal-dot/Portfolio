/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroPhilosophySection } from './components/IntroPhilosophySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { LanguagesMatrixSection } from './components/LanguagesMatrixSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';

export default function App() {
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);
  const [activeDocProjectId, setActiveDocProjectId] = useState<string | undefined>(undefined);

  const handleOpenDoc = (projectId?: string) => {
    setActiveDocProjectId(projectId);
    setDocModalOpen(true);
  };

  const handleCloseDoc = () => {
    setDocModalOpen(false);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('selected-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        onOpenContact={scrollToContact}
        onOpenDoc={() => handleOpenDoc()}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section matching screenshot layout */}
        <HeroSection
          onGetInTouch={scrollToContact}
          onExploreProjects={scrollToProjects}
          onOpenDoc={() => handleOpenDoc('echoes-of-the-wild')}
        />

        {/* Intro Philosophy Section ("Hallo! focus is on...") */}
        <IntroPhilosophySection />

        {/* Engineering Approach ("Here's how it works" 01, 02, 03) */}
        <HowItWorksSection />

        {/* Selected Works (Echoes of the Wild, Safar Music, Task Manager) */}
        <SelectedWorksSection
          onOpenDoc={(projId) => handleOpenDoc(projId)}
        />

        {/* Core 4 Languages Matrix (C, Python, HTML, CSS) */}
        <LanguagesMatrixSection
          onOpenDoc={(projId) => handleOpenDoc(projId)}
        />

        {/* Testimonials & Endorsements */}
        <TestimonialsSection />

        {/* Recruiter Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Technical Documentation Modal */}
      {docModalOpen && (
        <TechnicalDocsModal
          initialProjectId={activeDocProjectId}
          onClose={handleCloseDoc}
        />
      )}
    </div>
  );
}
