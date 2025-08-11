'use client'

import Card from '@/components/UI/Card'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/useLanguageStore'
import Divider from '@/components/UI/Divider'
import { cn } from '@/lib/utils'

export default function More() {
  const { t } = useTranslation()
  const { lang } = useLanguageStore()

  return (
    <Card className="mx-auto mt-8 mb-10 w-full max-w-[300px] flex-row flex-wrap items-center justify-center gap-8 p-12 sm:max-w-[960px] md:max-w-[600px]">
      <img
        src="/img/Lucario.webp"
        alt={t(`lucario.aria-label`)}
        className="sm:w-48 md:w-64"
        loading="lazy"
        decoding="async"
      />
      <div className="sm-4">
        <div className="font-[Helios] text-base sm:text-2xl">
          <h1 className={cn(lang === 'en' ? 'font-normal' : 'font-black')}>
            {t('a11y.contact.text')}:
          </h1>
          <p aria-label={t('a11y.contact.aria-label')}>yheedev@gmail.com</p>
        </div>
        <Divider className="my-4 sm:my-7" />
        <p
          className={cn(
            lang === 'ko' ? 'font-bold' : 'font-black',
            'font-[NotoSans] text-[0.8rem] sm:text-base',
          )}
        >
          {t('a11y.contact.info')}
        </p>
      </div>
    </Card>
  )
}

//

// import Title from '../components/Title'
// import styled from 'styled-components'
// import { Container, Card } from '../components/Selector'
// import BtnMenu from 'components/BtnMenu'
// import Lucario from '../img/Lucario.webp'
// import { Hr } from 'components/Result'
// import { useSelector } from 'react-redux'
// import { RootState } from 'stores/store'

// export const More = () => {
//   const lang = useSelector((state: RootState) => state.language.lang)

//   return (
//     <>
//       <Title />
//       <Container>
//         <MoreCard lang={lang}>
//           <img src={Lucario} alt="포켓몬 루카리오" className="Lucario" />
//           <Text>
//             <Contact>
//               Contact:
//               <br />
//               yheedev@gmail.com
//             </Contact>
//             <HrMore />
//             <Noti>Unofficial fannmade project</Noti>
//           </Text>
//         </MoreCard>
//       </Container>
//       <BtnMenu />
//     </>
//   )
// }

// container = card

// pc: my-3rem mx-

// moreCard = card 내 div

// export const MoreCard = styled(Card)`
//   flex-direction: row;
//   align-content: center;
//   flex-wrap: wrap;
//   gap: 2rem;
//   padding: 3rem;
//   margin: 3rem 20rem;
//   justify-content: center;
//   align-items: center;

//   @media (min-width: 768px) and (max-width: 1024px) {
//     margin: 4rem 11rem;
//   } // 태블릿

//   @media (min-width: 280px) and (max-width: 767px) {
//     margin: 3em 2rem 2rem;
//   } // 모바일

//   .Lucario {
//     width: 16rem;
//     @media (min-width: 280px) and (max-width: 767px) {
//       width: 12rem;
//     } // 모바일
//   }
// `

// export const Text = styled.div`
//   @media (min-width: 280px) and (max-width: 500px) {
//     margin-top: 1rem;
//   } // 모바일
// `

// export const Contact = styled.h1`
//   font-family: 'HeliosExtBlack', sans-serif;
//   font-size: 1.5rem;
//   @media (min-width: 280px) and (max-width: 767px) {
//     font-size: 1rem;
//   } // 모바일
// `

// export const Noti = styled.p`
//   font-family: 'Noto Sans KR', sans-serif;
//   font-size: 1rem;
//   @media (min-width: 280px) and (max-width: 767px) {
//     font-size: 0.8rem;
//   } // 모바일
// `

// export const HrMore = styled(Hr)`
//   margin: 1rem 0;
// `

// export default More
