import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type upToTwoState = {
  selectTypes: string[]
}

export const initialState: upToTwoState = {
  selectTypes: [],
}

export const upToTwoSlice = createSlice({
  name: 'upToTwo',
  initialState,
  reducers: {
    add(state, action: PayloadAction<any>) {
      const type = action.payload
      if (state.selectTypes.length < 2) {
        state.selectTypes.push(type)
      } else {
        state.selectTypes.shift()
        state.selectTypes.push(type)
      }
    },
    remove(state, action: PayloadAction<any>) {
      const type = action.payload
      state.selectTypes = state.selectTypes.filter((t) => t !== type)
    },
  },
})

export default upToTwoSlice.reducer
export const { add, remove } = upToTwoSlice.actions
