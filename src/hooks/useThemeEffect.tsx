import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from '../features/darkModeSlice';

export function useThemeEffect() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);
  //state.darkMode

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(darkModeSlice.actions.setTheme(systemPrefersDark ? 'dark' : 'light'));
  }, [dispatch]);

  useEffect(() => {
    document.body.dataset.theme = darkMode;
  }, [darkMode]);

  // useEffect(() => {
  //   if (theme !== 'light') {
  //     document.body.dataset.theme = theme;
  //   }
  // }, [theme]);
}
