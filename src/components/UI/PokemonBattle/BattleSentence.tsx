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
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 px-2 py-1 text-[1rem] text-[var(--text)] sm:mt-6 sm:gap-1.5 sm:text-[1.2rem]">
      {lang !== 'en' ? (
        // ko + ja: name+particle을 같은 span으로 합쳐 inline 렌더링 (flex item 끝 공백 collapse 방지)
        // 단어 간격은 flex gap으로 처리
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
          {modeBadge(t('Battle.modeEffectively'))}
          <span>{t('Battle.attacks')}</span>
        </>
      ) : (
        // en: phrase 단위로 묶어 JSX {' '}로 공백 처리
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
            {modeBadge(t('Battle.modeEffectively'))}
          </span>
        </>
      )}
    </div>
  )
}
