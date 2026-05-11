import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

/**
 * SharinganProjectCard - 3D flip card with Sharingan eye background
 * Features: Magnetic hover tracking, 3D tilt, rotating Sharingan eye reveal, chakra particles
 */
const SharinganProjectCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#cc2222"
      glarePosition="all"
    >
      <motion.div
        className="sharingan-project-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          position: 'relative',
          height: 300,
          borderRadius: '1rem',
          overflow: 'hidden',
          cursor: 'none',
          background: 'rgba(18, 4, 26, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(204, 34, 34, 0.3)',
        }}
      >
        {/* Sharingan eye background - visible on hover */}
        <motion.div
          animate={{
            opacity: isFlipped ? 0.3 : 0,
            scale: isFlipped ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <svg width={120} height={120} viewBox="0 0 120 120">
            <defs>
              <filter id="cardGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx={60} cy={60} r={50} fill="none" stroke="#cc2222" strokeWidth={2} opacity={0.5} />
            <circle cx={60} cy={60} r={35} fill="none" stroke="#cc2222" strokeWidth={1.5} opacity={0.4} />
            <circle cx={60} cy={60} r={20} fill="none" stroke="#cc2222" strokeWidth={1} opacity={0.3} />
            {[0, 120, 240].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const r = 30;
              return (
                <circle
                  key={angle}
                  cx={60 + r * Math.cos(rad)}
                  cy={60 + r * Math.sin(rad)}
                  r={4}
                  fill="#cc2222"
                  style={{ filter: 'url(#cardGlow)' }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Chakra particles on hover */}
        {isFlipped && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#cc2222' : '#7b2fff',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(204,34,34,0.6)' : 'rgba(123,47,255,0.6)'}`,
                }}
              />
            ))}
          </div>
        )}

        {/* Card content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}>
              {project.description}
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
          }}>
            {project.tech?.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  background: 'rgba(204,34,34,0.1)',
                  color: '#cc2222',
                  borderRadius: '0.25rem',
                  border: '1px solid rgba(204,34,34,0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Glowing border on hover */}
        <motion.div
          animate={{
            opacity: isFlipped ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '1rem',
            border: '1px solid rgba(204,34,34,0.5)',
            boxShadow: '0 0 20px rgba(204,34,34,0.3), 0 0 40px rgba(123,47,255,0.15)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </Tilt>
  );
};

export default SharinganProjectCard;