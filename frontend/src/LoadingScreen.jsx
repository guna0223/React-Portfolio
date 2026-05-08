import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exit'
  const name = 'GUNASEKAR';

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('exit');
        setTimeout(() => onComplete(), 600);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Name reveal */}
          <div style={{ display: 'flex', gap: '0.125em', overflow: 'hidden' }}>
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  display: 'inline-block',
                }}
                className="text-gradient"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-mono"
            style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', letterSpacing: '0.1em' }}
          >
            Creative Developer & UI/UX Designer
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '200px' }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{ position: 'relative' }}
          >
            <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))',
                  borderRadius: '1px',
                  boxShadow: '0 0 10px var(--color-glow-primary)',
                  width: `${progress}%`,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div className="text-mono" style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
