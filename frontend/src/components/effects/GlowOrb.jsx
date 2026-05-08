import React from 'react';
import { motion } from 'framer-motion';

const GlowOrb = ({ color = 'var(--color-accent-primary)', size = 300, top, left, right, bottom, delay = 0 }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: 'blur(80px)',
        opacity: 0.2,
        top,
        left,
        right,
        bottom,
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -10, 5, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};

export default GlowOrb;
