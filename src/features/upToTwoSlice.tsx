import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { TypeName } from './types';

// export type TypeNameElement = (typeof TypeName)[number];

export type upToTwoState = {
  selectTypes: string[];
  activeType: string;
};

export const initialState: upToTwoState = {
  selectTypes: [],
  activeType: '',
};

export const upToTwoSlice = createSlice({
  name: 'upToTwo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.selectTypes.indexOf(type);
      if (index === -1) {
        if (state.selectTypes.length < 2) {
          state.selectTypes.push(type);
        } else {
          state.selectTypes.shift(); // 가장 오래된 타입 제거
          state.selectTypes.push(type); // 새 타입 추가
        }
      }
      state.activeType = type; // 마지막으로 추가된 타입을 activeType으로 설정
    },
    remove: (state, action: PayloadAction<string>) => {
      state.selectTypes = state.selectTypes.filter(type => type !== action.payload);
      if (state.activeType === action.payload) {
        state.activeType = state.selectTypes[state.selectTypes.length - 1] || '';
      }
    },
  },
});

// TODO
// [ ] twoToCal 내부 if문을 바탕으로 upToTwo if문 덩치 줄이기

export default upToTwoSlice.reducer;
export const { add, remove } = upToTwoSlice.actions;

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
