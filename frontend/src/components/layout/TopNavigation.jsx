import React, { useState, useEffect } from 'react';
import { Terminal, Layout, Video, VideoOff, Volume2, VolumeX, Sun, Moon, Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useSound } from '../../context/SoundContext';
import { personalInfo } from '../../data/portfolio';
import './TopNavigation.css';

/**
 * TopNavigation — Sleek Cyber-Shinobi OS Top Bar
 * Ultra-responsive header with real-time status, view switcher, and a dedicated mobile Control Panel.
 */
const TopNavigation = ({ currentView, onViewChange, isVideoEnabled, onToggleVideo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { themeMode, toggleThemeMode } = useThemeMode();
  const { isMuted, toggleMute, playSfx } = useSound();

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="top-nav-bar" role="banner">
      <div className="top-nav-inner">
        {/* Left: Brand / Terminal Prompt Identity */}
        <div className="top-nav-brand">
          <button
            type="button"
            className="nav-terminal-logo-btn"
            onClick={() => {
              playSfx('click');
              onViewChange('terminal');
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            title="Gunasekar Portfolio Home"
          >
            <div className="nav-terminal-logo">
              <span className="logo-prompt">&gt;_</span>
              <span className="logo-name">GUNASEKAR</span>
              <span className="logo-dot">.</span>
              <span className="logo-ext">DEV</span>
            </div>
          </button>
          <span className="nav-os-badge">
            <span className="badge-ping" />
            v2.4 ONLINE
          </span>
        </div>

        {/* Center: View Mode Switcher Toggle */}
        <div className="top-nav-center">
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${currentView === 'terminal' ? 'is-active' : ''}`}
              onClick={() => {
                playSfx('click');
                onViewChange('terminal');
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              title="Terminal Workspace View (Ctrl + K)"
            >
              <Terminal size={13} />
              <span className="toggle-label">Terminal</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${currentView === 'reader' ? 'is-active' : ''}`}
              onClick={() => {
                playSfx('click');
                onViewChange('reader');
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              title="Recruiter Reader View (Ctrl + K)"
            >
              <Layout size={13} />
              <span className="toggle-label">Reader</span>
            </button>
          </div>
        </div>

        {/* Right: Desktop Action Controls (Visible >= 768px) */}
        <div className="top-nav-actions desktop-actions">
          {/* Video Toggle */}
          <button
            type="button"
            className={`nav-ctrl-btn ${!isVideoEnabled ? 'is-off' : ''}`}
            onClick={() => {
              playSfx('click');
              onToggleVideo();
            }}
            title={isVideoEnabled ? 'Pause background video' : 'Play background video'}
          >
            {isVideoEnabled ? <Video size={14} /> : <VideoOff size={14} />}
            <span className="btn-label">{isVideoEnabled ? 'Video' : 'Static'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            className={`nav-ctrl-btn ${isMuted ? 'is-off' : ''}`}
            onClick={() => {
              playSfx('click');
              toggleMute();
            }}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="nav-ctrl-btn"
            onClick={() => {
              playSfx('click');
              toggleThemeMode();
            }}
            title={`Current: ${themeMode.toUpperCase()} mode. Click to toggle.`}
          >
            {themeMode === 'shinobi' ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Resume Download */}
          <a
            href={personalInfo.resumeUrl}
            download="Gunasekar_Resume.pdf"
            className="nav-resume-btn"
            onClick={() => playSfx('click')}
            title="Download Official Resume"
          >
            <Download size={13} />
            <span className="btn-label">Resume</span>
          </a>
        </div>

        {/* Right: Mobile Action Controls (Visible < 768px) */}
        <div className="top-nav-actions mobile-actions">
          {/* Direct Resume Download Icon Button */}
          <a
            href={personalInfo.resumeUrl}
            download="Gunasekar_Resume.pdf"
            className="nav-ctrl-btn mobile-resume-icon"
            onClick={() => playSfx('click')}
            title="Download Official Resume (PDF)"
            aria-label="Download Resume"
          >
            <Download size={14} />
          </a>

          {/* Hamburger / Close Menu Toggle Button */}
          <button
            type="button"
            className={`nav-mobile-menu-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => {
              playSfx('click');
              setIsMobileMenuOpen((prev) => !prev);
            }}
            title={isMobileMenuOpen ? 'Close Menu' : 'Open Controls Menu'}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Cyber-Shinobi Drawer Dropdown ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Dropdown */}
            <motion.div
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Drawer Header */}
              <div className="mobile-drawer-header">
                <div className="drawer-title-group">
                  <span className="drawer-prompt">&gt;_</span>
                  <span className="drawer-title">SHINOBI CONTROL CENTER</span>
                </div>
                <span className="drawer-badge">
                  <span className="badge-ping" />
                  v2.4 ONLINE
                </span>
              </div>

              {/* View Switcher Cards */}
              <div className="mobile-drawer-section">
                <div className="drawer-section-label">SELECT WORKSPACE VIEW</div>
                <div className="mobile-view-grid">
                  <button
                    type="button"
                    className={`mobile-view-card ${currentView === 'terminal' ? 'is-active' : ''}`}
                    onClick={() => {
                      playSfx('click');
                      onViewChange('terminal');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="card-top">
                      <Terminal size={16} />
                      <span className="card-pill">Ctrl+K</span>
                    </div>
                    <span className="card-title">Terminal OS</span>
                    <span className="card-sub">Interactive CLI & Jutsu Matrix</span>
                  </button>

                  <button
                    type="button"
                    className={`mobile-view-card ${currentView === 'reader' ? 'is-active' : ''}`}
                    onClick={() => {
                      playSfx('click');
                      onViewChange('reader');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="card-top">
                      <Layout size={16} />
                    </div>
                    <span className="card-title">Recruiter Reader</span>
                    <span className="card-sub">Executive Resume View</span>
                  </button>
                </div>
              </div>

              {/* System Preferences Toggles */}
              <div className="mobile-drawer-section">
                <div className="drawer-section-label">SYSTEM PREFERENCES</div>
                <div className="mobile-controls-list">
                  {/* Background Video Toggle */}
                  <button
                    type="button"
                    className="mobile-control-row"
                    onClick={() => {
                      playSfx('click');
                      onToggleVideo();
                    }}
                  >
                    <div className="row-left">
                      <div className="row-icon-wrap">
                        {isVideoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
                      </div>
                      <div className="row-text">
                        <span className="row-label">Cinematic Video</span>
                        <span className="row-desc">Ambient shinobi ember backdrop</span>
                      </div>
                    </div>
                    <span className={`row-status-pill ${isVideoEnabled ? 'is-active' : 'is-off'}`}>
                      {isVideoEnabled ? 'Active' : 'Static'}
                    </span>
                  </button>

                  {/* Sound FX Toggle */}
                  <button
                    type="button"
                    className="mobile-control-row"
                    onClick={() => {
                      playSfx('click');
                      toggleMute();
                    }}
                  >
                    <div className="row-left">
                      <div className="row-icon-wrap">
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </div>
                      <div className="row-text">
                        <span className="row-label">Sound FX & Audio</span>
                        <span className="row-desc">Terminal typing & ambient audio</span>
                      </div>
                    </div>
                    <span className={`row-status-pill ${!isMuted ? 'is-active' : 'is-off'}`}>
                      {isMuted ? 'Muted' : 'Sound On'}
                    </span>
                  </button>

                  {/* Theme Mode Toggle */}
                  <button
                    type="button"
                    className="mobile-control-row"
                    onClick={() => {
                      playSfx('click');
                      toggleThemeMode();
                    }}
                  >
                    <div className="row-left">
                      <div className="row-icon-wrap">
                        {themeMode === 'shinobi' ? <Moon size={16} /> : <Sun size={16} />}
                      </div>
                      <div className="row-text">
                        <span className="row-label">Visual Theme</span>
                        <span className="row-desc">
                          {themeMode === 'shinobi' ? 'Shinobi Anime Dark' : 'Clean Slate Executive'}
                        </span>
                      </div>
                    </div>
                    <span className="row-status-pill is-active">
                      {themeMode === 'shinobi' ? 'Shinobi' : 'Executive'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer: Download Resume */}
              <div className="mobile-drawer-footer">
                <a
                  href={personalInfo.resumeUrl}
                  download="Gunasekar_Resume.pdf"
                  className="mobile-drawer-resume-btn"
                  onClick={() => {
                    playSfx('click');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Download size={15} />
                  <span>Download Full Resume (PDF)</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNavigation;
