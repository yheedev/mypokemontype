import { TypeName, TypeNameElement as TypeId } from '@/constants/pokemon'
import {
  OFFENSE_EFFECT_VALUES,
  makeBuckets,
  BucketResult,
} from '@/constants/effectiveness'
import { allTypes1x } from '@/utils/allTypes1x'

export function offenseCal(type1?: TypeId, type2?: TypeId) {
  const buckets = makeBuckets(OFFENSE_EFFECT_VALUES)

  const base1 = allTypes1x(type1)
  const base2 = allTypes1x(
    type1 && type2 && type1 !== type2 ? type2 : undefined,
  )

  for (let i = 0; i < TypeName.length; i++) {
    const v = Math.max(base1[i], base2[i])
    const k = String(v) as keyof BucketResult<
      (typeof OFFENSE_EFFECT_VALUES)[number]
    >
    buckets[k].push(TypeName[i])
  }
  return buckets
}
export type OffenseResult = ReturnType<typeof offenseCal>
