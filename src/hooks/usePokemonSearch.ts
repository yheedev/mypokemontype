'use client'

import { useState, useEffect, useRef } from 'react'
import { isKoreanInput, isJapaneseInput } from '@/utils/jamo'
import { filterEnglish, filterJapanese, filterKorean, type Suggestion } from '@/utils/pokemonFilter'
import { usePokemonQuery } from '@/hooks/usePokemonQuery'
import { usePokemonList } from '@/hooks/usePokemonList'
import { usePokemonLangMap } from '@/hooks/usePokemonLangMap'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { TypeName, type TypeNameElement } from '@/constants/pokemon'

export type { Suggestion }

export function usePokemonSearch() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [selectedEnName, setSelectedEnName] = useState('')
  const [selectedDisplayName, setSelectedDisplayName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const setTypes = useUpToTwoStore((state) => state.setTypes)
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

  const pokemonTypes = (pokemonData?.types ?? [])
    .sort((a, b) => a.slot - b.slot)
    .map(({ type }) => type.name)
    .filter((name): name is TypeNameElement => TypeName.includes(name as TypeNameElement))

  const imageUrl =
    pokemonData?.sprites.other['official-artwork'].front_default ??
    pokemonData?.sprites.front_default

  const showCard = !!(pokemonData && pokemonTypes.length > 0 && selectedEnName)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (suggestion: Suggestion) => {
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
    selectedDisplayName,
    showDropdown,
    setShowDropdown,
    activeIndex,
    suggestions,
    pokemonTypes,
    imageUrl,
    showCard,
    isLoadingPokemon,
    isLangMapLoading,
    setTypes,
    handleInputChange,
    handleSelect,
    handleClear,
    handleKeyDown,
  }
}
