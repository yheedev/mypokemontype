import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
// import { useThemeEffect } from 'hooks/useThemeEffect';
import Offense from './pages/Offense';
import Defense from './pages/Defense';
import More from './pages/More';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store';
// import { ThemeProvider } from 'styled-components';
//import { lightTheme, darkTheme } from './styles/theme';

export function App() {
  // useThemeEffect();

  // useEffect(() => {
  //   document.body.setAttribute('data-theme', theme);
  // }, [theme]);

  const darkMode = useSelector((state: RootState) => state.darkMode.theme);
  // const theme = darkMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode);
  }, [darkMode]);

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Offense />} />
        <Route path="/pages/Defense" element={<Defense />} />
        <Route path="/pages/More" element={<More />} />
      </Routes>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
