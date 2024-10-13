import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';

export type darkModeState = {
  theme: 'dark' | 'light';
};

const initialState: darkModeState = {
  theme: 'light',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload as darkModeState['theme'];
      localStorage.setItem('userTheme', state.theme);
    },
  },
});

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

export function useThemeEffect() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  useEffect(() => {
    // 로컬 스토리지에 저장된 사용자 테마가 없으면 시스템 설정에 따라 테마 설정
    // 그렇지 않으면 사용자의 디바이스가 선호하는 라이트/다크모드에 따라 테마 설정
    const userTheme = localStorage.getItem('userTheme');
    if (!userTheme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(darkModeSlice.actions.setTheme(systemPrefersDark ? 'dark' : 'light'));
    } else {
      dispatch(darkModeSlice.actions.setTheme(userTheme as 'dark' | 'light'));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.dataset.theme = darkMode;
  }, [darkMode]);
}

export const { setTheme } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
