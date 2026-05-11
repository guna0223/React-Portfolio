
import React, { useEffect, useRef } from 'react';

/**
 * ChakraParticles — Animated chakra particle field.
 * Red/purple drifting particles for Naruto theme.
 */
const ChakraParticles = ({ density = 40, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.offsetWidth || window.innerWidth;
    let H = canvas.offsetHeight || window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const colors = [
      'rgba(204, 34, 34,',   // Sharingan red
      'rgba(230, 51, 51,',   // Bright red
      'rgba(123, 47, 255,',  // Rinnegan purple
      'rgba(159, 95, 255,',  // Purple-light
      'rgba(245, 166, 35,',  // Chakra gold (rare)
    ];

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -(Math.random() * 0.5 + 0.15),
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * (Math.random() < 0.1 ? colors.length : 4))],
      life: Math.random(),
      maxLife: Math.random() * 0.5 + 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.pulse += 0.02;
        p.life += 0.003;
        if (p.life > p.maxLife) {
          p.x = Math.random() * W;
          p.y = H + 10;
          p.life = 0;
          p.opacity = Math.random() * 0.6 + 0.2;
        }

        const alpha = p.opacity * Math.abs(Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(alpha * 0.3).toFixed(2)})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = canvas.offsetWidth || window.innerWidth;
      H = canvas.offsetHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ChakraParticles;
