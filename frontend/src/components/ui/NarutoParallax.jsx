import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * NarutoParallax - Naruto-style parallax scene with multiple moving layers
 * Features: Mountains, clouds, floating particles, character silhouette effects
 */
const NarutoParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms for different layers
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const silhouetteY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Distant mountains */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          y: mountainY,
          background: 'linear-gradient(180deg, rgba(30,0,40,0.3) 0%, rgba(10,2,15,0.1) 100%)',
          clipPath: 'polygon(0% 100%, 15% 60%, 30% 80%, 45% 50%, 60% 70%, 75% 40%, 90% 60%, 100% 30%, 100% 100%)',
        }}
      />

      {/* Floating clouds */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          y: cloudY,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              x: ['-10%', '110%'],
            }}
            transition={{
              duration: 40 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: `${i * 30}%`,
              left: '-10%',
              width: '40%',
              height: '30%',
              background: 'radial-gradient(ellipse at center, rgba(80,0,0,0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
              borderRadius: '50%',
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: particleY,
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: Math.random() > 0.5 ? '#cc2222' : '#7b2fff',
              boxShadow: `0 0 10px ${Math.random() > 0.5 ? 'rgba(204,34,34,0.5)' : 'rgba(123,47,255,0.5)'}`,
            }}
          />
        ))}
      </motion.div>

      {/* Character silhouette effect */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '10%',
          y: silhouetteY,
          width: 100,
          height: 150,
          background: 'linear-gradient(180deg, rgba(100,0,0,0.4) 0%, rgba(30,0,40,0.2) 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 85% 30%, 85% 100%, 15% 100%, 15% 30%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default NarutoParallax;