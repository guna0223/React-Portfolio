import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import aboutImg from '../../assets/AboutImage/img.jpeg';

const AboutSection = () => {
  const techStack = ['React', 'Python', 'Django', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Git', 'Vite', 'REST APIs', 'Tailwind CSS', 'PostgreSQL'];

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <SectionHeading
          number="01"
          title={<>About <span className="text-gradient">Me</span></>}
          subtitle="Passionate about crafting exceptional digital experiences"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div className="gradient-border" style={{ borderRadius: '1.5rem' }}>
              <div
                style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  background: 'var(--color-bg-secondary)',
                  padding: '4px',
                }}
              >
                <img
                  src={aboutImg}
                  alt="About Gunasekar"
                  style={{
                    width: '100%',
                    borderRadius: 'calc(1.5rem - 4px)',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                bottom: '-1rem',
                right: '-1rem',
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                background: 'rgba(3, 0, 20, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                boxShadow: '0 0 30px var(--color-glow-primary)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700 }} className="text-gradient">
                1+
              </div>
              <div className="text-small" style={{ whiteSpace: 'nowrap' }}>Years Coding</div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div>
            <motion.p
              className="text-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <GlowCard style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                      }}
                      className="text-gradient"
                    >
                      {stat.value}
                    </div>
                    <div className="text-small" style={{ marginTop: '0.25rem' }}>
                      {stat.label}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ marginTop: '2rem' }}
            >
              <div
                className="text-mono"
                style={{
                  color: 'var(--color-accent-primary)',
                  marginBottom: '0.75rem',
                  fontSize: '0.8125rem',
                }}
              >
                {'// tech_stack'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.04 }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'rgba(124, 58, 237, 0.4)',
                      boxShadow: '0 0 15px var(--color-glow-primary)',
                    }}
                    style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
