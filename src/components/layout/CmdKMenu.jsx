import React from 'react';
import { useNarrative, APP_STATES } from '../../context/NarrativeContext';
import { useKeyPress } from '../../hooks/useKeyPress';

const CmdKMenu = () => {
  const { cmdKOpen, setCmdKOpen, advanceState } = useNarrative();

  // Listen for the Escape key to close the menu
  useKeyPress('escape', null, () => setCmdKOpen(false));

  // If the menu state is false, render nothing
  if (!cmdKOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md border border-amber/30 bg-void p-6 shadow-[0_0_30px_rgba(255,176,0,0.1)]">
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-amber/20 pb-2">
          <h2 className="text-sm font-bold tracking-widest text-amber">SYSTEM OVERRIDE</h2>
          <span className="text-xs text-amber/50">[ESC] to close</span>
        </div>
        
        {/* Action Links */}
        <ul className="space-y-2 text-sm">
          <li>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 transition-colors hover:bg-amber hover:text-void focus:bg-amber focus:text-void outline-none"
            >
              &gt; VIEW_RESUME.pdf
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/yourusername/museum-of-humanity" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 transition-colors hover:bg-amber hover:text-void focus:bg-amber focus:text-void outline-none"
            >
              &gt; EXPLORE_GITHUB_REPOSITORY
            </a>
          </li>
          <li>
            <button 
              onClick={() => {
                advanceState(APP_STATES.EXIT);
                setCmdKOpen(false);
              }}
              className="block w-full px-3 py-2 text-left transition-colors hover:bg-amber hover:text-void focus:bg-amber focus:text-void outline-none"
            >
              &gt; BYPASS_NARRATIVE (Skip to Contact)
            </button>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default CmdKMenu;
