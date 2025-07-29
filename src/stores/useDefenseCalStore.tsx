import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TypeCalState } from '@/types/calState'
import { TypeName, TypeValue } from '@/constants/pokemon'
import { getEffectArray } from '@/utils/allTypes1x'
import {
  EMPTY_EFFECTIVENESS_MAP,
  EFFECT_VALUES,
} from '@/constants/effectiveness'

export const useDefenseCalStore = create<TypeCalState>()(
  persist(
    (set) => ({
      result: {},
      type1: undefined,
      type2: undefined,

      calculate: ({ type1, type2 }) => {
        const effectiveness = structuredClone(EMPTY_EFFECTIVENESS_MAP)

        if (!type1 && !type2) {
          const base = getEffectArray()
          base.forEach((value, index) => {
            const key = value.toString()
            if (key in effectiveness) effectiveness[key].push(TypeName[index])
          })
        } else if (type1 && !type2) {
          const base = getEffectArray(type1)
          base.forEach((value, index) => {
            const key = value.toString()
            if (key in effectiveness) effectiveness[key].push(TypeName[index])
          })
        } else if (type1 && type2) {
          const arr1 = getEffectArray(type1)
          const arr2 = getEffectArray(type2)

          const combined = arr1.map((v1, i) => {
            const v2 = arr2[i]
            const product = v1 * v2
            return EFFECT_VALUES.includes(
              product as (typeof EFFECT_VALUES)[number],
            )
              ? product
              : 1
          })

          combined.forEach((value, index) => {
            const key = value.toString()
            if (key in effectiveness) effectiveness[key].push(TypeName[index])
          })
        }

        set(() => ({
          result: effectiveness,
          type1,
          type2,
        }))
      },
    }),
    {
      name: 'mypkmn-defenseCal',
      partialize: (state) => ({
        result: state.result,
        type1: state.type1,
        type2: state.type2,
      }),
    },
  ),
)

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { TypeValue, TypeName } from './types'

// export type defenseCalState = {
//   result?: { [key: string]: string[] }
//   defenseType1?: string | undefined
//   defenseType2?: string | undefined
// }

// export const defenseCalSlice = createSlice({
//   name: 'defenseCal',
//   initialState: {
//     result: {},
//     defenseType1: undefined as string | undefined,
//     defenseType2: undefined as string | undefined,
//   },
//   reducers: {
//     defenseCal: (
//       state,
//       action: PayloadAction<{
//         defenseType1?: string
//         defenseType2?: string
//         type?: string
//       }>,
//     ) => {
//       const { defenseType1, defenseType2 } = action.payload

//       // 각 효과의 수치를 키로 갖는 빈 배열 설정
//       type Effectiveness = {
//         [key in number | string]: string[]
//       }

//       const EffectValues = [0, 0.25, 0.5, 1, 2, 4]
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

//       if (!defenseType1 && !defenseType2) {
//         TypeName.forEach((typeName) => {
//           effectiveness['1'].push(typeName)
//           allTypes1x()
//         })

//         state.result = effectiveness
//         // 한 개의 타입을 선택했을 경우
//       } else if (defenseType1 && !defenseType2) {
//         // 18개의 TypeValue 배열에서 defenseType1의 인덱스에 해당하는 모든 요소를 하나의 배열로 반환
//         const typeArr1 = TypeName.indexOf(defenseType1 as any)
//         const defenseArray = Object.values(TypeValue).map(
//           (typeArray) => typeArray[typeArr1],
//         )

//         // defenseArray를 effectiveness 객체에 매핑
//         defenseArray.forEach((value, index) => {
//           const key = value.toString()
//           if (key in effectiveness) {
//             effectiveness[key].push(TypeName[index])
//           }
//         })

//         state.result = effectiveness
//         state.defenseType1 = defenseType1
//         // 두 개의 타입을 선택했을 경우
//       } else if (defenseType1 && defenseType2) {
//         // 18개의 TypeValue 배열에서 defenseType1, defenseType2의 인덱스에 해당하는 모든 요소를 각각 하나씩 배열로 반환
//         const typeArr1 = TypeName.indexOf(defenseType1 as any)
//         const defenseArray1 = Object.values(TypeValue).map(
//           (typeArray) => typeArray[typeArr1],
//         )
//         const typeArr2 = TypeName.indexOf(defenseType2 as any)
//         const defenseArray2 = Object.values(TypeValue).map(
//           (typeArray) => typeArray[typeArr2],
//         )

//         // defenseArray1, defenseArray2를 비교해서 새로운 1개의 배열 반환
//         const combinedDefenseArray = defenseArray1.map((value1, index) => {
//           const value2 = defenseArray2[index]
//           const value = value1 * value2
//           if (EffectValues.indexOf(value) > -1) {
//             return value
//           } else {
//             return 1
//           }
//         })

//         combinedDefenseArray.forEach((effect, index) => {
//           const typeName = TypeName[index]
//           const effectKey = effect.toString()
//           if (!effectiveness[effectKey]) {
//             effectiveness[effectKey] = []
//           }
//           effectiveness[effectKey].push(typeName)
//         })

//         state.result = effectiveness
//         state.defenseType1 = defenseType1
//         state.defenseType2 = defenseType2
//       }
//     },
//   },
// })
// export const { defenseCal } = defenseCalSlice.actions
// export default defenseCalSlice.reducer
