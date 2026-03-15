import { describe, it, expect } from 'vitest'
import { offenseCal } from '@/utils/offenseCal'
import { TypeName } from '@/constants/pokemon'

function nonEmptyKeys(result: ReturnType<typeof offenseCal>): string[] {
  return Object.entries(result)
    .filter(([, types]) => types.length > 0)
    .map(([k]) => k)
    .sort()
}

function totalTypeCount(result: ReturnType<typeof offenseCal>): number {
  return Object.values(result).reduce((sum, arr) => sum + arr.length, 0)
}

describe('offenseCal', () => {
  describe('타입 미선택', () => {
    it('모든 타입이 1x 버킷에 들어간다', () => {
      const result = offenseCal()
      expect(result['1']).toHaveLength(TypeName.length)
      expect(result['0']).toHaveLength(0)
      expect(result['0.5']).toHaveLength(0)
      expect(result['2']).toHaveLength(0)
    })
  })

  describe('단일 타입', () => {
    // 설계: base2 = allTypes1x(undefined) = [1,1,...,1]
    // → Math.max(TypeValue[type][i], 1) ≥ 1 이므로
    //   싱글 타입에서는 0x / 0.5x 버킷이 항상 비어있다
    it('싱글 타입에서 0x 버킷은 항상 비어있다', () => {
      expect(offenseCal('normal')['0']).toHaveLength(0)
      expect(offenseCal('ghost')['0']).toHaveLength(0)
      expect(offenseCal('dragon')['0']).toHaveLength(0)
    })

    it('싱글 타입에서 0.5x 버킷은 항상 비어있다', () => {
      expect(offenseCal('fire')['0.5']).toHaveLength(0)
      expect(offenseCal('normal')['0.5']).toHaveLength(0)
    })

    it('싱글 타입에서 비어있지 않은 버킷은 2와 1만 존재한다', () => {
      expect(nonEmptyKeys(offenseCal('fire'))).toEqual(['1', '2'])
      expect(nonEmptyKeys(offenseCal('ghost'))).toEqual(['1', '2'])
      // normal은 2x 상대가 없어 1x 버킷만 존재
      expect(nonEmptyKeys(offenseCal('normal'))).toEqual(['1'])
    })

    it('18개 타입이 전부 어느 버킷엔가 포함된다', () => {
      expect(totalTypeCount(offenseCal('fire'))).toBe(TypeName.length)
      expect(totalTypeCount(offenseCal('normal'))).toBe(TypeName.length)
    })

    it('fire 2x: bug, steel, grass, ice', () => {
      expect(offenseCal('fire')['2'].sort()).toEqual(
        ['bug', 'grass', 'ice', 'steel'].sort(),
      )
    })

    it('ghost 2x: ghost, psychic', () => {
      expect(offenseCal('ghost')['2'].sort()).toEqual(['ghost', 'psychic'].sort())
    })

    it('fighting 2x: normal, ice, rock, dark, steel', () => {
      expect(offenseCal('fighting')['2'].sort()).toEqual(
        ['dark', 'ice', 'normal', 'rock', 'steel'].sort(),
      )
    })

    it('electric 2x: flying, water', () => {
      expect(offenseCal('electric')['2'].sort()).toEqual(['flying', 'water'].sort())
    })
  })

  describe('듀얼 타입', () => {
    it('같은 타입 두 번 = 단일 타입과 동일', () => {
      expect(offenseCal('fire', 'fire')).toEqual(offenseCal('fire'))
    })

    it('18개 타입이 전부 어느 버킷엔가 포함된다', () => {
      expect(totalTypeCount(offenseCal('fire', 'water'))).toBe(TypeName.length)
      expect(totalTypeCount(offenseCal('fire', 'grass'))).toBe(TypeName.length)
    })

    it('타입 순서가 바뀌어도 결과가 같다 (대칭성)', () => {
      expect(offenseCal('fire', 'water')).toEqual(offenseCal('water', 'fire'))
      expect(offenseCal('ghost', 'dark')).toEqual(offenseCal('dark', 'ghost'))
    })

    it('fire + water: 둘 다 0.5x인 타입만 0.5x 버킷에 들어간다 — water, dragon', () => {
      // fire[water]=0.5, water[water]=0.5 → max=0.5
      // fire[dragon]=0.5, water[dragon]=0.5 → max=0.5
      expect(offenseCal('fire', 'water')['0.5'].sort()).toEqual(
        ['dragon', 'water'].sort(),
      )
    })

    it('fire + water: 비어있지 않은 버킷은 0.5, 1, 2', () => {
      expect(nonEmptyKeys(offenseCal('fire', 'water'))).toEqual(['0.5', '1', '2'])
    })

    it('fire + grass 2x: water가 포함된다 (grass[water]=2x)', () => {
      expect(offenseCal('fire', 'grass')['2']).toContain('water')
    })

    it('ghost + normal: 0x 버킷 없음 (normal이 ghost의 0x를 1x로 커버)', () => {
      // ghost → normal = 0x, normal → normal = 1x → Math.max(0, 1) = 1
      expect(offenseCal('ghost', 'normal')['0']).toHaveLength(0)
    })

    it('normal + fighting: ghost를 0x로 처리 (fighting[ghost]=0, normal[ghost]=0)', () => {
      // normal[ghost]=0, fighting[ghost]=0 → max(0,0)=0 → '0' 버킷
      expect(offenseCal('normal', 'fighting')['0']).toContain('ghost')
    })
  })
})
