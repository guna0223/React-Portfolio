import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setHidden(currentScrollY > lastScrollY && currentScrollY > 300);
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9990,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '9999px',
          background: isScrolled ? 'rgba(3, 0, 20, 0.7)' : 'rgba(3, 0, 20, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
          transition: 'background 0.3s, border 0.3s',
          maxWidth: '90vw',
        }}
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            color: 'var(--color-text-primary)',
            background: 'none',
            border: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'var(--color-accent-primary)' }}>G</span>
          <span style={{ opacity: 0.7 }}>.</span>
        </button>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
          }}
          className="nav-desktop"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                position: 'relative',
                padding: '0.5rem 0.875rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: activeSection === item.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                borderRadius: '9999px',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: 'rgba(124, 58, 237, 0.15)',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollTo('contact')}
          className="nav-cta-btn"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(135deg, var(--color-accent-primary), #9333ea)',
            border: 'none',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 15px var(--color-glow-primary)',
          }}
        >
          Let's Talk
        </button>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            padding: '0.5rem',
            color: 'var(--color-text-primary)',
            background: 'none',
            border: 'none',
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '5%',
              right: '5%',
              zIndex: 9989,
              padding: '1.5rem',
              borderRadius: '1.5rem',
              background: 'rgba(3, 0, 20, 0.95)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                style={{
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: activeSection === item.id ? 600 : 400,
                  color: activeSection === item.id ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                  background: activeSection === item.id ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: '0.75rem',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
