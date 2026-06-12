/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#030303',
        amber: '#FFB000',
        human: '#EAEAEA',
        scanline: 'rgba(255, 176, 0, 0.15)',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}