import { useDispatch } from 'react-redux';
//import { useTheme } from './useTheme';
// import { save } from '../utils/save'; // Import the 'save' function from the appropriate module
// import storage from 'redux-persist/lib/storage';
//import { darkModeSlice, DarkModeState } from '../features/darkModeSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from '../features/darkModeSlice';
// import { useEffect } from 'react';

export function useToggleTheme() {
  const dispatch = useDispatch();
  // const theme = useTheme();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  const toggle = () => {
    if (darkMode === 'dark') {
      dispatch(darkModeSlice.actions.setTheme('light'));
    } else {
      dispatch(darkModeSlice.actions.setTheme('dark'));
    }
  };

  return [toggle];
}
