import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'stores/store';
import { offenseCal } from './offenseCalSlice';
import { TypeName } from './types';

export type TypeNameElement = (typeof TypeName)[number];

export type upToTwoState = {
  selectTypes: string[]; // 선택한 타입을 배열에 저장해서 twoToCal에 사용
  activeType: string | undefined; // 현재 클릭한 타입을 저장
};

export const initialState: upToTwoState = {
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
      if (
        !state.selectTypes.includes(activeType) &&
        state.selectTypes.length === 0 &&
        state.selectTypes[0] !== state.selectTypes[1]
      ) {
        // 아무 것도 선택하지 않은 상태로 머물러 있음.. 삭제?
        if (state.selectTypes[0] === undefined && state.selectTypes[1] === undefined) {
          // state.type1 = undefined;
          // state.type2 = undefined;
        }
        // 아무 것도 선택하지 않은 상태에서 타입 1개를 클릭함 : type1에 할당
        if (state.selectTypes[0] === undefined && state.selectTypes[1] === undefined) {
          state.selectTypes[0] = activeType;
          state.selectTypes.push(activeType);
          // state.selectTypes[1] = undefined;
        }

        // 🐟 1개의 타입만 선택한 상태
      } else if (
        (state.selectTypes[0] === activeType || state.selectTypes[1] === activeType) &&
        state.selectTypes.includes(activeType) &&
        state.selectTypes.length === 1 &&
        state.selectTypes[0] !== state.selectTypes[1]
      )
        if (state.selectTypes[0] === activeType && state.selectTypes[1] === undefined) {
          // type1을 선택한 상태에서 type1 클릭 해제 : type1 해제
          // state.selectTypes[1] = undefined;
          state.selectTypes = state.selectTypes.filter(type => type !== activeType);
        }
      // type1을 선택한 상태에서 type2를 선택하기: type2 할당
      if (state.selectTypes[0] === activeType && state.selectTypes[1] === undefined) {
        state.selectTypes[1] = activeType;
        state.selectTypes.push(activeType);

        // 🐟 2개 타입을 다 선택한 상태
      } else if (
        state.selectTypes.includes(activeType) &&
        state.selectTypes.length === 2 &&
        state.selectTypes[0] !== state.selectTypes[1]
      )
        if (state.selectTypes[0] === undefined && state.selectTypes[1] === activeType) {
          // type1, type2 모두 클릭한 상태에서 type1 클릭 해제: type2 요소를 type1 요소에 할당
          state.selectTypes[0] = state.selectTypes[1] && state.selectTypes[1];
          //state.selectTypes[1] = undefined;
        }
        // type1, type2 모두 클릭한 상태에서 type2 클릭 해제: type2 요소만 삭제
        else if (state.selectTypes[0] === activeType && state.selectTypes[1] === undefined) {
          state.selectTypes = state.selectTypes.filter(type => type !== activeType);
        }
        // type1, type2 모두 클릭한 상태에서 추가로 요소 클릭: type1 해제, type2는 type1 할당, 새로운 요소가 type2에 할당
        else if (state.selectTypes[0] === activeType && state.selectTypes[1] === activeType) {
          state.selectTypes[0] = state.selectTypes[1];
          state.selectTypes[1] = activeType;
        }
    },
  },
});

export const twoToCal = createAsyncThunk<void, string, { dispatch: AppDispatch; state: RootState }>(
  'upToTwo/twoToCal',
  async (type, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    dispatch(upToTwo(type)); // 1. upToTwo 동작
    //const activeTypes = (thunkAPI.getState().upToTwo as upToTwoState).selectTypes; // 2. upToTwo 의 activeType 받아옴
    const selectTypes = (thunkAPI.getState().upToTwo as upToTwoState).selectTypes; // 2. upToTwo 의 selectTypes 받아옴

    selectTypes.forEach((activeType, index) => {
      dispatch(
        offenseCal({
          // offenseType1: (selectTypes[0] && activeType) || undefined,
          // offenseType2: (selectTypes[1] && activeType) || undefined,
          offenseType1: index === 0 ? activeType : undefined,
          offenseType2: index === 1 ? activeType : undefined,
        })
      );
    }); // 3. activeType을 offenseCal의 인수로 넘겨줌
  }
);

export default upToTwoSlice.reducer;
export const { upToTwo } = upToTwoSlice.actions;

/**
 * TODO
 *
 * [ ] uptotwo + offenseCal 혹은 uptotwo+defesecal을 dispatch 하고 싶은거임
 * [ ] payload 악귀퇴치 (type1, type2 해제하고 나면 type1:'grass'가 아닌 payload:'grass'로 나옴)
 * [ ] A조건문, B조건문 둘 다 offenseCal과 defenseCal에 바로 dispatch할 수 있어야 함.
 * [ ] `/` 경로와 `/defense/ 경로에 따라 offenseCal과 defenseCal에 dispatch할 수 있어야 함.

* [ ] upToTwo 내부에서 if문을 짤게 아니고... 외부에서 upToTwo/0, upToTWO/1,upToTwo/2 이렇게 사용할 수 있도록 리듀서에서 나누는게 좋을 듯

 * [x] 나중에 type1, type2 없애고 selectTypes[0], selectTypes[1]으로 갈아엎기 (offenseCal과 셀렉터 컴포넌트도 전부 바꿔야)
 */
