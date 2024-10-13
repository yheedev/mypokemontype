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

  // 로컬에서 테스트할 때 localhost:3000/ko (O) / localhost:3000 (X)
  useEffect(() => {
    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang && pathLang !== lang) {
      navigate(`/${lang}`); // 현재 경로가 언어 경로와 맞지 않을 때만 navigate 호출
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
