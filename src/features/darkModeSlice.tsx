import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const { setTheme } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
