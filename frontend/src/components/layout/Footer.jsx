import React from 'react';
import { motion } from 'framer-motion';
import { Code, Link, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import navLogo from '../../assets/images/nav-img/nav.jpg';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: Code, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Link, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: personalInfo.social.email, label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="aurora-bg" />
      <div className="grid-background" />

      {/* Rinnegan decorative circle */}
      <div className="footer-rinnegan-circle">
        <div className="radar-sweep" />
      </div>

      <div className="footer-section-container">
        {/* CTA Block */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="footer-cta"
        >
          {/* Sharingan mini icon */}
          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="footer-sharingan-icon"
          >
            <img src={navLogo} alt="Logo" />
          </motion.div>

          <h3 className="text-h2">
            Let's Build Something <span className="text-gradient">Legendary</span>
          </h3>
          <p className="text-body">
            A new mission awaits. Let's bring your vision to life.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="section-divider footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">
              Gunasekar <span>D</span>
            </div>
            <p className="text-small">Full-Stack Developer</p>
          </div>

          {/* Social Links */}
          <div className="footer-social-links">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                className="footer-social-link"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button onClick={scrollToTop} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            className="footer-back-to-top"
          >
            <ArrowUp size={16} /> Back to Top
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p className="text-small">
            © {new Date().getFullYear()} Gunasekar D — Moving in silence, building in shadows
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
