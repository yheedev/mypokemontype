import Offense from '@/components/Layout/Offense'

export default function Main() {
  return (
    <main>
      <Offense />
    </main>
  )
}

// import { useNavigate } from 'react-router-dom';
// import { GlobalStyle } from '../../legacy/src/styles/GlobalStyle';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../legacy/src/stores/store';
// import { useThemeEffect } from 'features/darkModeSlice';
// import RootRoute from './pages/RootRoute';

// export function App() {
//   const navigate = useNavigate();
//   const lang = useSelector((state: RootState) => state.language.lang);

//   useThemeEffect();

//   useEffect(() => {
//     const pathLang = window.location.pathname.split('/')[1];
//     if (window.location.pathname === '/' || pathLang !== lang) {
//       navigate(`/${lang}`);
//     }
//   }, [lang, navigate]);

//   return (
//     <>
//       <GlobalStyle />
//       <RootRoute />
//     </>
//   );
// }

// export default App;
