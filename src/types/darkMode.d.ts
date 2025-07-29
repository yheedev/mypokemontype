export type Theme = 'light' | 'dark'

export interface DarkModeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initTheme: () => void
}
