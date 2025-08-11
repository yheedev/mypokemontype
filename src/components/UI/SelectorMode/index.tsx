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
import {
  modeStyle,
  getLangClass,
  getActiveMode,
  modeTextStyle,
} from '@/lib/StyleClassUtil'

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
    <>
      <div className="color-[--text] grid cursor-pointer grid-cols-2 justify-evenly font-extrabold">
        <Link
          href={PATH().offense}
          aria-label={t('a11y.selectorMode.offense.aria-label')}
          aria-current={pathname === PATH().offense ? 'page' : undefined}
          aria-selected={mode === 'offense'}
          onClick={() => handleSelect('offense')}
          className={cn(
            modeStyle,
            getLangClass(lang),
            getActiveMode('offense', mode),
          )}
        >
          <span
            className={cn(
              modeTextStyle,
              getLangClass(lang),
              mode === 'offense',
              'mr-3',
            )}
          >
            {t('Mode.offense')}
          </span>
        </Link>
        <Link
          href={PATH().defense}
          aria-label={t('a11y.selectorMode.defense.aria-label')}
          aria-current={pathname === PATH().defense ? 'page' : undefined}
          aria-selected={mode === 'defense'}
          onClick={() => handleSelect('defense')}
          className={cn(
            getActiveMode('defense', mode),
            modeStyle,
            'border-l-2 border-l-[var(--border)]',
          )}
        >
          <span
            className={cn(
              modeTextStyle,
              getLangClass(lang),
              mode === 'defense',
              'ml-4',
            )}
          >
            {t('Mode.defense')}
          </span>
        </Link>
      </div>
      <div className="border-b-2 border-[var(--border)]">
        <div
          className={cn(
            'col-span-1 text-center tracking-[0.5px] break-words whitespace-normal',
            'my-7 text-[0.95rem] font-bold',
            'sm:text-[1.5rem] sm:font-extrabold',
            lang === 'ko' ? 'break-keep' : 'break-normal',
          )}
        >
          <span>
            {mode === 'offense' ? t('Mode.offenseInfo') : t('Mode.defenseInfo')}
          </span>
        </div>
      </div>
    </>
  )
}
