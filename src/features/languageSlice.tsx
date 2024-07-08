import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ko from '../json/ko.json';
import en from '../json/en.json';
import jp from '../json/jp.json';

const langs = {
  en: en,
  ko: ko,

  jp: jp,
};

export interface langState {
  lang: 'en' | 'ko' | 'jp';
  translations: typeof ko;
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

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
