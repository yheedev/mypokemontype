export const THEMES = ['light', 'dark'] as const

export type ThemeType = (typeof THEMES)[number]
