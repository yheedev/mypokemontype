import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeValue, TypeName } from './types';

export type defenseCalState = {
  result: { [key: string]: string[] };
  defenseType1: string | undefined;
  defenseType2: string | undefined;
};

export const defenseCalSlice = createSlice({
  name: 'defenseCal',
  initialState: {
    result: {},
    defenseType1: undefined as string | undefined,
    defenseType2: undefined as string | undefined,
  },
  reducers: {
    defenseCal: (
      state,
      action: PayloadAction<{
        defenseType1?: string;
        defenseType2?: string;
      }>
    ) => {
      const { defenseType1, defenseType2 } = action.payload;

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
      if (!defenseType1 && !defenseType2) {
        TypeName.forEach((typeName, index) => {
          effectiveness['1'].push(typeName);
        });
        state.result = effectiveness;
      } else if (defenseType1 && !defenseType2) {
        const defenseArr = TypeValue[defenseType1 as keyof typeof TypeValue];

        // 각 효과의 수치를 키로 갖는 빈 객체 설정
        let effectiveness: { [key: string]: string[] } = {};

        // defenseArr 배열을 순회하며 각 타입으로부터 받는 피해 배율에 따라 타입 이름을 effectiveness 객체에 추가
        defenseArr.forEach((effectValue, index) => {
          const effectKey = effectValue.toString(); // 피해 배율을 문자열 키로 변환
          if (!effectiveness[effectKey]) {
            effectiveness[effectKey] = []; // 해당 키에 대한 배열이 없으면 초기화
          }
          effectiveness[effectKey].push(TypeName[index]); // 해당 피해 배율에 타입 이름 추가
        });

        // 최종적으로 계산된 effectiveness 객체를 state에 저장 또는 반환
        state.result = effectiveness;
      }
    },
  },
});
export const { defenseCal } = defenseCalSlice.actions;
export default defenseCalSlice.reducer;
