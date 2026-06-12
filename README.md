# museum-of-humanity
Museum of Humanity: A high-performance interactive portfolio. Showcases advanced frontend architecture including custom Context API state machines, secure Gemini LLM integration via Netlify serverless functions, and accessible UI with Tailwind CSS.    

🛠️ Technical Competency Matrix
This project was built from scratch to showcase the exact production-level standards expected of enterprise software engineering interns:

State Machine Architecture: Leverages the React Context API to manage global narrative states and UI triggers cleanly, preventing prop-drilling across decoupled layout modules.

Secure Backend Proxying: Built using Netlify Serverless Functions (/api/synthesize) to proxy requests to Google's Gemini API, hiding sensitive parameters and production API keys from the client-side network panel.

Fault-Tolerant Engineering: Implements strict Graceful Degradation. If network requests are rate-limited or the API fails, a hardcoded asynchronous fallback cache mounts automatically to prevent a fatal UI crash.

Cinematic UX & Core Web Vitals: Handcrafted animations (pulsing terminal cursors, vertical CRT scanlines, responsive grid shifting) built strictly using native Tailwind CSS keyframes optimized for fluid 60fps rendering.

Performance Optimization: Zero Font-Of-Unstyled-Text (FOUT) via strategic font pre-connecting and preloading in the head metadata layer, ensuring smooth typography transformations during runtime.

Strict Access Control (a11y): Developed using semantic HTML5 elements (<address>), global window event hooks for cross-platform keyboard shortcuts (Cmd+K/Ctrl+K), and aria-live attributes to maintain screen-reader legibility.

📂 Repository Blueprint
Plaintext
museum-of-humanity/
├── public/
│   ├── resume.pdf           # Primary application target
│   └── og-image.png         # Open Graph shareable card preview
├── netlify/
│   └── functions/
│       └── synthesize.js    # Secure Node.js serverless lambda proxy
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CmdKMenu.jsx # Executive navigational override
│   │   │   └── DataPad.jsx  # Global layout & CRT wrapper
│   │   ├── stages/          # Decoupled state components (Stages 0-4)
│   │   └── ui/
│   │       └── Typewriter.jsx # Event-driven text synthesizer
│   ├── context/
│   │   └── NarrativeContext.jsx # Global Finite State Provider
│   ├── data/
│   │   └── artifacts.json   # High-performance static catalog
│   ├── hooks/
│   │   └── useKeyPress.js   # Reusable event cleanup hook
│   ├── App.jsx
│   ├── index.css            # Custom layout scrollbar configurations
│   └── main.jsx
├── index.html               # Early pre-connect font mapping
├── netlify.toml             # Infrastructure as Code (IaC) configuration
└── package.json             # Light, dependency-optimized configuration

📜 License
Distributed under the MIT License. See LICENSE for further safety and liability parameters.
"""
