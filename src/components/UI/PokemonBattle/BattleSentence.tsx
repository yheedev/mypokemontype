'use client'

import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { cn } from '@/lib/utils'
import { hasFinalConsonant } from '@/utils/koParticle'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'

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

  const modeBadge = (label: string) => (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'rounded-[6px] border border-dashed border-[rgba(212,168,0,.4)]',
        'bg-[rgba(212,168,0,.08)] hover:bg-[rgba(212,168,0,.15)]',
        'px-2 py-[1px]',
        'text-[15px] font-bold text-[#d4a800]',
        'cursor-pointer transition-colors duration-200',
      )}
    >
      <span>{label}</span>
      <span className="text-[10px] opacity-60">▾</span>
    </span>
  )

  return (
    <div className="mt-7 flex flex-wrap items-center justify-center gap-[5px] px-2 py-1 text-[15px] text-[var(--text)]">
      {lang !== 'en' ? (
        // ko + ja: 주어 - 조사 - 목적어 - 조사 - 부사 - 동사 (어순 동일)
        <>
          <span className="font-bold text-[#e84040] capitalize opacity-100">
            {attackerName}
          </span>
          <span>
            {t(
              hasFinalConsonant(attackerName)
                ? 'Battle.subjectParticle_batchim'
                : 'Battle.subjectParticle_no_batchim',
            )}
          </span>
          {lang === 'ko' && <span className="basis-full sm:hidden" />}
          <span className="font-bold text-[#4a9eff] capitalize opacity-100">
            {defenderName}
          </span>
          <span>
            {t(
              hasFinalConsonant(defenderName)
                ? 'Battle.objectParticle_batchim'
                : 'Battle.objectParticle_no_batchim',
            )}
          </span>
          {modeBadge(t('Battle.modeEffectively'))}
          <span>{t('Battle.attacks')}</span>
        </>
      ) : (
        // en: 주어 - 동사 - 목적어 - 부사 (어순 다름)
        <>
          <span className="font-bold text-[#e84040] capitalize opacity-100">
            {attackerName}
          </span>
          <span>{t('Battle.attacks')}</span>
          <span className="font-bold text-[#4a9eff] capitalize opacity-100">
            {defenderName}
          </span>
          {modeBadge(t('Battle.modeEffectively'))}
        </>
      )}
    </div>
  )
}
