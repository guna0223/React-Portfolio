import React from 'react';
import { Terminal, Layout, Video, VideoOff, Volume2, VolumeX, Sun, Moon, Download } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useSound } from '../../context/SoundContext';
import { personalInfo } from '../../data/portfolio';
import './TopNavigation.css';

/**
 * TopNavigation — Sleek Cyber-Shinobi OS Top Bar
 * Minimalist header with real-time status, view switcher, theme, video, and audio controls.
 */
const TopNavigation = ({ currentView, onViewChange, isVideoEnabled, onToggleVideo }) => {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const { isMuted, toggleMute, playSfx } = useSound();

  return (
    <header className="top-nav-bar" role="banner">
      <div className="top-nav-inner">
        {/* Left: Brand / Terminal Prompt Identity */}
        <div className="top-nav-brand">
          <div className="nav-terminal-logo">
            <span className="logo-prompt">&gt;_</span>
            <span className="logo-name">GUNASEKAR</span>
            <span className="logo-dot">.</span>
            <span className="logo-ext">DEV</span>
          </div>
          <span className="nav-os-badge">v2.4 ONLINE</span>
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
              }}
              title="Terminal Workspace View"
            >
              <Terminal size={13} />
              <span>Terminal</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${currentView === 'reader' ? 'is-active' : ''}`}
              onClick={() => {
                playSfx('click');
                onViewChange('reader');
              }}
              title="Recruiter Reader View"
            >
              <Layout size={13} />
              <span>Reader</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="top-nav-actions">
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
      </div>
    </header>
  );
};

export default TopNavigation;
