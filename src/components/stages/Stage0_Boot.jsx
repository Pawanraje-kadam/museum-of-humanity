import React, { useState, useEffect, useRef } from 'react';
import { useNarrative, APP_STATES } from '../../context/NarrativeContext';
import Typewriter from '../ui/Typewriter';

const Stage0_Boot = () => {
  const { advanceState } = useNarrative();
  const typingRef = useRef(null);
  // Local state controls the cinematic pacing of the text lines
  const [step, setStep] = useState(1);
useEffect(() => {
  typingRef.current = new Audio('/typing-track.mp3');

  typingRef.current.loop = true;
  typingRef.current.volume = 0.25;

  typingRef.current.play().catch(() => {});

  return () => {
    typingRef.current?.pause();
    typingRef.current = null;
  };
}, []);
  return (
    <div className="flex h-[80vh] flex-col items-start justify-center space-y-4 pt-20">
      
      {/* Line 1: The Boot sequence */}
      {step >= 1 && (
        <p className="text-sm tracking-widest opacity-80">
          <Typewriter 
            text="INITIALIZING ARCHIVE CONNECTION..." 
            delay={30} 
            onComplete={() => setStep(2)} 
          />
        </p>
      )}

      {/* Line 2: The Subject */}
      {step >= 2 && (
        <p className="text-xl font-bold tracking-widest mt-4">
          <Typewriter 
            text="SUBJECT: [SPECIES_HUMAN]" 
            delay={50} 
            onComplete={() => setStep(3)} 
          />
        </p>
      )}

      {/* Line 3: The Status (Triggers the automatic state advance) */}
      {step >= 3 && (
        <p className="text-xl font-bold tracking-widest text-red-500 mt-4">
          <Typewriter 
            text="STATUS: EXTINCT" 
            delay={80} 
            onComplete={() => setTimeout(() => advanceState(APP_STATES.GALLERY), 1500)} 
          />
        </p>
      )}
      
    </div>
  );
};

export default Stage0_Boot;
