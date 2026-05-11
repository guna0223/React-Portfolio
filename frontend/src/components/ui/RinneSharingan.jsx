import React from 'react';
import { motion } from 'framer-motion';

/**
 * RinneSharingan — The Rinne Sharingan (六道写輪眼)
 * The ultimate dōjutsu combining Rinnegan + Sharingan.
 *
 * Features:
 *  • 9 tomoe arranged on 3 concentric orbit rings
 *  • 7 Rinnegan concentric rings inside the eye
 *  • Mangekyō-style outer frame rings spinning in opposite directions
 *  • Purple-red chakra glow aura
 *  • Pulsing energy rings that radiate outward
 *
 * Props:
 *  size        – total diameter in px (default 240)
 *  children    – content shown at center (e.g. profile image)
 *  glowIntensity – 0–1 scale (default 1)
 */
const RinneSharingan = ({ size = 240, children, glowIntensity = 1 }) => {
  const cx = size / 2;
  const cy = size / 2;

  // Eye colors — purple + red mix
  const purpleRed = '#7b2fff';
  const crimson = '#cc2222';
  const glowPurple = `rgba(123,47,255,${0.55 * glowIntensity})`;
  const glowRed = `rgba(204,34,34,${0.45 * glowIntensity})`;

  // ── 9 tomoe radii (inner, mid, outer)
  const tomeRings = [
    { r: size * 0.165, tomoeR: size * 0.028, count: 3 },
    { r: size * 0.26,  tomoeR: size * 0.024, count: 3 },
    { r: size * 0.35,  tomoeR: size * 0.020, count: 3 },
  ];

  // ── Rinnegan inner concentric ring radii
  const rinneganRings = [0.08, 0.13, 0.185, 0.23, 0.275, 0.315, 0.355].map(f => f * size);

  // Render a single tomoe at angle `deg` on orbit `orbitR`
  const Tomoe = ({ angle, orbitR, r, color }) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    const dotCx = cx + orbitR * Math.cos(rad);
    const dotCy = cy + orbitR * Math.sin(rad);

    const tailAngle = angle + 135;
    const tailRad = ((tailAngle - 90) * Math.PI) / 180;
    const tailLen = r * 1.8;
    const tx = dotCx + tailLen * Math.cos(tailRad);
    const ty = dotCy + tailLen * Math.sin(tailRad);

    const ctrlAngle = angle + 100;
    const ctrlRad = ((ctrlAngle - 90) * Math.PI) / 180;
    const ctrlLen = r * 2.2;
    const qx = dotCx + ctrlLen * Math.cos(ctrlRad);
    const qy = dotCy + ctrlLen * Math.sin(ctrlRad);

    return (
      <g style={{ filter: `drop-shadow(0 0 ${r * 0.6}px ${color})` }}>
        <circle cx={dotCx} cy={dotCy} r={r} fill={color} opacity={0.95} />
        <path
          d={`M ${dotCx} ${dotCy} Q ${qx} ${qy} ${tx} ${ty}`}
          stroke={color}
          strokeWidth={r * 0.75}
          fill="none"
          strokeLinecap="round"
          opacity={0.88}
        />
      </g>
    );
  };

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>

      {/* ── Radiating aura rings (outermost, purely decorative) ── */}
      {[1.15, 1.32, 1.52].map((scale, i) => (
        <motion.div
          key={`aura-${i}`}
          animate={{ scale: [scale, scale + 0.12, scale], opacity: [0.18, 0.06, 0.18] }}
          transition={{ duration: 3.5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.9 }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: size, height: size,
            borderRadius: '50%',
            border: `1.5px solid ${i % 2 === 0 ? purpleRed : crimson}`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Outer spinning Mangekyō frame (dashed) ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -size * 0.04, borderRadius: '50%',
          border: `1.5px dashed rgba(123,47,255,0.45)`,
          boxShadow: `0 0 16px ${glowPurple}`,
        }}
      />

      {/* ── Second frame ring spinning reverse ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: size * 0.02, borderRadius: '50%',
          border: `2px solid rgba(204,34,34,0.5)`,
          boxShadow: `0 0 14px ${glowRed}, inset 0 0 14px rgba(204,34,34,0.08)`,
        }}
      />

      {/* ── Pulsing glow halo ── */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: size * 0.06, borderRadius: '50%',
          border: `2px solid ${purpleRed}`,
          boxShadow: `0 0 22px ${glowPurple}, 0 0 40px ${glowRed}, inset 0 0 22px rgba(123,47,255,0.1)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Main SVG eye ── */}
      <svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <defs>
          <radialGradient id="rns-iris" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0d0020" />
            <stop offset="55%"  stopColor="#16003a" />
            <stop offset="100%" stopColor="#0a0010" />
          </radialGradient>
          <radialGradient id="rns-pupil" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#cc2222" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7b2fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#cc2222" stopOpacity="0" />
          </radialGradient>
          <filter id="rns-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rns-glow-strong">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Clip path to keep everything inside the eye circle */}
          <clipPath id="rns-clip">
            <circle cx={cx} cy={cy} r={size * 0.44} />
          </clipPath>
        </defs>

        {/* Dark iris fill */}
        <circle cx={cx} cy={cy} r={size * 0.44} fill="url(#rns-iris)" opacity={0.92} />

        {/* Rinnegan concentric rings */}
        {rinneganRings.map((r, i) => (
          <circle
            key={`rng-${i}`}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={purpleRed}
            strokeWidth={i === 0 ? 1.5 : 1}
            opacity={0.3 + i * 0.045}
            style={{ filter: 'url(#rns-glow)' }}
          />
        ))}

        {/* 9 Tomoe on 3 rings — colors alternate red/purple */}
        {tomeRings.map((ring, ri) =>
          [0, 120, 240].map((angle, ti) => (
            <Tomoe
              key={`t-${ri}-${ti}`}
              angle={angle + ri * 15}
              orbitR={ring.r}
              r={ring.tomoeR}
              color={ri === 1 ? purpleRed : crimson}
            />
          ))
        )}

        {/* Central pupil glow */}
        <circle cx={cx} cy={cy} r={size * 0.065} fill="url(#rns-pupil)"
          style={{ filter: 'url(#rns-glow-strong)' }} />
        <circle cx={cx} cy={cy} r={size * 0.035} fill={crimson} opacity={0.95}
          style={{ filter: 'url(#rns-glow-strong)' }} />
      </svg>

      {/* Slow-spinning tomoe layer (adds depth) */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.4 }}
      >
        {/* Extra faint outer tomoe ring for Rinne depth */}
        {[60, 180, 300].map((angle, i) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const r2 = size * 0.385;
          const r = size * 0.018;
          const tcx = cx + r2 * Math.cos(rad);
          const tcy = cy + r2 * Math.sin(rad);
          return <circle key={i} cx={tcx} cy={tcy} r={r} fill={purpleRed} opacity={0.7} />;
        })}
      </motion.svg>

      {/* ── Children (profile image) centered ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RinneSharingan;
