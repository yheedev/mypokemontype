import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { offenseCal } from '@/utils/offenseCal'
import type { SelectedTypes, TypeCalState } from '@/constants/effectiveness'

type State = Omit<
  TypeCalState<keyof ReturnType<typeof offenseCal>>,
  'result'
> & {
  result: ReturnType<typeof offenseCal>
}

export const useOffenseCalStore = create<State>()(
  persist(
    (set) => ({
      result: offenseCal(),
      type1: undefined,
      type2: undefined,
      calculate: ({ type1, type2 }: SelectedTypes) =>
        set({
          result: offenseCal(type1, type2),
          type1,
          type2,
        }),
    }),
    {
      name: 'mypkmn-offenseCal',
      partialize: (s) => ({ type1: s.type1, type2: s.type2 }),
    },
  ),
)

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { TypeValue, TypeName } from './types'

// export type offenseCalState = {
//   result: { [key: string]: string[] }
//   offenseType1: string | undefined
//   offenseType2: string | undefined
// }

// export const offenseCalSlice = createSlice({
//   name: 'offenseCal',
//   initialState: {
//     result: {},
//     offenseType1: undefined as string | undefined,
//     offenseType2: undefined as string | undefined,
//   },
//   reducers: {
//     offenseCal: (
//       state,
//       action: PayloadAction<{
//         offenseType1?: string
//         offenseType2?: string
//       }>,
//     ) => {
//       const { offenseType1, offenseType2 } = action.payload
//       type Effectiveness = {
//         [key in number | string]: string[]
//       }

//       let effectiveness: Effectiveness = {
//         '4': [],
//         '2': [],
//         '1': [],
//         '0.5': [],
//         '0.25': [],
//         '0': [],
//       }

//       // TypeValue 배열 및 타입을 선택하지 않았을 경우에는 모든 타입에 대한 효과를 1배로 반환
//       function allTypes1x(type?: string): readonly number[] {
//         return type && type in TypeValue
//           ? TypeValue[type as keyof typeof TypeValue]
//           : new Array(18).fill(1)
//       }

//       if (!offenseType1 && !offenseType2) {
//         TypeName.forEach((typeName) => {
//           effectiveness['1'].push(typeName)
//         })
//         state.result = effectiveness
//       }

//       // 1개의 타입을 선택: 해당 포켓몬 타입의 TypeValue를 그대로 반환
//       else if (offenseType1 && !offenseType2) {
//         let typeArr1 = allTypes1x(offenseType1)
//         typeArr1.forEach((curr, index) => {
//           const key = curr.toString()
//           if (effectiveness[key]) {
//             effectiveness[key].push(TypeName[index])
//           }
//         })
//         //TypeValue 내 숫자들에 해당하는 effectiveness 배열 내에 해당 타입을 넣어서 반환함
//         state.result = effectiveness
//         state.offenseType1 = offenseType1
//       }
//       // 2개의 타입을 선택: 2개의 TypeValue 객체에서 동일한 인덱스 요소의 숫자끼리 비교해서 더 큰 값으로 하나의 배열을 반환
//       else {
//         const calculateMaxEffectiveness = (
//           type1: string | undefined,
//           type2: string | undefined,
//         ) => {
//           const typeArr1 = allTypes1x(type1)
//           const typeArr2 = allTypes1x(type1 === type2 ? undefined : type2)
//           return typeArr1.map((value, index) =>
//             Math.max(value, typeArr2[index]),
//           )
//         }

//         const doubleTypes = calculateMaxEffectiveness(
//           offenseType1,
//           offenseType2,
//         )

//         //TypeValue 내 숫자들에 해당하는 effectiveness 배열 내에 해당 타입을 넣어서 반환함
//         doubleTypes.forEach((value, index) => {
//           const key = value.toString()
//           if (key in effectiveness) {
//             effectiveness[key].push(TypeName[index])
//           }
//         })

//         state.result = effectiveness
//         state.offenseType1 = offenseType1
//         state.offenseType2 = offenseType2
//       }
//     },
//   },
// })

// export const { offenseCal } = offenseCalSlice.actions
// export default offenseCalSlice.reducer
