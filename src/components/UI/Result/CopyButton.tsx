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
import { toast } from 'sonner'
import * as Tooltip from '@radix-ui/react-tooltip'
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
  const actionLabel = t(
    mode === 'offense' ? 'Battle.attacks' : 'Battle.defenses',
  )

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
      ? mode === 'offense'
        ? 'Battle.objectParticle_batchim'
        : 'Battle.objectParticle_defense_batchim'
      : mode === 'offense'
        ? 'Battle.objectParticle_no_batchim'
        : 'Battle.objectParticle_defense_no_batchim',
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
  const sentence = buildSentence(
    t,
    lang,
    mode,
    selectedMode,
    attackerName,
    defenderName,
  )
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
  const foe = usePokemonSlotStore((s) => s.foe)
  const isLeftAttacker = usePokemonSlotStore((s) => s.isLeftAttacker)

  const isOffense = isOffensePath(pathname, lang)
  const mode: Mode = isOffense ? 'offense' : 'defense'

  const attackerSlot = isLeftAttacker ? slotA : foe
  const defenderSlot = isLeftAttacker ? foe : slotA
  const canCopy = isOffense ? attackerSlot !== null : defenderSlot !== null

  const attackerName = attackerSlot?.displayName || t('Battle.myPokemon')
  const defenderName = defenderSlot?.displayName || t('Battle.otherPokemon')

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!canCopy) {
      toast(t(mode === 'offense' ? 'Result.offenseError' : 'Result.defenseError'))
      return
    }
    const text = buildCopyText(
      t,
      lang,
      mode,
      selectedMode,
      attackerName,
      defenderName,
      sortedArray,
    )
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    toast(t('Result.copy'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          onClick={handleCopy}
          aria-label={t('a11y.CopyBtn.aria-label')}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
            'text-xs font-medium transition-colors duration-150',
            canCopy
              ? 'text-[var(--text)] opacity-40 hover:opacity-80'
              : 'cursor-not-allowed text-[var(--text)] opacity-20',
          )}
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={6}
          className={cn(
            'rounded-md bg-[var(--text)] px-2 py-1',
            'text-xs text-[var(--background)]',
            'animate-in fade-in-0 zoom-in-95',
          )}
        >
          {t('a11y.CopyBtn.aria-label')}
          <Tooltip.Arrow className="fill-[var(--text)]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
