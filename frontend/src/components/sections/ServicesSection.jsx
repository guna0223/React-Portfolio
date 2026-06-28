import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Layers } from 'lucide-react';
import { services } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import './ServicesSection.css';

const iconMap = { Code, Palette, Database, Layers };
const serviceColors = ['#cc2222', '#7b2fff', '#f5a623', '#e63333'];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding services-section">
      <div className="aurora-bg" />
      <div className="grid-background" />

      <div className="section-container services-section-container">
        <SectionHeading
          number="05"
          title={<>What I <span className="text-gradient">Do</span></>}
          subtitle="Specialised jutsu mastered for every mission"
        />

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code;
            const color = serviceColors[i % serviceColors.length];
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <HoloCard glowColor={color} className="service-card"
                  style={{
                    '--service-color': color,
                    '--service-color-glow': `${color}25`,
                    '--service-color-alpha': `${color}30`,
                    '--service-color-bg': `${color}10`,
                    '--service-color-border': `${color}30`,
                  }}
                >
                  {/* Decorative corner arc */}
                  <div className="service-corner-arc" />

                  {/* Icon */}
                  <div className="service-icon" style={{ background: `${color}12`, border: `1px solid ${color}35`, color: color }}>
                    <Icon size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="service-title">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body service-description">
                    {service.description}
                  </p>

                  {/* Feature pills */}
                  <div className="service-features">
                    {service.features.map((feature) => (
                      <span key={feature} className="service-feature-pill">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="service-accent-line" />
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
