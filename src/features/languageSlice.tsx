import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ko from '../json/ko.json';
import en from '../json/en.json';
import jp from '../json/jp.json';

//default
// const langs = {
//   ko: ko,
//   en: en,
//   jp: jp,
// };

// export interface langState {
//   lang: 'ko' | 'en' | 'jp';
//   translations: typeof ko;
// }

// export const initialState: langState = {
//   lang: 'ko', // default language
//   translations: ko,
// };

// export const languageSlice = createSlice({
//   name: 'language',
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<'ko' | 'en' | 'jp'>) => {
//       state.lang = action.payload;
//       state.translations = langs[action.payload] || 'ko';
//     },
//   },
// });

// 영어 테스트

const langs = {
  en: en,
  ko: ko,
  jp: jp,
};

export interface langState {
  lang: 'en' | 'ko' | 'jp';
  translations: typeof en;
}

export const initialState: langState = {
  lang: 'en', // default language
  translations: en,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ko' | 'jp'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload] || 'en';
    },
  },
});

//일본어 테스트

// const langs = {
//   jp: jp,
//   ko: ko,
//   en: en,
// };

// export interface langState {
//   lang: 'jp' | 'ko' | 'en';
//   translations: typeof jp;
// }

// export const initialState: langState = {
//   lang: 'jp', // default language
//   translations: jp,
// };

// export const languageSlice = createSlice({
//   name: 'language',
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<'jp' | 'ko' | 'en'>) => {
//       state.lang = action.payload;
//       state.translations = langs[action.payload] || 'jp';
//     },
//   },
// });

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
