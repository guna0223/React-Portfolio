import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import SharinganRing from '../ui/SharinganRing';
import profileImg from '../../assets/AboutImage/img.jpeg';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding about-section">
      <div className="aurora-bg" />
      <div className="grid-background" />

      <div className="section-container about-section-container">
        <SectionHeading
          number="01"
          title={<>About <span className="text-gradient">Me</span></>}
          subtitle="Crafting powerful digital experiences with precision and passion"
        />

        <div className="about-grid">
          {/* Profile Image with Rinnegan frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="about-profile-container"
          >
            <SharinganRing size={320} variant="rinnegan" rotationSpeed={30}>
              <div className="about-profile-frame">
                <img src={profileImg} alt="Gunasekar" />
                <div className="about-profile-scanlines" />
              </div>
            </SharinganRing>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="about-floating-badge"
            >
              <div className="about-badge-number">1+</div>
              <div className="text-small about-badge-label">Years Coding</div>
            </motion.div>
          </motion.div>

          {/* Bio and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-body about-bio">{personalInfo.bio}</p>

            {/* Stats Grid */}
            <div className="about-stats-grid">
              {stats.map((stat, i) => (
                <HoloCard key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  glowColor="var(--color-accent-primary)"
                  className="about-stat-card"
                >
                  <div className="about-stat-value">
                    {stat.value}
                  </div>
                  <div className="text-small about-stat-label">{stat.label}</div>
                </HoloCard>
              ))}
            </div>

            {/* Skill tags */}
            <div className="about-skill-tags">
              {['React', 'Python', 'Django', 'JavaScript', 'mongodb', 'express'].map((tag) => (
                <span key={tag} className="about-skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
