import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ number, title, subtitle, className = '' }) => {
  return (
    <div className={className} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
      {number && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--color-accent-primary)',
            marginBottom: '0.75rem',
            letterSpacing: '0.05em',
          }}
        >
          {`// ${number}`}
        </motion.div>
      )}
      <motion.h2
        className="text-h1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '1rem', maxWidth: '600px' }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary), transparent)',
          marginTop: '1.5rem',
          transformOrigin: 'left',
          maxWidth: '200px',
        }}
      />
    </div>
  );
};

export default SectionHeading;
