import { create } from 'zustand'

interface SelectedTypesState {
  selectedTypes: string[]
  toggleType: (type: string) => void
  resetTypes: () => void
}

export const useUpToTwoStore = create<SelectedTypesState>((set) => ({
  selectedTypes: [],

  toggleType: (type) =>
    set((state) => {
      const index = state.selectedTypes.indexOf(type)
      const next = [...state.selectedTypes]

      if (index > -1) {
        next.splice(index, 1)
      } else {
        if (next.length >= 2) next.shift()
        next.push(type)
      }

      return { selectedTypes: next }
    }),

  resetTypes: () => set({ selectedTypes: [] }),
}))

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// export type upToTwoState = {
//   selectTypes: string[]
// }

// export const initialState: upToTwoState = {
//   selectTypes: [],
// }

// export const upToTwoSlice = createSlice({
//   name: 'upToTwo',
//   initialState,
//   reducers: {
//     add(state, action: PayloadAction<any>) {
//       const type = action.payload
//       if (state.selectTypes.length < 2) {
//         state.selectTypes.push(type)
//       } else {
//         state.selectTypes.shift()
//         state.selectTypes.push(type)
//       }
//     },
//     remove(state, action: PayloadAction<any>) {
//       const type = action.payload
//       state.selectTypes = state.selectTypes.filter((t) => t !== type)
//     },
//   },
// })

// export default upToTwoSlice.reducer
// export const { add, remove } = upToTwoSlice.actions
