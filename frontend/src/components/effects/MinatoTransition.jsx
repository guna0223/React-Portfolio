import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * MinatoTransition Context
 * Provides teleport transition functionality for navigation
 */
const MinatoTransitionContext = createContext();

export const useMinatoTransition = () => {
  const context = useContext(MinatoTransitionContext);
  if (!context) {
    throw new Error('useMinatoTransition must be used within MinatoTransitionProvider');
  }
  return context;
};

/**
 * MinatoTransition Provider
 * Wraps the app to provide teleport transition functionality
 */
export const MinatoTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetSection, setTargetSection] = useState(null);

  const triggerTransition = (sectionId) => {
    setTargetSection(sectionId);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
    setIsTransitioning(false);
    setTargetSection(null);
  };

  return (
    <MinatoTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <MinatoTransitionOverlay 
        isActive={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />
    </MinatoTransitionContext.Provider>
  );
};

/**
 * MinatoTransition Overlay
 * The actual teleport animation overlay
 */
const MinatoTransitionOverlay = ({ isActive, onComplete }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            pointerEvents: 'none',
          }}
        >
          {/* Yellow seal */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 100,
              height: 100,
              transform: 'translate(-50%, -50%)',
              border: '3px solid #f5a623',
              borderRadius: '50%',
              boxShadow: '0 0 30px #f5a623, 0 0 60px #f5a623',
            }}
          >
            {/* Seal pattern */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <circle cx={50} cy={50} r={40} fill="none" stroke="#f5a623" strokeWidth={1} opacity={0.5} />
              <circle cx={50} cy={50} r={25} fill="none" stroke="#f5a623" strokeWidth={1} opacity={0.4} />
              <circle cx={50} cy={50} r={10} fill="#f5a623" opacity={0.6} />
            </svg>
          </motion.div>

          {/* Expanding flash */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 3, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 200,
              height: 200,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Screen slice particles */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.02,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 4,
                  height: 20,
                  background: 'linear-gradient(180deg, #f5a623, transparent)',
                  boxShadow: '0 0 10px #f5a623',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinatoTransitionProvider;