import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RinneganPortal - Cinematic portal transition animation
 * Used for page transitions and section switching
 */
const RinneganPortal = ({ isActive, onTransitionComplete }) => {
  const [phase, setPhase] = useState('idle'); // idle -> opening -> open -> closing

  useEffect(() => {
    if (isActive) {
      setPhase('opening');
      const openTimer = setTimeout(() => {
        setPhase('open');
        const closeTimer = setTimeout(() => {
          setPhase('closing');
          setTimeout(() => {
            setPhase('idle');
            onTransitionComplete && onTransitionComplete();
          }, 800);
        }, 300);
        return () => clearTimeout(closeTimer);
      }, 1000);
      return () => clearTimeout(openTimer);
    }
  }, [isActive, onTransitionComplete]);

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
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #05020a 0%, #000 100%)',
            pointerEvents: 'none',
          }}
        >
          {/* Central portal */}
          <div style={{ position: 'relative', width: 300, height: 300 }}>
            {/* Concentric rings */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: phase === 'opening' ? [0, 1.2, 1] : phase === 'open' ? 1 : [1, 1.5, 0],
                  opacity: phase === 'opening' ? [0, 0.8, 0.6] : phase === 'open' ? 0.6 : [0.6, 0.3, 0],
                }}
                transition={{
                  duration: phase === 'opening' ? 1 : phase === 'open' ? 0.5 : 0.8,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  inset: i * 25,
                  borderRadius: '50%',
                  border: `2px solid ${i % 2 === 0 ? 'rgba(123, 47, 255, 0.6)' : 'rgba(204, 34, 34, 0.5)'}`,
                  boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(123, 47, 255, 0.4)' : 'rgba(204, 34, 34, 0.3)'}`,
                }}
              />
            ))}

            {/* Rotating chakra circles */}
            {phase === 'open' && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: 10,
                    borderRadius: '50%',
                    border: '1px dashed rgba(123, 47, 255, 0.4)',
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    inset: 30,
                    borderRadius: '50%',
                    border: '1px solid rgba(204, 34, 34, 0.3)',
                  }}
                />
              </>
            )}

            {/* Rinnegan concentric circles inside */}
            {phase === 'open' && (
              <div style={{ position: 'absolute', inset: 60 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      inset: i * 8,
                      margin: 'auto',
                      width: 120 - i * 12,
                      height: 120 - i * 12,
                      borderRadius: '50%',
                      border: '1px solid rgba(123, 47, 255, 0.3)',
                      opacity: 0.4 + i * 0.08,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Central pupil */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: phase === 'open' ? 1 : 0,
                scale: phase === 'open' ? 1 : 0,
              }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #cc2222 0%, #7b2fff 100%)',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(123, 47, 255, 0.6), 0 0 40px rgba(204, 34, 34, 0.4)',
              }}
            />

            {/* Energy particles */}
            {phase === 'open' && (
              <div style={{ position: 'absolute', inset: -50 }}>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                      x: [0, 100 * Math.cos((i * 30 * Math.PI) / 180)],
                      y: [0, 100 * Math.sin((i * 30 * Math.PI) / 180)],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: i % 2 === 0 ? '#cc2222' : '#7b2fff',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RinneganPortal;