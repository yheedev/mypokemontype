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
import { getLangClass } from '@/lib/StyleClassUtil'

export default function SelectorMode() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  const { selectedTypes } = useUpToTwoStore()
  const offenseCal = useOffenseCalStore((state) => state.calculate)
  const defenseCal = useDefenseCalStore((state) => state.calculate)

  const [mode, setMode] = useState<Mode>(getModeByPath(pathname, lang))
  const [bounceClass, setBounceClass] = useState<'bounce-left' | 'bounce-right' | ''>('')

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
    setBounceClass(next === MODE.offense ? 'bounce-left' : 'bounce-right')
    setMode(next)
    router.push(next === MODE.offense ? PATH().offense : PATH().defense)
  }

  const tabs = [
    {
      value: MODE.offense,
      href: PATH().offense,
      label: t('Mode.offense'),
      ariaLabel: t('a11y.selectorMode.offense.aria-label'),
    },
    {
      value: MODE.defense,
      href: PATH().defense,
      label: t('Mode.defense'),
      ariaLabel: t('a11y.selectorMode.defense.aria-label'),
    },
  ] as const

  const sliderStyle =
    mode === MODE.offense
      ? 'translate-x-0 bg-gradient-to-r from-[#b03030] to-[var(--offenseRec)] shadow-[0_0_10px_rgba(227,78,78,.3)]'
      : 'translate-x-full bg-gradient-to-r from-[#3d6b80] to-[var(--defenseRec)] shadow-[0_0_10px_rgba(104,151,169,.3)]'

  return (
    <div
      role="tablist"
      className={cn(
        'relative grid grid-cols-2 p-2 bg-[var(--card)] rounded-[14px] select-none overflow-hidden',
        bounceClass,
      )}
      onAnimationEnd={() => setBounceClass('')}
    >
      <span
        className={cn(
          'absolute top-2 left-2 h-[calc(100%-16px)] w-[calc(50%-8px)] rounded-[7px] transition-transform duration-[350ms] ease-[cubic-bezier(.34,1.2,.64,1)]',
          sliderStyle,
        )}
      />

      {tabs.map((tab) => {
        const isActive = mode === tab.value
        return (
          <Link
            key={tab.value}
            href={tab.href}
            role="tab"
            aria-label={tab.ariaLabel}
            aria-selected={isActive}
            onClick={() => handleSelect(tab.value)}
            className={cn(
              'relative z-10 grid place-content-center h-[42px] rounded-[8px] text-[17px] font-black tracking-[.08em] whitespace-nowrap transition-colors duration-300 sm:h-[46px] sm:text-[18px] lg:h-[52px] lg:text-[20px]',
              getLangClass(lang),
              isActive ? 'text-white' : 'text-[var(--disable-text)]',
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
