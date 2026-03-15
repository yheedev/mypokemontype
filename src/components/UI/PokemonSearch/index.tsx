'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ChevronRight, X } from 'lucide-react'
import { usePokemonQuery } from '@/hooks/usePokemonQuery'
import { usePokemonList } from '@/hooks/usePokemonList'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { TypeName, type TypeNameElement } from '@/constants/pokemon'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'

const MAX_SUGGESTIONS = 8

function filterSuggestions(list: string[], query: string): string[] {
  if (!query || query.length < 1) return []
  const q = query.toLowerCase()
  // startsWith 먼저, 그다음 includes로 정렬
  const starts = list.filter((n) => n.startsWith(q))
  const includes = list.filter((n) => !n.startsWith(q) && n.includes(q))
  return [...starts, ...includes].slice(0, MAX_SUGGESTIONS)
}

export default function PokemonSearch() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const setTypes = useUpToTwoStore((state) => state.setTypes)
  const { data: pokemonList } = usePokemonList()
  const { data, isLoading: isLoadingPokemon } = usePokemonQuery(selectedName)

  const suggestions = filterSuggestions(pokemonList ?? [], input)

  const pokemonTypes = (data?.types ?? [])
    .sort((a, b) => a.slot - b.slot)
    .map(({ type }) => type.name)
    .filter((name): name is TypeNameElement =>
      TypeName.includes(name as TypeNameElement),
    )

  const imageUrl =
    data?.sprites.other['official-artwork'].front_default ??
    data?.sprites.front_default

  // 외부 클릭 시 드롭다운 닫기
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
    const value = e.target.value
    setInput(value)
    setSelectedName('')
    setActiveIndex(-1)
    setShowDropdown(true)
  }

  const handleSelect = (name: string) => {
    setInput(name)
    setSelectedName(name)
    setActiveIndex(-1)
    setShowDropdown(false)
  }

  const handleClear = () => {
    setInput('')
    setSelectedName('')
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
      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setActiveIndex(-1)
    }
  }

  const handleApply = () => {
    setTypes(pokemonTypes)
  }

  const showCard = data && pokemonTypes.length > 0 && selectedName

  return (
    <div className="mx-4 mt-3 mb-1 px-4" ref={containerRef}>
      {/* 검색 인풋 */}
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40"
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

        {/* 로딩 스피너 / 클리어 버튼 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isLoadingPokemon ? (
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
          <ul
            className={cn(
              'absolute top-full left-0 right-0 z-20 mt-1',
              'overflow-hidden rounded-2xl bg-[var(--card)] shadow-lg',
            )}
          >
            {suggestions.map((name, i) => (
              <li
                key={name}
                onMouseDown={(e) => e.preventDefault()} // onBlur 방지
                onClick={() => handleSelect(name)}
                className={cn(
                  'cursor-pointer px-5 py-2.5 capitalize',
                  'text-sm text-[var(--text)]',
                  'transition-colors duration-100',
                  i === activeIndex
                    ? 'bg-[var(--text)] bg-opacity-10'
                    : 'hover:bg-[var(--text)] hover:bg-opacity-10',
                )}
              >
                {name}
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
              alt={data.name}
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 object-contain"
            />
          )}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold capitalize text-[var(--text)]">
              {data.name}
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
            onClick={handleApply}
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
