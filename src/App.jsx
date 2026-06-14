import React, { useEffect, useRef } from 'react';
import { NarrativeProvider, useNarrative, APP_STATES } from './context/NarrativeContext';
import DataPad from './components/layout/DataPad';
import { useKeyPress } from './hooks/useKeyPress';

// Import all narrative stages
import Stage0_Boot from './components/stages/Stage0_Boot';
import Stage1_Gallery from './components/stages/Stage1_Gallery';
import Stage2_Assessment from './components/stages/Stage2_Assessment';
import Stage3_Twist from './components/stages/Stage3_Twist';
import Stage4_Exit from './components/stages/Stage4_Exit';

const SoundController = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    bgRef.current = new Audio('/bg-sound.mp3');

    bgRef.current.loop = true;
    bgRef.current.volume = 0.15;

    const startAudio = () => {
      bgRef.current.play().catch(() => {});
      window.removeEventListener('click', startAudio);
    };

    window.addEventListener('click', startAudio);

    return () => {
      window.removeEventListener('click', startAudio);
      bgRef.current?.pause();
    };
  }, []);

  return null;
};

// Inner component that consumes the NarrativeContext
const NarrativeController = () => {
  const { appState, toggleCmdK } = useNarrative();
  
  // Attach global keyboard listeners for the Recruiter/Developer menu.
  // We use both 'metaKey' (Mac) and 'ctrlKey' (Windows/Linux) to ensure universal accessibility.
  useKeyPress('k', 'metaKey', toggleCmdK);
  useKeyPress('k', 'ctrlKey', toggleCmdK);

  return (
    <DataPad>
      {/* 
        This is our State Machine in action. 
        Instead of routing URLs, we declaratively mount/unmount components 
        based purely on the current application state.
      */}
      {appState === APP_STATES.BOOT && <Stage0_Boot />}
      {appState === APP_STATES.GALLERY && <Stage1_Gallery />}
      {appState === APP_STATES.ASSESSMENT && <Stage2_Assessment />}
      {appState === APP_STATES.TWIST && <Stage3_Twist />}
      {appState === APP_STATES.EXIT && <Stage4_Exit />}
    </DataPad>
  );
};

// Root App component wraps the controller in the Context Provider
export default function App() {
  return (
    <NarrativeProvider>
  <SoundController />
  <NarrativeController />
</NarrativeProvider>
  );
}
