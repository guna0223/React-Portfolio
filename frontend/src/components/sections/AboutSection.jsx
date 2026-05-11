import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import SharinganRing from '../ui/SharinganRing';
import profileImg from '../../assets/AboutImage/img.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-bg" />
      <div className="grid-background" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="01"
          title={<>About <span className="text-gradient">Me</span></>}
          subtitle="Crafting powerful digital experiences with precision and passion"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', marginTop: '3rem' }} className="about-grid">
          {/* Profile Image with Rinnegan frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <SharinganRing size={320} variant="rinnegan" rotationSpeed={30}>
              <div style={{ width: '84%', height: '84%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(123,47,255,0.3)', boxShadow: '0 0 30px rgba(123,47,255,0.2)' }}>
                <img src={profileImg} alt="Gunasekar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,34,34,0.025) 2px, rgba(204,34,34,0.025) 4px)', borderRadius: '50%', pointerEvents: 'none' }} />
              </div>
            </SharinganRing>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', bottom: '-1rem', right: 'calc(50% - 8rem)', padding: '0.875rem 1.5rem', borderRadius: '1rem', background: 'rgba(5,2,10,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(204,34,34,0.3)', boxShadow: '0 0 20px rgba(204,34,34,0.15)' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent-primary)', textShadow: '0 0 10px var(--color-glow-primary)' }}>1+</div>
              <div className="text-small" style={{ color: 'var(--color-text-secondary)' }}>Years Coding</div>
            </motion.div>
          </motion.div>

          {/* Bio and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-body" style={{ marginBottom: '2rem', lineHeight: 1.9, fontSize: '1.05rem' }}>{personalInfo.bio}</p>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {stats.map((stat, i) => (
                <HoloCard key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  glowColor="var(--color-accent-primary)"
                  style={{ padding: '1.5rem', textAlign: 'center' }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent-primary)', marginBottom: '0.25rem', textShadow: '0 0 12px var(--color-glow-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-small" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{stat.label}</div>
                </HoloCard>
              ))}
            </div>

            {/* Skill tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {['React', 'Python', 'Django', 'JavaScript', 'mongodb', 'express'].map((tag) => (
                <span key={tag} style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'var(--font-mono)', background: 'rgba(204,34,34,0.08)', border: '1px solid rgba(204,34,34,0.2)', color: 'var(--color-accent-primary)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export default AboutSection;
