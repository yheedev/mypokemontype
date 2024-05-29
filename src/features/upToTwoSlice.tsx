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

      // 조건문 1: 포켓몬 타입을 선택할 경우
      if (state.selectTypes.includes(activeType)) {
        // 포켓몬 타입 1개 클릭: type1에 할당
        if (state.type1 === activeType && state.type2 === undefined && state.selectTypes.length === 1) {
          state.type1 = activeType && state.selectTypes[0];
          state.type2 = undefined;
          // 포켓몬 타입 2개 클릭: type2에 할당
        } else if (
          state.type1 === activeType &&
          state.type2 === activeType &&
          state.selectTypes.length === 2 &&
          state.type1 !== state.type2
        ) {
          state.type1 = state.selectTypes[0];
          state.type2 = state.selectTypes[1];
          // 포켓몬 타입 클릭 3개부터: 기존 type2는 typ1으로, type2에 새로운 요소 할당
        } else if (
          state.selectTypes.length >= 2 &&
          state.type1 === activeType &&
          state.type2 === activeType &&
          state.type1 !== state.type2
        ) {
          state.type1 = state.selectTypes[1];
          state.type2 = activeType;
        }

        // 조건문2: 포켓몬 타입의 선택 해제할 경우
      } else if (!state.selectTypes.includes(activeType)) {
        // 두 개 다 선택했을 경우에! type1 해제: type2 요소를 type1 요소에 할당 시킴
        if (
          state.type1 === activeType &&
          state.type2 !== undefined &&
          state.selectTypes.length === 2 &&
          state.type1 !== state.type2 // type1: 'ice', type2: 'ice' 가 되지 말라는거임!!
        ) {
          state.type1 = state.selectTypes[1];
          state.type2 = undefined;
          // 두 개 다 선택했을 경우에! type2 해제: type1 요소는 그대로 두고 type2 요소만 해제
        } else if (
          state.type1 === activeType &&
          state.type2 === undefined &&
          state.selectTypes.length === 1 &&
          state.type1 !== state.type2
        ) {
          state.type1 = state.selectTypes[0];
          state.type2 = undefined;
          // 두 개 다 선택했을 경우에! 전부 다 해제
          // 근데 type1 먼저 둘다 해제할지 type2 먼저 둘다 해제할지도 짜야함?
        } else if (
          state.type1 === activeType &&
          state.type2 === activeType &&
          state.selectTypes.length === 2 &&
          state.type1 !== state.type2
        ) {
          state.type1 = undefined;
          state.type2 = undefined;
        }
        // 한 개만 선택했을 경우에! 그 한 개를 해제
        else if (
          state.type1 === activeType &&
          state.type2 === undefined &&
          state.selectTypes.length === 1 &&
          state.type1 !== state.type2
        ) {
          state.type1 = undefined;
          state.type2 = undefined;
        }
      }
      state.selectTypes = [...state.selectTypes, activeType];

      // A조건문: selectTypes 내 포켓몬 타입의 선택을 해제할 경우
      // if (state.selectTypes.includes(activeType)) {
      //   // type1 해제: type2를 type1에 할당
      //   if (activeType === state.type1) {
      //     state.type1 = state.type2;
      //     state.type2 = undefined;
      //   }
      //   // type2 해제: type1은 그대로 type1에 stay
      //   else if (activeType === state.type2) {
      //     state.type2 = undefined;
      //   }
      //   // type1, type2 순서대로 혹은 type2, type1 순서대로 일괄 해제해서 selectTypes 배열을 비움
      //   state.selectTypes = state.selectTypes.filter(type => type !== activeType);
      // }
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

// B조건문: 포켓몬 타입 클릭
// else {
//   // type1 할당: 포켓몬 타입 1개만 클릭시 type1에 할당
//   if (state.type1 === undefined) {
//     state.type1 = activeType;
//   }
//   // type2 할당: 포켓몬 타입 1개 더 추가 클릭시 type2 할당
//   else if (state.type2 === undefined) {
//     state.type2 = activeType;
//   }
//   // 3번째 포켓몬 타입 클릭시 type1 해제, type2를 type1에 새로운 요소를 type2에 할당
//   else if (state.selectTypes.length >= 2) {
//     state.selectTypes = [state.type2, activeType];
//     state.type1 = state.selectTypes[0];
//     state.type2 = state.selectTypes[1];
//     // state.type1 = state.type2;
//     // state.type2 = activeType;
//     //state.selectTypes = [state.type1, state.type2];
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
