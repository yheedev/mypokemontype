import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeValue, TypeName } from './types';

export type OffenseCalState = {
  result: { [key: string]: string[] };
  offenseType1: string | undefined;
  offenseType2: string | undefined;
};

export const offenseCalSlice = createSlice({
  name: 'offenseCal',
  initialState: {
    result: {},
    offenseType1: undefined as string | undefined,
    offenseType2: undefined as string | undefined,
  },
  reducers: {
    offenseCal: (
      state,
      action: PayloadAction<{
        offenseType1?: string;
        offenseType2?: string;
      }>
    ) => {
      const { offenseType1, offenseType2 } = action.payload;

      // 각 효과의 수치를 키로 갖는 빈 배열 설정
      type Effectiveness = {
        [key in number | string]: string[];
      };

      let effectiveness: Effectiveness = {
        '4': [],
        '2': [],
        '1': [],
        '0.5': [],
        '0.25': [],
        '0': [],
      };

      // TypeValue 배열 및 타입을 선택하지 않았을 경우에는 모든 타입에 대한 효과를 1배로 반환
      function allTypes1x(type?: string): readonly number[] {
        return type && type in TypeValue
          ? TypeValue[type as keyof typeof TypeValue]
          : new Array(18).fill(1);
      }

      // 아무 타입도 선택하지 않았을 경우
      if (!offenseType1 && !offenseType2) {
        const allTypesEffectiveness = allTypes1x().reduce(
          (acc: Effectiveness, curr, index) => {
            const key = curr.toString();
            if (acc[key]) {
              acc[key].push(TypeName[index]);
            }
            return acc;
          },
          effectiveness
        );
        state.result = allTypesEffectiveness;

        // 한 가지 타입을 선택했을 경우
      } else if (offenseType1 && !offenseType2) {
        let typeArr1 = allTypes1x(offenseType1);

        let singleType = typeArr1.reduce((acc: Effectiveness, curr, index) => {
          const key = curr.toString();
          if (acc[key]) {
            acc[key].push(TypeName[index]);
          }
          return acc;
        }, effectiveness);
        state.result = singleType;
        state.offenseType1 = offenseType1;
      }
      // 두 개의 타입을 선택했을 경우
      else {
        let typeArr1 = allTypes1x(offenseType1);
        let typeArr2 = allTypes1x(
          offenseType1 === offenseType2 ? undefined : offenseType2
        );

        let doubleTypes = typeArr1.map((value: number, index: number) => {
          // 두 개의 타입을 입력했을 경우 두 타입의 TypeValue 배열 중 더 큰 값을 골라서 하나의 배열로 반영,
          // 두 개의 숫자 배열 내 요소 중 0과 1을 비교할 때에는 1을 반환
          if (value === 0 || typeArr2[index] === 0) {
            return 1;
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
          if (key in effectiveness) {
            effectiveness[key].push(TypeName[index]);
          }
        });

        state.result = effectiveness;
        state.offenseType1 = offenseType1;
        state.offenseType2 = offenseType2;
      }
    },
  },
});

export const { offenseCal } = offenseCalSlice.actions;
export default offenseCalSlice.reducer;
