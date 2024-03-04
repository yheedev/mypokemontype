// // import { useAppSelector } from 'hooks/hook';
// import { darkModeSlice } from '../features/darkModeSlice';
// import { useSelector } from 'react-redux';
// import { RootState } from '../stores/store';

// export function useTheme() {
//   const darkModeState = useSelector((state: RootState) => state.darkMode.theme);

//   const theme = (() => {
//     if (darkModeState.systemTheme === 'not-ready') return 'light';
//     if (darkModeState.theme !== 'default') return darkModeState.theme;
//     return darkModeSlice.actions;
//   })();

//   return theme;
// }

// export function useTheme() {
//   const darkMode = useSelector((state: RootState) => state.darkMode.theme);
//   const theme = (() => {
//     if (darkMode.theme === 'light') return 'light';
//     if (darkMode === 'dark') return 'dark';
//     return darkModeSlice.actions;
//   })();
//   return theme;
// }

function Header() {}

export default Header;
