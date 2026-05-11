import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * KunaiSlash - Fast anime slash transition with sparks and glow trails
 * Use on: Project cards, Navigation links
 */
const KunaiSlash = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
      }}
    >
      {/* Slash effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(204,34,34,0.4), rgba(123,47,255,0.4), transparent)',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Spark particles */}
      {isHovered && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#cc2222' : '#7b2fff',
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>
      )}

      {/* Glow trail */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? '0 0 30px rgba(204,34,34,0.5), 0 0 60px rgba(123,47,255,0.3)'
            : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default KunaiSlash;