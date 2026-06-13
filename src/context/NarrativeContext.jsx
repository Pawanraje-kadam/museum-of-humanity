import React, { createContext, useState, useContext } from 'react';

// Create the Context
const NarrativeContext = createContext();

// Define the exact state machine enum to prevent typo-induced bugs
export const APP_STATES = {
  BOOT: 'BOOT',
  GALLERY: 'GALLERY',
  ASSESSMENT: 'ASSESSMENT',
  TWIST: 'TWIST',
  EXIT: 'EXIT'
};

export const NarrativeProvider = ({ children }) => {
  // Global State Variables
  const [appState, setAppState] = useState(APP_STATES.BOOT);
  const [cmdKOpen, setCmdKOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('IDLE');

  // Helper functions to cleanly update state
  const toggleCmdK = () => setCmdKOpen(prev => !prev);
  const advanceState = (newState) => setAppState(newState);

  return (
    <NarrativeContext.Provider 
      value={{ 
        appState, 
        advanceState, 
        cmdKOpen, 
        setCmdKOpen, 
        toggleCmdK, 
        apiStatus, 
        setApiStatus 
      }}
    >
      {children}
    </NarrativeContext.Provider>
  );
};

// Custom hook to cleanly consume the context in any component
export const useNarrative = () => useContext(NarrativeContext);
