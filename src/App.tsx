import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
// import { useThemeEffect } from 'hooks/useThemeEffect';
import Offense from './pages/Offense';
import Defense from './pages/Defense';
import More from './pages/More';
// import { useEffect } from 'react';

export function App() {
  // useThemeEffect();

  // useEffect(() => {
  //   document.body.setAttribute('data-theme', theme);
  // }, [theme]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Offense />} />
        <Route path="/pages/Defense" element={<Defense />} />
        <Route path="/pages/More" element={<More />} />
      </Routes>
    </>
  );
}

App();

export default App;
