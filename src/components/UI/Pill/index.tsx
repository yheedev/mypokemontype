import { TypeName } from '@/constants/pokemon'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export type TypeNameElement = (typeof TypeName)[number]

interface Props {
  className?: string
  pokemonTypeName: TypeNameElement
  onClick?: (isActive: boolean) => void // 클릭했을 때에 불리언 값 전달하는 용도
  isActive?: boolean // 타입 버튼 클릭 여부를 시각적으로 확인 가능
  isDarkMode?: boolean
  upToTwo?: (type: string) => void // ContainerTypes 컴포넌트에서 upToTwo 함수를 props로 전달
  animation: boolean
  size?: 'md' | 'sm'
}

export const Pill = ({
  pokemonTypeName,
  onClick,
  upToTwo,
  isDarkMode,
  isActive,
  animation = true,
  size = 'md',
}: Props) => {
  const handleActivate = () => {
    onClick && onClick(!isActive)
    pokemonTypeName && upToTwo && upToTwo(pokemonTypeName)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleActivate()
    const target = e.currentTarget
    target.blur()
    if ('ontouchstart' in window) {
      setTimeout(() => target.blur(), 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleActivate()
    }
  }
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  return (
    <div
      className={cn(
        'pillShadow',
        isDarkMode ? 'shadowPill' : 'shadowBtn',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      <div
        lang={lang}
        role={onClick ? 'checkbox' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-checked={onClick ? isActive : undefined}
        aria-label={t(`TypeName.${pokemonTypeName}`)}
        onClick={handleClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        className={cn(
          'group relative flex items-center justify-center overflow-hidden rounded-[30px] text-[var(--color-background)]',
          'duration-200 transition-all ease-in-out',
          size === 'md' && 'sm:h-[3.1rem] sm:w-[6.8rem] sm:border-[7px] md:border-[6px] h-[2.6rem] w-[4.8rem] border-[4.5px]',
          size === 'sm' && 'sm:h-[3.1rem] sm:w-[6.8rem] sm:border-[7px] md:border-[6px] h-[2rem] w-[3.8rem] border-[3.5px]',
          isActive ? 'z-10' : 'z-0',
          onClick ? 'cursor-pointer' : 'cursor-default',
        )}
        style={{
          borderColor: `var(--${pokemonTypeName})`,
          backgroundColor: animation
            ? `var(--color-card)`
            : isActive
              ? `var(--${pokemonTypeName})`
              : `var(--color-card)`,
        }}
      >
        {animation && (
          <div
            className={cn(
              'pointer-events-none absolute bottom-0 left-0 h-full w-full transition-transform duration-300 ease-in-out',
              'xl:group-hover:translate-y-0', // PC에서만 hover 효과
              isActive ? 'translate-y-0' : 'translate-y-full',
            )}
            style={{
              backgroundColor: `var(--${pokemonTypeName})`,
            }}
          />
        )}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <span
            className={cn(
              "font-['Noto_Sans_KR'] font-black",
              isActive ? `dark:text-[var(--card)]` : 'text-[var(--color-text)]',
              size === 'md' && [
                'text-[0.85rem] sm:text-base',
                lang === 'ko' ? 'tracking-[2px] sm:tracking-[4px] md:tracking-[2px]' : 'tracking-[0.5px] sm:tracking-[1.5px] md:tracking-[1px]',
                lang === 'ja' ? 'text-[0.8rem]' : 'sm:font-bold',
              ],
              size === 'sm' && [
                'text-[0.7rem] sm:text-base',
                lang === 'ko' ? 'tracking-[1px] sm:tracking-[4px] md:tracking-[2px]' : 'tracking-[0.3px] sm:tracking-[1.5px] md:tracking-[1px]',
                lang === 'ja' ? 'text-[0.65rem] sm:text-[0.8rem]' : 'sm:font-bold',
              ],
            )}
          >
            {t(`TypeName.${pokemonTypeName}`)}
          </span>
        </div>
      </div>
    </div>
  )
}

// pill 폰트 크기
// pc
// border 7px
// font-size: 1rem;
// letter-spacing: ${({ lang }) => (lang === 'ko' ? '4px' : '1.5px')};
// 태블릿
// border 6px
// font-size: 1rem
// font-weight: 500
// letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '1px')};n
// 모바일
// border 4.5px
// font-size: 0.85rem
// font-weight: ${({ lang }) => (lang === 'jp' ? '1000' : '300')};

// TODO
// [x] hover 트랜지션 추가
// [x] 다크모드일 경우 선택되었을 때 글씨 컬러 card로 바꾸기
// [x] 모바일 버전에서 일관적인 크기, border 유지
// [x] shadow 클래스화
// [x] props에 따라 shadow 클래스 변경

// const Pill = styled.button.withConfig({
//   shouldForwardProp: (prop) =>
//     !['borderColor', 'isActive', 'isDarkMode'].includes(prop),
// })<Props>`
//   //border: 7px solid ${({ borderColor }) => borderColor};
//   //width: 6.8em;
//   //height: 3.1rem;
//   //color: var(--color-background);
//   //border-radius: 30px;
//   // background-color: ${({ borderColor, isActive }) =>
//   // isActive ? borderColor : 'var(--color-card)'};
//   //cursor: ${({ cursor }) => cursor};

//   .TypeText {
//     //font-family: 'Noto Sans KR', sans-serif;
//     //font-size: 1rem;
//     //letter-spacing: ${({ lang }) => (lang === 'ko' ? '4px' : '1.5px')};
//     //padding-top: 0.5rem;
//     //color: ${({ isDarkMode, isActive }) =>
//       //isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)'};
//   }

//   @media (min-width: 768px) and (min-width: 1023px) {
//     //border: 6px solid ${({ borderColor }) => borderColor};

//     .TypeText {
//       //font-weight: 500;
//       //letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '1px')};n
//     }
//   }

//   @media (min-width: 280px) and (max-width: 767px) {
//     // width: 4.8rem;
//     // height: 2.6rem;
//     // border: 4.5px solid ${({ borderColor }) => borderColor};

//     .TypeText {
//       //font-size: 0.85rem;
//       //font-weight: ${({ lang }) => (lang === 'jp' ? '1000' : '300')};
//       //letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '0.5px')};
//     }
//   }
// `

// export { PokemonType, Type }

// export type TypeNameElement = (typeof TypeName)[number]

// interface Props {
//   className?: string
//   text?: string
//   borderColor: string
//   onClick?: (isActive: boolean) => void // 클릭했을 때에 불리언 값 전달하는 용도
//   isActive?: boolean // 타입 버튼 클릭 여부를 시각적으로 확인 가능
//   isDarkMode: boolean
//   upToTwo?: (type: string) => void // ContainerTypes 컴포넌트에서 upToTwo 함수를 props로 전달
//   cursor?: string
// }

// const PokemonType = ({
//   text,
//   borderColor,
//   onClick,
//   upToTwo,
//   isDarkMode,
//   isActive,
// }: Props) => {
//   const handleClick = () => {
//     onClick && onClick(!isActive)
//     text && upToTwo && upToTwo(text)
//   }
//   const lang = useSelector((state: RootState) => state.language.lang)

//   return (
//     <Type
//       className={`pill ${isActive ? 'active' : ''} ${isDarkMode ? 'shadow-btn' : 'shadow-bl'}`}
//       lang={lang}
//       borderColor={borderColor}
//       onClick={handleClick}
//       isDarkMode={isDarkMode}
//       isActive={isActive}
//       cursor={onClick ? 'pointer' : 'default'}
//     >
//       <span className="TypeText">{text}</span>
//     </Type>
//   )
// }

// const Type = styled.button.withConfig({
//   shouldForwardProp: (prop) =>
//     !['borderColor', 'isActive', 'isDarkMode'].includes(prop),
// })<Props>`
//   border: 7px solid ${({ borderColor }) => borderColor};
//   width: 6.8em;
//   height: 3.1rem;
//   color: var(--color-background);
//   border-radius: 30px;
//   background-color: ${({ borderColor, isActive }) =>
//     isActive ? borderColor : 'var(--color-card)'};
//   cursor: ${({ cursor }) => cursor};

//   .TypeText {
//     font-family: 'Noto Sans KR', sans-serif;
//     font-size: 1rem;
//     letter-spacing: ${({ lang }) => (lang === 'ko' ? '4px' : '1.5px')};
//     padding-top: 0.5rem;
//     color: ${({ isDarkMode, isActive }) =>
//       isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)'};
//   }

//   @media (min-width: 768px) and (min-width: 1023px) {
//     border: 6px solid ${({ borderColor }) => borderColor};

//     .TypeText {
//       font-weight: 500;
//       letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '1px')};
//     }
//   }

//   @media (min-width: 280px) and (max-width: 767px) {
//     width: 4.8rem;
//     height: 2.6rem;
//     border: 4.5px solid ${({ borderColor }) => borderColor};

//     .TypeText {
//       font-size: 0.85rem;
//       font-weight: ${({ lang }) => (lang === 'jp' ? '1000' : '300')};
//       letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '0.5px')};
//     }
//   }
// `

// export { PokemonType, Type }

// import styled from 'styled-components'
// import { TypeName } from 'features/types'
// import { useSelector } from 'react-redux'
// import { RootState } from 'stores/store'
