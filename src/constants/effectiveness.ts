import type { TypeNameElement as TypeId } from '@/constants/pokemon'

export const OFFENSE_EFFECT_VALUES = ['0', '0.5', '1', '2'] as const
export const DEFENSE_EFFECT_VALUES = [
  '0',
  '0.25',
  '0.5',
  '1',
  '2',
  '4',
] as const

export type OffenseKey = (typeof OFFENSE_EFFECT_VALUES)[number]
export type DefenseKey = (typeof DEFENSE_EFFECT_VALUES)[number]

export type BucketResult<K extends string> = Record<K, TypeId[]>

export type SelectedTypes = { type1?: TypeId; type2?: TypeId }
export type TypeCalState<K extends string> = {
  result: BucketResult<K>
  type1?: TypeId
  type2?: TypeId
  calculate: (params: SelectedTypes) => void
}

export const makeBuckets = <K extends string>(keys: readonly K[]) =>
  keys.reduce(
    (acc, k) => ((acc[k] = [] as TypeId[]), acc),
    {} as BucketResult<K>,
  )

// export const EFFECT_VALUES = [0, 0.25, 0.5, 1, 2, 4] as const

// export const EMPTY_EFFECTIVENESS_MAP: { [key: string]: string[] } = {
//   '4': [],
//   '2': [],
//   '1': [],
//   '0.5': [],
//   '0.25': [],
//   '0': [],
// }
