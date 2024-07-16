import { configureStore } from '@reduxjs/toolkit';
import offenseCalSlice, { offenseCal } from './offenseCalSlice';

function filterEmptyArrays(result: { [x: string]: string[] }) {
  const filteredResult: { [key: string]: string[] } = {};
  Object.keys(result).forEach(key => {
    if (result[key].length > 0) {
      filteredResult[key] = result[key];
    }
  });
  return filteredResult;
}

describe('offenseCalSlice', () => {
  let store = configureStore({ reducer: { offenseCal: offenseCalSlice } });

  beforeEach(() => {
    store = configureStore({ reducer: { offenseCal: offenseCalSlice } });
  });

  function testEffectiveness(
    ContainerTypes: { offenseType1: string; offenseType2: string }[],
    expectedKeys: string[]
  ) {
    ContainerTypes.forEach(({ offenseType1, offenseType2 }) => {
      it(`${offenseType1}, ${offenseType2} 이종타입 내 effectiveness 배열 비교`, () => {
        store.dispatch(offenseCal({ offenseType1, offenseType2 }));
        const state = store.getState().offenseCal;
        const filteredResult = filterEmptyArrays(state.result);
        const resultKeys = Object.keys(filteredResult);

        expect(resultKeys.sort()).toEqual(expectedKeys.sort());
      });
    });
  }

  // 여기부터 테스트 케이스 작성

  describe('노멀, 격투 /', () => {
    const ContainerTypes = [{ offenseType1: 'normal', offenseType2: 'fighting' }];

    const expectedKeys = ['2', '1', '0'];

    testEffectiveness(ContainerTypes, expectedKeys);
  });

  describe('노멀, 비행 / 노멀, 독 / 노멀, 바위 / 노멀, 벌레 / 노멀, 강철 / 노멀, 불꽃 / 노멀, 풀 / 노멀, 에스퍼 / 노멀, 얼음 / 노멀, 드래곤 / 노멀, 페어리 / 격투, 독', () => {
    const ContainerTypes = [
      { offenseType1: 'normal', offenseType2: 'flying' },
      { offenseType1: 'normal', offenseType2: 'poison' },
      { offenseType1: 'normal', offenseType2: 'rock' },
      { offenseType1: 'normal', offenseType2: 'bug' },
      { offenseType1: 'normal', offenseType2: 'steel' },
      { offenseType1: 'normal', offenseType2: 'fire' },
      { offenseType1: 'normal', offenseType2: 'grass' },
      { offenseType1: 'normal', offenseType2: 'psychic' },
      { offenseType1: 'normal', offenseType2: 'ice' },
      { offenseType1: 'normal', offenseType2: 'dragon' },
      { offenseType1: 'normal', offenseType2: 'fairy' },
      { offenseType1: 'fighting', offenseType2: 'poison' },
    ];

    const expectedKeys = ['2', '1', '0.5'];

    testEffectiveness(ContainerTypes, expectedKeys);
  });

  describe('노멀, 땅 / 노멀, 고스트 / 노멀, 물 / 노멀, 전기 / 노멀, 다크 / 노멀, 전기 / 노멀, 악 / 격투, 비행', () => {
    const ContainerTypes = [
      { offenseType1: 'normal', offenseType2: 'ground' },
      { offenseType1: 'normal', offenseType2: 'ghost' },
      { offenseType1: 'normal', offenseType2: 'water' },
      { offenseType1: 'normal', offenseType2: 'electric' },
      { offenseType1: 'normal', offenseType2: 'dark' },
      { offenseType1: 'normal', offenseType2: 'electric' },
      { offenseType1: 'normal', offenseType2: 'dark' },
      { offenseType1: 'fighting', offenseType2: 'flying' },
    ];

    const expectedKeys = ['2', '1'];

    testEffectiveness(ContainerTypes, expectedKeys);
  });
});
