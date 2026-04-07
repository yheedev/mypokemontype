import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type TypeNameElement as TypeId } from '@/constants/pokemon'

interface SelectedTypesState {
  selectedTypes: TypeId[]
  /** true일 때만 슬롯 sync 허용 (유저가 직접 pill 클릭 시 설정) */
  isUserChange: boolean
  toggleType: (type: TypeId) => void
  /** 프로그래밍 방식으로 타입 설정 (슬롯 sync 불가) */
  setTypes: (types: TypeId[]) => void
  resetTypes: () => void
}

export const useUpToTwoStore = create<SelectedTypesState>()(
  persist(
    (set) => ({
      selectedTypes: [],
      isUserChange: false,

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

          return { selectedTypes: next, isUserChange: true }
        }),

      setTypes: (types) => set({ selectedTypes: types.slice(0, 2), isUserChange: false }),

      resetTypes: () => set({ selectedTypes: [], isUserChange: false }),
    }),
    {
      name: 'mypkmn-selected-types',
      partialize: (s) => ({ selectedTypes: s.selectedTypes }),
    },
  ),
)

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
