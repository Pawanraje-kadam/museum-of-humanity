import React from 'react';
import { useNarrative } from '../../context/NarrativeContext';
import CmdKMenu from './CmdKMenu';

const DataPad = ({ children }) => {
  const { cmdKOpen } = useNarrative();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-void text-amber font-mono selection:bg-amber selection:text-void">
      
      {/* --- Visual Effects Layer --- */}
      {/* 1. Deep shadow overlay for CRT monitor depth */}
      <div className="pointer-events-none absolute inset-0 z-40 opacity-10 mix-blend-overlay shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>
      
      {/* 2. Animated vertical scanline (configured in tailwind.config.js) */}
      <div className="pointer-events-none absolute inset-0 z-50 h-[100vh] w-full animate-scanline bg-gradient-to-b from-transparent via-amber/5 to-transparent opacity-20"></div>
      
      {/* --- Content Layer --- */}
      {/* When the CmdK menu opens, the main narrative gently blurs into the background */}
      <main className={`relative z-10 mx-auto max-w-4xl p-6 transition-all duration-300 ${cmdKOpen ? 'blur-sm' : 'blur-none'}`}>
        {children}
      </main>
      
      {/* The invisible Developer Override Menu */}
      <CmdKMenu />
      
      {/* Global Hint pinned to the bottom right */}
      <div className="fixed bottom-4 right-4 z-50 text-[10px] opacity-30 tracking-widest">
        [ CMD+K / CTRL+K : OVERRIDE ]
      </div>

    </div>
  );
};

export default DataPad;