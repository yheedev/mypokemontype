import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Pokeball } from '../svg/Pokeball.svg';
import { RootState } from 'stores/store';
import { useSelector } from 'react-redux';
import { toggleStyles } from '../components/DarkModeBtn';

export const MoreBtn = () => {
  const navigate = useNavigate();
  //const theme = useSelector((state: RootState) => state.darkMode.theme);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const goToMore = () => {
    //const newTheme = theme === 'dark' ? 'light' : 'dark';
    navigate('/more');
  };

  return (
    <Btn onClick={goToMore}>
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
`;

export default MoreBtn;

// TODO
// [ ] MORE 버튼이 왼쪽, 다크모드 버튼이 오른쪽에 가도록 (다크모드 버튼 absolute 다시 작성)
