import { configureStore } from '@reduxjs/toolkit'
import offenseCalSlice, { offenseCal } from './offenseCalSlice'

function filterEmptyArrays(result: { [x: string]: string[] }) {
  const filteredResult: { [key: string]: string[] } = {}
  Object.keys(result).forEach((key) => {
    if (result[key].length > 0) {
      filteredResult[key] = result[key]
    }
  })
  return filteredResult
}

describe('offenseCalSlice', () => {
  let store = configureStore({ reducer: { offenseCal: offenseCalSlice } })

  beforeEach(() => {
    store = configureStore({ reducer: { offenseCal: offenseCalSlice } })
  })

  function testEffectiveness(
    ContainerTypes: { offenseType1: string; offenseType2: string }[],
    expectedKeys: string[],
  ) {
    ContainerTypes.forEach(({ offenseType1, offenseType2 }) => {
      it(`${offenseType1}, ${offenseType2} 이종타입 내 effectiveness 배열 비교`, () => {
        store.dispatch(offenseCal({ offenseType1, offenseType2 }))
        const state = store.getState().offenseCal
        const filteredResult = filterEmptyArrays(state.result)
        const resultKeys = Object.keys(filteredResult)

        expect(resultKeys.sort()).toEqual(expectedKeys.sort())
      })
    })
  }

  describe('얼음, 페어리 / 얼음, 드래곤 / 에스퍼, 고스트 / 비행, 바위 / 강철, 전기 / 독, 얼음 / 악, 격투 / 비행, 벌레 / 불꽃, 물 / 강철, 풀 / 풀, 땅 / 드래곤, 노멀 / 전기, 바위 / 에스퍼, 페어리 / 물, 얼음 / 땅, 전기', () => {
    const ContainerTypes = [
      { offenseType1: 'normal', offenseType2: 'fairy' },
      { offenseType1: 'ice', offenseType2: 'dragon' },
      { offenseType1: 'psychic', offenseType2: 'ghost' },
      { offenseType1: 'flying', offenseType2: 'rock' },
      { offenseType1: 'steel', offenseType2: 'electric' },
      { offenseType1: 'poison', offenseType2: 'ice' },
      { offenseType1: 'dark', offenseType2: 'fighting' },
      { offenseType1: 'flying', offenseType2: 'bug' },
      { offenseType1: 'fire', offenseType2: 'water' },
      { offenseType1: 'steel', offenseType2: 'grass' },
      { offenseType1: 'grass', offenseType2: 'ground' },
      { offenseType1: 'dragon', offenseType2: 'normal' },
      { offenseType1: 'electric', offenseType2: 'rock' },
      { offenseType1: 'psychic', offenseType2: 'fairy' },
      { offenseType1: 'water', offenseType2: 'ice' },
      { offenseType1: 'ground', offenseType2: 'electric' },
    ]

    const expectedKeys = ['2', '1', '0.5']

    testEffectiveness(ContainerTypes, expectedKeys)
  })

  describe('땅, 바위 / 고스트, 풀 / 고스트, 얼음 / 전기, 악 / 바위, 불꽃 / 불꽃, 땅 / 물, 페어리 / 전기, 벌레 / 물, 드래곤', () => {
    const ContainerTypes = [
      { offenseType1: 'ground', offenseType2: 'rock' },
      { offenseType1: 'ghost', offenseType2: 'grass' },
      { offenseType1: 'electric', offenseType2: 'dark' },
      { offenseType1: 'rock', offenseType2: 'fire' },
      { offenseType1: 'ground', offenseType2: 'fire' },
      { offenseType1: 'water', offenseType2: 'fairy' },
      { offenseType1: 'electric', offenseType2: 'bug' },
      { offenseType1: 'water', offenseType2: 'dragon' },
    ]

    const expectedKeys = ['2', '1']

    testEffectiveness(ContainerTypes, expectedKeys)
  })

  // 여기부터 노멀만,,,

  // describe('노멀, 격투 /', () => {
  //   const ContainerTypes = [{ offenseType1: 'normal', offenseType2: 'fighting' }];

  //   const expectedKeys = ['2', '1', '0'];

  //   testEffectiveness(ContainerTypes, expectedKeys);
  // });

  // describe('노멀, 비행 / 노멀, 독 / 노멀, 바위 / 노멀, 벌레 / 노멀, 강철 / 노멀, 불꽃 / 노멀, 풀 / 노멀, 에스퍼 / 노멀, 얼음 / 노멀, 드래곤 / 노멀, 페어리', () => {
  //   const ContainerTypes = [
  //     { offenseType1: 'normal', offenseType2: 'flying' },
  //     { offenseType1: 'normal', offenseType2: 'poison' },
  //     { offenseType1: 'normal', offenseType2: 'rock' },
  //     { offenseType1: 'normal', offenseType2: 'bug' },
  //     { offenseType1: 'normal', offenseType2: 'steel' },
  //     { offenseType1: 'normal', offenseType2: 'fire' },
  //     { offenseType1: 'normal', offenseType2: 'grass' },
  //     { offenseType1: 'normal', offenseType2: 'psychic' },
  //     { offenseType1: 'normal', offenseType2: 'ice' },
  //     { offenseType1: 'normal', offenseType2: 'dragon' },
  //     { offenseType1: 'normal', offenseType2: 'fairy' },
  //   ];

  //   const expectedKeys = ['2', '1', '0.5'];

  //   testEffectiveness(ContainerTypes, expectedKeys);
  // });

  // describe('노멀, 땅 / 노멀, 고스트 / 노멀, 물 / 노멀, 전기 / 노멀, 다크 / 노멀, 전기 / 노멀, 악 / 격투, 비행', () => {
  //   const ContainerTypes = [
  //     { offenseType1: 'normal', offenseType2: 'ground' },
  //     { offenseType1: 'normal', offenseType2: 'ghost' },
  //     { offenseType1: 'normal', offenseType2: 'water' },
  //     { offenseType1: 'normal', offenseType2: 'electric' },
  //     { offenseType1: 'normal', offenseType2: 'dark' },
  //     { offenseType1: 'normal', offenseType2: 'electric' },
  //     { offenseType1: 'normal', offenseType2: 'dark' },
  //   ];

  //   const expectedKeys = ['2', '1'];

  //   testEffectiveness(ContainerTypes, expectedKeys);
  // });
})

// 다음엔 더 효율적으로 작성해보고 싶다

// describe('effectiveness에 따른 offenseType1과 offenseType2 찾기', () => {
//   const allTypes = TypeName; // 모든 타입
//   const targetEffectiveness = ['2', '1', '0.5'];
//   const offenseType1 = 'normal'; // offenseType1은 노멀타입으로 고정

//   it(`노멀 타입과 다른 18개의 타입의 이종 타입 중에서 '2', '1', '0.5' effectiveness 배열을 갖는 타입`, () => {
//     const matchingCombinations: string[][] = [];

//     // allTypes.forEach(offenseType1 => {
//     allTypes.forEach(offenseType2 => {
//       store.dispatch(offenseCal({ offenseType1, offenseType2 }));
//       const state = store.getState().offenseCal;
//       const filteredResult = filterEmptyArrays(state.result);

//       if (
//         filteredResult[targetEffectiveness.toString()] &&
//         filteredResult[targetEffectiveness.toString()].length > 0
//       ) {
//         matchingCombinations.push([offenseType1, offenseType2]);
//       }
//     });

// console.log(matchingCombinations);
//   });
