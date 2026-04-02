'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { usePokemonSlotStore } from '@/stores/usePokemonSlotStore'
import { useBattleSentenceModeStore } from '@/stores/useBattleSentenceModeStore'
import type { BattleSentenceMode } from '@/stores/useBattleSentenceModeStore'
import { hasFinalConsonant } from '@/utils/koParticle'
import { isOffensePath } from '@/utils/pathMode'
import { cn } from '@/lib/utils'
import type { TypeNameElement } from '@/constants/pokemon'
import type { Mode } from '@/constants/mode'
import type { TFunction } from 'i18next'

type SortedEntry = [string, TypeNameElement[]]

interface CopyButtonProps {
  sortedArray: SortedEntry[]
}

function buildSentence(
  t: TFunction,
  lang: string,
  mode: Mode,
  selectedMode: BattleSentenceMode,
  attackerName: string,
  defenderName: string,
): string {
  const modeLabel = t(selectedMode)
  const actionLabel = t(mode === 'offense' ? 'Battle.attacks' : 'Battle.defenses')

  if (lang === 'en') {
    return `${attackerName} ${actionLabel} ${defenderName} ${modeLabel}`
  }

  const subjectParticle = t(
    hasFinalConsonant(attackerName)
      ? 'Battle.subjectParticle_batchim'
      : 'Battle.subjectParticle_no_batchim',
  )
  const objectParticle = t(
    hasFinalConsonant(defenderName)
      ? (mode === 'offense' ? 'Battle.objectParticle_batchim' : 'Battle.objectParticle_defense_batchim')
      : (mode === 'offense' ? 'Battle.objectParticle_no_batchim' : 'Battle.objectParticle_defense_no_batchim'),
  )
  const sep = lang === 'ja' ? '' : ' '
  return `${attackerName}${subjectParticle}${sep}${defenderName}${objectParticle}${sep}${modeLabel}${sep}${actionLabel}`
}

function buildCopyText(
  t: TFunction,
  lang: string,
  mode: Mode,
  selectedMode: BattleSentenceMode,
  attackerName: string,
  defenderName: string,
  sortedArray: SortedEntry[],
): string {
  const sentence = buildSentence(t, lang, mode, selectedMode, attackerName, defenderName)
  const rows = sortedArray.map(([key, types]) => {
    const typeNames = types.map((type) => t(`TypeName.${type}`)).join(', ')
    return `- ${key}${t('Result.x damage')}: ${typeNames}`
  })
  return [sentence, '', ...rows].join('\n')
}

export function CopyButton({ sortedArray }: CopyButtonProps) {
  const { t } = useTranslation()
  const lang = useLanguageStore((s) => s.lang)
  const pathname = usePathname()
  const { selectedMode } = useBattleSentenceModeStore()
  const slotA = usePokemonSlotStore((s) => s.slotA)
  const slotB = usePokemonSlotStore((s) => s.slotB)
  const isLeftAttacker = usePokemonSlotStore((s) => s.isLeftAttacker)

  const isOffense = isOffensePath(pathname, lang)
  const mode: Mode = isOffense ? 'offense' : 'defense'

  const attackerSlot = isLeftAttacker ? slotA : slotB
  const defenderSlot = isLeftAttacker ? slotB : slotA
  const canCopy = isOffense ? attackerSlot !== null : defenderSlot !== null

  const attackerName = attackerSlot?.displayName || t('Battle.myPokemon')
  const defenderName = defenderSlot?.displayName || t('Battle.otherPokemon')

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = buildCopyText(t, lang, mode, selectedMode, attackerName, defenderName, sortedArray)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!canCopy}
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
        'text-xs font-medium transition-colors duration-150',
        canCopy
          ? 'text-[var(--text)] opacity-40 hover:opacity-80'
          : 'cursor-not-allowed text-[var(--text)] opacity-20',
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}
