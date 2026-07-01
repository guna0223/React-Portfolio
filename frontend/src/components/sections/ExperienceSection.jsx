import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, Briefcase, Award, X, FileText, ExternalLink } from 'lucide-react';
import './ExperienceSection.css';

const iconMap = { education: GraduationCap, project: Briefcase, achievement: Award };
const typeColors = { education: '#cc2222', project: '#7b2fff', achievement: '#f5a623' };

const ExperienceSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="grid-background" />
      <div className="experience-gradient-overlay" />

      <div className="section-container experience-section-container">
        <SectionHeading
          number="03"
          title={<>Experience & <span className="text-gradient">Journey</span></>}
          subtitle="My path through education, projects, and achievements"
        />

        <div className="experience-cards-container">
          {experience.map((item, i) => {
            const Icon = iconMap[item.type] || Briefcase;
            const color = typeColors[item.type] || '#cc2222';
            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="experience-card-wrapper"
                style={{
                  '--experience-color': color,
                  '--experience-color-glow': `${color}25`,
                  '--experience-color-alpha': `${color}20`,
                  '--experience-color-alpha-hover': `${color}40`,
                  '--experience-color-border': `${color}50`,
                }}
              >
                <HoloCard glowColor={color} className="experience-card">
                  {/* Icon */}
                  <div className="experience-icon" style={{ background: `${color}15`, border: `1px solid ${color}40`, color: color }}>
                    <Icon size={26} />
                  </div>

                  {/* Period */}
                  <div className="text-mono experience-period">
                    {item.period}
                  </div>

                  {/* Title */}
                  <h3 className="experience-title">
                    {item.title}
                  </h3>

                  {/* Organization */}
                  <div className="experience-organization">
                    {item.organization}
                  </div>

                  {/* Description */}
                  <p className="text-body experience-description">
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="experience-accent-line" />
                  {/* Action Buttons */}
                  {(item.certificateUrl || item.liveUrl) && (
                    <div className="experience-actions">
                      {item.certificateUrl && (
                        <button
                          onClick={() => setSelectedCertificate(item.certificateUrl)}
                          className="experience-btn experience-btn--certificate"
                        >
                          <FileText size={16} style={{ color }} />
                          View Certificate
                        </button>
                      )}
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="experience-btn experience-btn--live"
                        >
                          <ExternalLink size={16} style={{ color }} />
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
            className="experience-modal-backdrop"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="experience-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="experience-modal-close"
              >
                <X size={20} />
              </button>

              {/* PDF Viewer */}
              <div className="experience-pdf-viewer">
                <iframe
                  src={`${selectedCertificate}#toolbar=0`}
                  title="Certificate"
                  width="100%"
                  height="100%"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(ExperienceSection);