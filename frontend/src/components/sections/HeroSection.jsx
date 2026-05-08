import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';
import TypeWriter from '../ui/TypeWriter';
import MagneticButton from '../ui/MagneticButton';
import ParticleField from '../ui/ParticleField';
import AuroraBackground from '../effects/AuroraBackground';
import GridOverlay from '../ui/GridOverlay';
import GlowOrb from '../effects/GlowOrb';
import profileImg from '../../assets/AboutImage/homeimg.jpeg';

const HeroSection = () => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Backgrounds */}
      <AuroraBackground />
      <GridOverlay />
      <ParticleField density={70} />

      {/* Glow orbs */}
      <GlowOrb color="rgba(124, 58, 237, 0.3)" size={400} top="-10%" left="-5%" delay={0} />
      <GlowOrb color="rgba(6, 182, 212, 0.2)" size={350} bottom="10%" right="-5%" delay={5} />
      <GlowOrb color="rgba(244, 63, 94, 0.15)" size={300} top="40%" left="60%" delay={10} />

      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 5rem)',
          paddingTop: '6rem',
          paddingBottom: '4rem',
          width: '100%',
        }}
      >
        {/* Text Content */}
        <div style={{ maxWidth: '700px' }}>
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9375rem',
              color: 'var(--color-accent-primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--color-accent-primary)' }} />
            Hello, I'm
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span style={{ color: 'var(--color-text-primary)' }}>
              {personalInfo.name}
            </span>
            <br />
            <span className="text-gradient" style={{ fontSize: '0.6em', fontWeight: 600 }}>
              {personalInfo.lastName}
            </span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '1.25rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            <TypeWriter
              strings={personalInfo.roles}
              typeSpeed={70}
              deleteSpeed={40}
              delayBetween={2500}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            style={{ marginTop: '1.5rem', maxWidth: '540px' }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '2.5rem',
            }}
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
              <ArrowDown size={16} />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              href={personalInfo.resumeUrl}
              download="Gunasekar_Resume.pdf"
            >
              <Download size={16} />
              Resume
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '2.5rem',
            }}
          >
            {[
              { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: FiMessageCircle, href: personalInfo.social.whatsapp, label: 'WhatsApp' },
            ].map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
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
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent-primary)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 20px var(--color-glow-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-image-wrapper"
          style={{
            position: 'relative',
            width: 'clamp(260px, 22vw, 380px)',
            height: 'clamp(260px, 22vw, 380px)',
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary), var(--color-accent-primary))',
              animation: 'gradient-rotate 4s linear infinite',
              opacity: 0.6,
              filter: 'blur(2px)',
            }}
          />
          {/* Image container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--color-bg-primary)',
              boxShadow: '0 0 40px var(--color-glow-primary)',
            }}
          >
            <img
              src={profileImg}
              alt="Gunasekar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          {/* Status badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: '8%',
              right: '8%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(3, 0, 20, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-accent-success)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent-success)', boxShadow: '0 0 8px var(--color-accent-success)' }} />
            Available
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span className="text-small" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} style={{ color: 'var(--color-text-muted)' }} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          #hero .section-container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-image-wrapper {
            margin: 0 auto !important;
            order: -1;
            width: clamp(200px, 50vw, 280px) !important;
            height: clamp(200px, 50vw, 280px) !important;
          }
          #hero .section-container > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
