import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

const iconMap = { education: GraduationCap, project: Briefcase, achievement: Award };
const typeColors = { education: '#cc2222', project: '#7b2fff', achievement: '#f5a623' };

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="grid-background" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(204,34,34,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="03"
          title={<>Experience & <span className="text-gradient">Journey</span></>}
          subtitle="My path through education, projects, and achievements"
        />

        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '2rem', marginTop: '3rem', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative' }}>
          {experience.map((item, i) => {
            const Icon = iconMap[item.type] || Briefcase;
            const color = typeColors[item.type] || '#cc2222';
            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ flex: '0 0 320px', scrollSnapAlign: 'start', position: 'relative', zIndex: 1 }}
              >
                <HoloCard glowColor={color} style={{ padding: '2rem', height: '100%' }}>
                  {/* Icon */}
                  <div style={{ width: 52, height: 52, borderRadius: '14px', background: `${color}15`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: color, boxShadow: `0 0 15px ${color}25` }}>
                    <Icon size={26} />
                  </div>

                  {/* Period */}
                  <div className="text-mono" style={{ fontSize: '0.75rem', color: color, marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
                    {item.period}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  {/* Organization */}
                  <div style={{ fontSize: '0.875rem', color: color, marginBottom: '1rem', fontWeight: 600 }}>
                    {item.organization}
                  </div>

                  {/* Description */}
                  <p className="text-body" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.4, borderRadius: '0 0 1rem 1rem' }} />
                </HoloCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
