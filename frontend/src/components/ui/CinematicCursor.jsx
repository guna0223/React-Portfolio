import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cinematic Anime Cursor System
 * Sharingan + Chakra Energy Cursor
 * Premium Akatsuki aesthetic
 */
const CinematicCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const followerMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const updateFollower = () => {
      followerMouseRef.current.x += (mouseRef.current.x - followerMouseRef.current.x) * 0.1;
      followerMouseRef.current.y += (mouseRef.current.y - followerMouseRef.current.y) * 0.1;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerMouseRef.current.x}px`;
        followerRef.current.style.top = `${followerMouseRef.current.y}px`;
      }

      requestAnimationFrame(updateFollower);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .sharingan-card, .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);

    updateFollower();

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor - Sharingan Core */}
      <motion.div
        ref={cursorRef}
        className="cinematic-cursor"
        animate={{
          scale: isHovering ? 1.2 : 1,
          rotate: isHovering ? 360 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { duration: 2, repeat: isHovering ? Infinity : 0, ease: 'linear' },
        }}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: '24px',
          height: '24px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Sharingan SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <defs>
            <radialGradient id="cursor-iris" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff2222" />
              <stop offset="70%" stopColor="#aa0000" />
              <stop offset="100%" stopColor="#1a0000" />
            </radialGradient>
            <filter id="cursor-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer glow */}
          <circle cx="12" cy="12" r="11" fill="rgba(255,34,34,0.3)" filter="url(#cursor-glow)" />

          {/* Sclera */}
          <circle cx="12" cy="12" r="10" fill="#0a0000" />

          {/* Iris */}
          <circle cx="12" cy="12" r="7" fill="url(#cursor-iris)" />

          {/* Mangekyo pattern */}
          <g transform="translate(12,12)">
            {[0, 120, 240].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path d="M 0 0 C 3 -2 3 -5 0 -7 C -2 -4 -2 -1 0 0" fill="#000" />
              </g>
            ))}
          </g>

          {/* Pupil */}
          <circle cx="12" cy="12" r="3" fill="#000" />
          <circle cx="12" cy="12" r="3" fill="#ff2222" opacity={isHovering ? 0.8 : 0.5} filter="blur(1px)" />
        </svg>
      </motion.div>

      {/* Follower - Chakra Ring */}
      <motion.div
        ref={followerRef}
        className="cursor-follower"
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          width: '40px',
          height: '40px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Chakra Ring */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="rgba(123,47,255,0.4)" strokeWidth="2" fill="none" />
          <circle cx="20" cy="20" r="15" stroke="rgba(204,34,34,0.3)" strokeWidth="1" fill="none" />
          <circle cx="20" cy="20" r="12" stroke="rgba(123,47,255,0.2)" strokeWidth="1" fill="none" />

          {/* Energy particles */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 20 + 16 * Math.cos(rad);
            const y = 20 + 16 * Math.sin(rad);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill={i % 2 === 0 ? "#ff2222" : "#7b2fff"}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Click Burst Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              left: mouseRef.current.x,
              top: mouseRef.current.y,
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,34,34,0.6) 0%, rgba(123,47,255,0.4) 50%, transparent 100%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 9997,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CinematicCursor;