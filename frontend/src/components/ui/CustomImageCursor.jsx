import React, { useState, useEffect } from 'react';
import defaultCursor from '../../assets/Mouse/Cursors.cur';
import pointerCursor from '../../assets/Mouse/pointer.cur';

const CustomImageCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      // Check if hovering over a clickable element
      const isClickable = e.target.closest('a, button, [role="button"], input, select, textarea');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '32px', // CHANGE SIZE HERE
        height: '32px', // CHANGE SIZE HERE
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-10%, -10%)', // Adjust hotspot if needed
      }}
    >
      <img 
        src={isPointer ? pointerCursor : defaultCursor} 
        alt="cursor" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};

export default CustomImageCursor;
