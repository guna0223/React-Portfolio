import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * Cinematic Sharingan Loading Screen
 * Features: Eyelid opening, independent tomoe rotation, pulsing aura, red warp flash exit.
 */
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'warp' | 'done'
  
  const containerRef = useRef(null);
  const eyeRef = useRef(null);
  const tomoeGroupRef = useRef(null);
  const topEyelidRef = useRef(null);
  const bottomEyelidRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    // 1. Initial setup - eyelids closed
    gsap.set(topEyelidRef.current, { y: '0%' });
    gsap.set(bottomEyelidRef.current, { y: '0%' });
    gsap.set(eyeRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(auraRef.current, { scale: 0.5, opacity: 0 });

    // 2. Timeline for opening sequence
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Fade in eye in background
    tl.to([eyeRef.current, auraRef.current], { opacity: 1, duration: 0.5 }, 0);
    
    // Eyelids open smoothly
    tl.to(topEyelidRef.current, { y: '-100%', duration: 1.5, ease: 'power2.inOut' }, 0.5);
    tl.to(bottomEyelidRef.current, { y: '100%', duration: 1.5, ease: 'power2.inOut' }, 0.5);
    
    // Eye scales up slightly while opening
    tl.to(eyeRef.current, { scale: 1, duration: 2, ease: 'power2.out' }, 0.5);
    tl.to(auraRef.current, { scale: 1.2, duration: 2, ease: 'power2.out' }, 0.5);

    // 3. Continuous animations
    // Rotate entire eye slowly
    gsap.to(eyeRef.current, {
      rotate: 360,
      duration: 20,
      ease: 'linear',
      repeat: -1
    });

    // Rotate tomoe independently and faster
    gsap.to(tomoeGroupRef.current, {
      rotate: -360, // Spin opposite direction or faster
      duration: 4,
      ease: 'linear',
      repeat: -1,
      transformOrigin: '50% 50%'
    });

    // Aura pulsing
    gsap.to(auraRef.current, {
      scale: 1.4,
      opacity: 0.6,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // 4. Progress Simulation
    const duration = 2500;
    const start = performance.now();
    
    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.round(p * 100));
      
      // Add slight camera shake based on progress
      if (p > 0.5 && p < 0.9 && containerRef.current) {
        const shake = (Math.random() - 0.5) * (p * 4);
        gsap.set(containerRef.current, { x: shake, y: shake });
      } else if (containerRef.current) {
        gsap.set(containerRef.current, { x: 0, y: 0 });
      }

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        // Trigger completion warp
        setPhase('warp');
        
        // Warp timeline
        const warpTl = gsap.timeline({
          onComplete: () => {
            setPhase('done');
            setTimeout(() => onComplete(), 100);
          }
        });

        // Eyelids slam open completely, eye zooms massively
        warpTl.to(eyeRef.current, { scale: 15, duration: 0.6, ease: 'power4.in' }, 0);
        warpTl.to(auraRef.current, { scale: 20, opacity: 1, duration: 0.6 }, 0);
        warpTl.to(tomoeGroupRef.current, { rotate: -1080, duration: 0.6, ease: 'power3.in' }, 0);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#05020a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background Fog & Particles */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #000 70%)', zIndex: 1 }} />
          
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100 - Math.random() * 200],
                  x: [0, (Math.random() - 0.5) * 100],
                  opacity: [0, Math.random() * 0.5 + 0.2, 0],
                  scale: [0.5, Math.random() * 2 + 1, 0.5]
                }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                style={{
                  position: 'absolute',
                  bottom: -20,
                  left: `${Math.random() * 100}%`,
                  width: 10 + Math.random() * 30,
                  height: 10 + Math.random() * 30,
                  background: 'radial-gradient(circle, #cc2222 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(8px)',
                }}
              />
            ))}
          </div>

          {/* Eye Container */}
          <div style={{ position: 'relative', width: 280, height: 280, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Glowing Aura */}
            <div ref={auraRef} style={{
              position: 'absolute',
              width: '140%', height: '140%',
              background: 'radial-gradient(circle, rgba(204,34,34,0.6) 0%, rgba(123,47,255,0.2) 40%, transparent 70%)',
              filter: 'blur(20px)',
              zIndex: 1,
            }} />

            {/* Sharingan SVG */}
            <div ref={eyeRef} style={{ width: '100%', height: '100%', zIndex: 2, position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ filter: 'drop-shadow(0 0 15px rgba(204,34,34,0.8))' }}>
                {/* Outer Rim */}
                <circle cx="60" cy="60" r="55" fill="#1a0000" stroke="#cc2222" strokeWidth="3" opacity="0.9" />
                <circle cx="60" cy="60" r="55" fill="none" stroke="#7b2fff" strokeWidth="1" opacity="0.4" />
                
                {/* Iris Rings */}
                <circle cx="60" cy="60" r="38" fill="none" stroke="#cc2222" strokeWidth="1.5" opacity="0.6" />
                <circle cx="60" cy="60" r="22" fill="none" stroke="#cc2222" strokeWidth="1" opacity="0.4" />
                
                {/* Tomoe Group */}
                <g ref={tomoeGroupRef} style={{ transformOrigin: '60px 60px' }}>
                  {[0, 120, 240].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    // Positioning tomoe on the middle ring (r=38)
                    const cx = 60 + 38 * Math.cos(rad);
                    const cy = 60 + 38 * Math.sin(rad);
                    return (
                      <g key={i} transform={`translate(${cx}, ${cy}) rotate(${angle + 90}) scale(1.4)`}>
                        <path d="M0,-8 C4,-8 8,-4 8,0 C8,4 4,8 0,8 C-4,8 -6,4 -6,0 C-6,-2 -4,-6 0,-8 Z" fill="#000" />
                        <circle cx="0" cy="0" r="3.5" fill="#000" />
                        <path d="M0,-8 Q8,-12 12,-4 Q6,-2 4,-6 Z" fill="#000" />
                        {/* Red glow on tomoe */}
                        <circle cx="0" cy="0" r="6" fill="rgba(204,34,34,0.4)" filter="blur(2px)" />
                      </g>
                    );
                  })}
                </g>
                
                {/* Center Pupil */}
                <circle cx="60" cy="60" r="8" fill="#000" />
                <circle cx="60" cy="60" r="14" fill="url(#pupilGlow)" opacity="0.8" />
                
                {/* Glossy Reflection */}
                <path d="M 20 40 Q 60 10 100 40 Q 80 30 40 30 Z" fill="rgba(255,255,255,0.15)" filter="blur(1px)" />
                <circle cx="45" cy="35" r="4" fill="rgba(255,255,255,0.6)" filter="blur(1px)" />

                <defs>
                  <radialGradient id="pupilGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#cc2222" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Eyelids (Slightly larger than eye to ensure full cover) */}
            <div ref={topEyelidRef} style={{
              position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '60%',
              background: '#05020a', zIndex: 15,
              borderBottom: '3px solid #cc2222',
              boxShadow: '0 10px 20px rgba(0,0,0,0.8), 0 5px 15px rgba(204,34,34,0.4)',
              borderBottomLeftRadius: '50% 20%',
              borderBottomRightRadius: '50% 20%'
            }} />
            
            <div ref={bottomEyelidRef} style={{
              position: 'absolute', bottom: '-10%', left: '-10%', right: '-10%', height: '60%',
              background: '#05020a', zIndex: 15,
              borderTop: '3px solid #cc2222',
              boxShadow: '0 -10px 20px rgba(0,0,0,0.8), 0 -5px 15px rgba(204,34,34,0.4)',
              borderTopLeftRadius: '50% 20%',
              borderTopRightRadius: '50% 20%'
            }} />
          </div>

          {/* Progress Indicator */}
          <motion.div
            animate={{ opacity: phase === 'loading' ? 1 : 0, y: phase === 'loading' ? 0 : 20 }}
            style={{ position: 'absolute', bottom: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'var(--color-accent-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', textShadow: '0 0 10px rgba(204,34,34,0.5)' }}>
              Awakening
            </div>
            
            <div style={{ width: '240px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7b2fff, #cc2222)',
                boxShadow: '0 0 10px #cc2222',
                transition: 'width 0.1s linear',
              }} />
            </div>
            
            <div className="text-mono" style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
              {progress}%
            </div>
          </motion.div>

          {/* Red Warp Flash Overlay */}
          <motion.div
            animate={{ opacity: phase === 'warp' ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.6, times: [0, 0.5, 1], ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(204,34,34,1) 40%, rgba(123,47,255,1) 100%)',
              zIndex: 50,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
