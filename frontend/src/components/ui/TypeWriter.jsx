import React, { useState, useEffect, useCallback } from 'react';

const TypeWriter = ({
  strings = [],
  typeSpeed = 80,
  deleteSpeed = 50,
  delayBetween = 2000,
  className = '',
}) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentString = strings[stringIndex];

    if (isDeleting) {
      setText(currentString.substring(0, text.length - 1));
    } else {
      setText(currentString.substring(0, text.length + 1));
    }
  }, [text, stringIndex, isDeleting, strings]);

  useEffect(() => {
    const currentString = strings[stringIndex];
    let timeout;

    if (!isDeleting && text === currentString) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, tick, typeSpeed, deleteSpeed, delayBetween]);

  return (
    <span className={className}>
      {text}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'var(--color-accent-primary)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  );
};

export default TypeWriter;
