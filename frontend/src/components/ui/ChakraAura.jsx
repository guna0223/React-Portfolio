import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChakraAura - Animated glowing aura around profile image
 * Features: Moving chakra energy waves, soft blur pulse, floating particles
 */
const ChakraAura = ({ size = 200, color = 'red', intensity = 1 }) => {
  const isRed = color === 'red';
  const primaryColor = isRed ? 'rgba(204, 34, 34' : 'rgba(123, 47, 255';
  const secondaryColor = isRed ? 'rgba(123, 47, 255' : 'rgba(204, 34, 34';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Main pulsing aura rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.15 + i * 0.05, 1],
            opacity: [0.3 + i * 0.1, 0.6 + i * 0.1, 0.3 + i * 0.1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          style={{
            position: 'absolute',
            inset: -size * 0.05 - i * 15,
            borderRadius: '50%',
            border: `1px solid ${i % 2 === 0 ? primaryColor + ',0.4)' : secondaryColor + ',0.3)'}`,
            boxShadow: `0 0 ${20 + i * 10}px ${primaryColor},0.2)`,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Rotating energy waves */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          border: '1px dashed rgba(204, 34, 34, 0.2)',
        }}
      />

      {/* Reverse rotating wave */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 15,
          borderRadius: '50%',
          border: '1px solid rgba(123, 47, 255, 0.15)',
        }}
      />

      {/* Floating chakra particles */}
      <div style={{ position: 'absolute', inset: -30 }}>
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const radius = size * 0.4;
          return (
            <motion.div
              key={i}
              animate={{
                x: [0, radius * Math.cos(angle + Math.PI), 0],
                y: [0, radius * Math.sin(angle + Math.PI), 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#cc2222' : '#7b2fff',
                boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(204,34,34,0.6)' : 'rgba(123,47,255,0.6)'}`,
              }}
            />
          );
        })}
      </div>

      {/* Soft blur pulse effect */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: -size * 0.1,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor},0.3) 0%, transparent 70%)`,
          filter: 'blur(15px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ChakraAura;