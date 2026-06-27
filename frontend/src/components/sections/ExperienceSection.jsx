import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, Briefcase, Award, X, FileText, ExternalLink } from 'lucide-react';

const iconMap = { education: GraduationCap, project: Briefcase, achievement: Award };
const typeColors = { education: '#cc2222', project: '#7b2fff', achievement: '#f5a623' };

const ExperienceSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
                  {/* Action Buttons */}
                  {(item.certificateUrl || item.liveUrl) && (
                    <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {item.certificateUrl && (
                        <button 
                          onClick={() => setSelectedCertificate(item.certificateUrl)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: `linear-gradient(90deg, ${color}20, transparent)`,
                            border: `1px solid ${color}50`,
                            borderRadius: '8px',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(90deg, ${color}40, transparent)`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `linear-gradient(90deg, ${color}20, transparent)`;
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <FileText size={16} color={color} />
                          View Certificate
                        </button>
                      )}
                      {item.liveUrl && (
                        <a 
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: `linear-gradient(90deg, transparent, ${color}20)`,
                            border: `1px solid ${color}50`,
                            borderRadius: '8px',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(90deg, transparent, ${color}40)`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `linear-gradient(90deg, transparent, ${color}20)`;
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <ExternalLink size={16} color={color} />
                          Live Project
                        </a>
                      )}
                    </div>
                  )}
                </HoloCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '2rem'
            }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                height: '85vh',
                background: '#111',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X size={20} />
              </button>

              {/* PDF Viewer */}
              <div style={{ width: '100%', height: '100%', background: '#333' }}>
                <iframe
                  src={`${selectedCertificate}#toolbar=0`}
                  title="Certificate"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', background: 'white' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
