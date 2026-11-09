/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07070a',
        surface: '#0f0e14',
        'surface-highlight': '#171620',
        'surface-border': '#262230',
        accent: {
          crimson: '#e84a4a',
          cyan: '#06b6d4',
          emerald: '#10b981',
          purple: '#a855f7',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

