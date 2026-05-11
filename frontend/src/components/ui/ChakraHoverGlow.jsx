import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ChakraHoverGlow - Neon glow around buttons with animated border trails
 * Use on: CTA buttons, Navbar items
 */
const ChakraHoverGlow = ({ children, variant = 'red' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    red: {
      primary: '#cc2222',
      secondary: '#e63333',
      glow: 'rgba(204,34,34,0.5)',
    },
    purple: {
      primary: '#7b2fff',
      secondary: '#9f5fff',
      glow: 'rgba(123,47,255,0.5)',
    },
  };

  const color = colors[variant] || colors.red;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* Animated border trail */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '0.75rem',
            background: `linear-gradient(45deg, ${color.primary}, ${color.secondary}, ${color.primary})`,
            backgroundSize: '200% 200%',
            zIndex: -1,
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              inset: 1,
              borderRadius: '0.65rem',
              background: 'var(--color-bg-primary)',
            }}
          />
        </motion.div>
      )}

      {/* Neon glow effect */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${color.glow}, 0 0 40px ${color.glow}, inset 0 0 10px ${color.glow}`
            : '0 0 5px rgba(204,34,34,0.1)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'inline-block',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ChakraHoverGlow;