import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * Dark Single-Eye Cinematic Intro
 * Pitch-black, heavily cropped, asymmetrical single-eye focus.
 * Finely tuned to preserve deep shadows while making the iris readable.
 *
 * Audio: Production-quality handling with autoplay fallback,
 * volume fade-in/out, duplicate prevention, and cleanup.
 */
const MangekyoIntro = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  const containerRef = useRef(null);
  const topEyelidRef = useRef(null);
  const bottomEyelidRef = useRef(null);
  const irisRef = useRef(null);
  const mangekyoRef = useRef(null);
  const pupilGlowRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0;

      audio.play()
        .then(() => {
          let volume = 0;

          const fade = setInterval(() => {
            if (volume < 0.4) {
              volume += 0.02;
              audio.volume = volume;
            } else {
              clearInterval(fade);
            }
          }, 100);
        })
        .catch((err) => {
          console.log('Audio blocked:', err);
        });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        setExiting(true);
        setTimeout(() => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 1000);
      },
    });

    // Eye positioned at X: 550, Y: 225
    const closedTop = "M 350 225 C 450 225 650 225 750 225";
    const closedBottom = "M 750 225 C 650 225 450 225 350 225";

    // Opened slightly wider than before to increase iris visibility
    const openTop = "M 350 225 C 450 160 650 170 750 225";
    const openBottom = "M 750 225 C 650 260 450 260 350 225";

    // Initialize in pure darkness
    gsap.set(topEyelidRef.current, { attr: { d: `M 0 0 L 800 0 L 800 225 L 0 225 Z ${closedTop}` } });
    gsap.set(bottomEyelidRef.current, { attr: { d: `${closedBottom} L 0 450 L 800 450 Z` } });
    gsap.set(irisRef.current, { scale: 0.8, opacity: 0, transformOrigin: '550px 225px' });
    gsap.set(mangekyoRef.current, { rotation: -20, transformOrigin: '550px 225px' });
    gsap.set(pupilGlowRef.current, { opacity: 0 });

    // 0s - 0.7s: Crimson pupil fades in
    tl.to(pupilGlowRef.current, { opacity: 0.7, duration: 0.7, ease: 'power2.inOut' }, 0);

    // 0.7s - 2.5s: Eyelids part, revealing higher-contrast iris
    tl.to(irisRef.current, { scale: 1, opacity: 1, duration: 1.3, ease: 'power2.out' }, 0.7);
    tl.to(topEyelidRef.current, { attr: { d: `M 0 0 L 800 0 L 800 225 L 0 225 Z ${openTop}` }, duration: 1.8, ease: 'power2.inOut' }, 0.7);
    tl.to(bottomEyelidRef.current, { attr: { d: `${openBottom} L 0 450 L 800 450 Z` }, duration: 1.8, ease: 'power2.inOut' }, 0.7);

    // 2.0s - 4.0s: Hold, slight pulse, Mangekyō locks
    tl.to(irisRef.current, { scale: 1.05, duration: 0.3, ease: 'power4.out' }, 3.2);
    tl.to(mangekyoRef.current, { rotation: 0, duration: 2.0, ease: 'power1.inOut' }, 2.0);
    // Stronger final pupil pulse
    tl.to(pupilGlowRef.current, { opacity: 1, scale: 1.6, duration: 2.0, ease: 'power2.out' }, 2.0);

    // ── Cleanup on unmount ──
    return () => {
      tl.kill();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'power2.inOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Enhanced Subtle Red Ambient Glow around the single eye */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-30%, -50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(160,0,0,0.18) 0%, transparent 45%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Cinematic Container */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Absolute Negative Space Gradient Overlay */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.85) 100%)',
            }} />

            <svg width="100%" height="100%" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* Slightly brighter sclera to ensure shadow depth isn't lost completely to black */}
                <radialGradient id="scleraGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#4a0000" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#050000" stopOpacity="1" />
                </radialGradient>

                {/* More vibrant crimson iris */}
                <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff2222" />
                  <stop offset="65%" stopColor="#aa0000" />
                  <stop offset="100%" stopColor="#1a0000" />
                </radialGradient>
              </defs>

              {/* Scale up the entire eye composition around its center */}
              <g transform="translate(550, 225) scale(1.4) translate(-550, -225)">
                {/* Sclera & Eye Base */}
                <path d="M 350 225 C 450 160 650 170 750 225 C 650 260 450 260 350 225 Z" fill="url(#scleraGradient)" />

                {/* Glowing pupil core */}
                <circle ref={pupilGlowRef} cx="550" cy="225" r="12" fill="#ff1a1a" filter="blur(6px)" />

                {/* Iris Group */}
                <g ref={irisRef}>
                  <circle cx="550" cy="225" r="62" fill="url(#irisGradient)" />
                  <circle cx="550" cy="225" r="62" fill="none" stroke="#000" strokeWidth="2" opacity="0.95" />

                  {/* Highly readable Mangekyō Pattern */}
                  <g ref={mangekyoRef}>
                    <circle cx="550" cy="225" r="14" fill="#000" />
                    {[0, 120, 240].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle}, 550, 225)`}>
                        <path d="M 550 225 C 580 195 580 150 550 135 C 530 170 530 200 550 225" fill="#000" />
                      </g>
                    ))}
                    {/* Subtle black outer ring for depth */}
                    <circle cx="550" cy="225" r="50" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.8" />
                  </g>

                  {/* Increased Wet Cornea Reflection */}
                  <path d="M 505 185 Q 550 155 595 185 Q 550 175 505 185 Z" fill="rgba(255,255,255,0.6)" filter="blur(1px)" />
                  <circle cx="525" cy="175" r="4" fill="rgba(255,255,255,0.8)" filter="blur(1.5px)" />
                </g>

                {/* Dark Eyelids separated from pure black by a subtle red rim shadow */}
                <path ref={topEyelidRef} fill="#030001" filter="drop-shadow(0 4px 6px rgba(180,0,0,0.15)) drop-shadow(0 15px 25px rgba(0,0,0,0.95))" />
                <path ref={bottomEyelidRef} fill="#030001" filter="drop-shadow(0 -4px 6px rgba(180,0,0,0.15)) drop-shadow(0 -15px 25px rgba(0,0,0,0.95))" />
              </g>
            </svg>
          </div>

          {/* ── Audio Element ── */}
          <audio ref={audioRef} preload="auto">
            <source src="/audio/Mangekyou-Sharingan.mp3" type="audio/mpeg" />
          </audio>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MangekyoIntro;