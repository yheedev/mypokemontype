import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ko from '../json/ko.json';
import en from '../json/en.json';
import jp from '../json/jp.json';

const langs = {
  ko: ko,
  en: en,
  jp: jp,
};

export interface langState {
  lang: 'ko' | 'en' | 'jp';
  translations: typeof ko;
}

export const initialState: langState = {
  lang: 'ko', // default language
  translations: ko,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'ko' | 'en' | 'jp'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload] || 'ko';
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
