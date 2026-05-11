import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal - Scroll-triggered reveal effects with smoke fade-in, chakra burst, blur + slide
 * Use for: Skills section, About section, Projects section
 */
const ScrollReveal = ({ children, variant = 'fade', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: 'easeOut' },
      },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay, ease: 'easeOut' },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay, ease: 'easeOut' },
      },
    },
    chakraBurst: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          delay,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: { duration: 1, delay, ease: 'easeOut' },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
};

/**
 * useScrollAnimation - Hook for GSAP scroll-triggered animations
 */
export const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
};

export default ScrollReveal;