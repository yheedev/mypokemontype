import { TypeName } from '@/constants/pokemon'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export type TypeNameElement = (typeof TypeName)[number]

interface Props {
  className?: string
  pokemonTypeName: TypeNameElement
  borderColor: string
  onClick?: (isActive: boolean) => void // 클릭했을 때에 불리언 값 전달하는 용도
  isActive?: boolean // 타입 버튼 클릭 여부를 시각적으로 확인 가능
  isDarkMode?: boolean
  upToTwo?: (type: string) => void // ContainerTypes 컴포넌트에서 upToTwo 함수를 props로 전달
  cursor?: string
  animation: boolean
}

export const Pill = ({
  pokemonTypeName,
  borderColor,
  onClick,
  upToTwo,
  isDarkMode,
  isActive,
  animation = true,
}: Props) => {
  const handleClick = () => {
    onClick && onClick(!isActive)
    pokemonTypeName && upToTwo && upToTwo(pokemonTypeName)
  }
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  return (
    <div
      lang={lang}
      onClick={handleClick}
      aria-label={t(`TypeName.${pokemonTypeName}`)}
      className={cn(
        'group pillShadow relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[30px] text-[var(--color-background)]',
        'dutation-200 transition-all ease-in-out',
        'sm:h-[3.1rem] sm:w-[6.8rem] sm:border-[7px]', // pc
        'md:border-6px', // 태블릿
        'h-[2.6rem] w-[4.8rem] border-[4.5px]', // 모바일

        isDarkMode ? 'shadowPill' : 'shadowBtn',
        onClick ? 'cursor-pointer' : 'cursor-default',
        isActive ? 'z-10' : 'z-0',
      )}
      style={{
        borderColor: `var(--${pokemonTypeName})`,
        backgroundColor: isActive
          ? `var(--${pokemonTypeName})`
          : `var(--color-card)`,
      }}
    >
      <div
        className={cn(
          'absolute bottom-0 left-0 h-full w-full transition-transform duration-300 ease-in-out',
          animation
            ? isActive
              ? 'translate-y-0'
              : 'translate-y-full group-hover:translate-y-0'
            : 'translate-y-0',
        )}
        style={{
          backgroundColor: animation
            ? `var(--${pokemonTypeName})`
            : 'var(--color-card)',
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <span
          className={cn(
            'font-[Noto Sans KR] text-[0.85rem] font-black sm:text-base',
            isActive ? `dark:text-[var(--card)]` : 'bg-color-card',
            lang === 'ko'
              ? 'tracking-[2px] sm:tracking-[4px] md:tracking-[2px]'
              : 'tracking-[0.5px] sm:tracking-[1.5px] md:tracking-[1px]',
            lang === 'ja' ? 'font-black' : 'font-black sm:font-bold',
          )}
        >
          {t(`TypeName.${pokemonTypeName}`)}
        </span>
      </div>
    </div>
  )
}

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
