import React from 'react';
import { motion } from 'framer-motion';

const ChidoriFlash = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-30%', // Tightened from -60%
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Intense White-Hot Plasma Core */}
      <motion.div
        animate={{ scale: [1, 1.1, 0.9, 1.2, 1], opacity: [0.8, 1, 0.7, 1, 0.8] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '35%', height: '35%', // Reduced size
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 10%, #2782FF 50%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Aggressive Electric Lightning Arcs (SVG Turbulence) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%', height: '100%',
          filter: 'drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 15px #2782FF)',
          animation: 'chidoriFlicker 0.1s infinite alternate',
        }}
      >
        <defs>
          <filter id="chidoriNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 4 -1" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
          </filter>
        </defs>
        
        {/* Jagged electric veins shooting out from center */}
        <motion.g
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'steps(4)' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <path d="M 50 50 L 25 15 M 50 50 L 75 25 M 50 50 L 85 65 M 50 50 L 35 85 M 50 50 L 15 50" stroke="#ffffff" strokeWidth="1" fill="none" filter="url(#chidoriNoise)" />
          <path d="M 50 50 L 35 5 M 50 50 L 95 35 M 50 50 L 65 95 M 50 50 L 5 65" stroke="#2782FF" strokeWidth="3" fill="none" filter="url(#chidoriNoise)" opacity="0.8" />
        </motion.g>
      </svg>
      
      {/* Ambient Electric Glow Pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '80%', height: '80%', // Tightened ambient glow
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(39,130,255,0.4) 0%, rgba(39,130,255,0.1) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};

export default ChidoriFlash;
