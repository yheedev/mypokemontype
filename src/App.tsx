import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store';

import Offense from './pages/Offense';
import Defense from './pages/Defense';
import More from './pages/More';

export function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode);
  }, [darkMode]);

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
