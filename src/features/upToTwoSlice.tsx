import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { Dispatch } from '@reduxjs/toolkit';

export type upToTwoState = {
  type1: string | undefined;
  type2: string | undefined;
  selectTypes: string[]; // 이 배열을 offenseCalSlice나 defenseCalSlice에 보내줄거임
};

export const initialState: upToTwoState = {
  type1: undefined,
  type2: undefined,
  selectTypes: [],
};

export const upToTwoSlice = createSlice({
  name: 'upToTwo',
  initialState,
  reducers: {
    // upToTwo: (state, action: PayloadAction<string>) => {
    //   const activeType = action.payload;
    //   state.selectTypes = state.selectTypes.includes(activeType)
    //     ? state.selectTypes.filter(type => type !== activeType)
    //     : state.selectTypes.length >= 2
    //     ? [state.selectTypes[1], activeType]
    //     : [...state.selectTypes, activeType];

    //   state.type1 = state.selectTypes[0];
    //   state.type2 = state.selectTypes[1];a
    // },

    upToTwo: (state, action: PayloadAction<string>) => {
      const activeType = action.payload;
      // A조건문: selectTypes 내 포켓몬 타입의 선택을 해제할 경우
      if (state.selectTypes.includes(activeType)) {
        // type1 해제: type2를 type1에 할당
        if (activeType === state.type1) {
          state.type1 = state.type2;
          state.type2 = undefined;
        }
        // type2 해제: type1은 그대로 type1에 stay
        else if (activeType === state.type2) {
          state.type2 = undefined;
        }
        // type1, type2 순서대로 혹은 type2, type1 순서대로 일괄 해제해서 selectTypes 배열을 비움
        state.selectTypes = state.selectTypes.filter(type => type !== activeType);
      }
      // B조건문: 포켓몬 타입 클릭
      else {
        // type1 할당: 포켓몬 타입 1개만 클릭시 type1에 할당
        if (state.type1 === undefined) {
          state.type1 = activeType;
        }
        // type2 할당: 포켓몬 타입 1개 더 추가 클릭시 type2 할당
        else if (state.type2 === undefined) {
          state.type2 = activeType;
        }
        // 3번째 포켓몬 타입 클릭시 type1 해제, type2를 type1에 새로운 요소를 type2에 할당
        else if (state.selectTypes.length >= 2) {
          state.type1 = state.type2;
          state.type2 = activeType;
          state.selectTypes = [state.type1, state.type2];
        }
        state.selectTypes = [...state.selectTypes, activeType];
      }
    },
  },
});

/**
 * TODO
 *
 * [ ] A조건문: selectTypes 내 포켓몬 타입의 선택을 해제할 경우
 * [ ] type1 해제: type2를 type1에 할당
 * [ ] type2 해제: type1은 그대로 type1에 stay
 * [ ] type1, type2 순서대로 혹은 type2, type1 순서대로 일괄 해제해서 selectTypes 배열을 비움: selectTypes 빈 배열 유지 및 offenseCal에 아무 인수도 넣지 않고 반환 (offenseCal의 경우 allTypesX1 반환)
 * [ ] payload 악귀퇴치 (type1, type2 해제하고 나면 type1:'grass'가 아닌 payload:'grass'로 나옴)

 * [ ] B조건문: 포켓몬 타입 클릭
 * [ ] type1 할당: 포켓몬 타입 1개만 클릭시 type1에 할당
 * [ ] type2 할당: 포켓몬 타입 1개 더 추가 클릭시 type2 할당
 * [ ] 3번째 포켓몬 타입 클릭시 type1 해제, type2를 type1에 새로운 요소를 type2에 할당 (기존 uptotwo 함수 기능)
 *
 * [ ] A조건문, B조건문 둘 다 offenseCal과 defenseCal에 바로 dispatch할 수 있어야 함.
 */

export const { upToTwo } = upToTwoSlice.actions;

export default upToTwoSlice.reducer;
