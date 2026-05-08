import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  staggerChildren = 0.03,
  tag = 'div',
  gradient = false,
  once = true,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    },
  };

  const Tag = motion[tag] || motion.div;

  return (
    <Tag
      className={`${className} ${gradient ? 'text-gradient' : ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={variants[variant]}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
