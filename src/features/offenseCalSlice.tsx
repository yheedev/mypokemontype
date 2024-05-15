import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TypeValue, TypeName } from './types';

export type OffenseCalState = {
  result: { [key: string]: string[] };
  type1: string | undefined;
  type2: string | undefined;
};

export const offenseCalSlice = createSlice({
  name: 'offenseCal',
  initialState: { result: {}, type1: undefined as string | undefined, type2: undefined as string | undefined },
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
      function allTypesX1(type?: string): readonly number[] {
        // return type ? TypeValue[type] : new Array(19).fill(1);
        return type && type in TypeValue ? TypeValue[type as keyof typeof TypeValue] : new Array(19).fill(1);
      }

      // 아무 타입도 선택하지 않았을 경우
      if (!type1 && !type2) {
        const allTypesEffectiveness = allTypesX1().reduce((acc: Effectiveness, curr, index) => {
          const key = curr.toString();
          if (acc[key]) {
            acc[key].push(TypeName[index]);
          }
          return acc;
        }, effectiveness);
        state.result = allTypesEffectiveness;
      }
      // 한 개의 타입을 선택했을 경우 해당 타입의 TypeValue 배열을 그대로 반영
      else {
        // let typeArr1 = type1 && type1 in TypeValue ? TypeValue[type1 as keyof typeof TypeValue] : new Array(19).fill(1);
        // let typeArr2 = type2 && type2 in TypeValue ? TypeValue[type2 as keyof typeof TypeValue] : new Array(19).fill(1);
        let typeArr1 = allTypesX1(type1);
        let typeArr2 = allTypesX1(type2);

        let doubleTypes = typeArr1.map((value: number, index: number) => {
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
          const key = value.toString();
          if (effectiveness[key]) {
            effectiveness[key].push(TypeName[index]);
          }
        });

        state.result = effectiveness;
        state.type1 = type1;
        state.type2 = type2;
      }
    },
  },
});

export const { offenseCal } = offenseCalSlice.actions;
export default offenseCalSlice.reducer;
