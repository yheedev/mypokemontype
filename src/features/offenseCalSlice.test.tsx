// import { configureStore } from '@reduxjs/toolkit';
// import offenseCalSlice, { offenseCal } from './offenseCalSlice';

// describe('offenseCalSlice', () => {
//   const store = configureStore({ reducer: { offenseCal: offenseCalSlice } });

//   it('should handle offense type calculation correctly', () => {

//   test('effectiveness array with offenseType1 as normal and offenseType2 as fighting', () => {
//     const initialState = {
//       result: {},
//       offenseType1: undefined,
//       offenseType2: undefined,
//     };
//     const action = offenseCalActions.offenseCal({
//       offenseType1: 'normal',
//       offenseType2: 'fighting',
//     });
//     const state = offenseCalReducer(initialState, action);

//     // expect(state.result['2']).toEqual(
//     //   expect.arrayContaining(['expectedType1', 'expectedType2'])
//     // );
//     expect(state.result['2']).toContain('normal');
//     expect(state.result['1']).toContain('fighting');
//     expect(state.result['0']).toContain('ghost');

//     // 다른 키에 대한 검증도 추가할 수 있습니다.
//   }});
// });

import { offenseCal } from './offenseCalSlice';

describe('offenseCal', () => {
  test('노멀, 격투 타입 테스트', () => {
    expect(offenseCal({ offenseType1: 'normal', offenseType2: 'fighting' })).toEqual({
      result: { '2': ['normal'], '1': ['fighting'], '0': ['ghost'] },
    });
  });
});

// 추가적인 타입 조합에 대한 테스트를 여기에 구현할 수 있습니다.

// const offenseCal = require('./offenseCalSlice');

// test('offenseCal을 테스트할게el요', () => {
//   expect('offenseCal').toEqual({
//     result: { '2': ['normal'], '1': ['fighting'], '0': ['ghost'] },
//   });
// });
