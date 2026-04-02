'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { cn } from '@/lib/utils'
import { hasFinalConsonant } from '@/utils/koParticle'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'

type ModeKey = 'Battle.modeEffectively' | 'Battle.modeGently'

const MODE_OPTIONS: ModeKey[] = ['Battle.modeEffectively', 'Battle.modeGently']

interface BattleSentenceProps {
  attackerData: PokemonSlotData | null
  defenderData: PokemonSlotData | null
}

export function BattleSentence({
  attackerData,
  defenderData,
}: BattleSentenceProps) {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  const attackerName = attackerData?.displayName || t('Battle.myPokemon')
  const defenderName = defenderData?.displayName || t('Battle.otherPokemon')

  const [selectedMode, setSelectedMode] = useState<ModeKey>(
    'Battle.modeEffectively',
  )
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const modeBadge = (
    <div ref={dropdownRef} className="relative inline-flex">
      <span
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center gap-1',
          'rounded-[6px] border border-dashed border-[rgba(212,168,0,.4)]',
          'bg-[rgba(212,168,0,.08)] hover:bg-[rgba(212,168,0,.15)]',
          'px-2 py-[1px]',
          'text-[15px] font-bold text-[#d4a800]',
          'cursor-pointer transition-colors duration-200 select-none',
        )}
      >
        <span>{t(selectedMode)}</span>
        <span
          className={cn(
            'text-[10px] opacity-60 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        >
          ▾
        </span>
      </span>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-0 z-20 mt-1 w-max overflow-hidden',
            'rounded-[6px] border border-dashed border-[rgba(212,168,0,.4)]',
            'bg-[var(--card)] shadow-md',
          )}
        >
          {MODE_OPTIONS.map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedMode(key)
                setIsOpen(false)
              }}
              className={cn(
                'block w-full px-3 py-1.5 text-left text-[14px] font-bold text-[#d4a800]',
                'transition-colors duration-150',
                selectedMode === key
                  ? 'bg-[rgba(212,168,0,.15)]'
                  : 'hover:bg-[rgba(212,168,0,.08)]',
              )}
            >
              {t(key)}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        'mt-3 flex flex-wrap items-center justify-center px-2 py-1 text-[1rem] font-medium text-[var(--text)] sm:mt-6 sm:text-[1.2rem]',
        lang !== 'ja' && 'gap-x-1.5 gap-y-0.5 sm:gap-1.5',
      )}
    >
      {lang !== 'en' ? (
        <>
          <span>
            <span className="font-bold text-[#e84040] capitalize">
              {attackerName}
            </span>
            {t(
              hasFinalConsonant(attackerName)
                ? 'Battle.subjectParticle_batchim'
                : 'Battle.subjectParticle_no_batchim',
            )}
          </span>
          <span>
            <span className="font-bold text-[#4a9eff] capitalize">
              {defenderName}
            </span>
            {t(
              hasFinalConsonant(defenderName)
                ? 'Battle.objectParticle_batchim'
                : 'Battle.objectParticle_no_batchim',
            )}
          </span>
          {lang === 'ko' && <span className="basis-full sm:hidden" />}
          {modeBadge}
          <span>{t('Battle.attacks')}</span>
        </>
      ) : (
        <>
          <span>
            <span className="font-bold text-[#e84040] capitalize">
              {attackerName}
            </span>{' '}
            {t('Battle.attacks')}
          </span>
          <span className="basis-full sm:hidden" />
          <span>
            <span className="font-bold text-[#4a9eff] capitalize">
              {defenderName}
            </span>{' '}
            {modeBadge}
          </span>
        </>
      )}
    </div>
  )
}
