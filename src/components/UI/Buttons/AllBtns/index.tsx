'use client'

import DarkModeBtn from '@/components/UI/Buttons/DarkModeBtn'

export default function AllBtns() {
  return (
    <div className="px-1rem absolute right-10 flex translate-x-[10%] items-center gap-2 pt-4 pb-8">
      <DarkModeBtn />
    </div>
  )
}

// import styled from 'styled-components'
// import MoreBtn from './btn/MoreBtn'
// import DarkModeBtn from './btn/DarkModeBtn'
// import LangBtn from '../LangBtn/LangBtn'

// export const Menu = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
// ` flex items-center justify-between p-4

// export const BtnMenu = () => {
//   return (
//     <ButtonContainer>
//       <MoreBtn />
//       <LangBtn />
//       <DarkModeBtn />
//     </ButtonContainer>
//   )
// }

// export const ButtonContainer = styled.div`
//   display: flex;
//   padding: 1rem 1rem 2rem;
//   position: absolute;
//   align-items: center;
//   transform: translateX(-10%);
//   right: 0;
//   gap: 0.5rem;
// `

// export default BtnMenu
