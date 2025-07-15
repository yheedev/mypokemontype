import ko from '@/locales/ko/ko.json'
import en from '@/locales/en/en.json'
import ja from '@/locales/ja/ja.json'

export const supportedLangs = ['ko', 'en', 'ja'] as const
export type Language = (typeof supportedLangs)[number]

export const langs = { ko, en, ja }

export const getInitialLang = (): Language => {
  if (typeof window === 'undefined') return 'ko'

  const localStorageLang = localStorage.getItem('lang')
  if (
    localStorageLang === 'ko' ||
    localStorageLang === 'en' ||
    localStorageLang === 'ja'
  ) {
    return localStorageLang
  }

  const pathLang = window.location.pathname.split('/')[1]
  if (pathLang === 'ko' || pathLang === 'en' || pathLang === 'ja') {
    return pathLang
  }

  return 'ko'
}
