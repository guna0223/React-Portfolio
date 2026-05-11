import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SharinganHover - Eye rotates on hover with red glow intensify
 * Use on: Skill cards, buttons, social icons
 */
const SharinganHover = ({ children, size = 40 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
      }}
    >
      {/* Sharingan ring that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: '2px solid #cc2222',
              boxShadow: '0 0 15px rgba(204,34,34,0.7), 0 0 30px rgba(204,34,34,0.3)',
              zIndex: -1,
            }}
          >
            {/* Rotating tomoe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 2,
                borderRadius: '50%',
                border: '1px dashed #cc2222',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tomoe dots that appear on hover */}
      {isHovered && [0, 120, 240].map((angle) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const r = size * 0.35;
        return (
          <motion.div
            key={angle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#cc2222',
              transform: `translate(${r * Math.cos(rad)}px, ${r * Math.sin(rad)}px)`,
              boxShadow: '0 0 6px rgba(204,34,34,0.7)',
            }}
          />
        );
      })}

      {/* Children with glow effect */}
      <motion.div
        animate={{
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(204,34,34,0.6))' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SharinganHover;