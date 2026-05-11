import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Code2, Link, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import TypeWriter from '../ui/TypeWriter';
import GlitchText from '../ui/GlitchText';
import ChakraParticles from '../ui/ChakraParticles';
import RinneSharingan from '../ui/RinneSharingan';
import AkatsukiBackground from '../ui/AkatsukiBackground';
import RasenganPulse from '../ui/RasenganPulse';
import ChidoriFlash from '../ui/ChidoriFlash';
import profileImg from '../../assets/AboutImage/homeimg.jpeg';

/* ── Chakra Aura rings around the profile ── */
const ChakraAura = ({ size }) => (
  <>
    {[0, 0.85, 1.7, 2.55].map((delay, i) => {
      const ringSize = size * (1.15 + i * 0.16);
      return (
        <div
          key={i}
          className="chakra-aura-ring"
          style={{
            width: ringSize,
            height: ringSize,
            animationDelay: `${delay}s`,
            borderColor: i % 2 === 0
              ? 'rgba(123,47,255,0.45)'
              : 'rgba(204,34,34,0.35)',
          }}
        />
      );
    })}
  </>
);

/* ── Small Sharingan SVG for hero badge ── */
const MiniSharingan = () => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    width="16" height="16" viewBox="0 0 16 16" fill="none"
  >
    <circle cx="8" cy="8" r="7" stroke="#cc2222" strokeWidth="1" opacity="0.8" />
    {[270, 30, 150].map((deg, i) => {
      const r = (deg * Math.PI) / 180;
      return <circle key={i} cx={8 + 3.5 * Math.cos(r)} cy={8 + 3.5 * Math.sin(r)} r={1.2} fill="#cc2222" />;
    })}
    <circle cx="8" cy="8" r="1.5" fill="#cc2222" />
  </motion.svg>
);

const HeroSection = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeAura, setActiveAura] = useState(null);

  useEffect(() => {
    // Trigger eyelid opening shortly after mount
    const t1 = setTimeout(() => setEyeOpen(true), 400);
    // Show content after eyelids finish opening
    const t2 = setTimeout(() => setContentVisible(true), 1600);
    
    // Chakra Timing Loop (3s on, 5s off)
    let timeoutId;
    let isSubscribed = true;

    const runLoop = () => {
      if (!isSubscribed) return;
      setActiveAura('rasengan');
      
      timeoutId = setTimeout(() => {
        if (!isSubscribed) return;
        setActiveAura(null);

        timeoutId = setTimeout(() => {
          if (!isSubscribed) return;
          setActiveAura('chidori');

          timeoutId = setTimeout(() => {
            if (!isSubscribed) return;
            setActiveAura(null);

            timeoutId = setTimeout(runLoop, 5000);
          }, 3000);
        }, 5000);
      }, 3000);
    };

    // Start loop slightly after content is visible
    const t3 = setTimeout(runLoop, 2000);

    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2); 
      clearTimeout(t3);
      clearTimeout(timeoutId);
      isSubscribed = false;
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const PROFILE_SIZE = 230;

  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* ── Layered cinematic backgrounds ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(80,0,30,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <AkatsukiBackground />
      <div className="grid-background" style={{ zIndex: 1 }} />
      <ChakraParticles density={50} />

      {/* ── Mangekyō eyelid reveal overlay ── */}
      <AnimatePresence>
        {!contentVisible && (
          <div
            className={eyeOpen ? 'eyelid-open' : ''}
            style={{ position: 'absolute', inset: 0, zIndex: 40, pointerEvents: eyeOpen ? 'none' : 'all' }}
          >
            {/* Red Sharingan glow at center of eyelid */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 120, height: 10, zIndex: 55,
              background: 'radial-gradient(ellipse at center, rgba(204,34,34,0.9) 0%, transparent 100%)',
              filter: 'blur(6px)',
              boxShadow: '0 0 60px 20px rgba(204,34,34,0.35)',
            }} />
            {/* Upper eyelid */}
            <div className="eyelid-top" style={{ background: 'linear-gradient(180deg, #05020a 60%, #1a0005 100%)' }}>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
                background: 'linear-gradient(90deg, transparent, rgba(204,34,34,0.8), rgba(123,47,255,0.6), rgba(204,34,34,0.8), transparent)',
                boxShadow: '0 0 20px 4px rgba(204,34,34,0.4)',
              }} />
            </div>
            {/* Lower eyelid */}
            <div className="eyelid-bottom" style={{ background: 'linear-gradient(0deg, #05020a 60%, #1a0005 100%)' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: 'linear-gradient(90deg, transparent, rgba(204,34,34,0.8), rgba(123,47,255,0.6), rgba(204,34,34,0.8), transparent)',
                boxShadow: '0 0 20px 4px rgba(204,34,34,0.4)',
              }} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hero Content ── */}
      <div
        className="section-container"
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', paddingTop: '6rem', paddingBottom: '4rem', width: '100%',
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {/* Status tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent-primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textShadow: '0 0 8px rgba(204,34,34,0.6)' }}
        >
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #cc2222)' }} />
          <GlitchText>Sharingan Online</GlitchText>
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'linear-gradient(90deg, #cc2222, transparent)' }} />
        </motion.div>

        {/* ── Profile: Chakra Aura + RinneSharingan + photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: contentVisible ? 1 : 0, scale: contentVisible ? 1 : 0.7 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ position: 'relative', marginBottom: '2.5rem', width: PROFILE_SIZE, height: PROFILE_SIZE }}
        >
          {/* Timed Chakra Intervals (Behind Profile) */}
          <AnimatePresence mode="wait">
            {activeAura === 'rasengan' && (
              <motion.div
                key="rasengan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              >
                <RasenganPulse />
              </motion.div>
            )}
            {activeAura === 'chidori' && (
              <motion.div
                key="chidori"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position: 'absolute', inset: 0, zIndex: 0 }}
              >
                <ChidoriFlash />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chakra aura expanding rings */}
          <ChakraAura size={PROFILE_SIZE} />

          {/* Extra static glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: -PROFILE_SIZE * 0.06, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,47,255,0.15) 0%, rgba(204,34,34,0.08) 50%, transparent 70%)',
              filter: 'blur(12px)', pointerEvents: 'none',
            }}
          />

          {/* Rinne Sharingan frame + photo */}
          <RinneSharingan size={PROFILE_SIZE} glowIntensity={1.2}>
            <div style={{
              width: '68%', height: '68%', borderRadius: '50%', overflow: 'hidden',
              border: '2px solid rgba(123,47,255,0.45)',
              boxShadow: '0 0 24px rgba(123,47,255,0.4), 0 0 48px rgba(204,34,34,0.25), inset 0 0 20px rgba(0,0,0,0.7)',
            }}>
              <img src={profileImg} alt="Gunasekar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </RinneSharingan>

          {/* "Available" badge */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: '-6%', right: '-10%',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.375rem 0.875rem', borderRadius: '9999px',
              background: 'rgba(5,2,10,0.94)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(204,34,34,0.5)',
              fontSize: '0.6875rem', fontWeight: 600, color: '#cc2222',
              letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              boxShadow: '0 0 14px rgba(204,34,34,0.3)',
            }}
          >
            <MiniSharingan />
            Available
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-display"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: '0.5rem', lineHeight: 1.05 }}
        >
          <GlitchText glitchOnHover>
            <span style={{ color: 'var(--color-text-primary)' }}>
              {personalInfo.name}
            </span>
          </GlitchText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: contentVisible ? 1 : 0, scaleX: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ height: 2, width: 'clamp(120px, 30vw, 220px)', background: 'linear-gradient(90deg, transparent, #cc2222, #7b2fff, transparent)', marginBottom: '0.75rem', borderRadius: 2 }}
        />

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.875rem, 1.5vw, 1.1rem)', color: 'var(--color-accent-primary)', marginBottom: '1.5rem', letterSpacing: '0.1em', minHeight: '1.5rem', textShadow: '0 0 10px rgba(204,34,34,0.5)' }}
        >
          <TypeWriter strings={personalInfo.roles} typeSpeed={60} deleteSpeed={30} delayBetween={2000} />
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-body"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ maxWidth: '560px', marginBottom: '2.5rem', lineHeight: 1.85 }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}
        >
          {/* Primary — gradient + chakra border trail */}
          <motion.button
            whileHover={{ boxShadow: '0 0 30px rgba(204,34,34,0.6), 0 0 60px rgba(123,47,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            className="neon-pulse"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '0.75rem',
              fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #cc2222, #7b2fff)',
              color: '#fff', border: 'none',
              boxShadow: '0 0 20px rgba(204,34,34,0.4), 0 0 40px rgba(123,47,255,0.2)',
            }}
          >
            View My Work <ArrowDown size={16} />
          </motion.button>

          {/* Secondary — outline */}
          <motion.a
            whileHover={{ background: 'rgba(204,34,34,0.12)', boxShadow: '0 0 20px rgba(204,34,34,0.3)' }}
            whileTap={{ scale: 0.97 }}
            href={personalInfo.resumeUrl} download="Gunasekar_Resume.pdf"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '0.75rem',
              fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'transparent', color: '#cc2222',
              border: '1px solid rgba(204,34,34,0.6)',
              boxShadow: '0 0 10px rgba(204,34,34,0.15)',
              transition: 'all 0.3s',
            }}
          >
            <Download size={16} /> Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 1.0 }}
          style={{ display: 'flex', gap: '0.875rem', marginBottom: '3rem' }}
        >
          {[
            { icon: Code2, href: personalInfo.social.github,   label: 'GitHub'   },
            { icon: Link,  href: personalInfo.social.linkedin, label: 'LinkedIn' },
            { icon: Mail,  href: personalInfo.social.email,    label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 48, height: 48, borderRadius: '12px',
                background: 'rgba(18,4,26,0.8)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(204,34,34,0.2)',
                color: 'var(--color-text-muted)',
                transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#cc2222';
                e.currentTarget.style.borderColor = 'rgba(204,34,34,0.5)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(204,34,34,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.borderColor = 'rgba(204,34,34,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 1.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Scroll to Explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} style={{ color: '#cc2222' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
