import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles, Briefcase } from 'lucide-react';
import navLogo from '../../assets/images/nav-img/nav.jpg';
import { useSound } from '../../context/SoundContext';
import { useThemeMode } from '../../context/ThemeModeContext';
import { useToast } from '../../context/ToastContext';
import './Navbar.css';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Exp' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

// Inline Sharingan SVG Logo
const SharinganLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" stroke="#cc2222" strokeWidth="1.5" opacity="0.85" />
    <circle cx="16" cy="16" r="10" stroke="#cc2222" strokeWidth="1" opacity="0.55" />
    <circle cx="16" cy="16" r="5" fill="#1a0000" stroke="#cc2222" strokeWidth="1" opacity="0.9" />
    {/* Three tomoe at 120° intervals */}
    {[270, 30, 150].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      const cx = 16 + 7.5 * Math.cos(r);
      const cy = 16 + 7.5 * Math.sin(r);
      return <circle key={i} cx={cx} cy={cy} r={2.2} fill="#cc2222" />;
    })}
    <circle cx="16" cy="16" r="2" fill="#cc2222" opacity="0.95" />
  </svg>
);

const Navbar = ({ onOpenTerminal }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { isMuted, isPlaying, toggleMute, playSfx } = useSound();
  const { themeMode, toggleThemeMode, isExecutive } = useThemeMode();
  const { showToast } = useToast();

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 320);
      lastScrollY.current = y;

      // Active section detection
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    playSfx('click');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleSoundToggle = () => {
    toggleMute();
    playSfx('click');
    showToast('Soundtrack', isMuted ? 'Ambient audio activated' : 'Audio muted', 'info');
  };

  const handleThemeToggle = () => {
    toggleThemeMode();
    playSfx('jutsu');
    showToast(
      'Theme Shift',
      `Switched to ${themeMode === 'shinobi' ? 'Executive Clean' : 'Shinobi Genjutsu'} Mode`,
      'success'
    );
  };

  return (
    <>
      {/* ═══════════════════════════════
          NAVBAR BAR
      ═══════════════════════════════ */}
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`navbar-header${isScrolled ? ' navbar-header--scrolled' : ''}`}
      >
        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Go to top"
          className="navbar-logo-btn"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="navbar-logo-spin"
          >
            <img src={navLogo} alt="Logo" className="navbar-logo-img" />
          </motion.div>
          <span className="navbar-logo-text">
            GUNA<span className="navbar-logo-accent">.DEV</span>
          </span>
        </button>

        {/* ── Desktop Nav links ── */}
        <nav className="nb-desktop" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nbActiveChip"
                    className="nav-active-chip"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Advanced Control Bar (Sound, Theme, Terminal) ── */}
        <div className="nav-controls-group">
          {/* Audio Visualizer Button */}
          <button
            onClick={handleSoundToggle}
            className="nav-ctrl-btn"
            title={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX size={15} />
            ) : (
              <div className={`nav-sound-visualizer ${isPlaying ? 'playing' : ''}`}>
                <span className="nav-sound-bar" />
                <span className="nav-sound-bar" />
                <span className="nav-sound-bar" />
              </div>
            )}
          </button>

          {/* Theme Mode Switcher */}
          <button
            onClick={handleThemeToggle}
            className="nav-ctrl-btn"
            title="Toggle Shinobi / Executive Mode"
            aria-label="Toggle Theme Mode"
          >
            {isExecutive ? <Briefcase size={14} /> : <Sparkles size={14} />}
            <span className="desktop-only-text">{isExecutive ? 'EXEC' : 'SHINOBI'}</span>
          </button>

          {/* Terminal CLI Launcher */}
          <button
            onClick={() => onOpenTerminal && onOpenTerminal()}
            className="nav-ctrl-btn"
            title="Open Interactive Terminal (Ctrl + K)"
            aria-label="Open Shinobi Terminal"
          >
            <Terminal size={14} />
            <span className="desktop-only-text">&gt;_</span>
          </button>

          {/* ── Desktop CTA ── */}
          <button
            onClick={() => scrollTo('contact')}
            className="nav-cta"
          >
            HIRE
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className={`nav-burger${mobileOpen ? ' nav-burger--open' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* ═══════════════════════════════
          MOBILE MENU DRAWER
      ═══════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="nav-backdrop"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              className="nav-drawer"
            >
              {/* Drawer header */}
              <div className="nav-drawer-header">
                <div className="nav-drawer-brand">
                  <SharinganLogo />
                  <span className="nav-drawer-brand-text">
                    GUNA<span className="nav-drawer-brand-accent">.DEV</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="nav-drawer-close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="nav-drawer-links">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.05 }}
                      onClick={() => scrollTo(item.id)}
                      className={`nav-drawer-link${isActive ? ' nav-drawer-link--active' : ''}`}
                    >
                      {/* Dot indicator */}
                      <span className={`nav-drawer-dot${isActive ? ' nav-drawer-dot--active' : ''}`} />
                      {item.label}
                      {isActive && (
                        <span className="nav-drawer-arrow">◀</span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="nav-drawer-footer">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    onClick={handleSoundToggle}
                    className="nav-ctrl-btn"
                    style={{ flex: 1 }}
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    <span>{isMuted ? 'Muted' : 'Sound'}</span>
                  </button>
                  <button
                    onClick={handleThemeToggle}
                    className="nav-ctrl-btn"
                    style={{ flex: 1 }}
                    aria-label="Toggle Theme Mode"
                  >
                    {isExecutive ? <Briefcase size={14} /> : <Sparkles size={14} />}
                    <span>{isExecutive ? 'Exec' : 'Shinobi'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      if (onOpenTerminal) onOpenTerminal();
                    }}
                    className="nav-ctrl-btn"
                    style={{ flex: 1 }}
                    aria-label="Open Terminal"
                  >
                    <Terminal size={14} />
                    <span>CLI</span>
                  </button>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.045 + 0.1 }}
                  onClick={() => scrollTo('contact')}
                  className="nav-drawer-cta"
                >
                  Initiate Contract / Hire
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
