import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UpToTwoState = {
  type1: string | undefined;
  type2: string | undefined;
  selectTypes: string[];
};

export const initialState: UpToTwoState = {
  type1: undefined,
  type2: undefined,
  selectTypes: [],
};

export const upToTwoSlice = createSlice({
  name: 'upToTwo',
  initialState,
  reducers: {
    upToTwo: (state, action: PayloadAction<string>) => {
      const activeType = action.payload;
      state.selectTypes = state.selectTypes.includes(activeType)
        ? state.selectTypes.filter(type => type !== activeType)
        : state.selectTypes.length >= 2
        ? [state.selectTypes[1], activeType]
        : [...state.selectTypes, activeType];

      state.type1 = state.selectTypes[0];
      state.type2 = state.selectTypes[1];
    },
  },
});

export const { upToTwo } = upToTwoSlice.actions;

export default upToTwoSlice.reducer;
