import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function MainTitle() {
  const navigate = useNavigate();

  return (
    <Title
      className="Title"
      onClick={() => {
        navigate('/');
      }}
    >
      My Pokemon Type
    </Title>
  );
}

export default MainTitle;

export const Title = styled.header`
  font-size: 3rem;
  font-family: 'Helios';
  color: var(--color-Title);
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 1.7rem;
  margin-bottom: 0.2rem;
  margin: 5rem 0 0.3rem;
  cursor: pointer;

  @media (min-width: 768px) and (max-width: 1181px) {
    margin: 4rem 0 0.3rem;
    font-size: 2.5rem;
  } // 태블릿

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 2rem 1.2em 0.3rem; // 화면이 작기 때문에 margin-top이 더 높은 디자인 배제
    font-size: 1.3rem;
    text-indet: left;
  } // 모바일
`;

//TODO;

// [x] 타이틀 호환이슈 있는 부분: 모바일 - 갤럭시 S8+ (360X740)
// [x] 피그마 보고 타이틀 상하 위치 반응형 다시 맞추기
