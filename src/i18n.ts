import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ko from '@/locales/ko/ko.json'
import en from '@/locales/en/en.json'
import ja from '@/locales/ja/ja.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ko',
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: 'ko',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
