import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      helios: ['Helios', 'sans-serif'],
      noto: ['var(--font-noto)', 'sans-serif'],
    },
    screens: {
      sm: { min: '280px', max: '767px' },
      md: { min: '768px', max: '1181px' },
      lg: { max: '1023px' },
      xl: { min: '1024px' },
    },
  },
}

export default config
