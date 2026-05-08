import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const MagneticButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href,
  target,
  rel,
  download,
  strength = 0.3,
  ...props
}) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = btnRef.current;
      const text = textRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (text) {
        gsap.to(text, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    const text = textRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });

    if (text) {
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, []);

  const baseStyles = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: variant === 'primary' ? '1rem 2.5rem' : '0.875rem 2rem',
    borderRadius: '9999px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '0.9375rem',
    letterSpacing: '-0.01em',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
    cursor: 'none',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-accent-primary), #9333ea)',
      color: 'white',
      border: 'none',
      boxShadow: '0 0 20px var(--color-glow-primary)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-medium)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'rgba(124, 58, 237, 0.1)',
      color: 'var(--color-accent-primary)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      boxShadow: 'none',
    },
  };

  const combinedStyles = { ...baseStyles, ...variantStyles[variant] };

  const Component = href ? 'a' : 'button';
  const linkProps = href ? { href, target, rel, download } : {};

  return (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
      whileTap={{ scale: 0.95 }}
    >
      <Component
        onClick={onClick}
        className={`magnetic-btn ${className}`}
        style={combinedStyles}
        {...linkProps}
        {...props}
      >
        <span ref={textRef} style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {children}
        </span>
      </Component>

      <style>{`
        .magnetic-btn:hover {
          box-shadow: ${variant === 'primary'
            ? '0 0 30px var(--color-glow-primary), 0 0 60px rgba(124, 58, 237, 0.2) !important'
            : '0 0 20px var(--color-glow-primary) !important'
          };
        }
        .magnetic-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent 60%);
          transition: opacity 0.3s;
        }
        .magnetic-btn:hover::after {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default MagneticButton;
