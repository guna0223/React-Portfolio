import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Layers } from 'lucide-react';
import { services } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';

const iconComponents = { Code, Palette, Database, Layers };

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="grid-background" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="05"
          title={<>What I <span className="text-gradient">Do</span></>}
          subtitle="Services and expertise I bring to every project"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }} className="services-grid-new">
          {services.map((service, i) => {
            const Icon = iconComponents[service.icon] || Code;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <GlowCard style={{ padding: '2rem', height: '100%' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--color-accent-primary)' }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-h3" style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {service.features.map((f) => (
                      <span key={f} style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', color: 'var(--color-accent-secondary)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:640px){.services-grid-new{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

export default ServicesSection;
