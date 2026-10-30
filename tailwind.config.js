/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          lightPurple: '#E9D5FF',
          lavender: '#F3E8FF',
          violet: '#A78BFA',
          deepViolet: '#7C3AED',
          babyBlue: '#BFDBFE',
          softBlue: '#93C5FD',
          softWhite: '#FFFFFF',
          midnight: '#18122B',
          nightViolet: '#20163B',
          glowViolet: 'rgba(167, 139, 250, 0.45)',
          glowBlue: 'rgba(191, 219, 254, 0.45)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        tamil: ['"Anek Tamil"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'soft-glow': '0 0 25px -5px rgba(167, 139, 250, 0.35)',
        'blue-glow': '0 0 25px -5px rgba(191, 219, 254, 0.45)',
        'envelope': '0 20px 40px -15px rgba(124, 58, 237, 0.25)',
        'glass': '0 8px 32px 0 rgba(167, 139, 250, 0.15)',
      }
    },
  },
  plugins: [],
}
