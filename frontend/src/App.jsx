import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import CustomCursor from './components/layout/CustomCursor';
import ChakraTrailCursor from './components/ui/ChakraTrailCursor';
import MangekyoIntro from './components/ui/MangekyoIntro';
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
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <MangekyoIntro onComplete={() => setShowIntro(false)} />}
      <ChakraTrailCursor />
      <CustomCursor />
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

function AppContent() {
  return <Portfolio />;
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
