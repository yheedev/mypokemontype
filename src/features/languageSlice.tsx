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

  let lang = 'kr';

  lang = country === 'US' ? 'us' : country === 'JP' ? 'jp' : 'kr';

  headers['set-cookie'] = [{ key: 'Set-Cookie', value: `lang=${lang}; Path=/` }];

  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
  }

  return request;
};

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
    lang: 'kr',
    translations: kr,
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
