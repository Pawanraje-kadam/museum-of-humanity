import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay = 50, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);

    } else if (onComplete) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span aria-live="polite">
      {currentText}
      {currentIndex < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </span>
  );
};

export default Typewriter;
