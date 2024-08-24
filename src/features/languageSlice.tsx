import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import kr from '../json/kr.json';
import us from '../json/us.json';
import jp from '../json/jp.json';

export const handler = async (event: { Records: { cf: { request: any } }[] }) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const country = headers['cloudfront-viewer-country']
    ? headers['cloudfront-viewer-country'][0].value
    : 'KR';

  console.log('Detected country:', country);

  let lang = 'kr'; // 디폴트 값이 한국어

  const EngCode = ['US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'ZA']; // 미국, 캐나다, 영국, 호주, 뉴질랜드, 아일랜드, 남아공

  lang = EngCode.includes(country) ? 'us' : country === 'JP' ? 'jp' : 'kr';
  // 맨 처음에 접속하는 유저의 위치가 영어권이면 영어로, 일본이면 일본어로, 그 외에는 한국어로 자동으로 언어 설정

  headers['set-cookie'] = [{ key: 'Set-Cookie', value: `lang=${lang}; Path=/` }];

  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
  }

  return request;
};

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
