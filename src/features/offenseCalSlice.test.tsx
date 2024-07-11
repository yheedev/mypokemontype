const { offenseCalReducer, offenseCalActions } = require('./offenseCalSlice');
//const { TypeName, TypeValue } = require('./types');

describe('offenseCalSlice', () => {
  test('effectiveness array with offenseType1 as normal and offenseType2 as fighting', () => {
    const initialState = {
      result: {},
      offenseType1: undefined,
      offenseType2: undefined,
    };
    const action = offenseCalActions.offenseCal({
      offenseType1: 'normal',
      offenseType2: 'fighting',
    });
    const state = offenseCalReducer(initialState, action);

    // 예상되는 effectiveness 배열의 결과를 기반으로 검증
    // 예를 들어, '2' 키에 대한 타입들이 올바르게 반영되었는지 확인
    expect(state.result['2']).toEqual(
      expect.arrayContaining(['expectedType1', 'expectedType2'])
    );
    // 다른 키에 대한 검증도 추가할 수 있습니다.
  });
});

export {};
