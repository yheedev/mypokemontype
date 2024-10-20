import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ko from '../json/ko.json';
import en from '../json/en.json';
import ja from '../json/ja.json';

const langs = {
  ko: ko,
  en: en,
  ja: ja,
};

export type langState = {
  lang: 'ko' | 'en' | 'ja';
  translations: typeof ko;
};

const initialLang = 'ko';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: initialLang,
    translations: langs[initialLang],
  },
  reducers: {
    language: (state, action: PayloadAction<'ko' | 'en' | 'ja'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload];
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { language } = languageSlice.actions;
export default languageSlice.reducer;

// 기존의 대문자 국가 코드들을 소문자로 변경하는 작업은 cloudfront function에서 처리 완료 후 진행
// const EngCode = ['us', 'ca', 'gb', 'au', 'nz', 'ie', 'za'];

// const getInitialLang = (): 'ko' | 'en' | 'ja' => {
//   const localStorageLang = localStorage.getItem('lang');
//   if (localStorageLang) {
//     console.log(`LocalStorage Language: ${localStorageLang}`);
//     return localStorageLang as 'ko' | 'en' | 'ja';
//   }

//   // URL 경로에서 언어 코드 추출
//   // const pathLang = window.location.pathname.split('/')[1];
//   // if (pathLang === 'en' || pathLang === 'ja' || pathLang === 'ko') {
//   //   console.log(`Path Language: ${pathLang}`);
//   //   return pathLang as 'ko' | 'en' | 'ja';
//   // }

//   const viewerCountry = (window as any).viewerCountry;
//   if (viewerCountry) {
//     const countryCode = viewerCountry.toLowerCase();
//     console.log(`Viewer Country: ${countryCode}`);
//     if (EngCode.includes(countryCode)) {
//       return 'en';
//     } else if (countryCode === 'jp') {
//       return 'ja';
//     } else {
//       return 'ko';
//     }
//   }
//   return 'ko';
// };
