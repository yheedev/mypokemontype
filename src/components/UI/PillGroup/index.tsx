'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { useUpToTwoStore } from '@/stores/useUpToTwoStore'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useTranslation } from 'react-i18next'
import { TypeName } from '@/constants/pokemon'
import { Pill } from '@/components/UI/Pill'
import { cn } from '@/lib/utils'

export const PillGroup = ({
  isDarkMode,
  onUpdate,
}: {
  isDarkMode: boolean
  onUpdate: (types: [string?, string?]) => void
}) => {
  const pathname = usePathname()
  const { selectedTypes, toggleType } = useUpToTwoStore()

  useEffect(() => {
    onUpdate([selectedTypes[0], selectedTypes[1]])
  }, [pathname, selectedTypes, onUpdate])

  return (
    <div
      // Container, ul
      className={cn(
        //        'absolute top-[50%] left-[50%] flex transform-[-50%]',
        'grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] place-items-center justify-items-center',
        'gap-x-4 gap-y-3',
        'justify-items-center px-4 py-6',
      )}
    >
      {TypeName.map((type) => (
        <div
          // wrapper, a
          // className="relative z-1 mx-0 my-10 block h-[80px] w-[80px] overflow-hidden text-center"
          key={type}
          className="transition-transform duration-200 hover:scale-110"
        >
          <Pill
            //className="relative z-3 transition-[0.5s] hover:bg-amber-50"
            pokemonTypeName={type}
            borderColor={`var(--${type})`}
            isDarkMode={isDarkMode}
            isActive={selectedTypes.includes(type)}
            onClick={() => toggleType(type)}
          />
        </div>
      ))}
    </div>
  )
}

// import styled from 'styled-components'
// import { PokemonType } from '../../../src/components/UI/Pill'
// import { TypeName } from 'features/types'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from 'stores/store'
// import { add, remove } from 'features/upToTwoSlice'
// import { useCallback, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import { offenseCal } from 'features/offenseCalSlice'
// import { defenseCal } from 'features/defenseCalSlice'

// const ContainerTypes = () => {
//   const lang = useSelector((state: RootState) => state.language.lang)
//   const isDarkMode = useSelector(
//     (state: RootState) => state.darkMode.theme === 'dark',
//   )
//   const translate = useSelector(
//     (state: RootState) => state.language.translations,
//   )
//   const selectTypes = useSelector(
//     (state: RootState) => state.upToTwo.selectTypes,
//   )
//   const dispatch = useDispatch()
//   const location = useLocation()

//   const upToTwoAction = (type: any) => {
//     if (selectTypes.includes(type)) {
//       dispatch(remove(type))
//     } else {
//       dispatch(add(type))
//     }
//   }

//   const pathCal = useCallback(
//     (path: string, types: string[]) => {
//       switch (path) {
//         case `/${lang}`:
//           dispatch(
//             offenseCal({
//               offenseType1: types[0],
//               offenseType2: types[1],
//             }),
//           )
//           break
//         case `/${lang}/defense`:
//           dispatch(
//             defenseCal({
//               defenseType1: types[0],
//               defenseType2: types[1],
//             }),
//           )
//           break
//         default:
//           break
//       }
//     },
//     [dispatch, lang],
//   )

//   // useCallback 사용 전
//   //   useEffect(() => {
//   //   if (location.pathname === '/') {
//   //     if (selectTypes.length === 0) {
//   //       dispatch(offenseCal({ offenseType1: undefined, offenseType2: undefined }));
//   //     } else if (selectTypes.length === 1) {
//   //       dispatch(offenseCal({ offenseType1: selectTypes[0], offenseType2: undefined }));
//   //     } else if (selectTypes.length === 2) {
//   //     }
//   //   } else if (location.pathname === '/defense') {
//   //     if (selectTypes.length === 0) {
//   //       dispatch(defenseCal({ defenseType1: undefined, defenseType2: undefined }));
//   //     } else if (selectTypes.length === 1) {
//   //       dispatch(defenseCal({ defenseType1: selectTypes[0], defenseType2: undefined }));
//   //     } else if (selectTypes.length === 2) {
//   //         defenseCal({ defenseType1: selectTypes[0], defenseType2: selectTypes[1] })
//   //       );
//   //     }
//   //   }
//   // }, [location.pathname, selectTypes, dispatch]);

//   useEffect(() => {
//     const types = [selectTypes[0], selectTypes[1]]
//     pathCal(location.pathname, types)
//   }, [location.pathname, selectTypes, dispatch, pathCal])

//   return (
//     <Container>
//       {TypeName.map((type: (typeof TypeName)[number]) => (
//         <Wrapper key={String(type)}>
//           <PokemonType
//             key={String(type)}
//             text={translate.TypeName[type]}
//             borderColor={`var(--${type})`}
//             onClick={() => {
//               upToTwoAction(type)
//             }}
//             isDarkMode={isDarkMode}
//             isActive={selectTypes.includes(type)}
//             cursor="pointer"
//           />
//         </Wrapper>
//       ))}
//     </Container>
//   )
// }

// const Wrapper = styled.div`
//   &:hover {
//     transform: scale(1.1);
//     transition: transform 0.2s;
//   }
// `

// export const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
//   align-items: center;
//   margin: 2rem 2rem;
//   gap: 0.7rem 1rem;
//   justify-items: center;

//   @media (min-width: 280px) and (max-width: 767px) {
//     gap: 0.6rem 0.4rem;
//     /* grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); */
//     margin: 0 0.8rem 2rem;
//   }
// `

// export default ContainerTypes
