import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/store';
import { setLanguage } from './features/languageSlice';
import Offense from './pages/Offense';
import Defense from './pages/Defense';
import More from './pages/More';

export function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const langCookie = document.cookie.split('; ').find(row => row.startsWith('lang='));
    const lang = langCookie ? langCookie.split('=')[1] : 'en';

    dispatch(setLanguage(lang as 'kr' | 'us' | 'jp'));
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Offense />} />
        <Route path="/Defense" element={<Defense />} />
        <Route path="/More" element={<More />} />
      </Routes>
    </>
  );
}

export default App;
