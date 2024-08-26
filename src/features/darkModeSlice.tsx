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
    },
  },
});

export function useToggleTheme() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  const toggle = () => {
    if (darkMode === 'dark') {
      dispatch(darkModeSlice.actions.setTheme('light')); // 현재 테마가 다크모드면 라이트모드로 변경
    } else {
      dispatch(darkModeSlice.actions.setTheme('dark')); // 현재 테마가 라이트모드면 다크모드로 변경
    }
  };

  return [toggle];
}

// 사용자의 디바이스 시스템 설정에 따라 다크모드 또는 라이트모드를 설정
export function useThemeEffect() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(darkModeSlice.actions.setTheme(systemPrefersDark ? 'dark' : 'light'));
  }, [dispatch]);

  useEffect(() => {
    document.body.dataset.theme = darkMode;
  }, [darkMode]);
}

export const { setTheme } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
