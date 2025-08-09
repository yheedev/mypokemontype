'use client'

import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useOffenseCalStore } from '@/stores/useOffenseCalStore'
import { useDefenseCalStore } from '@/stores/useDefenseCalStore'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { Pill } from '@/components/UI/Pill'
import Card from '@/components/UI/Card'
import BestIcon from '@/components/UI/BestIcon'
import Divider from '@/components/UI/Divider'
import { TypeNameElement } from '@/constants/pokemon'
import { isOffensePath } from '@/utils/pathMode'
import { cn } from '@/lib/utils'
import { commonGrid } from '@/lib/StyleClassUtil'

export default function Result() {
  const lang = useLanguageStore((state) => state.lang)
  const pathname = usePathname()
  const { t } = useTranslation()

  const offenseResult = useOffenseCalStore((state) => state.result)
  const defenseResult = useDefenseCalStore((state) => state.result)
  const hasSelection = useUpToTwoStore((s) => s.selectedTypes.length > 0)

  const isOffense = isOffensePath(pathname, lang)
  const result = isOffense ? offenseResult : defenseResult

  const direction = isOffense ? -1 : 1

  const sortedArray = Object.entries(result)
    .filter(([, v]) => v.length > 0)
    .sort(([a], [b]) => direction * (Number(a) - Number(b)))

  return (
    <Card>
      <div
        className="flex flex-col rounded-[22px] bg-[--color-card] px-4 sm:px-6"
        aria-live="polite"
        aria-atomic="true"
        aria-label={
          isOffense
            ? t(`a11y.results.offense.aria-label`)
            : t(`a11y.results.defense.aria-label`)
        }
      >
        {sortedArray.map(([key, value], index, arr) => (
          <div key={key} className="mb-7">
            <div
              className={cn('flex flex-row-reverse items-center justify-end')}
            >
              {hasSelection && index === 0 && <BestIcon lang={lang} />}

              <h1 className="font-['Noto_Sans_KR'] text-xl font-black">
                {key}
                {t('Result.x damage')}
              </h1>
            </div>

            <Divider className="my-4" />

            <div className={cn(commonGrid)}>
              {(value as TypeNameElement[]).map((type) => (
                <Pill
                  animation={false}
                  key={type}
                  borderColor={`var(--${type})`}
                  cursor="default"
                  pokemonTypeName={type}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// 결과텍스트 글씨 크기
// pc
// font-size: 1.25rem;
//   font-weight: 1000;
// 모바일
// margin: 1em 0.64em 0rem;

// 베스트아이콘 크기

// import { useSelector } from 'react-redux'
// import { RootState } from 'stores/store'
// import styled from 'styled-components'
// import { PokemonType } from './PokemonType'
// import { Container } from './ContainerTypes'
// import { ReactComponent as Flame } from '../img/Flame.svg'
// import { useLocation } from 'react-router-dom'

// type ResultType = {
//   [key: string]: string[]
// }

// const Result = () => {
//   const lang = useSelector((state: RootState) => state.language.lang)
//   const location = useLocation()
//   const translate = useSelector(
//     (state: RootState) => state.language.translations,
//   )
//   const isDarkMode = useSelector(
//     (state: RootState) => state.darkMode.theme === 'dark',
//   )

//   const offenseResult = useSelector(
//     (state: RootState) => state.offenseCal.result as ResultType,
//   )
//   const defenseResult = useSelector(
//     (state: RootState) => state.defenseCal.result as ResultType,
//   )

//   const offenseResultArray = Object.entries(offenseResult)
//     .filter(([key, value]) => value.length > 0)
//     .sort(([keyA], [keyB]) => parseFloat(keyB) - parseFloat(keyA))

//   const defenseResultArray = Object.entries(defenseResult)
//     .filter(([key, value]) => value.length > 0)
//     .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB))

//   const flameColor =
//     location.pathname === `/${lang}` ? 'var(--offenseRec)' : 'var(--defenseRec)'

//   return (
//     <ResultContainer>
//       <ResultCard>
//         {location.pathname === `/${lang}` &&
//           offenseResultArray.map(([key, value], index) => (
//             <div key={key}>
//               <TitleContainer>
//                 {index === 0 && (
//                   <FlameIcon
//                     className="fire"
//                     aria-label="결과에서 공격과 방어에 가장 효과적인 포켓몬 타입을 강조하는 아이콘입니다."
//                     color={flameColor}
//                   />
//                 )}
//                 <h1 className="resultEffect">
//                   {key}
//                   {translate.Result['x damage']}
//                 </h1>
//               </TitleContainer>
//               <Hr />
//               <PokemonContainer>
//                 {value.map((type) => (
//                   <PokemonType
//                     className="pokemon"
//                     key={String(type)}
//                     text={
//                       translate.TypeName[
//                         type as keyof typeof translate.TypeName
//                       ]
//                     }
//                     borderColor={`var(--${type})`}
//                     isDarkMode={isDarkMode}
//                     cursor={'default'}
//                   />
//                 ))}
//               </PokemonContainer>
//             </div>
//           ))}
//         {location.pathname === `/${lang}/defense` &&
//           defenseResultArray.map(([key, value], index) => (
//             <div key={key}>
//               <TitleContainer>
//                 {index === 0 && (
//                   <FlameIcon
//                     className="fire"
//                     aria-label="결과에서 공격과 방어에 가장 효과적인 포켓몬 타입을 강조하는 아이콘입니다."
//                     color={flameColor}
//                   />
//                 )}
//                 <h1 className="resultEffect">
//                   {key}
//                   {translate.Result['x damage']}
//                 </h1>
//               </TitleContainer>
//               <Hr />
//               <PokemonContainer>
//                 {value.map((type) => (
//                   <PokemonType
//                     className="pokemon"
//                     key={String(type)}
//                     text={
//                       translate.TypeName[
//                         type as keyof typeof translate.TypeName
//                       ]
//                     }
//                     borderColor={`var(--${type})`}
//                     isDarkMode={isDarkMode}
//                     cursor="default"
//                   />
//                 ))}
//               </PokemonContainer>
//             </div>
//           ))}
//       </ResultCard>
//     </ResultContainer>
//   )
// }

// export default Result

// const ResultContainer = styled.div`
//   color: var(--color-text);
// `

// const ResultCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: var(--color-card);
//   border-radius: 22px;
//   padding: 2rem 2rem 1rem 2rem;

//   @media (min-width: 280px) and (max-width: 767px) {
//     padding: 1rem 0.8rem;
//   }

//   .resultEffect {
//     font-family: 'Noto Sans KR', sans-serif;
//     font-size: 1.25rem;
//     font-weight: 1000;

//     @media (min-width: 280px) and (max-width: 767px) {
//       margin: 1em 0.64em 0rem;
//     }
//   }
// `

// const PokemonContainer = styled(Container)`
//   margin: 1rem 0rem 1.5rem;
//   cursor: default;

//   @media (min-width: 280px) and (max-width: 767px) {
//     margin: 1em 0.5rem;
//   }
// `

// export const Hr = styled.hr`
//   border: 1px solid var(--color-border);
//   margin: 1em 0em 0rem;

//   @media (min-width: 280px) and (max-width: 767px) {
//     margin: 0.8em 0.64em 0rem;
//   }
// `

// const TitleContainer = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   justify-content: flex-end;
//   align-items: center;
// `
