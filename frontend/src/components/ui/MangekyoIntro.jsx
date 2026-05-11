import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * Hyper-Realistic Cinematic Itachi Mangekyō Awakening Intro
 * 5-second immersive sequence.
 */
const MangekyoIntro = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  
  const containerRef = useRef(null);
  const eyeContainerRef = useRef(null);
  const topEyelidRef = useRef(null);
  const bottomEyelidRef = useRef(null);
  const eyeMaskRef = useRef(null);
  const mangekyoRef = useRef(null);
  const redGlowRef = useRef(null);
  const irisGroupRef = useRef(null);
  const cameraShakeRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 5-Second GSAP Master Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setExiting(true);
        setTimeout(() => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 1000); // Allow framer-motion exit animation
      }
    });

    // --- Initial State ---
    // The eye is closed. Paths for almond eye shape.
    const closedTop = "M 5 60 C 35 60 85 60 115 60";
    const closedBottom = "M 115 60 C 85 60 35 60 5 60";
    const openTop = "M 5 60 C 30 25 90 25 115 60";
    const openBottom = "M 115 60 C 90 85 30 85 5 60";
    
    // Initial closed mask
    gsap.set(eyeMaskRef.current, { attr: { d: `${closedTop} ${closedBottom} Z` } });
    gsap.set(topEyelidRef.current, { attr: { d: `M 0 0 L 120 0 L 120 60 L 0 60 Z ${closedTop}` } });
    gsap.set(bottomEyelidRef.current, { attr: { d: `${closedBottom} L 0 120 L 120 120 Z` } });

    gsap.set(redGlowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(eyeContainerRef.current, { opacity: 0 });
    gsap.set(irisGroupRef.current, { x: -3, y: 1 }); // Starts slightly off-center
    gsap.set(mangekyoRef.current, { rotation: -10 });

    // ==========================================
    // 0s - 1s: DARKNESS & FAINT GLOW
    // ==========================================
    tl.to(redGlowRef.current, { opacity: 0.3, scale: 1, duration: 1, ease: 'power1.inOut' }, 0);
    tl.to(eyeContainerRef.current, { opacity: 1, duration: 1 }, 0); // eye is hidden by closed eyelids anyway

    // ==========================================
    // 1s - 3s: EYE SLOWLY OPENS
    // ==========================================
    // Eyelids open smoothly
    tl.to(eyeMaskRef.current, { attr: { d: `${openTop} ${openBottom} Z` }, duration: 2, ease: 'power2.inOut' }, 1);
    tl.to(topEyelidRef.current, { attr: { d: `M 0 -20 L 120 -20 L 120 60 L 0 60 Z ${openTop}` }, duration: 2, ease: 'power2.inOut' }, 1);
    tl.to(bottomEyelidRef.current, { attr: { d: `${openBottom} L 0 140 L 120 140 Z` }, duration: 2, ease: 'power2.inOut' }, 1);
    
    // Iris drifts towards center
    tl.to(irisGroupRef.current, { x: -1, y: 0.5, duration: 2, ease: 'power1.inOut' }, 1);

    // ==========================================
    // 3s - 5s: FOCUS LOCK & PULSE
    // ==========================================
    // Snap focus
    tl.to(irisGroupRef.current, { x: 0, y: 0, duration: 0.2, ease: 'power4.out' }, 3);
    
    // Very subtle rotation of Mangekyō
    tl.to(mangekyoRef.current, { rotation: 0, duration: 2, ease: 'power1.inOut' }, 3);

    // Red bloom expands volumetrically
    tl.to(redGlowRef.current, { opacity: 0.85, scale: 1.5, duration: 1.5, ease: 'power2.out' }, 3);
    
    // Subtle cinematic camera shake
    tl.to(cameraShakeRef.current, {
      x: () => (Math.random() - 0.5) * 4,
      y: () => (Math.random() - 0.5) * 4,
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      ease: 'none'
    }, 3);
    tl.to(cameraShakeRef.current, { x: 0, y: 0, duration: 0.1 }, 3.5);

    // Deepen eye container drop-shadow for terrifying bloom
    tl.to(eyeContainerRef.current, { filter: 'drop-shadow(0 0 60px rgba(255,0,0,0.6))', duration: 1.5 }, 3);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: 'power2.inOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#020002',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Faint ambient smoke in background */}
          <motion.div
            animate={{ rotate: 10, scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '150vw',
              height: '150vh',
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,0,0,0.95) 80%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Cinematic Volumetric Red Bloom Layer */}
          <div
            ref={redGlowRef}
            style={{
              position: 'absolute',
              width: '120vw',
              height: '120vh',
              background: 'radial-gradient(circle, rgba(200,10,10,0.4) 0%, rgba(80,0,0,0.15) 35%, transparent 65%)',
              filter: 'blur(50px)',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Camera Shake Wrapper */}
          <div ref={cameraShakeRef} style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 10 }}>
            {/* Main SVG Eye Container */}
            <div
              ref={eyeContainerRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                filter: 'drop-shadow(0 0 10px rgba(100,0,0,0.2))',
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 120"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Fibrous Iris Texture */}
                  <filter id="irisTexture" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.1 0 0 0  0 0.1 0 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
                    <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
                    <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
                  </filter>

                  {/* Wet Specular Reflection */}
                  <filter id="wetReflection" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0" in="noise" result="coloredNoise" />
                    <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
                    <feBlend mode="screen" in="texture" in2="SourceGraphic" />
                  </filter>
                  
                  {/* Sclera Base - Dark and moody */}
                  <radialGradient id="scleraGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffdada" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#801010" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#1a0000" stopOpacity="0.95" />
                  </radialGradient>

                  {/* Deep Crimson Iris Gradient */}
                  <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff0a0a" />
                    <stop offset="60%" stopColor="#aa0000" />
                    <stop offset="90%" stopColor="#330000" />
                    <stop offset="100%" stopColor="#000000" />
                  </radialGradient>

                  {/* Dynamic Eye Mask */}
                  <clipPath id="eyeMaskClip">
                    <path ref={eyeMaskRef} d="" />
                  </clipPath>
                </defs>

                {/* --- EYE INTERIOR (Clipped to almond shape) --- */}
                <g clipPath="url(#eyeMaskClip)">
                  {/* Sclera */}
                  <rect width="120" height="120" fill="#000" />
                  <circle cx="60" cy="60" r="45" fill="url(#scleraGradient)" filter="blur(2px)" />

                  {/* Subtle Blood Vessels near corners */}
                  <path d="M 5 60 Q 20 50 35 60 M 115 60 Q 100 70 85 60 M 15 55 Q 30 45 40 58 M 105 65 Q 90 75 80 62" stroke="rgba(150,0,0,0.5)" strokeWidth="0.5" fill="none" filter="blur(0.5px)" />

                  {/* IRIS GROUP */}
                  <g ref={irisGroupRef}>
                    {/* Base Iris */}
                    <circle cx="60" cy="60" r="28" fill="url(#irisGradient)" filter="url(#irisTexture)" />
                    {/* Outer Iris Ring */}
                    <circle cx="60" cy="60" r="28" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.9" />
                    <circle cx="60" cy="60" r="27" fill="none" stroke="rgba(255,0,0,0.4)" strokeWidth="0.5" opacity="0.6" />

                    {/* Itachi Mangekyō Pattern */}
                    <g ref={mangekyoRef} style={{ transformOrigin: '60px 60px' }}>
                      <circle cx="60" cy="60" r="8" fill="#050000" />
                      {/* Three curved scythe blades originating from pupil */}
                      {[0, 120, 240].map((angle, i) => (
                        <g key={i} transform={`rotate(${angle}, 60, 60)`}>
                          {/* Perfect Itachi blade bezier curve */}
                          <path d="M 60,60 C 76,40 76,20 60,11 C 53,25 53,45 60,60" fill="#050000" />
                        </g>
                      ))}
                      {/* Thin outer connecting rim */}
                      <circle cx="60" cy="60" r="24" fill="none" stroke="#050000" strokeWidth="0.5" opacity="0.5" />
                    </g>

                    {/* Pupil Depth Shadow */}
                    <radialGradient id="pupilShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000" stopOpacity="1" />
                      <stop offset="50%" stopColor="#000" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <circle cx="60" cy="60" r="12" fill="url(#pupilShadow)" pointerEvents="none" />

                    {/* Highly Realistic Wet Glossy Reflection (Cinema lighting setup) */}
                    <path d="M 42 38 Q 60 28 78 38 Q 60 36 42 38 Z" fill="rgba(255,255,255,0.7)" filter="blur(0.8px)" />
                    <path d="M 45 42 Q 60 35 75 42 Q 60 40 45 42 Z" fill="rgba(255,255,255,0.4)" filter="blur(0.5px)" />
                    {/* Ring light / window reflection curve */}
                    <path d="M 38 48 A 20 20 0 0 1 48 38" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" filter="blur(0.5px)" />
                  </g>
                  
                  {/* Full Eye Specular Filter (makes the whole surface feel wet) */}
                  <rect width="120" height="120" fill="transparent" filter="url(#wetReflection)" opacity="0.5" pointerEvents="none" />
                </g>

                {/* --- EYELIDS & SKIN SHADOWS --- */}
                {/* Eyelid shapes are drawn with fill-rule="evenodd" to punch a hole, or just layered. 
                    Here we use thick paths to cover the top and bottom. */}
                <path ref={topEyelidRef} fill="#030001" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.9))" />
                <path ref={bottomEyelidRef} fill="#030001" filter="drop-shadow(0 -4px 6px rgba(0,0,0,0.9))" />

                {/* Sharp Eyelashes (Subtle details on the upper lid edge) */}
                {/* Drawn manually just above the open eye line */}
                <g opacity="0.6" fill="none" stroke="#000" strokeWidth="0.8" strokeLinecap="round">
                  <path d="M 30 25 Q 25 15 20 18" />
                  <path d="M 45 20 Q 40 10 35 12" />
                  <path d="M 60 18 Q 60 8 55 10" />
                  <path d="M 75 20 Q 80 10 85 12" />
                  <path d="M 90 25 Q 95 15 100 18" />
                </g>

                {/* Skin folds (Deep shadows mimicking bone structure) */}
                <path d="M 15 15 Q 60 -5 105 15" fill="none" stroke="rgba(0,0,0,0.8)" strokeWidth="6" filter="blur(4px)" />
                <path d="M 20 100 Q 60 110 100 100" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="4" filter="blur(3px)" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MangekyoIntro;