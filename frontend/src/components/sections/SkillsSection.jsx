import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';

const skillCategories = [
  { key: 'frontend', label: 'Frontend', color: '#cc2222' },
  { key: 'backend', label: 'Backend', color: '#7b2fff' },
  { key: 'database', label: 'Database', color: '#f5a623' },
  { key: 'tools', label: 'Tools', color: '#e63333' },
];

const CircularProgress = ({ value, color, size = 96, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
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
        style={{ filter: `drop-shadow(0 0 5px ${color})` }}
      />
    </svg>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const currentSkills = skills[activeCategory] || [];
  const activeCat = skillCategories.find(c => c.key === activeCategory);

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="grid-background" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(123,47,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="02"
          title={<>Skills & <span className="text-gradient">Expertise</span></>}
          subtitle="Jutsu mastered through countless hours of training"
        />

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginTop: '2.5rem', marginBottom: '3rem' }}
        >
          {skillCategories.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '0.625rem 1.5rem', borderRadius: '9999px',
                fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: activeCategory === cat.key ? '#05020a' : 'var(--color-text-secondary)',
                background: activeCategory === cat.key ? cat.color : 'transparent',
                border: `1px solid ${activeCategory === cat.key ? cat.color : 'var(--color-border-subtle)'}`,
                boxShadow: activeCategory === cat.key ? `0 0 15px ${cat.color}66` : 'none',
                transition: 'all 0.3s ease',
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1.25rem' }}
          >
            {currentSkills.map((skill, i) => (
              <HoloCard key={skill.name} glowColor={activeCat?.color || 'var(--color-accent-primary)'}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}
              >
                <div style={{ position: 'relative' }}>
                  <CircularProgress value={skill.proficiency} color={skill.color} size={90} strokeWidth={5} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: skill.color, textShadow: `0 0 8px ${skill.color}` }}>
                    {skill.proficiency}%
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', textAlign: 'center', letterSpacing: '0.03em' }}>
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

export default SkillsSection;
