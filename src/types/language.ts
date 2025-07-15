import type ko from '@/locales/ko/ko.json'
import type { Language } from '@/constants/langs'

export interface LanguageStore {
  lang: Language
  translate: typeof ko
  setLanguage: (lang: Language) => void
}
