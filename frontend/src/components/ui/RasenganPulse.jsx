import React from 'react';
import { motion } from 'framer-motion';

const RasenganPulse = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-35%', // Tightened from -70%
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Intense Chakra Core */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: 360 }}
        transition={{ scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
        style={{
          position: 'absolute',
          width: '55%', height: '55%', // Rescaled to match tightened inset
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,119,204,0.8) 30%, rgba(12,47,223,0.4) 60%, transparent 100%)',
          filter: 'blur(6px)',
          boxShadow: '0 0 30px rgba(0,119,204,0.8), inset 0 0 15px #ffffff',
        }}
      >
        {/* Swirling Chakra Wind Textures inside core */}
        <motion.div
          animate={{ rotate: -720 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: '5%', borderRadius: '50%',
            border: '4px dashed rgba(255,255,255,0.6)',
            filter: 'blur(2px)',
          }}
        />
        <motion.div
          animate={{ rotate: 720 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: '-10%', borderRadius: '50%',
            border: '3px solid rgba(12,47,223,0.7)',
            borderTopColor: 'transparent', borderBottomColor: 'transparent',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* Dense Outer Swirl (Wind Chakra) */}
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.02, 1] }}
        transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
        style={{
          position: 'absolute',
          width: '80%', height: '80%',
          borderRadius: '50%',
          border: '8px dotted rgba(0,119,204,0.4)',
          filter: 'blur(4px)',
        }}
      />
      
      {/* Ambient Flowing Blue Aura */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(12,47,223,0.3) 0%, rgba(0,119,204,0.15) 40%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
    </div>
  );
};

export default RasenganPulse;
