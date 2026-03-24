'use client'

import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { cn } from '@/lib/utils'
import type { PokemonSlotData } from '@/stores/usePokemonSlotStore'

interface BattleSentenceProps {
  attackerData: PokemonSlotData | null
  defenderData: PokemonSlotData | null
}

/** 한국어 받침 유무에 따라 주격 조사 반환 */
function getKoSubjectParticle(name: string): '이' | '가' {
  const code = name.charCodeAt(name.length - 1)
  if (code < 0xac00 || code > 0xd7a3) return '가'
  return (code - 0xac00) % 28 !== 0 ? '이' : '가'
}

export function BattleSentence({ attackerData, defenderData }: BattleSentenceProps) {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  const attackerName = attackerData?.displayName ?? t('Battle.myPokemon')
  const defenderName = defenderData?.displayName ?? t('Battle.otherPokemon')

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-1',
        'rounded-[14px] border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 shadow-sm',
        'text-sm text-[var(--text)]',
      )}
    >
      {lang === 'ko' && (
        <>
          <span className="font-bold capitalize text-[var(--offenseRec)]">{attackerName}</span>
          <span className="opacity-70">{getKoSubjectParticle(attackerName)}</span>
          <span className="font-bold capitalize text-[var(--defenseRec)]">{defenderName}</span>
          <span className="opacity-70">를 공격합니다</span>
        </>
      )}
      {lang === 'en' && (
        <>
          <span className="font-bold capitalize text-[var(--offenseRec)]">{attackerName}</span>
          <span className="opacity-70">attacks</span>
          <span className="font-bold capitalize text-[var(--defenseRec)]">{defenderName}</span>
        </>
      )}
      {lang === 'ja' && (
        <>
          <span className="font-bold capitalize text-[var(--offenseRec)]">{attackerName}</span>
          <span className="opacity-70">が</span>
          <span className="font-bold capitalize text-[var(--defenseRec)]">{defenderName}</span>
          <span className="opacity-70">を攻撃します</span>
        </>
      )}
    </div>
  )
}
