import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { getInitialLang } from '@/utils/langs'

export const initI18n = async () => {
  const lng = getInitialLang()

  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: 'ko',
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false,
      },
    })

  return i18n
}
