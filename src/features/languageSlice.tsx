import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ko from '../json/ko.json';
import en from '../json/en.json';
import ja from '../json/ja.json';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const getInitialLang = () => {
  const cookieLang = getCookie('lang');
  if (cookieLang) return cookieLang;

  const acceptLang = navigator.language || navigator.languages[0];
  if (acceptLang.startsWith('ko')) return 'ko';
  if (acceptLang.startsWith('en')) return 'en';
  if (acceptLang.startsWith('ja')) return 'ja';

  return 'ko';
};

// const initialLang = getCookie('lang') || 'ko';
const initialLang = getInitialLang();

const langs = {
  ko: ko,
  en: en,
  ja: ja,
};

export type langState = {
  lang: 'ko' | 'en' | 'ja';
  translations: typeof ko;
};

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: initialLang as 'ko' | 'en' | 'ja',
    translations: langs[initialLang as 'ko' | 'en' | 'ja'] || ko,
  },
  reducers: {
    language: (state, action: PayloadAction<'ko' | 'en' | 'ja'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload] || ko;
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { language } = languageSlice.actions;
export default languageSlice.reducer;
