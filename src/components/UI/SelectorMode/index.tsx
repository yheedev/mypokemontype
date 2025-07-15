import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'

export default function SelectorMode() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  const { lang } = useLanguageStore()
  const [mode, setMode] = useState<'offense' | 'defense'>('offense')

  useEffect(() => {
    setMode(pathname?.includes('/defense') ? 'defense' : 'offense')
  }, [pathname])
  // TODO
  // - [ ] 성능 측정해보고 useEffect 계속 쓸지 offenseCal/defenseCal에 모드 상태 추가할지 결정

  const onSelect = (newMode: 'offense' | 'defense') => {
    setMode(newMode)
    router.push(newMode === 'offense' ? `/${lang}` : `/${lang}/defense`)
  }

  return (
    <>
      <div className="mt-1 grid cursor-pointer grid-cols-2 justify-evenly font-['Noto_Sans_KR'] text-2xl font-black">
        {' '}
        {/** .Option */}
        <div /** .Offense / OptionOffense */
          className={cn(
            'flex items-center justify-center justify-items-center border-t-0 border-r-0 border-l-0 px-[4rem] py-2 pb-6 text-center align-middle md:py-2 lg:pt-2',
            lang === 'ko' ? 'indent-5 tracking-[7px]' : 'tracking-[3px]',
            mode === 'offense'
              ? 'border-b-[4px] border-[var(--offenseRec)] text-[var(--offenseRec)] lg:border-b-[7px]'
              : 'border-b-[2px] border-[var(--color-border)] text-[var(--color-text)]',
          )}
          onClick={() => onSelect('offense')}
        >
          <span
            className={cn(
              'mr-[0.8rem] inline-block sm:mr-[1rem] sm:pb-2',
              lang === 'ko' ? 'indent-5 tracking-[7px]' : 'tracking-[2.5px]',
              mode === 'offense',
            )}
          >
            {' '}
            {/**  .OptionText .OffenseText / OptionText OffenseText */}
            {t('Mode.offense')}
          </span>
        </div>
        <div /** .Defense / OptionDefense */
          className={cn(
            'flex items-center justify-center justify-items-center border-t-0 border-r-0 border-l-2 py-2 pb-6 text-center align-middle md:py-2 lg:pt-2',
            lang === 'ko'
              ? 'indent-[1.25rem] tracking-[7px]'
              : 'tracking-[3px]',
            mode === 'defense'
              ? 'border-b-[4px] border-[var(--defenseRec)] text-[var(--defenseRec)] lg:border-b-[7px]'
              : 'border-b-[2px] border-[var(--color-border)] text-[var(--color-text)]',
          )}
          onClick={() => onSelect('defense')}
        >
          <span
            className={cn(
              'mr-[0.8rem] inline-block sm:mr-[1rem] sm:pb-2',
              lang === 'ko' ? 'indent-5 tracking-[7px]' : 'tracking-[2.5px]',
              mode === 'defense',
            )}
          >
            {' '}
            {/** OptionText DefenseText */}
            {t('Mode.defense')}
          </span>
        </div>
      </div>
      <div className="mx-4 mt-8 mb-6 border-b-2 border-solid sm:pb-4">
        {/* .InfoContainer */}

        <div
          // .info
          className={cn(
            'pt-0.5rem align-center col-span-1 mb-2 flex justify-around px-10 pb-2 text-center text-[0.9rem] font-normal break-words whitespace-normal lg:mb-6 lg:px-0 lg:py-6 lg:text-2xl lg:font-extrabold',
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
// [ ] 왜 가로로 안 넓어지는가..................
// [ ] 셀렉터 padding, margin 디테일 이후에 수정
