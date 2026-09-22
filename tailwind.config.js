/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gp: {
          bg: '#070A0F',
          'bg-secondary': '#0C121B',
          surface: '#111A25',
          'surface-2': '#151F2C',
          text: '#F4F5F7',
          muted: '#AEB6C2',
          gold: '#C9A45C',
          'gold-light': '#E4C77A',
          live: '#E53935',
        }
      },
      borderColor: {
        'gp-subtle': 'rgba(255, 255, 255, 0.08)',
        'gp-gold': 'rgba(201, 164, 92, 0.35)',
      },
      backgroundColor: {
        'gp-subtle': 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        akira: ['"Akira Expanded"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 164, 92, 0.25)',
        'gold-glow-lg': '0 0 50px rgba(201, 164, 92, 0.35)',
        'live-glow': '0 0 15px rgba(229, 57, 53, 0.6)',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      }
    },
  },
  plugins: [],
}
