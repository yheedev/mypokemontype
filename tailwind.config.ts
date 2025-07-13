import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      helios: ['Helios', 'sans-serif'],
      noto: ['"Noto Sans KR"', 'sans-serif'],
    },
    screens: {
      sm: { min: '280px', max: '767px' }, // 모바일
      md: { min: '768px', max: '1181px' }, // 태블릿
      lg: { max: '1023px' },
      // xxl: '1440px', // PC
    },
  },
}

export default config
