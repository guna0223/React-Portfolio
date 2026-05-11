import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 4vw, 2.5rem)',
          height: '68px',
          background: isScrolled
            ? 'rgba(5, 2, 10, 0.96)'
            : 'rgba(5, 2, 10, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${isScrolled ? 'rgba(204,34,34,0.3)' : 'rgba(204,34,34,0.1)'}`,
          boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Go to top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            background: 'none',
            border: 'none',
            padding: '0.25rem',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex' }}
          >
            <SharinganLogo />
          </motion.div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.07em',
              whiteSpace: 'nowrap',
              textShadow: '0 0 12px rgba(204,34,34,0.4)',
            }}
          >
            SHINOBI<span style={{ color: 'var(--color-accent-primary)', opacity: 0.75 }}>.DEV</span>
          </span>
        </button>

        {/* ── Desktop Nav links ── */}
        <nav
          className="nb-desktop"
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  position: 'relative',
                  padding: '0.45rem 0.875rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: isActive ? '#05020a' : 'var(--color-text-secondary)',
                  background: 'none',
                  border: 'none',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#cc2222';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nbActiveChip"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#cc2222',
                      borderRadius: '6px',
                      boxShadow: '0 0 12px rgba(204,34,34,0.55)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <button
          onClick={() => scrollTo('contact')}
          className="nb-cta"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#cc2222',
            background: 'rgba(204,34,34,0.07)',
            border: '1px solid rgba(204,34,34,0.5)',
            borderRadius: '7px',
            boxShadow: '0 0 10px rgba(204,34,34,0.15)',
            transition: 'all 0.25s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#cc2222';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(204,34,34,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(204,34,34,0.07)';
            e.currentTarget.style.color = '#cc2222';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(204,34,34,0.15)';
          }}
        >
          ENTER
        </button>

        {/* ── Mobile hamburger ── */}
        <button
          className="nb-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            background: mobileOpen ? 'rgba(204,34,34,0.15)' : 'transparent',
            border: `1px solid ${mobileOpen ? 'rgba(204,34,34,0.5)' : 'transparent'}`,
            borderRadius: '8px',
            color: '#cc2222',
            transition: 'all 0.25s',
            flexShrink: 0,
          }}
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
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 8900,
                background: 'rgba(5,2,10,0.7)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85vw)',
                zIndex: 9100,
                background: 'rgba(8, 2, 14, 0.98)',
                borderLeft: '1px solid rgba(204,34,34,0.25)',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.6), 0 0 40px rgba(204,34,34,0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.125rem 1.25rem',
                borderBottom: '1px solid rgba(204,34,34,0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SharinganLogo />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '0.06em' }}>
                    SHINOBI<span style={{ color: '#cc2222' }}>.DEV</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '7px', background: 'rgba(204,34,34,0.1)', border: '1px solid rgba(204,34,34,0.3)', color: '#cc2222' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1rem', gap: '0.375rem', flex: 1 }}>
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.05 }}
                      onClick={() => scrollTo(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 1.125rem',
                        borderRadius: '9px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        textAlign: 'left',
                        color: isActive ? '#fff' : 'var(--color-text-secondary)',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(204,34,34,0.85), rgba(123,47,255,0.5))'
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isActive ? 'rgba(204,34,34,0.5)' : 'transparent'}`,
                        boxShadow: isActive ? '0 0 16px rgba(204,34,34,0.3)' : 'none',
                        transition: 'all 0.25s',
                        width: '100%',
                      }}
                    >
                      {/* Dot indicator */}
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: isActive ? '#fff' : '#cc2222',
                        boxShadow: isActive ? 'none' : '0 0 6px rgba(204,34,34,0.7)',
                        transition: 'background 0.25s',
                      }} />
                      {item.label}
                      {isActive && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>◀</span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* CTA at bottom */}
              <div style={{ padding: '1rem 1.25rem 2rem' }}>
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.045 + 0.1 }}
                  onClick={() => scrollTo('contact')}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #cc2222, #7b2fff)',
                    border: 'none',
                    boxShadow: '0 0 24px rgba(204,34,34,0.45)',
                    transition: 'opacity 0.2s',
                  }}
                >
                  ⚡ Enter The Battlefield
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        /* Push page content below fixed navbar */
        main { padding-top: 68px; }

        /* Desktop: show nav + CTA, hide burger */
        .nb-desktop { display: flex; }
        .nb-cta     { display: block; }
        .nb-burger  { display: none !important; }

        /* Tablet / Mobile: hide nav + CTA, show burger */
        @media (max-width: 900px) {
          .nb-desktop { display: none !important; }
          .nb-cta     { display: none !important; }
          .nb-burger  { display: flex !important; }
        }

        /* Prevent scrollbar shift when drawer opens */
        body.menu-open { overflow: hidden; }
      `}</style>
    </>
  );
};

export default Navbar;
