import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from '../features/darkModeSlice';

export function useToggleTheme() {
  const dispatch = useDispatch();
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
