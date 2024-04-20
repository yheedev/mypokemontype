// import { TypeName, TypeValue } from './OffenseCalculator';

export const TypeName = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'stella',
] as const;

export const TypeValue: { [key: string]: ReadonlyArray<number> } = {
  normal: [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  fighting: [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 1],
  flying: [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1],
  poison: [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],

  ground: [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1, 1],
  rock: [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  bug: [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5, 1],
  ghost: [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1, 1],

  steel: [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2, 1],
  fire: [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1, 1],
  water: [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1, 1],
  grass: [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1, 1],

  electric: [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1, 1],
  psychic: [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1, 1],
  ice: [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1, 1],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1],

  dark: [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1],
  fairy: [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1, 1],
  stella: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
};

const getEighthValues = () => {
  return Object.values(TypeValue).map(typeArray => typeArray[7]);
};

let eighthValuesArray = getEighthValues();
console.log('🚀 ~ eighthValuesArray:', eighthValuesArray);

// TypeValue 배열 및 타입을 선택하지 않았을 경우에는 모든 타입에 대한 효과를 1배로 반환
function getTypeArray(type?: string) {
  return type ? TypeValue[type] : new Array(19).fill(1);
}

export function calcOffense(type1?: string, type2?: string) {
  let typeArr1 = getTypeArray(type1);
  let typeArr2 = getTypeArray(type2);

  // 각 효과의 수치를 키로 갖는 빈 배열 설정
  let effectiveness: { [key: string]: string[] } = {
    4: [],
    2: [],
    1: [],
    0.5: [],
    0.25: [],
    0: [],
  };

  // 한 개의 타입을 선택했을 경우 해당 타입의 TypeValue 배열을 그대로 반영
  if (type2 === undefined) {
    typeArr1.forEach((value: number, index: number) => {
      effectiveness[value].push(TypeName[index]);
    });
  }
  // 두 개의 타입을 입력했을 경우 두 타입의 TypeValue 배열 중 더 큰 값을 골라서 하나의 배열로 반영
  else {
    let dualTypes = typeArr1.map((value: number, index: number) => {
      return Math.max(value, typeArr2[index]);
    });

    dualTypes.forEach((value: number, index: number) => {
      effectiveness[value].push(TypeName[index]);
    });
  }

  return effectiveness;
}
