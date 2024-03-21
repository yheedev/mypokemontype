import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// import { lightTheme, darkTheme } from '../styles/theme';

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
  font-size: 3.5em;
  font-family: 'Helios';
  color: var(--color-Title);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.7em;
  margin-bottom: 0.2em;
  margin: 2em auto 0.3em;
  cursor: pointer;

  @media (min-width: 768px) and (min-width: 1023px) {
    font-size: 3.5em;
    margin: 2em 0 0.3em;
  }

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 3.5em 0 0.3em;
    font-size: 1.5em;
  }
`;
