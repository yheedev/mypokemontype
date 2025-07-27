import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getInitialLang, saveLang } from '@/utils/langs'
import { LanguageStore } from '@/types/language'

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => {
      const lang = getInitialLang()
      return {
        lang,
        setLanguage: (lang) => {
          saveLang(lang)
          set({ lang })
        },
      }
    },
    {
      name: 'language-storage',
      partialize: (state) => ({ lang: state.lang }),
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
