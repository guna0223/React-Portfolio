import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoBackground from './components/background/VideoBackground';
import ChakraParticles from './components/ui/ChakraParticles';
import TopNavigation from './components/layout/TopNavigation';
import TerminalWorkspace from './components/terminal/TerminalWorkspace';
import MinimalistReader from './components/reader/MinimalistReader';
import GenjutsuStartScreen from './components/ui/GenjutsuStartScreen';
import { ToastProvider, useToast } from './context/ToastContext';
import { SoundProvider, useSound } from './context/SoundContext';
import { ThemeModeProvider } from './context/ThemeModeContext';

function TerminalPortfolio() {
  const [currentView, setCurrentView] = useState('terminal'); // 'terminal' | 'reader'
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const { playSfx } = useSound();
  const { showToast } = useToast();

  const toggleView = () => {
    playSfx('open');
    setCurrentView((prev) => {
      const next = prev === 'terminal' ? 'reader' : 'terminal';
      showToast(
        next === 'terminal'
          ? 'Switched to Terminal OS (Ctrl + K)'
          : 'Switched to Recruiter Reader View (Ctrl + K)',
        'info'
      );
      return next;
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled((prev) => !prev);
  };

  // Global key listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSfx, showToast]);

  return (
    <div className="terminal-os-root">
      {/* ── Background Video Backdrop ── */}
      <VideoBackground
        isEnabled={isVideoEnabled}
        isDimmed={currentView === 'reader'}
      />

      {/* ── Ambient Chakra Sparks (Harmonized with video embers) ── */}
      <ChakraParticles density={24} />

      {/* ── Fixed Cyber-Shinobi Top Navigation Bar ── */}
      <TopNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
        isVideoEnabled={isVideoEnabled}
        onToggleVideo={toggleVideo}
      />

      {/* ── Main Viewport Switcher (Terminal OS vs Recruiter Reader) ── */}
      <main className="terminal-os-main">
        {currentView === 'terminal' ? (
          <TerminalWorkspace
            onToggleView={toggleView}
            onToggleVideo={toggleVideo}
            isVideoEnabled={isVideoEnabled}
          />
        ) : (
          <MinimalistReader onSwitchToTerminal={() => setCurrentView('terminal')} />
        )}
      </main>
    </div>
  );
}

function MainApp() {
  const [started, setStarted] = useState(() => {
    return localStorage.getItem('portfolio_started') === 'true';
  });

  const handleStart = () => {
    localStorage.setItem('portfolio_started', 'true');
    setStarted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <GenjutsuStartScreen key="start" onStart={handleStart} />
      ) : (
        <TerminalPortfolio key="terminal-portfolio" />
      )}
    </AnimatePresence>
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
