import React, { useEffect, useRef, useState } from 'react';

/**
 * AkatsukiBackground
 * Canvas-driven cinematic background:
 *  – Dark rain streaks (falling diagonally)
 *  – Occasional lightning flashes
 *  – Floating abstract red/dark cloud blobs (CSS)
 */
const AkatsukiBackground = () => {
  const canvasRef = useRef(null);
  const [lightning, setLightning] = useState(false);

  /* ── Rain + lightning canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Rain drops */
    const drops = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: Math.random() * 18 + 8,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.18 + 0.04,
      width: Math.random() * 0.6 + 0.3,
    }));

    /* Smoke particles */
    const smokes = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 80 + 40,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.07 + 0.02,
      hue: Math.random() > 0.5 ? '204,34,34' : '60,0,80',
    }));

    let frame;
    let lastFlash = 0;

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* --- rain --- */
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.strokeStyle = `rgba(180,120,180,${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.stroke();
        d.y += d.speed;
        d.x -= 0.8;
        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < 0) d.x = canvas.width;
      });

      /* --- smoke --- */
      smokes.forEach((s) => {
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        grad.addColorStop(0, `rgba(${s.hue},${s.opacity})`);
        grad.addColorStop(1, `rgba(${s.hue},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        if (s.y < -s.r) { s.y = canvas.height + s.r; s.x = Math.random() * canvas.width; }
        if (s.x < -s.r) s.x = canvas.width + s.r;
        if (s.x > canvas.width + s.r) s.x = -s.r;
      });

      /* --- lightning trigger --- */
      if (time - lastFlash > 7000 + Math.random() * 8000) {
        lastFlash = time;
        setLightning(true);
        setTimeout(() => setLightning(false), 120);
        setTimeout(() => { setLightning(true); setTimeout(() => setLightning(false), 80); }, 200);
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Canvas: rain + smoke */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Lightning flash overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(180,100,255,0.12)',
          opacity: lightning ? 1 : 0,
          transition: lightning ? 'none' : 'opacity 0.15s',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />

      {/* Floating Akatsuki cloud blobs — pure CSS */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[
          { w: 320, h: 90,  top: '8%',  left: '-10%',  dur: 28, delay: 0 },
          { w: 260, h: 70,  top: '18%', left: '-5%',   dur: 36, delay: -12 },
          { w: 400, h: 110, top: '72%', left: '-15%',  dur: 32, delay: -8 },
          { w: 280, h: 80,  top: '85%', left: '-8%',   dur: 40, delay: -20 },
          { w: 350, h: 95,  top: '45%', left: '-12%',  dur: 45, delay: -5 },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: c.top,
              left: c.left,
              width: c.w,
              height: c.h,
              borderRadius: '50%',
              background: `radial-gradient(ellipse at 40% 50%, rgba(80,0,0,0.22) 0%, rgba(30,0,40,0.12) 60%, transparent 100%)`,
              filter: 'blur(18px)',
              animation: `akatsuki-cloud-drift ${c.dur}s linear ${c.delay}s infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Bottom fog layer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '30%', pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(0deg, rgba(5,2,10,0.8) 0%, transparent 100%)',
      }} />
    </>
  );
};

export default AkatsukiBackground;
