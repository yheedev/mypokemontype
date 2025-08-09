'use client'

import Selector from '@/components/UI/Selector'
import Result from '@/components/UI/Result'

export default function Defense() {
  return (
    <main>
      <div className="m-4 grid grid-cols-1 items-start gap-12 p-4 xl:grid-cols-2">
        <Selector />
        <Result />
      </div>
    </main>
  )
}

// import Title from '../components/Title'
// import Result from 'components/Result'
// import { Selector } from 'components/Selector'
// import styled from 'styled-components'
// import BtnMenu from 'components/BtnMenu'

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 3rem;
//   padding: 1rem;
//   margin: 1rem;

//   @media (max-width: 1023px) {
//     grid-template-columns: 1fr;
//   }
// `

// function Defense() {
//   return (
//     <>
//       <Title />
//       <Container>
//         <Selector />
//         <Result />
//       </Container>
//       <BtnMenu />
//     </>
//   )
// }

// export default Defense
