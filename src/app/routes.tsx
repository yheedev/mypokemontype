import { useLanguageStore } from '@/stores/useLanguageStore'

export const PATH = () => {
  const lang = useLanguageStore.getState().lang
  return {
    offense: `/${lang}`,
    defense: `/${lang}/defense`,
    more: `/${lang}/more`,
  }
}

// // import { Routes, Route } from 'react-router-dom';
// import Offense from '../../legacy/src/pages/Offense';
// import Defense from '../../legacy/src/pages/Defense';
// import More from '../../legacy/src/pages/More';

// function RootRoute() {
//   return (
//     <Routes>
//       {/* <Route path="/" element={<Offense />} /> */}
//       <Route path="/:lang" element={<Offense />} />
//       <Route path="/:lang/defense" element={<Defense />} />
//       <Route path="/:lang/more" element={<More />} />
//     </Routes>
//   );
// }

// export default RootRoute;
