'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from '../../public/locales/ko/translation.json'
import en from '../../public/locales/en/translation.json'
import ja from '../../public/locales/ja/translation.json'

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  ja: { translation: ja },
}

export const initI18n = (lang: string) => {
  if (i18n.isInitialized) {
    i18n.changeLanguage(lang)
    return i18n
  }

  i18n.use(initReactI18next).init({
    lng: lang,
    fallbackLng: 'ko',
    resources,
    interpolation: { escapeValue: false },
  })

  return i18n
}

export { i18n }
