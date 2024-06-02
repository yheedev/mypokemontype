import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from 'stores/store';
// import { offenseCal } from './offenseCalSlice';

export type upToTwoState = {
  type1: string | undefined;
  type2: string | undefined;
  selectTypes: string[];
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
    upToTwo: (state, action: PayloadAction<string>) => {
      const activeType = action.payload;

      // 🐟 아무 타입도 선택하지 않은 상태
      if (!state.selectTypes.includes(activeType) && state.selectTypes.length === 0 && state.type1 !== state.type2) {
        // 아무 것도 선택하지 않은 상태로 머물러 있음.. 삭제?
        if (state.type1 === undefined && state.type2 === undefined) {
          state.type1 = undefined;
          state.type2 = undefined;
        }
        // 아무 것도 선택하지 않은 상태에서 타입 1개를 클릭함 : type1에 할당
        if (state.type1 === undefined && state.type2 === undefined) {
          state.type1 = activeType;
          state.selectTypes.push(activeType);
          state.type2 = undefined;
        }

        // 🐟 1개의 타입만 선택한 상태
      } else if (
        (state.type1 === activeType || state.type2 === activeType) &&
        state.selectTypes.includes(activeType) &&
        state.selectTypes.length === 1 &&
        state.type1 !== state.type2
      )
        if (state.type1 === activeType && state.type2 === undefined) {
          // type1을 선택한 상태에서 type1 클릭 해제 : type1 해제
          state.type1 = undefined;
          state.selectTypes = state.selectTypes.filter(type => type !== activeType);
        }
      // type1을 선택한 상태에서 type2를 선택하기: type2 할당
      if (state.type1 === activeType && state.type2 === undefined) {
        state.type2 = activeType;
        state.selectTypes.push(activeType);

        // 🐟 2개 타입을 다 선택한 상태
      } else if (
        state.selectTypes.includes(activeType) &&
        state.selectTypes.length === 2 &&
        state.type1 !== state.type2
      )
        if (state.type1 === undefined && state.type2 === activeType) {
          // type1, type2 모두 클릭한 상태에서 type1 클릭 해제: type2 요소를 type1 요소에 할당
          state.type1 = state.type2 && state.selectTypes[1];
          state.type2 = undefined;
        }
        // type1, type2 모두 클릭한 상태에서 type2 클릭 해제: type2 요소만 삭제
        else if (state.type1 === activeType && state.type2 === undefined) {
          state.selectTypes = state.selectTypes.filter(type => type !== activeType);
        }
        // type1, type2 모두 클릭한 상태에서 추가로 요소 클릭: type1 해제, type2는 type1 할당, 새로운 요소가 type2에 할당
        else if (state.type1 === activeType && state.type2 === activeType) {
          state.type1 = state.selectTypes[1];
          state.type2 = activeType;
        }
    },
  },
});
// export const upToTwoAndOffenseCal =
//   (type: string): AppThunk =>
//   async (dispatch, getState) => {
//     // upToTwo 액션을 먼저 디스패치합니다.
//     dispatch(upToTwo(type));

//     // 현재 상태를 가져옵니다.
//     const state = getState();

//     // selectTypes의 길이에 따라 offenseTypes 객체를 구성합니다.
//     const newSelectTypes = [...state.uptoTwo.selectTypes, type];
//     let offenseTypes = {};

//     if (newSelectTypes.length === 1) {
//       offenseTypes = {
//         offenseType1: newSelectTypes[0],
//         offenseType2: undefined,
//       };
//     } else if (newSelectTypes.length === 2) {
//       offenseTypes = {
//         offenseType1: newSelectTypes[0],
//         offenseType2: newSelectTypes[1],
//       };
//     }

//     // offenseCal 액션을 디스패치합니다.
//     dispatch(offenseCal());
//   };

//   }
//   state.selectTypes = [...state.selectTypes, activeType];
// }

/**
 * TODO
 *
 * [x] A조건문: selectTypes 내 포켓몬 타입의 선택을 해제할 경우
 * [x] type1 해제: type2를 type1에 할당
 * [x] type2 해제: type1은 그대로 type1에 stay
 * [x] type1, type2 순서대로 혹은 type2, type1 순서대로 일괄 해제해서 selectTypes 배열을 비움: selectTypes 빈 배열 유지 및 offenseCal에 아무 인수도 넣지 않고 반환 (offenseCal의 경우 allTypesX1 반환)
 * [ ] payload 악귀퇴치 (type1, type2 해제하고 나면 type1:'grass'가 아닌 payload:'grass'로 나옴)

 * [ ] B조건문: 포켓몬 타입 클릭
 * [ ] type1 할당: 포켓몬 타입 1개만 클릭시 type1에 할당
 * [ ] type2 할당: 포켓몬 타입 1개 더 추가 클릭시 type2 할당
 * [ ] 3번째 포켓몬 타입 클릭시 type1 해제, type2를 type1에 새로운 요소를 type2에 할당 (기존 uptotwo 함수 기능)
 *
 * [ ] A조건문, B조건문 둘 다 offenseCal과 defenseCal에 바로 dispatch할 수 있어야 함.
 * 
 * [ ] `/` 경로와 `/defense/ 경로에 따라 offenseCal과 defenseCal에 dispatch할 수 있어야 함.
 * [ ] uptotwo + offenseCal 혹은 uptotwo+defesecal을 dispatch 하고 싶은거임
 * 
 */

export const { upToTwo } = upToTwoSlice.actions;

export default upToTwoSlice.reducer;
