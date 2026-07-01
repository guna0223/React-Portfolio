import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const HoloCard = ({
  children,
  className = '',
  glowColor = 'var(--color-accent-primary)',
  tilt = true,
  holographic = true,
  style = {},
  onClick,
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const tiltX = tilt ? (mousePos.y - 0.5) * -8 : 0;
  const tiltY = tilt ? (mousePos.x - 0.5) * 8 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`alien-glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isHovered
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? `0 0 15px ${glowColor}66, 0 0 30px ${glowColor}22, inset 0 0 10px ${glowColor}11`
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
        borderColor: isHovered ? `${glowColor}66` : 'var(--color-border-subtle)',
        ...style,
      }}
    >
      {/* Holographic overlay */}
      {holographic && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `linear-gradient(
              135deg,
              transparent 0%,
              ${glowColor}08 25%,
              transparent 50%,
              ${glowColor}08 75%,
              transparent 100%
            )`,
            transform: `translateX(${(mousePos.x - 0.5) * 100}%)`,
            transition: 'transform 0.3s ease-out',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Spotlight overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${glowColor}15, transparent 60%)`,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Neon border on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: `1px solid ${glowColor}44`,
            boxShadow: `inset 0 0 20px ${glowColor}11`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  );
};

export default HoloCard;
