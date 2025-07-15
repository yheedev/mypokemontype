'use client'

import Title from '@/components/UI/Title'
import Selector from '@/components/UI/Selector'
import React from 'react'

export default function Offense({ params }: { params: { lang: string } }) {
  return (
    <main>
      <Title />
      <div className="m-4 grid grid-cols-1 gap-12 p-4 lg:grid-cols-2">
        <Selector />
      </div>
      {/* <Result /> */}
      {/* </div> */}
      {/* <BtnMenu /> */}
    </main>
  )
}

// import { Selector } from 'components/Selector'
// import Result from 'components/Result'
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
// `;
