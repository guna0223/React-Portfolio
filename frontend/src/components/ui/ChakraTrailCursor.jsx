import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ChakraTrailCursor - Glowing energy trail following mouse
 * Smooth premium cursor movement with chakra particles
 */
const ChakraTrailCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trailParticles, setTrailParticles] = useState([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const lastPositions = useRef([]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(('ontouchstart' in window) && window.innerWidth < 768);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Add position to trail
      lastPositions.current.push({ x: e.clientX, y: e.clientY, id: Date.now() });
      if (lastPositions.current.length > 10) {
        lastPositions.current.shift();
      }
      setTrailParticles([...lastPositions.current]);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail particles */}
      {trailParticles.map((particle, i) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            left: particle.x,
            top: particle.y,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#cc2222' : '#7b2fff',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99997,
            boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(204,34,34,0.6)' : 'rgba(123,47,255,0.6)'}`,
          }}
        />
      ))}

      {/* Main cursor core */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorXSpring,
          top: cursorYSpring,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #cc2222 0%, #7b2fff 100%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 20px rgba(204,34,34,0.8), 0 0 40px rgba(123,47,255,0.4)',
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorXSpring,
          top: cursorYSpring,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(204,34,34,0.3)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </>
  );
};

export default ChakraTrailCursor;