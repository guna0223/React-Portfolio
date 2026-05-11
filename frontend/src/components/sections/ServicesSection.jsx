import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Layers } from 'lucide-react';
import { services } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';

const iconMap = { Code, Palette, Database, Layers };
const serviceColors = ['#cc2222', '#7b2fff', '#f5a623', '#e63333'];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-bg" />
      <div className="grid-background" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="05"
          title={<>What I <span className="text-gradient">Do</span></>}
          subtitle="Specialised jutsu mastered for every mission"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code;
            const color = serviceColors[i % serviceColors.length];
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <HoloCard glowColor={color} style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {/* Decorative corner arc */}
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', border: `1px solid ${color}30`, pointerEvents: 'none' }} />

                  {/* Icon */}
                  <div style={{ width: 58, height: 58, borderRadius: '14px', background: `${color}12`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: color, boxShadow: `0 0 18px ${color}25` }}>
                    <Icon size={28} />
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body" style={{ fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                    {service.description}
                  </p>

                  {/* Feature pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {service.features.map((feature) => (
                      <span key={feature} style={{ padding: '0.375rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-mono)', background: `${color}10`, border: `1px solid ${color}30`, color: color }}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent */}
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

export default ServicesSection;
