import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, delay = 50, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/typing-track.mp3');

    audioRef.current.loop = true;
    audioRef.current.volume = 0.08;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }

      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);

    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      if (onComplete) {
        const timeout = setTimeout(onComplete, 500);
        return () => clearTimeout(timeout);
      }
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
