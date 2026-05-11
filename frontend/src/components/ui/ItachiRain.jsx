import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ItachiRain - Dark rainy atmosphere with lightning flashes
 * Cinematic anime mood with wet glass blur effect
 */
const ItachiRain = ({ intensity = 1 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.offsetWidth || window.innerWidth;
    let H = canvas.offsetHeight || window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Rain drops
    const drops = Array.from({ length: Math.floor(150 * intensity) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      len: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.2 + 0.05,
      width: Math.random() * 0.8 + 0.2,
    }));

    // Lightning state
    let lightning = false;
    let lastFlash = 0;

    const draw = (time) => {
      ctx.clearRect(0, 0, W, H);

      // Draw rain
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.len);
        ctx.strokeStyle = `rgba(150, 100, 200,${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.5;

        if (d.y > H) {
          d.y = -d.len;
          d.x = Math.random() * W;
        }
        if (d.x < 0) d.x = W;
      });

      // Lightning trigger
      if (time - lastFlash > 5000 + Math.random() * 10000) {
        lastFlash = time;
        lightning = true;
        setTimeout(() => { lightning = false; }, 100 + Math.random() * 100);
        setTimeout(() => {
          lightning = true;
          setTimeout(() => { lightning = false; }, 50);
        }, 150);
      }

      // Lightning flash overlay
      if (lightning) {
        ctx.fillStyle = 'rgba(180, 100, 255, 0.15)';
        ctx.fillRect(0, 0, W, H);
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      W = canvas.offsetWidth || window.innerWidth;
      H = canvas.offsetHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Canvas for rain */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Wet glass blur effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,2,15,0.1) 0%, rgba(30,0,40,0.05) 50%, transparent 100%)',
          backdropFilter: 'blur(1px)',
          opacity: 0.7,
        }}
      />

      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,2,10,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ItachiRain;