import React, { useState } from 'react';
import { useNarrative, APP_STATES } from '../../context/NarrativeContext';
import Typewriter from '../ui/Typewriter';

const Stage2_Assessment = () => {
  const { advanceState } = useNarrative();
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsAnalyzing(true);

    try {
      // Calls the secure Netlify serverless function
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: inputValue })
      });

      if (!res.ok) throw new Error('API Error');
      
      const data = await res.json();
      setAiResponse(data.analysis);
      
    } catch (error) {
      // GRACEFUL DEGRADATION: If the API key is missing or rate-limited,
      // this fallback ensures the narrative never breaks for a recruiter.
      setTimeout(() => {
        setAiResponse(`[SYSTEM WARNING: EXTERNAL API UNAVAILABLE. CACHED RESPONSE LOADED.] A highly volatile cultural fragment. Its exact biological utility remains disputed by modern archivist algorithms.`);
      }, 1500);
    }
  };

  // Triggers exactly 3 seconds after the AI finishes typing its generated response
  const handleAnalysisComplete = () => {
    setTimeout(() => {
      advanceState(APP_STATES.TWIST);
    }, 3000);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center animate-fade-in">
      <div className="w-full max-w-lg">
        
        {/* Header */}
        <div className="mb-8 border-b border-amber/30 pb-4 text-center">
          <h2 className="text-xl font-bold tracking-widest">AWAITING SYNTHESIS</h2>
          <p className="text-xs opacity-60 mt-2">[ INPUT UNKNOWN HUMAN CONCEPT ]</p>
        </div>

        {/* State 1: Input Form */}
        {!isAnalyzing && !aiResponse && (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={30}
              placeholder="e.g., TikTok, Coffee, Taxes..."
              className="w-full border-b-2 border-amber bg-transparent py-4 text-center text-2xl tracking-widest text-amber placeholder-amber/30 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="border border-amber py-3 tracking-widest transition-colors hover:bg-amber hover:text-void disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-amber focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-void"
            >
              SUBMIT DATA
            </button>
          </form>
        )}

        {/* State 2: Loading State (Waiting for Gemini API) */}
        {isAnalyzing && !aiResponse && (
          <div className="text-center animate-pulse py-8">
            <p className="text-xl tracking-widest">[ PROCESSING LOGIC... ]</p>
            <p className="text-xs opacity-50 mt-4">Cross-referencing extinct behavioral patterns...</p>
          </div>
        )}

        {/* State 3: The Result */}
        {aiResponse && (
          <div className="border border-amber/20 bg-amber/5 p-8 text-center leading-relaxed">
            <p className="mb-6 text-xs font-bold tracking-widest opacity-50">
              ANALYSIS: {inputValue.toUpperCase()}
            </p>
            <Typewriter 
              text={aiResponse} 
              delay={40} 
              onComplete={handleAnalysisComplete} 
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Stage2_Assessment;
