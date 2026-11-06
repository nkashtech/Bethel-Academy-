/** @type {import('tailwindcss').Config} */

// BHGA brand, from the Website Structure document: Royal Blue #2B5B84, Warm Gold #D4A853, Soft White #F9F9FB.
// Colours resolve to CSS variables in src/index.css, so the whole site switches with the .dark class.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: { DEFAULT: v('royal'), deep: v('royal-deep'), ink: v('royal-ink'), night: v('royal-night'), soft: v('royal-soft'), mist: v('royal-mist'), text: v('royal-text') },
        gold: { DEFAULT: v('gold'), bright: v('gold-bright'), deep: v('gold-deep'), soft: v('gold-soft'), cream: v('gold-cream') },
        canvas: v('canvas'),
        surface: v('surface'),
        ink: { DEFAULT: v('ink'), soft: v('ink-soft'), muted: v('ink-muted') },
        line: v('line'),
        // Always light: the plate the crest sits on, so it reads the same in both themes.
        paper: '#FDFBF6',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.05), 0 4px 16px -4px rgb(var(--shadow) / 0.08)',
        pop: '0 30px 70px -24px rgb(var(--shadow) / 0.4)',
        glow: '0 0 0 1px rgb(212 168 83 / 0.35), 0 18px 50px -18px rgb(212 168 83 / 0.55)',
      },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(18px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'word-in': { '0%': { opacity: 0, transform: 'translateY(0.55em) rotate(2deg)', filter: 'blur(8px)' }, '100%': { opacity: 1, transform: 'none', filter: 'blur(0)' } },
        draw: { '0%': { strokeDashoffset: 320 }, '100%': { strokeDashoffset: 0 } },
        drift: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'intro-ring': { '0%': { strokeDashoffset: 604 }, '100%': { strokeDashoffset: 0 } },
        'intro-line': { '0%': { transform: 'scaleX(0)', opacity: 0 }, '30%': { opacity: 1 }, '100%': { transform: 'scaleX(1)', opacity: 1 } },
        foil: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        flake: { '0%': { transform: 'translate3d(0,-30px,0)' }, '50%': { transform: 'translate3d(18px,40px,0)' }, '100%': { transform: 'translate3d(0,-30px,0)' } },
        'flake-spin': { '0%': { transform: 'rotateX(0) rotateY(0) rotate(0)' }, '100%': { transform: 'rotateX(360deg) rotateY(180deg) rotate(360deg)' } },
        'page-in': { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(0.22,1,0.36,1) both',
        'word-in': 'word-in .9s cubic-bezier(0.22,1,0.36,1) both',
        draw: 'draw 1.1s cubic-bezier(0.65,0,0.35,1) both',
        drift: 'drift 7s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'intro-ring': 'intro-ring 1.6s cubic-bezier(0.65,0,0.35,1) .15s both',
        'intro-line': 'intro-line 2s cubic-bezier(0.65,0,0.35,1) both',
        foil: 'foil 6s linear infinite',
        flake: 'flake 14s ease-in-out infinite',
        'flake-spin': 'flake-spin 9s linear infinite',
        'page-in': 'page-in .6s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
