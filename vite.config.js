import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // The React plugin enables Fast Refresh and JSX compilation
  plugins: [react()],
  
  // Local Development Server Configuration
  server: {
    port: 3000,        // Forces the dev server to run on localhost:3000
    open: true,        // Automatically opens your browser when you run 'npm run dev'
    strictPort: true,  // Fails if port 3000 is in use, rather than silently switching ports
  },
  
  // Production Build Configuration
  build: {
    outDir: 'dist',    // Tells Vite where to output the compiled files (matches our netlify.toml)
    sourcemap: false,  // Set to false in production to keep bundle size small and hide source code
    minify: 'esbuild', // Uses esbuild for lightning-fast minification
    chunkSizeWarningLimit: 1000, // Prevents console warnings for slightly larger vendor bundles
  }
});