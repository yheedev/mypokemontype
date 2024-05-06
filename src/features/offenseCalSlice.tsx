import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TypeValue, TypeName } from './types';

export type OffenseCalState = {
  result: { [key: string]: string[] };
};

// 리듀서에 보낼 리덕스 슬라이스
export const offenseCalSlice = createSlice({
  name: 'offenseCal',
  initialState: { result: {} },
  reducers: {
    offenseCal: (
      state,
      action: PayloadAction<{
        type1?: string;
        type2?: string;
      }>
    ) => {
      const { type1, type2 } = action.payload;

      //// 각 효과의 수치를 키로 갖는 빈 배열 설정
      type Effectiveness = {
        [key in number | string]: string[];
      };

      let effectiveness: Effectiveness = {
        4: [],
        2: [],
        1: [],
        0.5: [],
        0.25: [],
        0: [],
      };

      // TypeValue 배열 및 타입을 선택하지 않았을 경우에는 모든 타입에 대한 효과를 1배로 반환
      function getTypeArray(type?: string) {
        return type ? TypeValue[type] : new Array(19).fill(1);
      }

      // 아무 타입도 선택하지 않았을 경우
      if (!type1 && !type2) {
        state.result = getTypeArray();
      }
      // 한 개의 타입을 선택했을 경우 해당 타입의 TypeValue 배열을 그대로 반영
      else {
        let typeArr1 = TypeValue[type1 as keyof typeof TypeValue];
        let typeArr2 = TypeValue[type2 as keyof typeof TypeValue];

        let doubleTypes = typeArr1.map((value: number, index: number) => {
          //effectiveness[value.toString()].push(TypeName[index]);

          // 두 개의 타입을 입력했을 경우 두 타입의 TypeValue 배열 중 더 큰 값을 골라서 하나의 배열로 반영,
          // 두 타입 중 하나라도 0배의 효과를 가지면 0을 반환
          if (value === 0 || typeArr2[index] === 0) {
            return 0;
          }
          return Math.max(value, typeArr2[index]);
        });

        const filteredEffectiveness: Effectiveness = {};
        for (const [key, value] of Object.entries(effectiveness)) {
          if (value.length > 0) {
            filteredEffectiveness[key] = value;
          }
        }

        doubleTypes.forEach((value: number, index) => {
          effectiveness[value.toString()].push(TypeName[index]);
        });

        state.result = effectiveness;
      }
    },
  },
});

export const { offenseCal } = offenseCalSlice.actions;
export default offenseCalSlice.reducer;

/**
 * NOTE
 * 기존의 함수를 리덕스 슬라이스로 변경하면서 아래의 코드를 리팩토링하고 offenseCalSlice 내부의 리듀서로 이동했다

//   if (type2 === undefined) {
//     typeArr1.forEach((value: number, index: number) => {
//       effectiveness[value].push(TypeName[index]);
//     });
//   }
//
//   else {
//     let doubleTypes = typeArr1.map((value: number, index: number) => {
//       return Math.max(value, typeArr2[index]);
//     });

//     doubleTypes.forEach((value: number, index: number) => {
//       effectiveness[value].push(TypeName[index]);
//     });
//   }

//   return effectiveness;
// }

 */
