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
      <div className="color-[--text] mt-1 grid cursor-pointer grid-cols-2 justify-evenly font-extrabold">
        {' '}
        {/** .Option */}
        <Link
          href={PATH().offense}
          aria-label={t('a11y.selectorMode.offense.aria-label')}
          aria-current={pathname === PATH().offense ? 'page' : undefined}
          aria-selected={mode === 'offense'}
          onClick={() => handleSelect('offense')}
          /** .Offense / OptionOffense */
          className={cn(
            modeStyle,
            // [x] UI 수정 후 유틸 클래스1 분리
            getLangClass(lang),
            // [x] UI 수정 후 유틸 클래스2 분리
            getActiveMode('offense', mode),
            // [x] UI 수정 후 유틸 클래스3 분리
          )}
        >
          {/* <Link
            href={PATH().offense}
            aria-label={t('a11y.selectorMode.offense')}
            aria-current={pathname === PATH().offense ? 'page' : undefined}
            aria-selected={mode === 'offense'}
            onClick={() => handleSelect('offense')}
          > */}
          <span
            className={cn(
              modeTextStyle,
              // [x] UI 수정 후 유틸 클래스4 분리
              getLangClass(lang),
              // [x] UI 수정 후 유틸 클래스2 분리
              mode === 'offense',
            )}
          >
            {' '}
            {/**  .OptionText .OffenseText / OptionText OffenseText */}
            {t('Mode.offense')}
          </span>
        </Link>
        <Link
          href={PATH().defense}
          aria-label={t('a11y.selectorMode.defense.aria-label')}
          aria-current={pathname === PATH().defense ? 'page' : undefined}
          aria-selected={mode === 'defense'}
          onClick={() => handleSelect('defense')}
          /** .Defense / OptionDefense */
          className={cn(
            // [x] UI 수정 후 유틸 클래스1 분리
            lang === 'ko'
              ? 'indent-[1.25rem] tracking-[7px]'
              : 'tracking-[3px]',
            getActiveMode('defense', mode),
            // [x] UI 수정 후 유틸 클래스3 분리
            modeStyle,
            'border-l-2 border-l-[var(--border)]',
          )}
        >
          <span
            className={cn(
              modeTextStyle,
              // [x] UI 수정 후 유틸 클래스4 분리
              getLangClass(lang),
              // [x] UI 수정 후 유틸 클래스2 분리
              mode === 'defense',
            )}
          >
            {' '}
            {/** OptionText DefenseText */}
            {t('Mode.defense')}
          </span>
        </Link>
      </div>
      <div className="border-b-2 border-[var(--border)]">
        {/* .InfoContainer */}

        <div
          // .info
          className={cn(
            'col-span-1 text-center break-words whitespace-normal',
            'my-10 text-[0.95rem] leading-[1.2] font-bold lg:pt-2.5', // 모바일 기본
            'sm:pt-6 sm:text-[1.5rem] sm:font-extrabold', // PC
            // 'pt-0.5rem align-center col-span-1 mb-2 flex justify-around px-10 pb-2 text-center break-words whitespace-normal',
            // 'sm:text-2xl sm:font-bold lg:mb-4 lg:px-0 lg:py-6 lg:text-xs lg:font-extrabold',
            // pc 28xp / 태블릿, 모바일 19px
            lang === 'ko'
              ? 'tracking-[1.5px] break-keep'
              : 'tracking-[0.5px] break-normal',
          )}
        >
          <span className="">
            {mode === 'offense' ? t('Mode.offenseInfo') : t('Mode.defenseInfo')}
          </span>
        </div>
      </div>
    </>
  )
}

// TODO
// [ ] 방어 텍스트만 왼쪽으로 기울어져있음
// [ ] info 텍스트 크기 반응형으로 조절
