import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DarkModeState = {
  theme: 'dark' | 'light';
};

const initialState: DarkModeState = {
  theme: 'light',
};
export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload as DarkModeState['theme'];
    },
  },
});

export const { setTheme } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
