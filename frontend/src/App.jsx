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

  return (
    <>
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

function App() {
  const [started, setStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  if (!started) {
    return (
      <div
        style={{
          height: '100vh',
          background: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => setStarted(true)}
          style={{
            padding: '20px 50px',
            background: 'red',
            border: 'none',
            color: 'white',
            fontSize: '22px',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          ENTER THE GENJUTSU
        </button>
      </div>
    );
  }

  return (
    <>
      {!introDone && <MangekyoIntro onComplete={() => setIntroDone(true)} />}
      {introDone && <Portfolio />}
    </>
  );
}

export default App;
