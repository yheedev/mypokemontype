'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronRight, X } from 'lucide-react'
import { usePokemonQuery } from '@/hooks/usePokemonQuery'
import { usePokemonList } from '@/hooks/usePokemonList'
import { usePokemonLangMap } from '@/hooks/usePokemonLangMap'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { TypeName, type TypeNameElement } from '@/constants/pokemon'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'
import {
  getChoseong,
  isKoreanInput,
  isJapaneseInput,
  isPureJamo,
} from '@/utils/jamo'

const MAX_SUGGESTIONS = 8

interface Suggestion {
  displayName: string // 드롭다운에 표시할 이름 (한글 or 영어)
  englishName: string // API 호출에 쓸 영어 slug
}

function filterEnglish(list: string[], query: string): Suggestion[] {
  const q = query.toLowerCase()
  const starts = list.filter((n) => n.startsWith(q))
  const includes = list.filter((n) => !n.startsWith(q) && n.includes(q))
  return [...starts, ...includes]
    .slice(0, MAX_SUGGESTIONS)
    .map((name) => ({ displayName: name, englishName: name }))
}

function filterJapanese(
  jaMap: Map<string, string>,
  query: string,
): Suggestion[] {
  const q = query.toLowerCase()
  const starts = Array.from(jaMap.keys()).filter((n) => n.startsWith(query))
  const includes = Array.from(jaMap.keys()).filter(
    (n) => !n.startsWith(query) && n.toLowerCase().includes(q),
  )
  return [...starts, ...includes]
    .slice(0, MAX_SUGGESTIONS)
    .map((name) => ({ displayName: name, englishName: jaMap.get(name)! }))
}

function filterKorean(koMap: Map<string, string>, query: string): Suggestion[] {
  const isJamo = isPureJamo(query)
  const results: Suggestion[] = []

  for (const [koName, enName] of koMap) {
    const matches = isJamo
      ? getChoseong(koName).includes(query) // ㅍ → 피카츄, 파이리
      : koName.startsWith(query) || koName.includes(query)

    if (matches) results.push({ displayName: koName, englishName: enName })
  }

  return results
    .sort((a, b) => {
      const aFirst = isJamo
        ? getChoseong(a.displayName).startsWith(query)
        : a.displayName.startsWith(query)
      const bFirst = isJamo
        ? getChoseong(b.displayName).startsWith(query)
        : b.displayName.startsWith(query)
      if (aFirst && !bFirst) return -1
      if (!aFirst && bFirst) return 1
      return 0
    })
    .slice(0, MAX_SUGGESTIONS)
}

export default function PokemonSearch() {
  const { t } = useTranslation()
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
  const { data, isLoading: isLoadingPokemon } = usePokemonQuery(selectedEnName)

  const isKorean = input.length >= 1 && isKoreanInput(input)
  const isJapanese = input.length >= 1 && isJapaneseInput(input)
  const isLangMapLoading =
    (isKorean && isKoMapLoading) || (isJapanese && isJaMapLoading)

  const suggestions: Suggestion[] = (() => {
    if (input.length < 1) return []
    if (isKorean) {
      if (!koMap) return []
      return filterKorean(koMap, input)
    }
    if (isJapanese) {
      if (!jaMap) return []
      return filterJapanese(jaMap, input)
    }
    return filterEnglish(pokemonList ?? [], input)
  })()

  const pokemonTypes = (data?.types ?? [])
    .sort((a, b) => a.slot - b.slot)
    .map(({ type }) => type.name)
    .filter((name): name is TypeNameElement =>
      TypeName.includes(name as TypeNameElement),
    )

  const imageUrl =
    data?.sprites.other['official-artwork'].front_default ??
    data?.sprites.front_default

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setSelectedEnName('')
    setActiveIndex(-1)
    setShowDropdown(true)
  }

  const handleSelect = (suggestion: Suggestion) => {
    setInput(suggestion.displayName)
    setSelectedEnName(suggestion.englishName)
    setSelectedDisplayName(suggestion.displayName)
    setActiveIndex(-1)
    setShowDropdown(false)
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
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }

  const showCard = data && pokemonTypes.length > 0 && selectedEnName

  return (
    <div className="mx-4 mt-3 mb-1 px-4" ref={containerRef}>
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text)] opacity-40"
        />
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input.length >= 1 && setShowDropdown(true)}
          placeholder={t('Search.placeholder')}
          autoComplete="off"
          className={cn(
            'w-full rounded-full bg-[var(--card)] py-3 pr-10 pl-10',
            'text-sm text-[var(--text)] placeholder:opacity-40',
            'shadow-md outline-none',
            "font-['Noto_Sans_KR'] transition-shadow duration-200 focus:shadow-lg",
          )}
        />

        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          {isLoadingPokemon || isLangMapLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--text)] border-t-transparent opacity-40" />
          ) : (
            input && (
              <button onClick={handleClear} aria-label="clear">
                <X size={14} className="text-[var(--text)] opacity-40" />
              </button>
            )
          )}
        </div>

        {/* 자동완성 드롭다운 */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-full right-0 left-0 z-20 mt-1 overflow-hidden rounded-2xl bg-[var(--card)] shadow-lg">
            {suggestions.map((s, i) => (
              <li
                key={s.englishName}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(s)}
                className={cn(
                  'cursor-pointer px-5 py-2.5 capitalize',
                  'text-sm text-[var(--text)]',
                  'transition-colors duration-100',
                  i === activeIndex
                    ? 'bg-[var(--background)]'
                    : 'hover:bg-[var(--background)]',
                )}
              >
                {s.displayName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 포켓몬 카드 */}
      {showCard && (
        <div className="mt-2 flex items-center gap-4 rounded-2xl bg-[var(--card)] p-3 shadow-md">
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={selectedDisplayName}
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 object-contain"
            />
          )}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-[var(--text)] capitalize">
              {selectedDisplayName}
            </p>
            <div className="flex gap-2">
              {pokemonTypes.map((type) => (
                <Pill
                  key={type}
                  pokemonTypeName={type}
                  animation={false}
                  isActive={true}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setTypes(pokemonTypes)}
            aria-label={t('Search.apply')}
            className={cn(
              'ml-auto flex items-center rounded-full p-2',
              'text-[var(--text)] opacity-50 transition-opacity duration-200 hover:opacity-100',
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
