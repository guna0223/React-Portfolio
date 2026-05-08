import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';
import AuroraBackground from '../effects/AuroraBackground';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub' },
    { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: personalInfo.social.email, label: 'Email' },
  ];

  return (
    <footer
      style={{
        position: 'relative',
        padding: 'clamp(3rem, 8vw, 6rem) 0 2rem',
        overflow: 'hidden',
      }}
    >
      <AuroraBackground />
      <div className="grid-background" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <h3
            className="text-h2"
            style={{ marginBottom: '1rem' }}
          >
            Let's Build Something{' '}
            <span className="text-gradient">Amazing</span>
          </h3>
          <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Have a project in mind? Let's bring your vision to life.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="section-divider" style={{ margin: '2rem 0' }} />

        {/* Bottom section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: 'var(--color-accent-primary)' }}>Gunasekar</span>
              <span style={{ opacity: 0.5 }}> D</span>
            </div>
            <p className="text-small">
              Creative Developer & UI/UX Designer
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent-primary)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            <ArrowUp size={16} />
            Back to Top
          </motion.button>
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <p className="text-small">
            © {new Date().getFullYear()} Gunasekar D. Crafted with passion & precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
