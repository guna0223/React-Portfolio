import React from 'react';
import { motion } from 'framer-motion';
import { Code, Link, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: Code, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Link, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: personalInfo.social.email, label: 'Email' },
  ];

  return (
    <footer style={{ position: 'relative', padding: 'clamp(3rem, 8vw, 6rem) 0 2rem', overflow: 'hidden' }}>
      <div className="aurora-bg" />
      <div className="grid-background" />

      {/* Rinnegan decorative circle */}
      <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: '35vw', height: '35vw', borderRadius: '50%', border: '1px solid rgba(204,34,34,0.06)', overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="radar-sweep" />
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* CTA Block */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {/* Sharingan mini icon */}
          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'inline-block', marginBottom: '1.25rem' }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="#cc2222" strokeWidth="1.5" opacity="0.6" />
              <circle cx="18" cy="18" r="11" stroke="#cc2222" strokeWidth="1" opacity="0.4" />
              {[0, 120, 240].map((angle) => {
                const rad = ((angle - 90) * Math.PI) / 180;
                return <circle key={angle} cx={18 + 7 * Math.cos(rad)} cy={18 + 7 * Math.sin(rad)} r={2.5} fill="#cc2222" opacity="0.8" />;
              })}
              <circle cx="18" cy="18" r="3" fill="#cc2222" opacity="0.9" />
            </svg>
          </motion.div>

          <h3 className="text-h2" style={{ marginBottom: '1rem' }}>
            Let's Build Something <span className="text-gradient">Legendary</span>
          </h3>
          <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
            A new mission awaits. Let's bring your vision to life.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="section-divider" style={{ margin: '2rem 0' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--color-accent-primary)', textShadow: '0 0 10px var(--color-glow-primary)' }}>
              Gunasekar <span style={{ opacity: 0.5 }}>D</span>
            </div>
            <p className="text-small">Developer & UI/UX Shinobi</p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '12px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-secondary)', transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-primary)'; e.currentTarget.style.borderColor = 'rgba(204,34,34,0.35)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(204,34,34,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'var(--color-border-subtle)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button onClick={scrollToTop} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '9999px', background: 'rgba(204,34,34,0.06)', border: '1px solid rgba(204,34,34,0.2)', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-primary)'; e.currentTarget.style.borderColor = 'rgba(204,34,34,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'rgba(204,34,34,0.2)'; }}
          >
            <ArrowUp size={16} /> Back to Top
          </motion.button>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
          <p className="text-small">
            © {new Date().getFullYear()} Gunasekar D — Crafted with Sharingan precision & Rinnegan vision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
