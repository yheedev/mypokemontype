import { PATH } from '@/app/routes'
import Link from 'next/link'
//import { useNavigate } from 'react-router-dom';
//import { styled } from 'styled-components';
// import { useSelector } from 'react-redux';
// import { RootState } from '../stores/store';

export default function Title() {
  // const lang = useSelector((state: RootState) => state.language.lang)

  return (
    <header className="text-var(--color-text) mx-[1.2rem] mt-8 mb-[0.3rem] flex justify-center text-center font-[Helios] text-[1.3rem] md:mx-0 md:mt-16 md:mb-[0.3rem] md:text-[2.5rem] lg:mx-0 lg:mt-20 lg:mb-[0.3rem] lg:text-[3rem]">
      <Link
        href={PATH.offense}
        aria-label="메인 페이지이자 공격 계산 페이지로 이동"
      >
        My Pokemon Type
      </Link>
    </header>
  )
}

// export const Title = styled.header`
//   font-size: 3rem;
//   font-family: 'HeliosExtBlack', sans-serif;
//   color: var(--color-Title);
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   margin: 5rem 0 0.3rem; 위 가로 아래
//   cursor: pointer;

//   @media (min-width: 768px) and (max-width: 1181px) {
//     margin: 4rem 0 0.3rem;
//     font-size: 2.5rem;
//   } // 태블릿

//   @media (min-width: 280px) and (max-width: 767px) {
//     margin: 2rem 1.2em 0.3rem; // 화면이 작기 때문에 모바일에선 margin-top이 더 높은 디자인 배제
//     font-size: 1.3rem;
//     text-indet: left;
//   } // 모바일
// `
