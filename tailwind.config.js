/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4 설정
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './modules/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // 앱 테마 색상 (필요에 따라 커스터마이징)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // 속지 디자인 테마
        notebook: {
          beige: '#f5f5dc',
          cream: '#fffdd0',
          mint: '#f0fff4',
          pink: '#fdf2f8',
          blue: '#eff6ff',
        },
      },
      fontFamily: {
        // 커스텀 폰트 (추후 추가 가능)
        sans: ['System'],
        serif: ['Serif'],
        mono: ['Monospace'],
      },
      spacing: {
        // 일기장 특화 간격
        'diary-sm': '12px',
        'diary-md': '16px',
        'diary-lg': '24px',
        'diary-xl': '32px',
      },
    },
  },
  plugins: [],
};
