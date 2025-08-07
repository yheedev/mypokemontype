import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      helios: ['Helios', 'sans-serif'],
      noto: ['"Noto Sans KR"', 'sans-serif'],
    },
    screens: {
      sm: { min: '280px', max: '767px' }, // 모바일
      md: { min: '768px', max: '1181px' }, // 태블릿
      lg: { max: '1023px' },
      xl: { min: '1024px' },
      // xxl: '1440px', // PC
    },
    // colors: {
    //   border: 'var(--border)',
    //   card: 'var(--card)',
    //   text: 'var(--text)',
    // },
  },
}

export default config
