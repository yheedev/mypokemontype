import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { calcOffense } from 'features/OffenseCalculator';

function MainTitle() {
  console.log(calcOffense('normal', 'fighting'));

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

  @media (min-width: 768px) and (min-width: 1023px) {
    margin: 6rem 0 0.3rem;
    font-size: 3rem;
  }

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 4.5rem 1em 0.3rem;
    font-size: 1.6rem;
    text-align: left;
  }
`;
