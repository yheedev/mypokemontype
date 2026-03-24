'use client'

import { useState, useEffect, useRef } from 'react'
import { isKoreanInput, isJapaneseInput } from '@/utils/jamo'
import { filterEnglish, filterJapanese, filterKorean, type Suggestion } from '@/utils/pokemonFilter'
import { usePokemonQuery } from '@/hooks/usePokemonQuery'
import { usePokemonList } from '@/hooks/usePokemonList'
import { usePokemonLangMap } from '@/hooks/usePokemonLangMap'
import { usePokemonSlotStore } from '@/stores/usePokemonSlotStore'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { TypeName, type TypeNameElement } from '@/constants/pokemon'

export type { Suggestion }

export function usePokemonSearch() {
  const containerRef = useRef<HTMLDivElement>(null)
  // 선택 시점의 타겟 슬롯을 캡처 (data 도착 시점에 activeSlot이 바뀌어도 안전)
  const targetSlotRef = useRef<'A' | 'B'>('A')

  const [input, setInput] = useState('')
  const [selectedEnName, setSelectedEnName] = useState('')
  const [selectedDisplayName, setSelectedDisplayName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const { activeSlot, setSlot, setActiveSlot, clearActiveSlot } = usePokemonSlotStore()
  const { setTypes } = useUpToTwoStore()
  const { data: pokemonList } = usePokemonList()
  const { data: koMap, isLoading: isKoMapLoading } = usePokemonLangMap('ko')
  const { data: jaMap, isLoading: isJaMapLoading } = usePokemonLangMap('ja')
  const { data: pokemonData, isLoading: isLoadingPokemon } = usePokemonQuery(selectedEnName)

  const isKorean = input.length >= 1 && isKoreanInput(input)
  const isJapanese = input.length >= 1 && isJapaneseInput(input)
  const isLangMapLoading = (isKorean && isKoMapLoading) || (isJapanese && isJaMapLoading)

  const suggestions: Suggestion[] = (() => {
    if (input.length < 1) return []
    if (isKorean) return koMap ? filterKorean(koMap, input) : []
    if (isJapanese) return jaMap ? filterJapanese(jaMap, input) : []
    return filterEnglish(pokemonList ?? [], input)
  })()

  // click-outside 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // 포켓몬 데이터가 도착하면 타겟 슬롯에 채우고 검색 초기화
  useEffect(() => {
    if (!pokemonData || !selectedEnName || pokemonData.name !== selectedEnName) return

    const types = (pokemonData.types ?? [])
      .sort((a, b) => a.slot - b.slot)
      .map(({ type }) => type.name)
      .filter((name): name is TypeNameElement => TypeName.includes(name as TypeNameElement))

    const imageUrl =
      pokemonData.sprites.other['official-artwork'].front_default ??
      pokemonData.sprites.front_default

    if (!imageUrl || types.length === 0) return

    const targetSlot = targetSlotRef.current
    setSlot(targetSlot, {
      displayName: selectedDisplayName,
      englishName: selectedEnName,
      imageUrl,
      types,
    })

    // 포켓몬 타입을 PillGroup에 반영 (isUserChange=false → 슬롯 재sync 없음)
    setTypes(types)

    // 슬롯 A를 채웠으면 슬롯 B를 자동 활성화, 슬롯 B를 채웠으면 비활성화
    if (targetSlot === 'A') {
      setActiveSlot('B')
    } else {
      clearActiveSlot()
    }

    setInput('')
    setSelectedEnName('')
    setSelectedDisplayName('')
    setShowDropdown(false)
    setActiveIndex(-1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonData, selectedEnName])

  const handleSelect = (suggestion: Suggestion) => {
    // 선택 시점의 슬롯을 캡처 (아무 슬롯도 선택 안 했으면 A가 기본)
    targetSlotRef.current = activeSlot ?? 'A'
    setInput(suggestion.displayName)
    setSelectedEnName(suggestion.englishName)
    setSelectedDisplayName(suggestion.displayName)
    setActiveIndex(-1)
    setShowDropdown(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setSelectedEnName('')
    setActiveIndex(-1)
    setShowDropdown(true)
  }

  const handleClear = () => {
    setInput('')
    setSelectedEnName('')
    setSelectedDisplayName('')
    setActiveIndex(-1)
    setShowDropdown(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0) handleSelect(suggestions[activeIndex])
      else if (suggestions.length === 1) handleSelect(suggestions[0])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }

  return {
    containerRef,
    input,
    showDropdown,
    setShowDropdown,
    activeIndex,
    suggestions,
    isLoadingPokemon,
    isLangMapLoading,
    handleInputChange,
    handleSelect,
    handleClear,
    handleKeyDown,
  }
}
