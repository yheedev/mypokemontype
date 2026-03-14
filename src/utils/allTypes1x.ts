import { TypeName, TypeValue } from '@/constants/pokemon'

export function allTypes1x(type?: string): readonly number[] {
  return type && type in TypeValue
    ? TypeValue[type as keyof typeof TypeValue]
    : new Array(TypeName.length).fill(1)
}
