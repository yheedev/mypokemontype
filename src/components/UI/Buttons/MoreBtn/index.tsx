'use client'

import { useTranslation } from 'react-i18next'
import Pokeball from '@/assets/Pokeball.svg'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { PATH } from '@/app/routes'
import { themeToggle } from '@/lib/StyleClassUtil'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/UI/Tooltip'

export default function MoreBtn() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleClick = () => {
    router.push(PATH().more)
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            aria-label={t('a11y.MoreBtn.aria-label')}
            className="btnShadow inline-flex items-center justify-center border-none bg-none leading-none"
          >
            <Pokeball
              className={cn(
                themeToggle,
                'flex h-[3.2rem] w-[3.2rem] items-center',
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-sm font-medium">
          {t('a11y.MoreBtn.aria-label')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
// import { ReactComponent as Pokeball } from 'img/Pokeball.svg'
// import { RootState } from 'stores/store'
// import { useSelector } from 'react-redux'
// import { toggleStyles } from './DarkModeBtn'

// export const MoreBtn = () => {
//   const navigate = useNavigate()
//   const lang = useSelector((state: RootState) => state.language.lang)
//   const isDarkMode = useSelector(
//     (state: RootState) => state.darkMode.theme === 'dark',
//   )

//   const goToMore = () => {
//     navigate(`/${lang}/more`)
//   }
//   return (
//     <Btn
//       onClick={goToMore}
//       aria-label="<My Pokemon Type> 프로젝트 개발자의 연락처 정보가 있는 페이지로 이동합니다."
//     >
//       <PokeballIcon
//         isDarkMode={isDarkMode}
//         className="Pokeball moreIcon shadow-bl"
//       />
//     </Btn>
//   )
// }

// const Btn = styled.button`
//   background: none;
//   border: none;
// `

// const PokeballIcon = styled(Pokeball).withConfig({
//   shouldForwardProp: (prop) => !['isDarkMode'].includes(prop),
// })<{ isDarkMode: boolean }>`
//   ${toggleStyles}
//   width: 3.12rem;
//   height: 3.12rem;
//   align-items: center;
//   display: flex;
// `

// export default MoreBtn
