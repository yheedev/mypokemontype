'use client'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { cn } from '@/lib/utils'
import { hasFinalConsonant } from '@/utils/koParticle'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useBattleSentenceModeStore } from '@/stores/useBattleSentenceModeStore'
import type { BattleSentenceMode } from '@/stores/useBattleSentenceModeStore'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'
import type { Mode } from '@/constants/mode'

const MODE_OPTIONS: BattleSentenceMode[] = [
  'Battle.modeEffectively',
  'Battle.modeGently',
]

interface BattleSentenceProps {
  attackerData: PokemonSlotData | null
  defenderData: PokemonSlotData | null
  mode: Mode
}

function getObjectParticleKey(name: string, mode: Mode): string {
  const hasBatchim = hasFinalConsonant(name)
  if (mode === 'offense') {
    return hasBatchim ? 'Battle.objectParticle_batchim' : 'Battle.objectParticle_no_batchim'
  }
  return hasBatchim ? 'Battle.objectParticle_defense_batchim' : 'Battle.objectParticle_defense_no_batchim'
}

const nameStyle = 'font-bold capitalize'
const defenderStyle = cn(nameStyle, 'text-[var(--darkText)]')

export function BattleSentence({
  attackerData,
  defenderData,
  mode,
}: BattleSentenceProps) {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()
  const { selectedMode, setSelectedMode } = useBattleSentenceModeStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => setIsOpen(false))

  const actionKey = mode === 'offense' ? 'Battle.attacks' : 'Battle.defenses'
  const attackerStyle = cn(nameStyle, mode === 'offense' ? 'text-[var(--offenseText)]' : 'text-[var(--defenseText)]')

  const attackerName = attackerData?.displayName || t('Battle.myPokemon')
  const defenderName = defenderData?.displayName || t('Battle.otherPokemon')

  const modeBadge = (
    <div ref={dropdownRef} className="relative inline-flex">
      <span
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'inline-flex cursor-pointer select-none items-center gap-1',
          'rounded-[6px] border border-dashed border-[rgba(212,168,0,.4)]',
          'bg-[rgba(212,168,0,.08)] px-2 py-[1px]',
          'text-[15px] font-bold text-[var(--goldenText)]',
          'transition-colors duration-200 hover:bg-[rgba(212,168,0,.15)]',
        )}
      >
        <span>{t(selectedMode)}</span>
        <span className={cn('text-[10px] opacity-60 transition-transform duration-200', isOpen && 'rotate-180')}>
          ▼
        </span>
      </span>

      {isOpen && (
        <div className={cn(
          'absolute top-full left-0 z-20 mt-1 w-max overflow-hidden whitespace-nowrap',
          'rounded-[6px] border border-dashed border-[rgba(212,168,0,.4)]',
          'bg-[var(--card)] shadow-md',
        )}>
          {MODE_OPTIONS.map((key) => (
            <button
              key={key}
              onClick={() => { setSelectedMode(key); setIsOpen(false) }}
              className={cn(
                'block w-full px-3 py-1.5 text-left text-[14px] font-bold text-[var(--goldenText)]',
                'transition-colors duration-150',
                selectedMode === key ? 'bg-[rgba(212,168,0,.15)]' : 'hover:bg-[rgba(212,168,0,.08)]',
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
    <div className={cn(
      'mt-3 flex flex-wrap items-center justify-center px-2 py-1 text-[1rem] font-medium text-[var(--text)] sm:mt-6 sm:text-[1.2rem]',
      lang !== 'ja' && 'gap-x-1.5 gap-y-0.5 sm:gap-1.5',
      lang === 'ja' && 'font-bold',
    )}>
      {lang !== 'en' ? (
        <>
          <span>
            <span className={attackerStyle}>{attackerName}</span>
            {t(hasFinalConsonant(attackerName) ? 'Battle.subjectParticle_batchim' : 'Battle.subjectParticle_no_batchim')}
          </span>
          <span>
            <span className={defenderStyle}>{defenderName}</span>
            {t(getObjectParticleKey(defenderName, mode))}
          </span>
          {lang === 'ko' && <span className="basis-full sm:hidden" />}
          {modeBadge}
          <span>{t(actionKey)}</span>
        </>
      ) : (
        <>
          <span>
            <span className={attackerStyle}>{attackerName}</span>{' '}
            {t(actionKey)}
          </span>
          <span className="basis-full sm:hidden" />
          <span>
            <span className={defenderStyle}>{defenderName}</span>{' '}
            {modeBadge}
          </span>
        </>
      )}
    </div>
  )
}
