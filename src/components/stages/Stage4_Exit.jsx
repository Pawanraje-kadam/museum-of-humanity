import React from 'react';

const Stage4_Exit = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-12 animate-fade-in pb-12">
      
      {/* Header: Clean, human, and professional */}
      <div className="text-center">
        <h1 className="font-serif text-5xl text-human font-semibold tracking-wide">
          Museum of Humanity
        </h1>
        <p className="font-serif text-human/60 mt-4 italic text-lg">
          Engineered by [Your Name]
        </p>
      </div>

      {/* Action Links: The actual conversion point for recruiters */}
      <address className="flex space-x-6 text-sm tracking-widest text-amber not-italic">
        <a 
          href="https://github.com/yourusername/museum-of-humanity" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View GitHub Repository"
          className="border-b border-amber/30 pb-1 hover:border-amber transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-void"
        >
          VIEW GITHUB
        </a>
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Download Resume"
          className="border-b border-amber/30 pb-1 hover:border-amber transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-void"
        >
          DOWNLOAD RESUME
        </a>
        <a 
          href="https://linkedin.com/in/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View LinkedIn Profile"
          className="border-b border-amber/30 pb-1 hover:border-amber transition-colors focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:ring-offset-void"
        >
          LINKEDIN
        </a>
      </address>

      {/* The "Why Hire Me" Technical Breakdown */}
      <div className="max-w-2xl border border-amber/20 bg-void p-8 text-left w-full mt-8 shadow-[0_0_30px_rgba(255,176,0,0.05)]">
        <h3 className="text-sm font-bold tracking-widest text-amber mb-6 border-b border-amber/20 pb-2">
          [ ENGINEERING ARCHITECTURE ]
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold opacity-70 mb-2 tracking-widest text-human">FRONTEND INFRASTRUCTURE</h4>
            <ul className="text-xs space-y-3 opacity-90 leading-relaxed font-mono text-amber">
              <li>&gt; <span className="text-human">React Context API:</span> Custom state machine built to handle complex narrative sequencing without heavy routing libraries.</li>
              <li>&gt; <span className="text-human">Tailwind CSS:</span> Strict, accessible design system utilizing fluid typography and custom CSS keyframe animations.</li>
              <li>&gt; <span className="text-human">Performance:</span> Zero FOUT via strategic font preloading. Strictly optimized for instant First Contentful Paint.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold opacity-70 mb-2 tracking-widest text-human">BACKEND & API</h4>
            <ul className="text-xs space-y-3 opacity-90 leading-relaxed font-mono text-amber">
              <li>&gt; <span className="text-human">Serverless Functions:</span> Netlify-hosted proxy endpoints to securely handle LLM requests without exposing API keys.</li>
              <li>&gt; <span className="text-human">Gemini Integration:</span> Strict prompt engineering designed for deterministic, low-latency JSON responses.</li>
              <li>&gt; <span className="text-human">Graceful Degradation:</span> Hardcoded fallback states ensure the UI never crashes during API rate limits.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Stage4_Exit;