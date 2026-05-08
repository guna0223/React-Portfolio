import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  education: GraduationCap,
  project: Briefcase,
  achievement: Award,
};

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${totalScroll}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      animation: gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
      }),
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <div className="grid-background" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(4rem, 10vh, 8rem)',
        }}
      >
        <div className="section-container">
          <SectionHeading
            number="03"
            title={<>Experience & <span className="text-gradient">Journey</span></>}
            subtitle="My path through education, projects, and achievements"
          />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '2rem',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: '40vw',
            paddingTop: '3rem',
            paddingBottom: '4rem',
            width: 'max-content',
          }}
        >
          {experience.map((item, i) => {
            const Icon = iconMap[item.type] || Briefcase;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  minWidth: '360px',
                  maxWidth: '400px',
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  background: 'var(--color-bg-card)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--color-border-subtle)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 30px var(--color-glow-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(124, 58, 237, 0.1)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: 'var(--color-accent-primary)',
                  }}
                >
                  <Icon size={22} />
                </div>

                {/* Period */}
                <div
                  className="text-mono"
                  style={{
                    color: 'var(--color-accent-secondary)',
                    fontSize: '0.8125rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.period}
                </div>

                {/* Title */}
                <h3
                  className="text-h3"
                  style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}
                >
                  {item.title}
                </h3>

                {/* Organization */}
                <div
                  style={{
                    color: 'var(--color-accent-primary)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.organization}
                </div>

                {/* Description */}
                <p className="text-body" style={{ fontSize: '0.9375rem' }}>
                  {item.description}
                </p>

                {/* Timeline connector line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-2rem',
                    width: '2rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.4), transparent)',
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Timeline line at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--color-accent-primary), var(--color-accent-secondary), transparent)',
            opacity: 0.3,
          }}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
