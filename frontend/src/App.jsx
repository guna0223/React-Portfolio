import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
// import MangekyoIntro from './components/ui/MangekyoIntro';
import GenjutsuStartScreen from './components/ui/GenjutsuStartScreen';
import { Suspense, lazy } from 'react';

// Lazy load sections
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

function Portfolio() {
  useSmoothScroll();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading-fallback"></div>}>
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

function App() {
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!started && (
        <GenjutsuStartScreen key="start" onStart={() => { setStarted(true); setIntroDone(true); }} />
      )}

      {/* Video Section Disabled Temporarily
      {started && !introDone && (
        <MangekyoIntro key="intro" onComplete={() => setIntroDone(true)} />
      )}
      */}

      {started && introDone && (
        <Portfolio key="portfolio" />
      )}
    </AnimatePresence>
  );
}

export default App;
