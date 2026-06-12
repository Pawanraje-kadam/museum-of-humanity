import React from 'react';
import { useNarrative, APP_STATES } from '../../context/NarrativeContext';
import artifacts from '../../data/artifacts.json';

const Stage1_Gallery = () => {
  const { advanceState } = useNarrative();

  return (
    <div className="animate-fade-in pb-20 pt-8">
      
      {/* Header section */}
      <div className="mb-12 border-b border-amber/30 pb-4">
        <h2 className="text-2xl font-bold tracking-widest">ARCHIVE REVISION 8.4.2</h2>
        <p className="text-sm opacity-60">[ SYSTEM IDLE : DISPLAYING FRAGMENTS ]</p>
      </div>

      {/* Artifact Grid: Mapping over our hardcoded JSON data */}
      <div className="space-y-16">
        {artifacts.map((art) => (
          <div key={art.id} className="flex flex-col gap-6 md:flex-row md:items-start group">
            
            {/* Left Column: Visual Placeholder */}
            <div className="flex h-32 w-full items-center justify-center border border-amber/20 bg-amber/5 transition-colors duration-300 group-hover:bg-amber/10 md:h-48 md:w-1/3">
              <span className="text-center text-xs opacity-50 px-4">
                {art.visual}
              </span>
            </div>
            
            {/* Right Column: AI Analysis */}
            <div className="md:w-2/3">
              <h3 className="mb-2 text-xl font-bold">{art.name}</h3>
              <p className="mb-4 text-xs tracking-widest opacity-70">
                CLASS: {art.class}
              </p>
              <p className="leading-relaxed opacity-90">
                {art.analysis}
              </p>
            </div>
            
          </div>
        ))}
      </div>

      {/* Footer / Call To Action to proceed to the API integration step */}
      <div className="mt-20 border-t border-amber/30 pt-12 text-center">
        <p className="mb-6 text-sm tracking-widest opacity-80">
          [ INCOMPLETE DATA. MANUAL SYNTHESIS REQUIRED. ]
        </p>
        <button
          onClick={() => advanceState(APP_STATES.ASSESSMENT)}
          className="border border-amber px-8 py-4 transition-colors hover:bg-amber hover:text-void focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-void tracking-widest text-sm"
        >
          PROCEED TO SYNTHESIS NODE
        </button>
      </div>
      
    </div>
  );
};

export default Stage1_Gallery;