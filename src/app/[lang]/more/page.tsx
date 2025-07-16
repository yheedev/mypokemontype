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
