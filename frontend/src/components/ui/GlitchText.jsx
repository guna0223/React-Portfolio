import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({
  children,
  className = '',
  style = {},
  glitchOnHover = true,
  glitchOnMount = true,
  glitchDuration = 300,
  as: Component = 'span',
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (glitchOnMount) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), glitchDuration);
      return () => clearTimeout(timer);
    }
  }, [glitchOnMount, glitchDuration]);

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), glitchDuration);
      return () => clearTimeout(timer);
    }
  };

  return (
    <Component
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...(isGlitching && {
          animation: 'glitch 0.3s ease-in-out',
        }),
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {isGlitching && (
        <>
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: '2px',
              color: 'var(--color-accent-primary)',
              opacity: 0.7,
              clipPath: 'inset(0 0 50% 0)',
              pointerEvents: 'none',
            }}
          >
            {children}
          </span>
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: '-2px',
              color: 'var(--color-accent-secondary)',
              opacity: 0.7,
              clipPath: 'inset(50% 0 0 0)',
              pointerEvents: 'none',
            }}
          >
            {children}
          </span>
        </>
      )}
    </Component>
  );
};

export default GlitchText;
