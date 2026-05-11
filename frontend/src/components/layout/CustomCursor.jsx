import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(('ontouchstart' in window) && window.innerWidth < 768);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Sharingan ring */}
      <motion.div
        style={{
          position: 'fixed', left: cursorXSpring, top: cursorYSpring,
          width: isHovering ? 52 : 36, height: isHovering ? 52 : 36,
          borderRadius: '50%',
          border: `2px solid ${isHovering ? '#cc2222' : 'rgba(204, 34, 34, 0.6)'}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 99999,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering
            ? '0 0 15px rgba(204,34,34,0.7), 0 0 30px rgba(204,34,34,0.3), inset 0 0 8px rgba(204,34,34,0.2)'
            : '0 0 8px rgba(204,34,34,0.3)',
        }}
      />
      {/* Inner dot — red chakra core */}
      <motion.div
        style={{
          position: 'fixed', left: cursorX, top: cursorY,
          width: isHovering ? 10 : 6, height: isHovering ? 10 : 6,
          borderRadius: '50%',
          backgroundColor: '#cc2222',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 99999,
          transition: 'width 0.2s, height 0.2s',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering
            ? '0 0 20px rgba(204,34,34,0.9), 0 0 40px rgba(204,34,34,0.4)'
            : '0 0 8px rgba(204,34,34,0.6)',
        }}
      />
      {/* Tomoe dots — appear on hover */}
      {isHovering && [0, 120, 240].map((angle) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const r = 20;
        return (
          <motion.div
            key={angle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              left: cursorXSpring,
              top: cursorYSpring,
              width: 5, height: 5,
              borderRadius: '50%',
              backgroundColor: '#cc2222',
              transform: `translate(calc(-50% + ${r * Math.cos(rad)}px), calc(-50% + ${r * Math.sin(rad)}px))`,
              pointerEvents: 'none', zIndex: 99998,
              opacity: isVisible ? 0.8 : 0,
              boxShadow: '0 0 6px rgba(204,34,34,0.7)',
            }}
          />
        );
      })}
      {/* Horizontal crosshair */}
      <motion.div
        style={{
          position: 'fixed', left: cursorXSpring, top: cursorYSpring,
          width: isHovering ? 64 : 48, height: 1,
          background: `linear-gradient(90deg, transparent, ${isHovering ? '#cc2222' : 'rgba(204,34,34,0.35)'}, transparent)`,
          transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 99998,
          opacity: isVisible ? 0.5 : 0, transition: 'width 0.3s, opacity 0.3s',
        }}
      />
      {/* Vertical crosshair */}
      <motion.div
        style={{
          position: 'fixed', left: cursorXSpring, top: cursorYSpring,
          width: 1, height: isHovering ? 64 : 48,
          background: `linear-gradient(180deg, transparent, ${isHovering ? '#cc2222' : 'rgba(204,34,34,0.35)'}, transparent)`,
          transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 99998,
          opacity: isVisible ? 0.5 : 0, transition: 'height 0.3s, opacity 0.3s',
        }}
      />
    </>
  );
};

export default CustomCursor;
