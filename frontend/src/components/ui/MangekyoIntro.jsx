import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MangekyoIntro - Cinematic Sharingan eye opening animation
 * Used as loading screen with eye slowly opening, rotating pattern, red glow pulse
 */
const MangekyoIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('initial'); // initial -> opening -> rotating -> complete
  const [eyeOpenProgress, setEyeOpenProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Eye opening (0-1.5s)
    const openingTimer = setTimeout(() => {
      setPhase('opening');
      const progressInterval = setInterval(() => {
        setEyeOpenProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      
      // Phase 2: Full rotation (1.5-3s)
      setTimeout(() => setPhase('rotating'), 1500);
      
      // Phase 3: Complete (3-3.5s)
      setTimeout(() => {
        setPhase('complete');
        setTimeout(() => onComplete && onComplete(), 500);
      }, 3000);
    }, 500);

    return () => clearTimeout(openingTimer);
  }, [onComplete]);

  // Tomoe positions for Sharingan
  const tomoeAngles = [0, 120, 240];

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'radial-gradient(ellipse at center, #05020a 0%, #000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Black smoke particles */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 40 + Math.random() * 60,
                  height: 40 + Math.random() * 60,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />
            ))}
          </div>

          {/* Main eye container */}
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                border: '2px dashed rgba(204, 34, 34, 0.4)',
                opacity: phase === 'rotating' ? 0.8 : 0,
              }}
            />

            {/* Inner rotating ring (reverse) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '1px solid rgba(123, 47, 255, 0.5)',
                opacity: phase === 'rotating' ? 0.6 : 0,
              }}
            />

            {/* Eye SVG */}
            <svg
              width={200}
              height={200}
              viewBox="0 0 200 200"
              style={{ position: 'absolute', inset: 0 }}
            >
              <defs>
                <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0d0020" />
                  <stop offset="100%" stopColor="#05020a" />
                </radialGradient>
                <filter id="redGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Eye background */}
              <circle cx={100} cy={100} r={80} fill="url(#eyeGradient)" />

              {/* Outer ring */}
              <circle
                cx={100}
                cy={100}
                r={75}
                fill="none"
                stroke="#cc2222"
                strokeWidth={2}
                opacity={0.6}
                style={{ filter: 'url(#redGlow)' }}
              />

              {/* Middle ring */}
              <circle
                cx={100}
                cy={100}
                r={60}
                fill="none"
                stroke="#cc2222"
                strokeWidth={1.5}
                opacity={0.4}
              />

              {/* Inner ring */}
              <circle
                cx={100}
                cy={100}
                r={45}
                fill="none"
                stroke="#cc2222"
                strokeWidth={1}
                opacity={0.3}
              />

              {/* Tomoe - appear during opening */}
              {phase !== 'initial' && tomoeAngles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 55;
                const cx = 100 + r * Math.cos(rad);
                const cy = 100 + r * Math.sin(rad);
                const size = 8;

                return (
                  <g key={i}>
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={size}
                      fill="#cc2222"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                      style={{ filter: 'url(#redGlow)' }}
                    />
                    <motion.path
                      d={`M ${cx} ${cy} C ${cx + size * 2} ${cy - size}, ${cx + size * 2} ${cy + size}, ${cx} ${cy + size * 1.5}`}
                      stroke="#cc2222"
                      strokeWidth={size * 0.6}
                      fill="none"
                      strokeLinecap="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 0.8, pathLength: 1 }}
                      transition={{ delay: i * 0.2 + 0.1, duration: 0.4 }}
                    />
                  </g>
                );
              })}

              {/* Pupil */}
              <motion.circle
                cx={100}
                cy={100}
                r={12}
                fill="#cc2222"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'rotating' ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 0.3 }}
                style={{ filter: 'url(#redGlow)' }}
              />
            </svg>

            {/* Red glow pulse */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                inset: -30,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(204,34,34,0.3) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Screen distortion effect during rotation */}
            {phase === 'rotating' && (
              <motion.div
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  inset: -50,
                  background: 'radial-gradient(circle, transparent 30%, rgba(204,34,34,0.05) 70%, transparent 100%)',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(204,34,34,0.6)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {phase === 'rotating' ? 'INITIALIZING...' : 'AWAKENING...'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MangekyoIntro;