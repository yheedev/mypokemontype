import { describe, it, expect, beforeEach } from 'vitest'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'

// Zustand store는 React 없이 getState() / setState()로 직접 테스트 가능
const { toggleType, setTypes, resetTypes } = useUpToTwoStore.getState()

beforeEach(() => {
  useUpToTwoStore.setState({ selectedTypes: [] })
})

describe('useUpToTwoStore', () => {
  describe('toggleType', () => {
    it('타입 추가', () => {
      toggleType('fire')
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire'])
    })

    it('같은 타입 다시 토글하면 제거', () => {
      toggleType('fire')
      toggleType('fire')
      expect(useUpToTwoStore.getState().selectedTypes).toEqual([])
    })

    it('두 번째 타입 추가', () => {
      toggleType('fire')
      toggleType('water')
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire', 'water'])
    })

    it('세 번째 타입 추가 시 첫 번째가 제거된다 (shift)', () => {
      toggleType('fire')
      toggleType('water')
      toggleType('grass')
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['water', 'grass'])
    })

    it('두 번째 타입을 제거하면 첫 번째만 남는다', () => {
      toggleType('fire')
      toggleType('water')
      toggleType('water')
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire'])
    })
  })

  describe('setTypes', () => {
    it('단일 타입 설정', () => {
      setTypes(['fire'])
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire'])
    })

    it('두 타입 설정', () => {
      setTypes(['fire', 'water'])
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire', 'water'])
    })

    it('3개 이상이면 앞 2개만 사용', () => {
      setTypes(['fire', 'water', 'grass'])
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire', 'water'])
    })

    it('빈 배열로 초기화', () => {
      setTypes(['fire', 'water'])
      setTypes([])
      expect(useUpToTwoStore.getState().selectedTypes).toEqual([])
    })

    it('기존 선택을 덮어쓴다', () => {
      toggleType('dragon')
      toggleType('dark')
      setTypes(['fire', 'water'])
      expect(useUpToTwoStore.getState().selectedTypes).toEqual(['fire', 'water'])
    })
  })

  describe('resetTypes', () => {
    it('선택된 타입을 전부 초기화', () => {
      toggleType('fire')
      toggleType('water')
      resetTypes()
      expect(useUpToTwoStore.getState().selectedTypes).toEqual([])
    })

    it('이미 비어 있을 때 호출해도 문제없다', () => {
      resetTypes()
      expect(useUpToTwoStore.getState().selectedTypes).toEqual([])
    })
  })
})
