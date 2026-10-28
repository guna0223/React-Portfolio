import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import GenjutsuStartScreen from './components/ui/GenjutsuStartScreen';
import TerminalModal from './components/ui/TerminalModal';
import { ToastProvider } from './context/ToastContext';
import { SoundProvider } from './context/SoundContext';
import { ThemeModeProvider } from './context/ThemeModeContext';

// Lazy load sections
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

function Portfolio({ onOpenTerminal }) {
  useSmoothScroll();

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenTerminal={onOpenTerminal} />
      <main>
        <Suspense fallback={<div className="loading-fallback" />}>
          <HeroSection />
          <div className="section-divider" />
          <AboutSection />
          <div className="section-divider" />
          <SkillsSection />
          <ExperienceSection />
          <div className="section-divider" />
          <ProjectsSection />
          <div className="section-divider" />
          <ServicesSection />
          <div className="section-divider" />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function MainApp() {
  const [started, setStarted] = useState(() => {
    // If user has visited and opened before or executive mode is stored, allow seamless navigation
    return localStorage.getItem('portfolio_started') === 'true';
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleStart = () => {
    localStorage.setItem('portfolio_started', 'true');
    setStarted(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!started ? (
          <GenjutsuStartScreen key="start" onStart={handleStart} />
        ) : (
          <Portfolio key="portfolio" onOpenTerminal={() => setIsTerminalOpen(true)} />
        )}
      </AnimatePresence>

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <SoundProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </SoundProvider>
    </ThemeModeProvider>
  );
}

export default App;
