import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SummoningJutsu - Contact form appears through smoke with seal animation
 * Features: Seal animation before reveal, chakra energy transitions
 */
const SummoningJutsu = ({ children, isActive, onComplete }) => {
  const [phase, setPhase] = useState('idle'); // idle -> seal -> reveal -> complete

  useEffect(() => {
    if (isActive) {
      setPhase('seal');
      const sealTimer = setTimeout(() => {
        setPhase('reveal');
        const revealTimer = setTimeout(() => {
          setPhase('complete');
          onComplete && onComplete();
        }, 1000);
        return () => clearTimeout(revealTimer);
      }, 1500);
      return () => clearTimeout(sealTimer);
    }
  }, [isActive, onComplete]);

  if (!isActive && phase === 'idle') return null;

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99997,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Smoke background */}
          <motion.div
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: phase === 'seal' ? Infinity : 0,
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(30,0,40,0.8) 0%, transparent 70%)',
            }}
          />

          {/* Sealing symbols */}
          {phase === 'seal' && (
            <div style={{ position: 'absolute', width: 200, height: 200 }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const r = 80;
                return (
                  <motion.div
                    key={angle}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: angle / 450, duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 20,
                      height: 20,
                      transform: `translate(-50%, -50%) translate(${r * Math.cos(rad)}px, ${r * Math.sin(rad)}px)`,
                      color: '#cc2222',
                      fontSize: '1.5rem',
                    }}
                  >
                    印
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Chakra energy rings */}
          {phase === 'seal' && (
            <div style={{ position: 'absolute', width: 200, height: 200 }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    position: 'absolute',
                    inset: i * 15,
                    borderRadius: '50%',
                    border: `2px solid ${i % 2 === 0 ? '#cc2222' : '#7b2fff'}`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Content reveal */}
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SummoningJutsu;