import Offense from '@/app/[lang]/page'
import { redirect } from 'next/navigation'
import { PATH } from '@/app/routes'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Main() {
  const router = useRouter()

  useEffect(() => {
    router.replace(PATH().offense)
  })

  redirect(PATH().offense)
}

// return (
//   <main>
//     <Offense />
//   </main>
// )

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
