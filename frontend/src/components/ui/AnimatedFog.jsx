import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedFog - Slow-moving dark smoke for cinematic depth
 * Features: Multiple layers of smoke, parallax movement
 */
const AnimatedFog = () => {
  // Generate fog layers with different properties
  const fogLayers = [
    { top: '10%', left: '-20%', width: '60%', height: '40%', dur: 40, delay: 0, opacity: 0.08 },
    { top: '30%', left: '-10%', width: '50%', height: '30%', dur: 45, delay: -10, opacity: 0.06 },
    { top: '60%', left: '-30%', width: '70%', height: '40%', dur: 50, delay: -20, opacity: 0.07 },
    { top: '80%', left: '-15%', width: '55%', height: '35%', dur: 55, delay: -30, opacity: 0.05 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {fogLayers.map((layer, i) => (
        <motion.div
          key={i}
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: layer.dur,
            repeat: Infinity,
            ease: 'linear',
            delay: layer.delay,
          }}
          style={{
            position: 'absolute',
            top: layer.top,
            left: layer.left,
            width: layer.width,
            height: layer.height,
            background: `radial-gradient(ellipse at center, rgba(30,0,40,${layer.opacity}) 0%, transparent 70%)`,
            filter: 'blur(30px)',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Additional subtle smoke behind sections */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(0deg, rgba(5,2,10,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default AnimatedFog;