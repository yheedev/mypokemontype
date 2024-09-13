import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import kr from '../json/kr.json';
import us from '../json/us.json';
import jp from '../json/jp.json';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const initialLang = getCookie('lang') || 'kr';

const langs = {
  us: us,
  kr: kr,
  jp: jp,
};

export type langState = {
  lang: 'kr' | 'us' | 'jp';
  translations: typeof kr;
};

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: initialLang as 'kr' | 'us' | 'jp',
    translations: langs[initialLang as 'kr' | 'us' | 'jp'] || kr,
  },
  reducers: {
    language: (state, action: PayloadAction<'kr' | 'us' | 'jp'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload] || kr;
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const LangChange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const country = getCookie('cloudfront-viewer-country') || 'KR';
    console.log('Country(cloudfront-viewer-country 쿠키의 값):', country);
    const EngCode = ['US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'ZA'];
    const lang = EngCode.includes(country) ? 'us' : country === 'JP' ? 'jp' : 'kr';
    dispatch(language(lang as 'kr' | 'us' | 'jp'));

    document.documentElement.lang = lang;
  }, [dispatch]);

  return null;
};

export const { language } = languageSlice.actions;
export default languageSlice.reducer;
