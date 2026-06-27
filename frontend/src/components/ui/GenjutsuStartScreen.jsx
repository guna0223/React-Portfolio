import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import leftEyeImage from '../../assets/Loading/left.png';

/* ─────────────────────────────────────────────
   SHARINGAN SVG — left eye
   Rotating tomoe + crimson iris + Mangekyō blades
───────────────────────────────────────────── */
const SharinganEye = ({ hover, activated }) => {
  return (
    <svg width="72" height="72" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="s-iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ff3a3a" />
          <stop offset="55%" stopColor="#aa0000" />
          <stop offset="100%" stopColor="#1a0000" />
        </radialGradient>
        <radialGradient id="s-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ff0000" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
        </radialGradient>
        <filter id="s-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="s-glow-filter">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* outer ambient glow */}
      <circle cx="50" cy="50" r="46"
        fill="url(#s-glow)" filter="url(#s-blur)"
        opacity={hover ? 0.8 : 0.4}
        style={{ transition: 'opacity 0.4s' }}
      />

      {/* sclera */}
      <circle cx="50" cy="50" r="38" fill="#0a0000" />

      {/* iris */}
      <circle cx="50" cy="50" r="30" fill="url(#s-iris)" />

      {/* Mangekyō blade group — rotates */}
      <g style={{
        transformOrigin: '50px 50px',
        animation: hover
          ? 'sharingan-spin 1.2s linear infinite'
          : 'sharingan-spin 4s linear infinite',
      }}>
        {[0, 120, 240].map((a, i) => (
          <g key={i} transform={`rotate(${a},50,50)`}>
            <path
              d="M50 50 C62 36 62 18 50 10 C38 18 38 36 50 50"
              fill="#000"
              opacity="0.92"
            />
          </g>
        ))}
        {/* tomoe */}
        {[0, 120, 240].map((a, i) => (
          <g key={`t-${i}`} transform={`rotate(${a},50,50)`}>
            <circle cx="50" cy="26" r="4.5" fill="#000" />
            <circle cx="53" cy="24" r="2.2" fill="#cc0000" />
          </g>
        ))}
      </g>

      {/* pupil */}
      <circle cx="50" cy="50" r="9" fill="#000" />
      {/* pupil glow */}
      <circle cx="50" cy="50" r="9" fill="#ff2222" opacity={activated ? 0.9 : 0}
        style={{ transition: 'opacity 0.2s', filter: 'blur(3px)' }}
      />

      {/* cornea reflection */}
      <ellipse cx="42" cy="36" rx="7" ry="4" fill="rgba(255,255,255,0.18)" transform="rotate(-30,42,36)" />
      <circle cx="58" cy="38" r="2" fill="rgba(255,255,255,0.25)" />

      {/* eyelid outline */}
      <path d="M12 50 Q50 22 88 50 Q50 70 12 50 Z"
        fill="none" stroke="rgba(200,0,0,0.5)" strokeWidth="1.2"
      />

      <style>{`
        @keyframes sharingan-spin { to { transform: rotate(360deg); } }
      `}</style>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   RINNEGAN SVG — right eye
   Concentric rings + slow rotation + purple pulse
───────────────────────────────────────────── */
const RinneganEye = ({ hover, activated }) => {
  return (
    <svg width="72" height="72" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="r-iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#9b59ff" />
          <stop offset="45%" stopColor="#5a009d" />
          <stop offset="100%" stopColor="#0d0015" />
        </radialGradient>
        <radialGradient id="r-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#8800ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8800ff" stopOpacity="0" />
        </radialGradient>
        <filter id="r-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* outer ambient glow */}
      <circle cx="50" cy="50" r="46"
        fill="url(#r-glow)" filter="url(#r-blur)"
        opacity={hover ? 0.8 : 0.4}
        style={{ transition: 'opacity 0.4s' }}
      />

      {/* sclera */}
      <circle cx="50" cy="50" r="38" fill="#060010" />

      {/* iris */}
      <circle cx="50" cy="50" r="30" fill="url(#r-iris)" />

      {/* Rinnegan ring system — slow rotate */}
      <g style={{
        transformOrigin: '50px 50px',
        animation: hover
          ? 'rinnegan-spin 2s linear infinite'
          : 'rinnegan-spin 8s linear infinite',
      }}>
        {/* 6 outer tomoe/bumps at ring edge */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <g key={i} transform={`rotate(${a},50,50)`}>
            <circle cx="50" cy="26" r="3.5" fill="#000" opacity="0.85" />
          </g>
        ))}
        {/* middle ring segments */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <g key={`m-${i}`} transform={`rotate(${a + 30},50,50)`}>
            <circle cx="50" cy="35" r="2.5" fill="#000" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* static concentric rings */}
      <circle cx="50" cy="50" r="24" fill="none" stroke="#000" strokeWidth="1.8" opacity="0.7" />
      <circle cx="50" cy="50" r="17" fill="none" stroke="#000" strokeWidth="1.4" opacity="0.6" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#000" strokeWidth="1.2" opacity="0.6" />

      {/* radial spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <line key={i}
          x1="50" y1="50"
          x2={50 + 24 * Math.cos((a * Math.PI) / 180)}
          y2={50 + 24 * Math.sin((a * Math.PI) / 180)}
          stroke="#000" strokeWidth="1.2" opacity="0.5"
        />
      ))}

      {/* pupil */}
      <circle cx="50" cy="50" r="7" fill="#000" />
      <circle cx="50" cy="50" r="7" fill="#aa44ff" opacity={activated ? 0.9 : 0}
        style={{ transition: 'opacity 0.2s', filter: 'blur(3px)' }}
      />

      {/* cornea reflection */}
      <ellipse cx="42" cy="37" rx="6" ry="3.5" fill="rgba(255,255,255,0.15)" transform="rotate(-25,42,37)" />

      {/* eyelid outline */}
      <path d="M12 50 Q50 22 88 50 Q50 70 12 50 Z"
        fill="none" stroke="rgba(120,0,220,0.5)" strokeWidth="1.2"
      />

      <style>{`
        @keyframes rinnegan-spin { to { transform: rotate(360deg); } }
      `}</style>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   PARTICLE — floating ember / chakra dust
───────────────────────────────────────────── */
const Particle = ({ color, x, y, delay, duration, size }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, -80 - Math.random() * 60],
      x: [0, (Math.random() - 0.5) * 60],
      opacity: [0, 0.9, 0],
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

/* ─────────────────────────────────────────────
   SMOKE WISP PARTICLE — floating black smoke
───────────────────────────────────────────── */
const SmokeWisp = ({ x, y, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(50,0,0,0.3) 50%, transparent 100%)',
      filter: 'blur(8px)',
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, -120],
      x: [0, (Math.random() - 0.5) * 80],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1.5, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

/* ─────────────────────────────────────────────
   BLACK FLAME ACCENT — dark flame particles
───────────────────────────────────────────── */
const BlackFlame = ({ x, y, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: '6px',
      height: '15px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(100,0,0,0.4), transparent)',
      borderRadius: '50% 50% 20% 20%',
      filter: 'blur(2px)',
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, -25],
      opacity: [0, 0.8, 0],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

/* ─────────────────────────────────────────────
   CHAKRA BEAM — energy beam between both eyes
───────────────────────────────────────────── */
const ChakraBeam = ({ hover }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: hover ? '160px' : '60px',
      height: '2px',
      background: 'linear-gradient(90deg, #ff0000, #9b00ff)',
      borderRadius: '2px',
      boxShadow: '0 0 12px 4px rgba(180, 0, 255, 0.5)',
      pointerEvents: 'none',
      transition: 'width 0.4s ease, opacity 0.4s ease',
      opacity: hover ? 0.9 : 0.3,
      zIndex: 0,
    }}
    animate={{ opacity: hover ? [0.6, 1, 0.6] : [0.15, 0.35, 0.15] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  />
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const GenjutsuStartScreen = ({ onStart }) => {
  const [hover, setHover] = useState(false);
  const [activated, setActivated] = useState(false);
  const controls = useAnimation();
  const buttonRef = useRef(null);

  // Generate stable particles
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: i % 2 === 0 ? '#ff2222' : '#8800ff',
      x: `${10 + Math.random() * 80}%`,
      y: `${20 + Math.random() * 60}%`,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 3,
      size: 2 + Math.random() * 4,
    }))
  ).current;

  // Smoke wisps for hover effect
  const smokeWisps = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: `${20 + Math.random() * 60}%`,
      y: `${40 + Math.random() * 40}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }))
  ).current;

  // Black flame accents
  const blackFlames = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: `${15 + Math.random() * 70}%`,
      y: `${50 + Math.random() * 30}%`,
      delay: Math.random() * 3,
    }))
  ).current;

  const handleClick = useCallback(async () => {
    if (activated) return;
    setActivated(true);

    // Screen shake
    await controls.start({
      x: [0, -12, 12, -8, 8, -4, 4, 0],
      transition: { duration: 0.45, ease: 'easeInOut' },
    });

    // Brief pause then trigger
    setTimeout(() => onStart(), 200);
  }, [activated, controls, onStart]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 99999,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Background ambient red/purple fog ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(80,0,0,0.35) 0%, rgba(40,0,80,0.18) 50%, transparent 80%)',
      }} />

      {/* ── Floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
        {/* Smoke wisps on hover */}
        <AnimatePresence>
          {hover && smokeWisps.map(w => (
            <SmokeWisp key={`smoke-${w.id}`} {...w} />
          ))}
        </AnimatePresence>
        {/* Black flame accents */}
        {blackFlames.map(f => (
          <BlackFlame key={`flame-${f.id}`} {...f} />
        ))}
      </div>

      {/* ── Vignette edges ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* ── Ambient flicker overlay ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'rgba(80,0,0,0.04)',
        }}
        animate={{ opacity: [0, 1, 0.3, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Subtle screen distortion on hover ── */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(circle at center, rgba(255,0,0,0.05) 0%, transparent 50%)',
              filter: 'blur(20px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Subtitle text above button ── */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{
          color: 'rgba(180,0,0,0.7)',
          fontSize: '11px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          fontFamily: "'Segoe UI', sans-serif",
          marginBottom: '48px',
          textShadow: '0 0 12px rgba(255,0,0,0.4)',
        }}
      >
        Awaken your Dōjutsu
      </motion.p>

      {/* ── The Button ── */}
      <motion.div animate={controls}>
        <motion.button
          ref={buttonRef}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          onClick={handleClick}
          disabled={activated}
          whileHover={{ y: -8, scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            padding: '22px 44px',
            background: 'linear-gradient(135deg, rgba(10,0,0,0.95) 0%, rgba(20,0,30,0.95) 100%)',
            border: '1px solid rgba(180,0,0,0.4)',
            borderRadius: '6px',
            cursor: activated ? 'default' : 'pointer',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            outline: 'none',
            overflow: 'visible',
            boxShadow: hover
              ? '0 0 60px rgba(160,0,0,0.7), 0 0 120px rgba(100,0,180,0.4), inset 0 0 30px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)'
              : '0 0 30px rgba(100,0,0,0.4), 0 0 70px rgba(60,0,120,0.2), inset 0 0 20px rgba(0,0,0,0.6), 0 10px 20px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* Breathing chakra aura */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.95, 1.08, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              inset: '-25px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(200,0,0,0.08) 0%, rgba(100,0,200,0.08) 100%)',
              filter: 'blur(15px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          {/* Animated border glow */}
          <motion.div
            style={{
              position: 'absolute', inset: '-1px',
              borderRadius: '6px',
              background: 'transparent',
              border: '1px solid transparent',
              backgroundClip: 'padding-box',
              pointerEvents: 'none',
              boxShadow: hover
                ? '0 0 0 1px rgba(255,0,0,0.6), 0 0 0 3px rgba(120,0,255,0.2)'
                : '0 0 0 1px rgba(140,0,0,0.3)',
              transition: 'box-shadow 0.4s ease',
            }}
          />

          {/* Breathing chakra aura on hover */}
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.04, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: '-20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(200,0,0,0.12) 0%, rgba(100,0,200,0.12) 100%)',
                  filter: 'blur(12px)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Click burst effect */}
          <AnimatePresence>
            {activated && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '6px',
                    background: 'radial-gradient(circle, rgba(255,80,80,0.8) 0%, rgba(120,0,255,0.6) 40%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Energy ripple */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 8, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    inset: '-50px',
                    border: '2px solid rgba(255,0,0,0.5)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 10, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    inset: '-80px',
                    border: '1px solid rgba(120,0,255,0.3)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── LEFT: Eye ── */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: hover ? 1.5 : 4, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}
          >
            <img src={leftEyeImage} alt="Left Eye" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
          </motion.div>

          {/* ── CENTER: Chakra beam + Text ── */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <ChakraBeam hover={hover} />

            {/* Main label */}
            <motion.span
              style={{
                display: 'block',
                fontFamily: "'Segoe UI', 'Arial', sans-serif",
                fontSize: 'clamp(13px, 2vw, 17px)',
                fontWeight: '700',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: hover
                  ? '0 0 16px rgba(255,80,80,0.9), 0 0 30px rgba(255,0,0,0.5)'
                  : '0 0 8px rgba(200,0,0,0.5)',
                whiteSpace: 'nowrap',
                position: 'relative',
                zIndex: 1,
                transition: 'text-shadow 0.4s ease',
              }}
              animate={{ opacity: activated ? [1, 0.4, 1] : 1 }}
              transition={{ duration: 0.15, repeat: activated ? 2 : 0 }}
            >
              ENTER THE GENJUTSU
            </motion.span>

            {/* Shimmer bar under text */}
            <motion.div
              style={{
                marginTop: '8px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #ff2222, #9900ff, transparent)',
                borderRadius: '1px',
              }}
              animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Sub-label */}
            <motion.span
              style={{
                marginTop: '8px',
                fontSize: '9px',
                letterSpacing: '4px',
                color: 'rgba(180,0,0,0.6)',
                fontFamily: "'Segoe UI', sans-serif",
                textTransform: 'uppercase',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sharingan · Rinnegan
            </motion.span>
          </div>

          {/* ── RIGHT: Eye ── */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: hover ? 1.5 : 4, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}
          >
            <img src={leftEyeImage} alt="Right Eye" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* ── Hint text below ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ delay: 2, duration: 3, times: [0, 0.3, 0.7, 1], repeat: Infinity, repeatDelay: 2 }}
        style={{
          marginTop: '48px',
          color: 'rgba(120,0,0,0.6)',
          fontSize: '10px',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        Click to awaken
      </motion.p>
    </motion.div>
  );
};

export default GenjutsuStartScreen;
