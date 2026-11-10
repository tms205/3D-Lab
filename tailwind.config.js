/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pia: {
          dark: '#140D07',
          charcoal: '#1F150E',
          surface: '#2A1C13',
          border: '#3F2C20',
          muted: '#8E7969',
          gold: '#E5A93C',
          goldLight: '#F7CE78',
          goldDark: '#B87B1D',
          cream: '#FFF9F0',
          paper: '#F7EFE4',
          crimson: '#C0392B',
          jade: '#2F6E4F',
          matcha: '#6A8E4E',
          taro: '#7D5A85',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
