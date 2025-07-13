import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import ko from '@/locales/ko/ko.json'
import en from '@/locales/en/en.json'
import ja from '@/locales/ja/ja.json'

export type Language = 'ko' | 'en' | 'ja'
export const langs = { ko, en, ja }

interface LanguageStore {
  lang: Language
  translate: typeof ko
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: 'ko',
      translate: langs['ko'], // 초기값은 'ko', 이후 hydration 되며 자동 대체됨
      setLanguage: (lang: Language) => {
        set({
          lang,
          translate: langs[lang],
        })
      },
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({ lang: state.lang }),
      onRehydrateStorage: () => (state) => {
        const lang = state?.lang || 'ko'
        state!.translate = langs[lang]
      },
    },
  ),
)

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import ko from '../json/ko.json'
// import en from '../json/en.json'
// import ja from '../json/ja.json'

// const getInitialLang = (): 'ko' | 'en' | 'ja' => {
//   const localStorageLang = localStorage.getItem('lang')
//   if (localStorageLang) {
//     return localStorageLang as 'ko' | 'en' | 'ja'
//   }

//   const pathLang = window.location.pathname.split('/')[1]
//   if (pathLang === 'en' || pathLang === 'ja' || pathLang === 'ko') {
//     return pathLang as 'ko' | 'en' | 'ja'
//   }

//   return 'ko'
// }

// const langs = {
//   ko: ko,
//   en: en,
//   ja: ja,
// }

// export type langState = {
//   lang: 'ko' | 'en' | 'ja'
//   translations: typeof ko
// }

// const initialLang = getInitialLang()

// export const languageSlice = createSlice({
//   name: 'language',
//   initialState: {
//     lang: initialLang,
//     translations: langs[initialLang],
//   },
//   reducers: {
//     language: (state, action: PayloadAction<'ko' | 'en' | 'ja'>) => {
//       state.lang = action.payload
//       state.translations = langs[action.payload]
//       localStorage.setItem('lang', action.payload)
//     },
//   },
// })

// export const { language } = languageSlice.actions
// export default languageSlice.reducer
