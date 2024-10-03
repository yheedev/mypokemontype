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
  const lang = useSelector((state: RootState) => state.language.lang);
  const navigate = useNavigate();

  useThemeEffect();

  useEffect(() => {
    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang !== lang) {
      navigate(`/${lang}`);
    }
  }, [lang, navigate]);

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
