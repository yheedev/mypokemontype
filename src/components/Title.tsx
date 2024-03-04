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
  font-size: 55px;
  font-family: 'Helios';
  color: var(--color-Title);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
