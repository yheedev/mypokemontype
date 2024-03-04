import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Offense from './pages/Offense';
import Defense from './pages/Defense';
import More from './pages/More';

export function App() {
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
