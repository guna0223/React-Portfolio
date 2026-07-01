import React, { useState, useEffect, useRef } from 'react';
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
import navLogo from '../../assets/images/nav-img/nav.jpg';
import './HeroSection.css';

/* ─── Alert System ─── */
const showAlert = (title, message, type = 'info') => {
  const alert = document.createElement('div');
  alert.className = 'ninja-alert';
  alert.innerHTML = `
    <div class="ninja-alert-content">
      <div class="ninja-alert-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : ''}</div>
      <div class="ninja-alert-text">
        <div class="ninja-alert-title">${title}</div>
        <div class="ninja-alert-message">${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.classList.add('show'), 10);
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
};

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
            '--ring-size': `${ringSize}px`,
            '--ring-delay': `${delay}s`,
            '--ring-color': i % 2 === 0
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
  <motion.img
    src={navLogo}
    alt="Logo"
    animate={{ rotate: 360 }}
    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    className="hero-badge-logo"
  />
);

const HeroSection = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeAura, setActiveAura] = useState(null);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const isPlayingRef = useRef(false);

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

  // Audio control functions
  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio || isPlayingRef.current) return;

    audio.volume = 0;
    audio.play().then(() => {
      isPlayingRef.current = true;
      console.log("Hero audio playing");

      // Fade in
      let volume = 0;
      fadeIntervalRef.current = setInterval(() => {
        if (volume < 0.15) { // Low cinematic volume
          volume += 0.005;
          audio.volume = volume;
        } else {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }, 50);
    }).catch((err) => {
      console.log("Audio play failed:", err);
    });
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio || !isPlayingRef.current) return;

    // Fade out
    let volume = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      if (volume > 0) {
        volume -= 0.005;
        audio.volume = volume;
      } else {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audio.pause();
        audio.currentTime = 0;
        isPlayingRef.current = false;
        console.log("Hero audio paused");
      }
    }, 50);
  };

  useEffect(() => {
    const heroElement = document.getElementById('hero');

    if (!heroElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (!isPlayingRef.current) {
              startAudio();
            }
          } else {
            if (isPlayingRef.current) {
              stopAudio();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const PROFILE_SIZE = 230;

  return (
    <section
      id="hero"
      className="hero-section"
    >
      {/* ── Layered cinematic backgrounds ── */}
      <div className="hero-gradient-overlay" />
      <AkatsukiBackground />
      <div className="grid-background hero-grid-bg" />
      <ChakraParticles density={50} />

      {/* ── Mangekyō eyelid reveal overlay ── */}
      <AnimatePresence>
        {!contentVisible && (
          <div
            className={`hero-eyelid-overlay${eyeOpen ? ' hero-eyelid-overlay--open' : ''}`}
          >
            {/* Red Sharingan glow at center of eyelid */}
            <div className="hero-eyelid-glow" />
            {/* Upper eyelid */}
            <div className="hero-eyelid-top">
              <div className="hero-eyelid-top-line" />
            </div>
            {/* Lower eyelid */}
            <div className="hero-eyelid-bottom">
              <div className="hero-eyelid-bottom-line" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hero Content ── */}
      <div
        className={`section-container hero-content${contentVisible ? ' hero-content--visible' : ''}`}
      >
        {/* Status tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-status-tag"
        >
          <span className="hero-status-line hero-status-line--left" />
          <GlitchText>developer Online</GlitchText>
          <span className="hero-status-line hero-status-line--right" />
        </motion.div>

        {/* ── Profile: Chakra Aura + RinneSharingan + photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: contentVisible ? 1 : 0, scale: contentVisible ? 1 : 0.7 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="hero-profile-container"
          style={{ width: PROFILE_SIZE, height: PROFILE_SIZE }}
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
                className="hero-aura-layer"
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
                className="hero-aura-layer"
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
            className="hero-profile-glow"
            style={{ '--glow-inset': `-${PROFILE_SIZE * 0.06}px` }}
          />

          {/* Rinne Sharingan frame + photo */}
          <RinneSharingan size={PROFILE_SIZE} glowIntensity={1.2}>
            <div className="hero-profile-frame">
              <img src={profileImg} alt="Gunasekar" fetchpriority="high" />
            </div>
          </RinneSharingan>

          {/* "Available" badge */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
            className="hero-available-badge"
          >
            <MiniSharingan />
            Available
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-display hero-name"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <GlitchText glitchOnHover>
            <span className="hero-name-text">
              {personalInfo.name}
            </span>
          </GlitchText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: contentVisible ? 1 : 0, scaleX: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-divider"
        />

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          className="hero-roles"
        >
          <TypeWriter strings={personalInfo.roles} typeSpeed={60} deleteSpeed={30} delayBetween={2000} />
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-body hero-bio"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="hero-cta-container"
        >
          {/* Primary — gradient + chakra border trail */}
          <motion.button
            whileHover={{ boxShadow: '0 0 30px rgba(204,34,34,0.6), 0 0 60px rgba(123,47,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              showAlert('Mission Archive', 'Accessing the project repository...', 'info');
              scrollTo('projects');
            }}
            className="hero-cta-primary neon-pulse"
          >
            View My Work <ArrowDown size={16} />
          </motion.button>

          {/* Secondary — outline */}
          <motion.a
            whileHover={{ background: 'rgba(204,34,34,0.12)', boxShadow: '0 0 20px rgba(204,34,34,0.3)' }}
            whileTap={{ scale: 0.97 }}
            href={personalInfo.resumeUrl} download="Gunasekar_Resume.pdf"
            onClick={() => showAlert('Resume Download', 'Downloading the shinobi credentials...', 'info')}
            className="hero-cta-secondary"
          >
            <Download size={16} /> Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 1.0 }}
          className="hero-social-links"
        >
          {[
            { icon: Code2, href: personalInfo.social.github,   label: 'GitHub'   },
            { icon: Link,  href: personalInfo.social.linkedin, label: 'LinkedIn' },
            { icon: Mail,  href: personalInfo.social.email,    label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const messages = {
                  GitHub: 'Opening the code repository...',
                  LinkedIn: 'Connecting to the ninja network...',
                  Email: 'Preparing to send a message...'
                };
                showAlert(`Opening ${label}`, messages[label] || 'Activating link...', 'info');
              }}
              className="hero-social-link"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ delay: 1.2 }}
          className="hero-scroll-indicator"
        >
          <span className="hero-scroll-text">
            Scroll to Explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="hero-scroll-arrow">
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        style={{ display: 'none' }}
      >
        <source src="/audio/home-page.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
};

export default React.memo(HeroSection);
