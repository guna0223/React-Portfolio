import React from 'react';

const AuroraBackground = ({ className = '' }) => {
  return (
    <div className={`aurora-bg ${className}`}>
      <div
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
          top: '10%',
          left: '20%',
          filter: 'blur(100px)',
          animation: 'aurora-float 25s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)',
          bottom: '10%',
          right: '15%',
          filter: 'blur(100px)',
          animation: 'aurora-float 30s ease-in-out infinite reverse',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,63,94,0.15), transparent 70%)',
          top: '40%',
          left: '50%',
          filter: 'blur(120px)',
          animation: 'aurora-float 35s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      />
    </div>
  );
};

export default AuroraBackground;
