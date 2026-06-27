import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ChakraTrailCursor from './components/ui/ChakraTrailCursor';
import MangekyoIntro from './components/ui/MangekyoIntro';
import GenjutsuStartScreen from './components/ui/GenjutsuStartScreen';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
// import NotFound from './pages/NotFound'; // 404 page disabled
// import IntroSequence from './components/sections/IntroSequence'; // loading screen disabled

function Portfolio() {
  useSmoothScroll();

  return (
    <>
      <ChakraTrailCursor />
      <ScrollProgress />
      <Navbar />
      <main>
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
        <GenjutsuStartScreen key="start" onStart={() => setStarted(true)} />
      )}

      {started && !introDone && (
        <MangekyoIntro key="intro" onComplete={() => setIntroDone(true)} />
      )}

      {started && introDone && (
        <Portfolio key="portfolio" />
      )}
    </AnimatePresence>
  );
}

export default App;
