import { useDispatch } from 'react-redux';
//import { useTheme } from './useTheme';
import storage from 'redux-persist/lib/storage';
//import { darkModeSlice, DarkModeState } from '../features/darkModeSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from '../features/darkModeSlice';
// import { useEffect } from 'react';

export function useToggleTheme() {
  const dispatch = useDispatch();
  // const theme = useTheme();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  const save = (value: 'light' | 'dark') => {
    storage.setItem('theme', value); // For CSR
    document.cookie = `theme=${value}; path=/;`; // For SSR
  };

  const toggle = () => {
    // const toggle: () => void = () => {
    if (darkMode.theme === 'dark') {
      dispatch(darkModeSlice.actions.setTheme('light'));
      save('light');
    } else {
      dispatch(darkModeSlice.actions.setTheme('dark'));
      save('dark');
    }
  };

  return [save, toggle];
}
