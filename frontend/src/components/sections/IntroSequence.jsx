import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [complete, setComplete] = useState(false);

  const messages = [
    'CHAKRA DETECTED...',
    'READING DOUJUTSU...',
    'SHARINGAN AWAKENED',
    'MANGEKYŌ UNLOCKED',
    'WELCOME, SHINOBI',
  ];

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 600));
    timers.push(setTimeout(() => setPhase(2), 1500));
    timers.push(setTimeout(() => setPhase(3), 2400));
    timers.push(setTimeout(() => setPhase(4), 3200));
    timers.push(setTimeout(() => setPhase(5), 4000));
    timers.push(setTimeout(() => setComplete(true), 4700));
    timers.push(setTimeout(() => onComplete?.(), 5200));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (phase >= 1 && phase <= 5) {
      const message = messages[phase - 1];
      let index = 0;
      setDisplayText('');
      const typeTimer = setInterval(() => {
        if (index < message.length) {
          setDisplayText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
        }
      }, 38);
      return () => clearInterval(typeTimer);
    }
  }, [phase]);

  // Three tomoe positions
  const tomoeAngles = [0, 120, 240];

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #0f0208 0%, #05020a 70%)',
            overflow: 'hidden',
          }}
        >
          {/* Grid background */}
          <div className="grid-background" style={{ opacity: 0.4 }} />
          <div className="scanline-overlay" style={{ opacity: 0.3 }} />

          {/* Rinnegan backdrop rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 2], opacity: [0.3, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: `${120 + i * 80}px`,
                height: `${120 + i * 80}px`,
                borderRadius: '50%',
                border: '1px solid rgba(204, 34, 34, 0.4)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Central Sharingan Eye */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: 'relative', width: 140, height: 140, marginBottom: '3rem' }}
          >
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px dashed rgba(204, 34, 34, 0.5)',
                boxShadow: '0 0 20px rgba(204, 34, 34, 0.3)',
              }}
            />

            {/* Mid ring (reverse) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '2px solid rgba(204, 34, 34, 0.7)',
                boxShadow: '0 0 15px rgba(204, 34, 34, 0.5), inset 0 0 15px rgba(204, 34, 34, 0.2)',
              }}
            />

            {/* Iris */}
            <div
              style={{
                position: 'absolute',
                inset: 22,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #1a0000 40%, #0a0000 100%)',
                border: '1px solid rgba(204, 34, 34, 0.3)',
              }}
            />

            {/* SVG Tomoe */}
            <svg
              style={{ position: 'absolute', inset: 0 }}
              width="140"
              height="140"
              viewBox="0 0 140 140"
            >
              {tomoeAngles.map((angle) => {
                const rad = ((angle - 90) * Math.PI) / 180;
                const r = 22;
                const cx = 70 + r * Math.cos(rad);
                const cy = 70 + r * Math.sin(rad);
                const dotR = 7;
                const tailAngle = angle + 130;
                const tailRad = ((tailAngle - 90) * Math.PI) / 180;
                const tx = cx + dotR * 1.5 * Math.cos(tailRad);
                const ty = cy + dotR * 1.5 * Math.sin(tailRad);
                return (
                  <g key={angle} style={{ filter: 'drop-shadow(0 0 4px #cc2222)' }}>
                    <circle cx={cx} cy={cy} r={dotR} fill="#cc2222" opacity={0.95} />
                    <path
                      d={`M ${cx} ${cy} Q ${(cx + tx) / 2 + 4} ${(cy + ty) / 2} ${tx} ${ty}`}
                      stroke="#cc2222"
                      strokeWidth={5}
                      fill="none"
                      strokeLinecap="round"
                      opacity={0.85}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Pupil glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 16,
                height: 16,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: '#cc2222',
                boxShadow: '0 0 20px rgba(204,34,34,0.8), 0 0 40px rgba(204,34,34,0.4)',
              }}
            />
          </motion.div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: '#cc2222',
              marginBottom: '1.25rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(204,34,34,0.6)',
              minHeight: '1.5rem',
            }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ marginLeft: '3px' }}
            >
              ▮
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: 220,
              height: 2,
              background: 'rgba(204, 34, 34, 0.1)',
              borderRadius: 1,
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(phase / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #cc2222, #7b2fff)',
                boxShadow: '0 0 10px rgba(204, 34, 34, 0.7)',
              }}
            />
          </div>

          {/* Phase dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((p) => (
              <motion.div
                key={p}
                animate={{ scale: p <= phase ? 1 : 0.7, opacity: p <= phase ? 1 : 0.3 }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: p <= phase ? '#cc2222' : 'rgba(204,34,34,0.3)',
                  boxShadow: p <= phase ? '0 0 6px #cc2222' : 'none',
                }}
              />
            ))}
          </div>

          {/* Bottom chakra wave */}
          <div
            style={{
              position: 'absolute',
              bottom: '8%',
              display: 'flex',
              gap: '5px',
              opacity: 0.35,
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [10, 28, 10], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.07 }}
                style={{
                  width: 3,
                  background: i % 3 === 0
                    ? 'linear-gradient(180deg, #cc2222, #7b2fff)'
                    : 'rgba(204, 34, 34, 0.8)',
                  boxShadow: '0 0 4px rgba(204, 34, 34, 0.5)',
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;
