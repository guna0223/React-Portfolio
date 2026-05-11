import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * SharinganRing — Animated Sharingan / Rinnegan eye component.
 * variant: 'sharingan' | 'rinnegan'
 */
const SharinganRing = ({ size = 200, children, variant = 'sharingan', rotationSpeed = 12 }) => {
  const strokeColor = variant === 'rinnegan' ? '#7b2fff' : '#cc2222';
  const glowColor = variant === 'rinnegan' ? 'rgba(123,47,255,0.5)' : 'rgba(204,34,34,0.5)';
  const center = size / 2;
  const outerR = size / 2 - 4;
  const midR = size / 2 - 14;
  const innerR = size / 2 - 26;

  // Three tomoe positions (120° apart) for Sharingan
  const tomoeAngles = [0, 120, 240];

  const Tomoe = ({ angle, radius }) => {
    const rad = (angle * Math.PI) / 180;
    const cx = center + radius * Math.cos(rad);
    const cy = center + radius * Math.sin(rad);
    const r = size * 0.055;

    // The tail curves away from the center
    const tailAngle = angle + 140;
    const tailRad = (tailAngle * Math.PI) / 180;
    const tx = cx + r * 1.4 * Math.cos(tailRad);
    const ty = cy + r * 1.4 * Math.sin(tailRad);

    const ctrl1Angle = angle + 60;
    const ctrl1Rad = (ctrl1Angle * Math.PI) / 180;
    const c1x = cx + r * 2 * Math.cos(ctrl1Rad);
    const c1y = cy + r * 2 * Math.sin(ctrl1Rad);

    const ctrl2Angle = angle + 100;
    const ctrl2Rad = (ctrl2Angle * Math.PI) / 180;
    const c2x = cx + r * 2 * Math.cos(ctrl2Rad);
    const c2y = cy + r * 2 * Math.sin(ctrl2Rad);

    return (
      <g style={{ filter: `drop-shadow(0 0 4px ${strokeColor})` }}>
        {/* Main circle */}
        <circle cx={cx} cy={cy} r={r} fill={strokeColor} opacity={0.9} />
        {/* Tail */}
        <path
          d={`M ${cx} ${cy} C ${c1x} ${c1y} ${c2x} ${c2y} ${tx} ${ty}`}
          stroke={strokeColor}
          strokeWidth={r * 0.75}
          fill="none"
          strokeLinecap="round"
          opacity={0.85}
        />
      </g>
    );
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* SVG rings */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', inset: 0 }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbit ring */}
        <circle
          cx={center} cy={center} r={outerR}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeDasharray="4 6"
          opacity={0.4}
          style={{ filter: `url(#glow-${variant})` }}
        />

        {/* Solid outer ring */}
        <circle
          cx={center} cy={center} r={midR}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
          opacity={0.7}
          style={{ filter: `url(#glow-${variant})` }}
        />

        {/* Inner ring */}
        <circle
          cx={center} cy={center} r={innerR}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          opacity={0.5}
        />

        {/* Iris fill */}
        {variant === 'sharingan' && (
          <circle
            cx={center} cy={center} r={innerR - 4}
            fill="rgba(30, 0, 0, 0.85)"
          />
        )}

        {/* Rinnegan concentric rings */}
        {variant === 'rinnegan' && [0.82, 0.65, 0.48, 0.32].map((ratio, i) => (
          <circle
            key={i}
            cx={center} cy={center} r={innerR * ratio}
            fill="none"
            stroke={strokeColor}
            strokeWidth={1}
            opacity={0.35 + i * 0.1}
          />
        ))}

        {/* Sharingan tomoe — inside a rotating group */}
        {variant === 'sharingan' && (
          <g>
            {tomoeAngles.map((angle) => (
              <Tomoe key={angle} angle={angle} radius={(innerR - 4) * 0.55} />
            ))}
          </g>
        )}

        {/* Rinnegan pupil dot */}
        {variant === 'rinnegan' && (
          <circle cx={center} cy={center} r={innerR * 0.18} fill={strokeColor} opacity={0.8} />
        )}
      </svg>

      {/* Rotating outer dashed ring — Framer Motion */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: rotationSpeed, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1.5px dashed ${strokeColor}`,
          opacity: 0.3,
        }}
      />

      {/* Rotating mid ring (reverse) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: rotationSpeed * 1.5, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: size * 0.07,
          borderRadius: '50%',
          border: `1px solid ${strokeColor}`,
          opacity: 0.2,
          boxShadow: `0 0 12px ${glowColor}`,
        }}
      />

      {/* Glow pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: size * 0.04,
          borderRadius: '50%',
          border: `2px solid ${strokeColor}`,
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`,
          pointerEvents: 'none',
        }}
      />

      {/* Children centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SharinganRing;
