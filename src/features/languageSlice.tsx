import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import kr from '../json/kr.json';
import us from '../json/us.json';
import jp from '../json/jp.json';

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

export const { language } = languageSlice.actions;
export default languageSlice.reducer;

// const testEvent = {
//   Records: [
//     {
//       cf: {
//         request: {
//           headers: {
//             'cloudfront-viewer-country': [
//               {
//                 key: 'CloudFront-Viewer-Country',
//                 value: 'JP',
//               },
//             ],
//           },
//         },
//       },
//     },
//   ],
// };

// handler(testEvent).then(response => {
//   console.log('Response:', response);
// });
// 테스트: CloudFront-Viewer-Country 헤더가 올바르게 전달
