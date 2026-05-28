import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#000000',
        'charcoal': '#0B0C10',
        'cyber-dark': '#0F1419',
        'cyan': '#00D9FF',
        'cyan-light': '#00F0FF',
        'violet': '#9D00FF',
        'violet-dark': '#6B00B5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-cyan': 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 240, 255, 0.05))',
        'neon-violet': 'linear-gradient(135deg, rgba(157, 0, 255, 0.1), rgba(107, 0, 181, 0.05))',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
        'glow-cyan-sm': '0 0 10px rgba(0, 217, 255, 0.4)',
        'glow-violet': '0 0 20px rgba(157, 0, 255, 0.5), 0 0 40px rgba(157, 0, 255, 0.3)',
        'glow-violet-sm': '0 0 10px rgba(157, 0, 255, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(0, 217, 255, 0.2)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 217, 255, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'wave': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'shimmer': {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'wave': 'wave 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      backdropBlur: {
        'xl': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
