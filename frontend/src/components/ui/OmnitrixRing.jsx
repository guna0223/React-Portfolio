import React from 'react';
import { motion } from 'framer-motion';

const OmnitrixRing = ({
  size = 300,
  strokeWidth = 3,
  color = 'var(--color-accent-primary)',
  glowColor = 'var(--color-glow-primary)',
  rotationSpeed = 20,
  children,
  className = '',
  style = {},
}) => {
  const halfSize = size / 2;

  return (
    <div
      className={`omnitrix-ring ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        ...style,
      }}
    >
      {/* Outer rotating ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          border: `1px dashed ${color}33`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: rotationSpeed * 1.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle rotating ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: `1px solid ${color}55`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: rotationSpeed, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `${strokeWidth}px solid ${color}`,
          boxShadow: `0 0 15px ${glowColor}, 0 0 30px ${glowColor}44, inset 0 0 15px ${glowColor}22`,
        }}
      />

      {/* Inner ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: `1px solid ${color}44`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: rotationSpeed * 0.75, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {/* Corner accents */}
      {[0, 90, 180, 270].map((angle) => (
        <div
          key={angle}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${glowColor}`,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${halfSize + 4}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default OmnitrixRing;
