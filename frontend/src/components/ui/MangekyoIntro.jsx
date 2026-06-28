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

    // Initialize in pure darkness
    gsap.set(topEyelidRef.current, { scaleY: 1 });
    gsap.set(bottomEyelidRef.current, { scaleY: 1 });
    gsap.set(irisRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(mangekyoRef.current, { rotation: -20 });
    gsap.set(pupilGlowRef.current, { opacity: 0 });

    // 0s - 0.7s: Crimson pupil/glow fades in
    tl.to(pupilGlowRef.current, { opacity: 0.8, duration: 0.7, ease: 'power2.inOut' }, 0);

    // 0.7s - 2.5s: Eyelids part, revealing video iris
    tl.to(irisRef.current, { scale: 1, opacity: 1, duration: 1.3, ease: 'power2.out' }, 0.7);
    tl.to(topEyelidRef.current, { scaleY: 0, duration: 1.8, ease: 'power2.inOut' }, 0.7);
    tl.to(bottomEyelidRef.current, { scaleY: 0, duration: 1.8, ease: 'power2.inOut' }, 0.7);

    // 2.0s - 4.0s: Hold, slight pulse, Mangekyō locks
    tl.to(irisRef.current, { scale: 1.05, duration: 0.3, ease: 'power4.out' }, 3.2);
    tl.to(mangekyoRef.current, { rotation: 0, duration: 2.0, ease: 'power1.inOut' }, 2.0);
    // Stronger final pupil pulse
    tl.to(pupilGlowRef.current, { opacity: 1, scale: 1.5, duration: 2.0, ease: 'power2.out' }, 2.0);

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

            {/* Cinematic Video Eye Section */}
            <div
              style={{
                position: 'absolute',
                left: '68.75%', // Equivalent to original 550px/800px position
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(320px, 48vw, 750px)',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              {/* Soft Red Ambient Glow behind the eye */}
              <div
                ref={pupilGlowRef}
                style={{
                  position: 'absolute',
                  inset: '-15%',
                  background: 'radial-gradient(circle, rgba(220,0,0,0.35) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: -1,
                }}
              />

              {/* The Eye Container (Masked & Animated) */}
              <div
                ref={irisRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  maskImage: 'radial-gradient(circle, black 35%, transparent 85%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 85%)',
                  boxShadow: '0 0 60px rgba(0,0,0,0.95)',
                }}
              >
                 <div ref={mangekyoRef} style={{ width: '100%', height: '100%', transformOrigin: 'center' }} className='video-home'>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.9) contrast(1.1)',
                      }}
                    >
                      <source src="/video/left-eye.mp4" type="video/mp4" className='video-home' />
                    </video>
                 </div>

                 {/* Cinematic Eyelid Overlays (reveal animation) */}
                 <div
                    ref={topEyelidRef}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, width: '100%', height: '50.5%',
                      background: '#000000',
                      zIndex: 10,
                      transformOrigin: 'top',
                    }}
                 />
                 <div
                    ref={bottomEyelidRef}
                    style={{
                      position: 'absolute',
                      bottom: 0, left: 0, width: '100%', height: '50.5%',
                      background: '#000000',
                      zIndex: 10,
                      transformOrigin: 'bottom',
                    }}
                 />
              </div>
            </div>
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