// export type TypeKey = (typeof Types)[number];
// export const Types = [
//   'normal',
//   'fighting',
//   'flying',
//   'poison',
//   'ground',
//   'rock',
//   'bug',
//   'ghost',
//   'steel',
//   'fire',
//   'water',
//   'grass',
//   'electric',
//   'psychic',
//   'ice',
//   'dragon',
//   'dark',
//   'fairy',
//   'stella',
// ] as const;

export type TypesName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stella';

export const TypeValue: { [key in TypesName]: ReadonlyArray<number> } = {
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

export function calculateEffectiveness(type1: TypesName, type2?: TypesName) {
  let typeArr1 = TypeValue[type1];
  let typeArr2 = type2 ? TypeValue[type2] : new Array(19).fill(1);

  // 타입 2개 선택시 각 타입의 TypeValue 배열을 곱한다
  let dualTypes = type2
    ? typeArr1.map((value: number, index: number) => Math.max(value, typeArr2[index]))
    : typeArr1;
  // Initialize the effectiveness object
  let effectiveness: { [key: number]: TypesName[] } = {
    4: [],
    2: [],
    1: [],
    0.5: [],
    0.25: [],
    0: [],
  };

  // Convert TypeValue keys to array
  const typeKeysArray = Object.keys(TypeValue) as TypesName[];

  // Fill the effectiveness object
  dualTypes.forEach((value, index) => {
    effectiveness[value].push(typeKeysArray[index]);
  });
  return effectiveness;
}

console.log(calculateEffectiveness('normal', 'fighting'), 'this is a test');

/**
 * NOTE
 * 
 * TODO
 * [x] 포켓몬 타입들을 어떤 타입에 담을지
 * [x] 각 타입에 [ 1, 0, 0.5… ] 같이 숫자를 할당?
[x] 배열 내 숫자를 더해서.. 거기에 맞게 각 타입이 n배의 데미지 자리에 들어가게 해주기
[x] 숫자 더하는게 최선? 다른방법 없나
[] 나중에 방어 계산기 만들기 

 * 
 * 
 */

/*

  
  export const TypeValue = {
  normal: { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 0, steel: 0.5, fire: 1, water: 1, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
  fighting: { normal: 2, fighting: 1, flying: 0.5, poison: 0.5, ground: 1, rock: 2, bug: 0.5, ghost: 0, steel: 2, fire: 1, water: 1, grass: 1, electric: 1, psychic: 0.5, ice: 2, dragon: 1, dark: 2, fairy: 0.5 },
  flying: { normal: 1, fighting: 2, flying: 1, poison: 1, ground: 0, rock: 0.5, bug: 2, ghost: 1, steel: 0.5, fire: 1, water: 1, grass: 2, electric: 0.5, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
  poison: { normal: 1, fighting: 1, flying: 1, poison: 0.5, ground: 0.5, rock: 0.5, bug: 1, ghost: 0.5, steel: 0, fire: 1, water: 1, grass: 2, electric: 1, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 2 },
  ground: { normal: 1, fighting: 1, flying: 0, poison: 2, ground: 1, rock: 2, bug: 0.5, ghost: 1, steel: 2, fire: 2, water: 1, grass: 0.5, electric: 2, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 1 },
  rock: { normal: 1, fighting: 0.5, flying: 2, poison: 1, ground: 0.5, rock: 1, bug: 2, ghost: 1, steel: 0.5, fire: 2, water: 1, grass: 1, electric: 1, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 1 },
  bug: { normal: 1, fighting: 0.5, flying: 0.5, poison: 0.5, ground: 1, rock: 1, bug: 1, ghost: 0.5, steel: 0.5, fire: 0.5, water: 1, grass: 2, electric: 1, psychic: 2, ice: 1, dragon: 1, dark: 2, fairy: 0.5 },
  ghost: { normal: 0, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 2, steel: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 2, ice: 1, dragon: 1, dark: 0.5, fairy: 1 },
  steel: { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 2, bug: 1, ghost: 1, steel: 0.5, fire: 0.5, water: 0.5, grass: 1, electric: 0.5, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 2 },
  fire: { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 0.5, bug: 2, ghost: 1, steel: 2, fire: 0.5, water: 0.5, grass: 2, electric: 1, psychic: 1, ice: 2, dragon: 0.5, dark: 1, fairy: 1 },
  water: { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 2, rock: 2, bug: 1, ghost: 1, steel: 1, fire: 2, water: 0.5, grass: 0.5, electric: 1, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  grass: { normal: 1, fighting: 1, flying: 0.5, poison: 0.5, ground: 2, rock: 2, bug: 0.5, ghost: 1, steel: 0.5, fire: 0.5, water: 2, grass: 0.5, electric: 1, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  electric: { normal: 1, fighting: 1, flying: 2, poison: 1, ground: 0, rock: 1, bug: 1, ghost: 1, steel: 1, fire: 1, water: 2, grass: 0.5, electric: 0.5, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  psychic: { normal: 1, fighting: 2, flying: 1, poison: 2, ground: 1, rock: 1, bug: 1, ghost: 1, steel: 0.5, fire: 1, water: 1, grass: 1, electric: 1, psychic: 0.5, ice: 1, dragon: 1, dark: 0, fairy: 1 },
  ice: { normal: 1, fighting: 1, flying: 2, poison: 1, ground: 2, rock: 1, bug: 1, ghost: 1, steel: 0.5, fire: 0.5, water: 0.5, grass: 2, electric: 1, psychic: 1, ice: 0.5, dragon: 2, dark: 1, fairy: 1 },
  dragon: { normal: 1, fighting: 1, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 1, steel: 0.5, fire: 1, water: 1, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 2, dark: 1, fairy: 0 },
  dark: { normal: 1, fighting: 0.5, flying: 1, poison: 1, ground: 1, rock: 1, bug: 1, ghost: 2, steel: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 2, ice: 1, dragon: 1, dark: 0.5, fairy: 0.5 },
  fairy: { normal: 1, fighting: 2, flying: 1, poison: 0.5, ground: 1, rock: 1, bug: 1, ghost: 1, steel: 0.5, fire: 0.5, water: 1, grass: 1, electric: 1, psychic: 1, ice: 1, dragon: 2, dark: 2, fairy: 1 },
};

*/
