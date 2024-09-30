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

const EngCode = ['US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'ZA'];

const getInitialLang = (): 'ko' | 'en' | 'ja' => {
  const cookieLang = getCookie('lang');
  if (cookieLang) return cookieLang as 'ko' | 'en' | 'ja';

  const locationLang = (window as any).locationLang || document.documentElement.lang;
  if (locationLang) {
    if (EngCode.includes(locationLang)) {
      return 'en';
    } else if (locationLang === 'JP') {
      return 'ja';
    } else {
      return 'ko';
    }
  }
  return 'ko';

  // 1. location 헤더의 값 (ex: KR, US, JP..)을 브라우저에서 받아옴
  // 2. 각각 ko, en, ja로 매핑하여 리턴함.
};

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
