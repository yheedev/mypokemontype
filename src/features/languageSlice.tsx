import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import kr from '../json/kr.json';
import us from '../json/us.json';
import jp from '../json/jp.json';
exports.handler = async (event: { Records: { cf: { request: any } }[] }) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const country = headers['cloudfront-viewer-country']
    ? headers['cloudfront-viewer-country'][0].value
    : 'KR';

  let lang = 'kr';

  lang = country === 'US' ? 'us' : country === 'JP' ? 'jp' : 'kr';

  headers['set-cookie'] = [{ key: 'Set-Cookie', value: `lang=${lang}; Path=/` }];
  console.log('View country', country);
  return request;
};

export interface langState {
  lang: 'kr' | 'us' | 'jp';
  translations: typeof kr;
}

const langs = {
  us: us,
  kr: kr,
  jp: jp,
};

export const initialState: langState = {
  lang: 'kr', // default language
  translations: kr,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'kr' | 'us' | 'jp'>) => {
      state.lang = action.payload;
      state.translations = langs[action.payload] || kr;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
