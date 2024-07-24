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
  font-size: 3.5rem;
  font-family: 'Helios';
  color: var(--color-Title);
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 1.7rem;
  margin-bottom: 0.2rem;
  margin: 6rem 0 0.3rem;
  cursor: pointer;

  @media (min-width: 768px) and (max-width: 1181px) {
    margin: 6rem 0 0.3rem;
    font-size: 2.5rem;
  }

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 4.5rem 1.2em 0.3rem;
    font-size: 1.5rem;
    text-align: left;
  }
`;

//TODO;

// [ ] 타이틀 호환이슈 있는 부분: 모바일 - 갤럭시 S8+ (360X740)
// [ ]
