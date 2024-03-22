enum PokemonType {
  Normal,
  Fire,
  Water,
  Electric,
  Grass,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dragon,
  Dark,
  Steel,
  Fairy,
}

const _ = 1;
const h = 1 / 2;
const x = NaN;

const typeEffectiveness: Record<PokemonType, number[]> = {
  Normal: [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h],
  Fire: [, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2],
  Water: [, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _],
  Electric: [, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _],
  Grass: [, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h],
  Ice: [, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, _],
  // Add the rest of the types
};

function calculateInteraction(
  attackerType: PokemonType,
  defenderType: PokemonType
): number {
  return typeEffectiveness[attackerType][defenderType];
}
