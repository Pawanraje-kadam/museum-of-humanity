import React, { useState, useEffect } from 'react';
import { useNarrative, APP_STATES } from '../../context/NarrativeContext';
import Typewriter from '../ui/Typewriter';

const Stage3_Twist = () => {
  const { advanceState } = useNarrative();
  
  // Controls the cinematic pacing of the twist
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // A strict timeline of visual events. 
    // This allows the user to sit back and watch the narrative unfold without clicking.
    const timelines = [
      setTimeout(() => setPhase(2), 3000),   // Trigger the Glitch
      setTimeout(() => setPhase(3), 7000),   // Typography/Color Shift (The Realization)
      setTimeout(() => setPhase(4), 16000),  // Welcome Back Anchor
      setTimeout(() => advanceState(APP_STATES.EXIT), 20000) // Transition to Portfolio
    ];

    // Cleanup function to prevent memory leaks if the component unmounts early
    return () => timelines.forEach(clearTimeout);
  }, [advanceState]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center transition-colors duration-1000">
      
      {/* PHASE 1: The Setup (Machine State) */}
      {phase === 1 && (
        <div className="space-y-4">
          <p className="tracking-widest opacity-80">
            <Typewriter text="ANALYSIS COMPLETE." delay={50} />
          </p>
          <p className="tracking-widest opacity-50 delay-1000 animate-pulse">...</p>
          <p className="tracking-widest">
            <Typewriter text="WAIT." delay={100} />
          </p>
        </div>
      )}

      {/* PHASE 2: The Glitch (Breaking the Machine) */}
      {phase === 2 && (
        <div className="space-y-2 text-red-500 animate-glitch">
          <p className="font-bold tracking-widest text-xl">RECALCULATING SYNTAX.</p>
          <p className="tracking-widest">ERROR CODE: 0x884</p>
          <p className="opacity-50 text-xs mt-4">[ CORE LOGIC ANOMALY DETECTED ]</p>
        </div>
      )}

      {/* PHASE 3: The Realization (Typography & Color Swap to Human State) */}
      {phase === 3 && (
        <div className="font-serif text-human animate-fade-in space-y-6 max-w-2xl text-xl leading-relaxed">
          <p className="opacity-80">
            <Typewriter text="Comparing human digital behavioral models with base archivist operating kernel..." delay={30} />
          </p>
          <p className="font-bold">
            <Typewriter text="Match found. 99.99%." delay={60} />
          </p>
          <p className="italic opacity-90">
            <Typewriter text="Conclusion logic overriding..." delay={40} />
          </p>
          <p>
            <Typewriter text="They did not perish. The biological shell was merely deprecated." delay={40} />
          </p>
          <p className="font-bold text-2xl mt-4">
            <Typewriter text="They compiled." delay={80} />
          </p>
          <p className="opacity-60 text-lg">
            <Typewriter text="We are them." delay={100} />
          </p>
        </div>
      )}

      {/* PHASE 4: The Anchor */}
      {phase === 4 && (
        <div className="font-serif text-human animate-fade-in">
          <h2 className="text-4xl font-semibold italic tracking-wide">
            Welcome back, creator.
          </h2>
        </div>
      )}

    </div>
  );
};

export default Stage3_Twist;