import { describe, it, expect } from 'vitest'
import { defenseCal } from '@/utils/defenseCal'
import { TypeName } from '@/constants/pokemon'

function totalTypeCount(result: ReturnType<typeof defenseCal>): number {
  return Object.values(result).reduce((sum, arr) => sum + arr.length, 0)
}

describe('defenseCal', () => {
  describe('타입 미선택', () => {
    it('모든 타입이 1x 버킷에 들어간다', () => {
      const result = defenseCal()
      expect(result['1']).toHaveLength(TypeName.length)
      expect(result['0']).toHaveLength(0)
      expect(result['0.25']).toHaveLength(0)
      expect(result['0.5']).toHaveLength(0)
      expect(result['2']).toHaveLength(0)
      expect(result['4']).toHaveLength(0)
    })
  })

  describe('단일 타입', () => {
    it('18개 타입이 전부 어느 버킷엔가 포함된다', () => {
      expect(totalTypeCount(defenseCal('fire'))).toBe(TypeName.length)
      expect(totalTypeCount(defenseCal('ghost'))).toBe(TypeName.length)
      expect(totalTypeCount(defenseCal('dragon'))).toBe(TypeName.length)
    })

    it('normal: ghost 공격은 0x (면역)', () => {
      expect(defenseCal('normal')['0']).toEqual(['ghost'])
    })

    it('normal: fighting 공격은 2x', () => {
      expect(defenseCal('normal')['2']).toEqual(['fighting'])
    })

    it('ghost: normal, fighting 공격은 0x (면역)', () => {
      expect(defenseCal('ghost')['0'].sort()).toEqual(['fighting', 'normal'].sort())
    })

    it('ghost: ghost, dark 공격은 2x', () => {
      expect(defenseCal('ghost')['2'].sort()).toEqual(['dark', 'ghost'].sort())
    })

    it('ghost: poison, bug 공격은 0.5x', () => {
      expect(defenseCal('ghost')['0.5'].sort()).toEqual(['bug', 'poison'].sort())
    })

    it('steel: 독은 0x(면역), 페어리/얼음은 0.5x', () => {
      const resisted = defenseCal('steel')['0.5']
      // steel은 많은 타입에 내성을 가짐
      expect(resisted).toContain('fairy')
      expect(resisted).toContain('ice')
      // poison은 steel에 0x (면역)
      expect(defenseCal('steel')['0']).toContain('poison')
    })

    it('dragon: dragon 자신에게 2x', () => {
      expect(defenseCal('dragon')['2']).toContain('dragon')
    })

    it('fairy: dragon 공격은 0x (면역)', () => {
      expect(defenseCal('fairy')['0']).toEqual(['dragon'])
    })
  })

  describe('듀얼 타입 — 곱셈 배율', () => {
    it('18개 타입이 전부 어느 버킷엔가 포함된다', () => {
      expect(totalTypeCount(defenseCal('rock', 'flying'))).toBe(TypeName.length)
      expect(totalTypeCount(defenseCal('fire', 'ice'))).toBe(TypeName.length)
    })

    it('rock + flying: ground 공격은 0x (flying 면역)', () => {
      // ground는 rock에 2x지만 flying에는 0x → short-circuit → 0x
      expect(defenseCal('rock', 'flying')['0']).toEqual(['ground'])
    })

    it('rock + flying: electric, ice, water, rock, steel 공격은 2x', () => {
      const { '2': superEffective } = defenseCal('rock', 'flying')
      expect(superEffective).toContain('electric')
      expect(superEffective).toContain('ice')
      expect(superEffective).toContain('water')
      expect(superEffective).toContain('rock')
      expect(superEffective).toContain('steel')
    })

    it('fire + ice: rock 공격은 4x (rock이 fire 2x, ice 2x 모두 찌름)', () => {
      expect(defenseCal('fire', 'ice')['4']).toContain('rock')
    })

    it('fire + ice: ice 공격은 0.25x (fire에 0.5x, ice에 0.5x)', () => {
      expect(defenseCal('fire', 'ice')['0.25']).toContain('ice')
    })

    it('ghost + normal: 세 타입(normal, fighting, ghost)이 0x', () => {
      // normal이 ghost에 0x, fighting이 ghost에 0x, ghost가 normal에 0x
      const immune = defenseCal('ghost', 'normal')['0']
      expect(immune.sort()).toEqual(['fighting', 'ghost', 'normal'].sort())
    })

    it('타입 순서가 바뀌어도 결과가 같다 (대칭성)', () => {
      expect(defenseCal('fire', 'water')).toEqual(defenseCal('water', 'fire'))
    })

    it('같은 타입 두 번 = 단일 타입과 동일', () => {
      expect(defenseCal('fire', 'fire')).toEqual(defenseCal('fire'))
    })
  })
})
