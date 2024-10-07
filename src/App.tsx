import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/store';
import { language } from './features/languageSlice';
import { useThemeEffect } from 'features/darkModeSlice';
import RootRoute from './pages/RootRoute';

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.language.lang);

  useThemeEffect();

  useEffect(() => {
    // viewerCountry 값을 HTTP 응답 헤더에서 읽어 window 객체에 설정
    // const viewerCountry = document.cookie.split('; ').find(row => row.startsWith('x-viewer-country='));
    // if (viewerCountry) {
    //   window.viewerCountry = viewerCountry.split('=')[1];
    // }

    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang !== lang) {
      navigate(`/${lang}`);
    }
  }, [lang, navigate]);

  // useEffect(() => {
  //   const pathLang = window.location.pathname.split('/')[1];
  //   if (pathLang !== lang) {
  //     navigate(`/${lang}`);
  //   }
  // }, [lang, navigate]);

  useEffect(() => {
    dispatch(language(lang as 'ko' | 'en' | 'ja'));
  }, [dispatch, lang]);

  return (
    <>
      <GlobalStyle />
      <RootRoute />
    </>
  );
}

export default App;
