import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Pokeball } from 'img/Pokeball.svg';
import { RootState } from 'stores/store';
import { useSelector } from 'react-redux';
import { toggleStyles } from './DarkModeBtn';

export const MoreBtn = () => {
  const navigate = useNavigate();
  //const theme = useSelector((state: RootState) => state.darkMode.theme);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const goToMore = () => {
    //const newTheme = theme === 'dark' ? 'light' : 'dark';
    navigate('/more');
  };

  return (
    <Btn
      onClick={goToMore}
      aria-label="Go to more page: contact information for the developer of <My Pokemon Type> and about the purpose of this project."
    >
      <PokeballIcon isDarkMode={isDarkMode} className="Pokeball moreIcon shadow-bl" />
    </Btn>
  );
};

const Btn = styled.button`
  background: none;
  border: none;
`;

const PokeballIcon = styled(Pokeball).withConfig({
  shouldForwardProp: prop => !['isDarkMode'].includes(prop),
})<{ isDarkMode: boolean }>`
  ${toggleStyles}
  width: 3.12rem;
  height: 3.12rem;
  align-items: center;
  display: flex;
`;

export default MoreBtn;
