/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'z-black':       '#0A0A0A',
        'z-emerald':     '#1B4332',
        'z-emerald-mid': '#2D6A4F',
        'z-amber':       '#B7860B',
        'z-gold':        '#D4AF37',
        'z-cream':       '#FAF6F0',
        'z-charcoal':    '#1C1C1C',
        'z-mist':        '#F0EBE3',
        'z-white':       '#FFFFFF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
