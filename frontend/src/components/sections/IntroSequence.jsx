import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroSequence.css';

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
          className="intro-overlay"
        >
          {/* Grid background */}
          <div className="grid-background intro-grid-bg" />
          <div className="scanline-overlay intro-scanlines" />

          {/* Rinnegan backdrop rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 2], opacity: [0.3, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
              className="intro-rinnegan-ring"
              style={{
                '--ring-size': `${120 + i * 80}px`,
              }}
            />
          ))}

          {/* Central Sharingan Eye */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            className="intro-eye-container"
          >
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="intro-ring-outer"
            />

            {/* Mid ring (reverse) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="intro-ring-mid"
            />

            {/* Iris */}
            <div className="intro-iris" />

            {/* SVG Tomoe */}
            <svg
              className="intro-tomoe-svg"
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
              className="intro-pupil"
            />
          </motion.div>

          {/* Status text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="intro-status"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="intro-cursor"
            >
              ▮
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div className="intro-progress">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(phase / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="intro-progress-fill"
            />
          </div>

          {/* Phase dots */}
          <div className="intro-dots">
            {[1, 2, 3, 4, 5].map((p) => (
              <motion.div
                key={p}
                animate={{ scale: p <= phase ? 1 : 0.7, opacity: p <= phase ? 1 : 0.3 }}
                className={`intro-dot${p <= phase ? ' intro-dot--active' : ' intro-dot--inactive'}`}
              />
            ))}
          </div>

          {/* Bottom chakra wave */}
          <div className="intro-chakra-wave">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [10, 28, 10], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.07 }}
                className={`intro-chakra-bar${i % 3 === 0 ? ' intro-chakra-bar--gradient' : ' intro-chakra-bar--solid'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;
