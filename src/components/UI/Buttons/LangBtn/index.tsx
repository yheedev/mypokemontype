'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/UI/Dialog'
// import { Button } from '@/components/ui/button' // shadcn 기본 Button

import { supportedLangs, Language } from '@/types/language'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'
import { initI18n } from '@/lib/i18n'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import Globe from '@/assets/Globe.svg'
import Divider from '@/components/UI/Divider'
import { useRouter, usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip'
import { themeToggle } from '@/lib/StyleClassUtil'

export default function LangBtn() {
  const { lang, setLanguage } = useLanguageStore()
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const changeLang = (l: Language) => {
    if (l === lang) return
    startTransition(async () => {
      await initI18n(l)
      setLanguage(l)

      const segments = pathname.split('/')
      segments[1] = l
      router.replace(segments.join('/'))
    })
  }

  return (
    <Dialog>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button
                // size="icon"
                aria-label={t(`a11y.LangBtn.aria-label`)}
                aria-haspopup="dialog"
                className="border-none bg-none"
                // className="rounded-full"
              >
                <Globe className={cn(themeToggle, 'stoke-[20] h-10 w-10')} />
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm font-medium">
            {t('a11y.LangBtn.aria-label')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="w-60 text-center">
        <h2 className="mb-4 text-lg font-bold">{t('language.settings')}</h2>

        {supportedLangs.map((l, i) => (
          <div key={l} className="flex w-full flex-col items-center">
            <DialogClose asChild>
              <button
                onClick={() => changeLang(l)}
                disabled={isPending || l === lang}
                aria-current={l === lang ? 'true' : undefined}
                className={cn(
                  'w-24 rounded-md px-2 py-1 text-center text-base font-semibold transition-colors',
                  l === lang
                    ? 'cursor-default text-[--offenseRec]/10 hover:cursor-default'
                    : 'text-[--color-modalText] hover:bg-[--offenseRec]/5 hover:text-[--offenseRec]',
                )}
              >
                {t(`language.${l}`)}
              </button>
            </DialogClose>
            {i < supportedLangs.length - 1 && <Divider />}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

// TODO

// [x] setting 텍스트 렌더링
// [x] 언어 선택 다시 하면 왜 메인페이지에서 방어 계산되는거임
// [ ] 이미 선택된 언어에 highlight/click disable
// [x] 새로고침해야 반영되는거 고치기
// [x] labelkey 사용 x
// [ ] 글로브 크기 조절
// [x] 다크/라이트 UI
// [ ] X 버튼 하단에 위치 우측상단/hover bg

// import styled from 'styled-components'
// import { useSelector } from 'react-redux'
// import { RootState } from 'stores/store'
// import { ReactComponent as Globe } from 'img/Globe.svg'
// import { toggleStyles } from './DarkModeBtn'
// import LangModal from 'components/LangModal'
// import { useState } from 'react'

// export const LangBtn = () => {
//   const [isModalOpen, setModalOpen] = useState(false)
//   const isDarkMode = useSelector(
//     (state: RootState) => state.darkMode.theme === 'dark',
//   )
//   const toggleModal = () => setModalOpen(!isModalOpen)

//   return (
//     <>
//       <Btn
//         onClick={toggleModal}
//         aria-label="클릭해서 한국어, 영어, 일본어 중 언어를 선택할 수 있습니다."
//       >
//         <GlobeIcon isDarkMode={isDarkMode} className="Globe shadow-bl" />
//       </Btn>
//       {isModalOpen && <LangModal onClose={toggleModal} />}
//     </>
//   )
// }

// const Btn = styled.button`
//   background: none;
//   border: none;
// `

// const GlobeIcon = styled(Globe).withConfig({
//   shouldForwardProp: (prop) => !['isDarkMode'].includes(prop),
// })<{ isDarkMode: boolean }>`
//   ${toggleStyles}
//   width: 2.5rem;
//   height: 2.5rem;
//   stroke: var(--color-toggle);
//   stroke-width: 16;
// `

// export default LangBtn
