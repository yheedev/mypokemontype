import { configureStore } from '@reduxjs/toolkit';
import offenseCalSlice, { offenseCal } from './offenseCalSlice';

describe('offenseCalSlice', () => {
  let store = configureStore({ reducer: { offenseCal: offenseCalSlice } });

  beforeEach(() => {
    store = configureStore({ reducer: { offenseCal: offenseCalSlice } });
  });

  function filterEmptyArrays(result: { [x: string]: string[] }) {
    const filteredResult: { [key: string]: string[] } = {};
    Object.keys(result).forEach(key => {
      if (result[key].length > 0) {
        filteredResult[key] = result[key];
      }
    });
    return filteredResult;
  }

  it('노멀, 격투 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'fighting' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 비행 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'flying' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 독 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'poison' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 땅 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'ground' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 바위 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'rock' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 벌레 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'bug' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 고스트 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'ghost' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 강철 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'steel' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 불꽃 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'fire' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 물 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'water' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 풀 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'grass' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 전기 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'electric' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 에스퍼 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'psychic' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 얼음 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'ice' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 드래곤 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'dragon' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 악 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'dark' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('노멀, 페어리 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'normal', offenseType2: 'fairy' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('격투, 비행 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'fighting', offenseType2: 'flying' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });

  it('격투, 독 이종타입 내 effectiveness 배열 비교', () => {
    store.dispatch(offenseCal({ offenseType1: 'fighting', offenseType2: 'poison' }));
    const state = store.getState().offenseCal;
    const filteredResult = filterEmptyArrays(state.result);

    const expectedKeys = ['2', '1', '0.5'];
    const resultKeys = Object.keys(filteredResult);

    expect(resultKeys.sort()).toEqual(expectedKeys.sort());
  });
});
