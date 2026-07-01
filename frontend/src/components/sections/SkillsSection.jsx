import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import './SkillsSection.css';

const skillCategories = [
  { key: 'frontend', label: 'Frontend', color: '#cc2222' },
  { key: 'backend', label: 'Backend', color: '#7b2fff' },
  { key: 'database', label: 'Database', color: '#f5a623' },
  { key: 'tools', label: 'Tools', color: '#e63333' },
  { key: 'aitools', label: 'AI Tools', color: '#74aa9c' },
];

const CircularProgress = ({ value, color, size = 96, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="skill-progress-svg">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(204,34,34,0.1)" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        strokeLinecap="round"
        className="skill-progress-bar"
        style={{ '--progress-color': color, '--progress-glow': `drop-shadow(0 0 5px ${color})` }}
      />
    </svg>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const currentSkills = skills[activeCategory] || [];
  const activeCat = skillCategories.find(c => c.key === activeCategory);

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="grid-background" />
      <div className="skills-gradient-overlay" />

      <div className="section-container skills-section-container">
        <SectionHeading
          number="02"
          title={<>Skills & <span className="text-gradient">Expertise</span></>}
          subtitle="Jutsu mastered through countless hours of training"
        />

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="skills-tabs"
        >
          {skillCategories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`skills-tab${activeCategory === cat.key ? ' skills-tab--active' : ' skills-tab--inactive'}`}
              style={{
                '--tab-color': cat.color,
                '--tab-color-glow': `${cat.color}66`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="skills-grid"
          >
            {currentSkills.map((skill, i) => (
              <HoloCard key={skill.name} glowColor={activeCat?.color || 'var(--color-accent-primary)'}
                className="sharingan-card skill-card"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  '--skill-color': skill.color,
                  '--skill-color-glow': `0 0 8px ${skill.color}`,
                }}
              >
                {/* Sharingan SVG Background Overlay */}
                <div className="skill-card-overlay">
                  <svg width="80%" height="80%" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke={activeCat?.color || 'var(--color-accent-primary)'} strokeWidth="3" />
                    <circle cx="60" cy="60" r="35" fill="none" stroke={activeCat?.color || 'var(--color-accent-primary)'} strokeWidth="2" />
                    <circle cx="60" cy="60" r="15" fill={activeCat?.color || 'var(--color-accent-primary)'} opacity="0.8" />
                    {[0, 120, 240].map(angle => (
                      <circle key={angle} cx={60 + 25 * Math.cos(angle * Math.PI / 180)} cy={60 + 25 * Math.sin(angle * Math.PI / 180)} r="6" fill={activeCat?.color || 'var(--color-accent-primary)'} />
                    ))}
                  </svg>
                </div>
                <div className="skill-progress-container">
                  <CircularProgress value={skill.proficiency} color={skill.color} size={90} strokeWidth={5} />
                  <div className="skill-percentage" style={{ color: skill.color }}>
                    {skill.proficiency}%
                  </div>
                </div>
                <div className="skill-name">
                  {skill.name}
                </div>
              </HoloCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(SkillsSection);
