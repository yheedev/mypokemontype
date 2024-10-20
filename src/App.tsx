import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { useEffect } from 'react';
//import { useDispatch } from 'react-redux';
// import { RootState } from './stores/store';
// import { language } from './features/languageSlice';
import { useThemeEffect } from 'features/darkModeSlice';
import RootRoute from './pages/RootRoute';

export function App() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const lang = useSelector((state: RootState) => state.language.lang);

  useThemeEffect();

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/ko'); // 기본 언어를 한국어로 설정
    }
  }, [navigate]);
  //   const pathLang = window.location.pathname.split('/')[1];
  //   if (pathLang !== lang) {
  //     navigate(`/${lang}`); // 기본적으로 localhost:3000가 아닌 localhost:3000/{lang}로 시작함
  //   }
  // }, [lang, navigate]);

  // useEffect(() => {
  //   dispatch(language(lang as 'ko' | 'en' | 'ja'));
  // }, [dispatch, lang]);

  return (
    <>
      <GlobalStyle />
      <RootRoute />
    </>
  );
}

export default App;
