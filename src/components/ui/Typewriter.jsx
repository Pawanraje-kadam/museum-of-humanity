import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay = 50, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If we haven't reached the end of the string, keep typing
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      // Cleanup function to prevent memory leaks during unmounts
      return () => clearTimeout(timeout);
      
    } else if (onComplete) {
      // Once typing is done, add a small 500ms buffer before triggering the next narrative event
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    // aria-live="polite" ensures screen readers read the text as it is generated, 
    // without interrupting the user unnecessarily.
    <span aria-live="polite">
      {currentText}
      {/* The pulsing cursor only shows while the text is actively typing */}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </span>
  );
};

export default Typewriter;
