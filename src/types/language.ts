export const supportedLangs = ['ko', 'en', 'ja'] as const
export type Language = (typeof supportedLangs)[number]

export interface LanguageStore {
  lang: Language
  setLanguage: (lang: Language) => void
}
