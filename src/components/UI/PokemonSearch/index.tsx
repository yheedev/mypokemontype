'use client'

import { useTranslation } from 'react-i18next'
import { Search, ChevronRight, X } from 'lucide-react'
import { usePokemonSearch } from '@/hooks/usePokemonSearch'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'

export default function PokemonSearch() {
  const { t } = useTranslation()
  const {
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
  } = usePokemonSearch()

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
            'w-full rounded-[15px] bg-[var(--card)] py-3 pr-10 pl-10',
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
