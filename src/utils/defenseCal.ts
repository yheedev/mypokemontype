import {
  TypeName,
  TypeNameElement as TypeId,
  TypeValue,
} from '@/constants/pokemon'
import {
  DEFENSE_EFFECT_VALUES,
  makeBuckets,
  type BucketResult,
} from '@/constants/effectiveness'

const TYPE_INDEX = Object.fromEntries(TypeName.map((t, i) => [t, i])) as Record<
  TypeId,
  number
>

function toDefenseKey(v: number): (typeof DEFENSE_EFFECT_VALUES)[number] {
  if (v === 0) return '0'
  if (v === 0.25) return '0.25'
  if (v === 0.5) return '0.5'
  if (v === 1) return '1'
  if (v === 2) return '2'
  return '4'
}

export function defenseCal(type1?: TypeId, type2?: TypeId) {
  const buckets = makeBuckets(DEFENSE_EFFECT_VALUES)

  const a = type1
  const b = type2 && type2 !== type1 ? type2 : undefined

  for (let atk = 0; atk < TypeName.length; atk++) {
    const atkType = TypeName[atk]

    let v = 1

    if (a) {
      const idxA = TYPE_INDEX[a]
      const va = TypeValue[atkType][idxA]
      if (va === 0) {
        buckets['0'].push(atkType)
        continue
      }
      v *= va
    }

    if (b) {
      const idxB = TYPE_INDEX[b]
      const vb = TypeValue[atkType][idxB]
      if (vb === 0) {
        buckets['0'].push(atkType)
        continue
      }
      v *= vb
    }

    const key = toDefenseKey(v)
    buckets[key].push(atkType)
  }

  return buckets
}

export type DefenseResult = ReturnType<typeof defenseCal>
