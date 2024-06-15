import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'stores/store';
import { offenseCal } from './offenseCalSlice';
import { TypeName } from './types';
// import { ThunkDispatch } from 'redux-thunk';

export type TypeNameElement = (typeof TypeName)[number];

export type upToTwoState = {
  type1: string | undefined;
  type2: string | undefined;
  selectTypes: string[];
  activeType: string | undefined;
};

export const initialState: upToTwoState = {
  type1: undefined,
  type2: undefined,
  selectTypes: [],
  activeType: undefined,
};

export const upToTwoSlice = createSlice({
  name: 'upToTwo',
  initialState,
  reducers: {
    upToTwo: (state, action: PayloadAction<string>) => {
      const activeType = action.payload;
      state.activeType = activeType;

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

// export const twoToCal =
//   (activeType?: (typeof TypeName)[number]): AppThunk =>
//   async (dispatch, getState) => {
//     dispatch(offenseCal({ offenseType1: activeType, offenseType2: activeType }));
//   };

// export const twoToCal =
//   (type: typeof TypeName): AppThunk =>
//   async (dispatch, getState) => {
//     const { selectTypes } = getState().upToTwo;
//     let newSelectTypes: typeof type = [...selectTypes];

//     if (newSelectTypes.includes(type)) {
//       newSelectTypes = newSelectTypes.filter(selectType => selectType !== type);
//     } else if (newSelectTypes.length < 2) {
//       newSelectTypes.push(type);
//     } else {
//       newSelectTypes = [type];
//     }

//     dispatch(upToTwo(newSelectTypes));

//     // offenseCal action dispatch
//     const offenseType1 = newSelectTypes[0];
//     const offenseType2 = newSelectTypes[1];
//     dispatch(offenseCal({ offenseType1, offenseType2 }));
//   };

// export const twoToCal =
//   (activeType?: (typeof TypeName)[number]): AppThunk =>
//   async (dispatch, getState) => {
//     dispatch(upToTwo(activeType as string));
//     const state = getState();
//     const { selectTypes } = state.upToTwo;

//     if (selectTypes.length > 0) {
//       const offenseType1 = selectTypes[0];
//       const offenseType2 = selectTypes.length > 1 ? selectTypes[1] : undefined;

//       dispatch(offenseCal({ offenseType1, offenseType2 }));
//     }
//   };

export const twoToCal =
  (type: TypeNameElement): AppThunk =>
  async (dispatch, getState) => {
    // const { selectTypes } = getState().upToTwo;

    // if (selectTypes.includes(type)) {
    //   dispatch(upToTwo(type));
    // } else if (selectTypes.length < 2) {
    //   dispatch(upToTwo([...selectTypes, type]));
    // } else {
    //   dispatch(upToTwo(type));
    // }

    // offenseCal action dispatch
    const offenseType1 = getState().upToTwo.selectTypes[0];
    const offenseType2 = getState().upToTwo.selectTypes[1];
    dispatch(offenseCal({ offenseType1, offenseType2 }));
  };

export default upToTwoSlice.reducer;
export const { upToTwo } = upToTwoSlice.actions;

/**
 * TODO
 *
 * [ ] uptotwo + offenseCal 혹은 uptotwo+defesecal을 dispatch 하고 싶은거임
 * [ ] payload 악귀퇴치 (type1, type2 해제하고 나면 type1:'grass'가 아닌 payload:'grass'로 나옴)
 * [ ] A조건문, B조건문 둘 다 offenseCal과 defenseCal에 바로 dispatch할 수 있어야 함.
 * [ ] `/` 경로와 `/defense/ 경로에 따라 offenseCal과 defenseCal에 dispatch할 수 있어야 함.

 * [ ] 나중에 type1, type2 없애고 selectTypes[0], selectTypes[1]으로 갈아엎기 (offenseCal과 셀렉터 컴포넌트도 전부 바꿔야)
 */
