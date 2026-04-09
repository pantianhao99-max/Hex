/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        panel: '#0c0c0f',
        line: 'rgba(255,255,255,0.12)',
        alert: '#ea233c',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"SF Pro Display"', '"PingFang SC"', '"Noto Sans SC"', 'sans-serif'],
        display: ['"Space Grotesk"', '"DIN Alternate"', '"SF Pro Display"', '"PingFang SC"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(234,35,60,0.25), 0 0 32px rgba(234,35,60,0.2)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        screenIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.25', transform: 'scaleX(0.9)' },
          '50%': { opacity: '0.7', transform: 'scaleX(1)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        stampIn: {
          '0%': { opacity: '0', transform: 'scale(1.4)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ritualSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ritualBreath: {
          '0%, 100%': { opacity: '0.28', transform: 'scale(0.96)' },
          '50%': { opacity: '0.62', transform: 'scale(1.04)' },
        },
        verdictRise: {
          '0%': { opacity: '0', transform: 'translate3d(0, 22px, 0) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        screenIn: 'screenIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        pulseLine: 'pulseLine 2.6s ease-in-out infinite',
        scan: 'scan 2.8s linear infinite',
        stampIn: 'stampIn 0.35s ease-out both',
        ritualSpin: 'ritualSpin 8s linear infinite',
        ritualBreath: 'ritualBreath 2.4s ease-in-out infinite',
        verdictRise: 'verdictRise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};
