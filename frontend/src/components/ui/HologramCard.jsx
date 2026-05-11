import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

/**
 * HologramCard - Glassmorphism cards with floating hover animation
 * Features: Animated glowing borders, pulse effects, 3D tilt
 */
const HologramCard = ({ children, className = '', glowColor = 'red' }) => {
  const colors = {
    red: {
      border: 'rgba(204,34,34,0.4)',
      glow: 'rgba(204,34,34,0.3)',
    },
    purple: {
      border: 'rgba(123,47,255,0.4)',
      glow: 'rgba(123,47,255,0.3)',
    },
  };

  const color = colors[glowColor] || colors.red;

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor={glowColor === 'red' ? '#cc2222' : '#7b2fff'}
      glarePosition="all"
    >
      <motion.div
        className={`hologram-card ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{
          boxShadow: `0 0 30px ${color.glow}, 0 0 60px ${color.glow}`,
        }}
        style={{
          position: 'relative',
          background: 'rgba(18, 4, 26, 0.75)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${color.border}`,
          borderRadius: '1rem',
          padding: '1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Animated border */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '1rem',
            border: `1px solid ${color.border}`,
            pointerEvents: 'none',
          }}
        />

        {/* Pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '1rem',
            background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </motion.div>
    </Tilt>
  );
};

export default HologramCard;