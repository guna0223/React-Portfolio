import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('portfolio_sound_muted');
    return saved !== null ? JSON.parse(saved) : true; // Default muted
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('portfolio_sound_muted', JSON.stringify(isMuted));

    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (isMuted) {
      let vol = audio.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (vol > 0.02) {
          vol -= 0.02;
          audio.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
          audio.pause();
          setIsPlaying(false);
        }
      }, 40);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        fadeIntervalRef.current = setInterval(() => {
          if (vol < 0.18) {
            vol += 0.01;
            audio.volume = Math.min(0.2, vol);
          } else {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, 50);
      }).catch((err) => {
        console.log('Audio autoplay prevented:', err);
        setIsMuted(true);
      });
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Web Audio synthesizer for crisp micro-interaction sounds (no heavy external assets needed)
  const playSfx = useCallback((type = 'click') => {
    if (isMuted) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'jutsu') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // AudioContext failure gracefully ignored
    }
  }, [isMuted]);

  return (
    <SoundContext.Provider value={{ isMuted, isPlaying, toggleMute, playSfx }}>
      {children}
      <audio
        ref={audioRef}
        src="/audio/home-page.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      isMuted: true,
      isPlaying: false,
      toggleMute: () => {},
      playSfx: () => {},
    };
  }
  return ctx;
};
