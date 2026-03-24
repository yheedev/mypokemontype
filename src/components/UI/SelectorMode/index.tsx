import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { useOffenseCalStore } from '@/stores/useOffenseCalStore'
import { useDefenseCalStore } from '@/stores/useDefenseCalStore'
import Link from 'next/link'
import { PATH } from '@/app/routes'
import { MODE, Mode } from '@/constants/mode'
import { getModeByPath } from '@/utils/pathMode'
import { modeStyle, getLangClass } from '@/lib/StyleClassUtil'

export default function SelectorMode() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  const { selectedTypes } = useUpToTwoStore()
  const offenseCal = useOffenseCalStore((state) => state.calculate)
  const defenseCal = useDefenseCalStore((state) => state.calculate)

  const [mode, setMode] = useState<Mode>(getModeByPath(pathname, lang))

  useEffect(() => {
    setMode(getModeByPath(pathname, lang))
  }, [pathname, lang])

  useEffect(() => {
    const [type1, type2] = selectedTypes
    mode === 'offense'
      ? offenseCal({ type1, type2 })
      : defenseCal({ type1, type2 })
  }, [selectedTypes, mode])

  const handleSelect = (next: Mode) => {
    if (mode === next) return
    setMode(next)
    router.push(next === MODE.offense ? PATH().offense : PATH().defense)
  }

  return (
    <div className="relative flex w-full rounded-[22px] bg-[var(--card)] py-[4px] select-none">
      <span
        className={cn(
          'absolute top-[4px] h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-[10px] transition-all duration-[350ms] ease-[cubic-bezier(.34,1.2,.64,1)]',
          mode === 'offense'
            ? 'left-[4px] translate-x-0 bg-gradient-to-r from-[#b03030] to-[var(--offenseRec)] shadow-[0_0_10px_rgba(227,78,78,.3)]'
            : 'left-[4px] translate-x-full bg-gradient-to-r from-[#3d6b80] to-[var(--defenseRec)] shadow-[0_0_10px_rgba(104,151,169,.3)]',
        )}
      />

      <Link
        href={PATH().offense}
        aria-label={t('a11y.selectorMode.offense.aria-label')}
        aria-current={pathname === PATH().offense ? 'page' : undefined}
        aria-selected={mode === 'offense'}
        onClick={() => handleSelect('offense')}
        className={cn(
          modeStyle,
          getLangClass(lang),
          mode === 'offense' ? 'text-white' : 'text-[var(--disable)]',
        )}
      >
        {t('Mode.offense')}
      </Link>

      <Link
        href={PATH().defense}
        aria-label={t('a11y.selectorMode.defense.aria-label')}
        aria-current={pathname === PATH().defense ? 'page' : undefined}
        aria-selected={mode === 'defense'}
        onClick={() => handleSelect('defense')}
        className={cn(
          modeStyle,
          getLangClass(lang),
          mode === 'defense' ? 'text-white' : 'text-[var(--disable)]',
        )}
      >
        {t('Mode.defense')}
      </Link>
    </div>
  )
}
