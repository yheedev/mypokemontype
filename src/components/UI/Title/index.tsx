import { PATH } from '@/app/routes'
import Link from 'next/link'
//import { useNavigate } from 'react-router-dom';
//import { styled } from 'styled-components';
// import { useSelector } from 'react-redux';
// import { RootState } from '../stores/store';

export default function Title() {
  // const lang = useSelector((state: RootState) => state.language.lang)

  return (
    <header
      className="text-5xl flex justify-center text-center mb-[0.3rem] mt-20 cursor-pointer
    "
    >
      {/*
      TODO
      - [ ] 폰트 적용, 컬러 적용, 반응형 적용 */}
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
//   margin-top: 1.7rem;
//   margin-bottom: 0.2rem;
//   margin: 5rem 0 0.3rem;
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
