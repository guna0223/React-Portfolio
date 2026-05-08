import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GlowCard = ({
  children,
  className = '',
  glowColor = 'var(--color-accent-primary)',
  tilt = true,
  spotlight = true,
  style = {},
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

  const tiltX = tilt ? (mousePos.y - 0.5) * -10 : 0;
  const tiltY = tilt ? (mousePos.x - 0.5) * 10 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`glass glow-border-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: isHovered
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease',
        ...style,
      }}
    >
      {/* Spotlight overlay */}
      {spotlight && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124, 58, 237, ${isHovered ? 0.12 : 0}), transparent 60%)`,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  );
};

export default GlowCard;
