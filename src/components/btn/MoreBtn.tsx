import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Pokeball } from 'img/Pokeball.svg';
import { RootState } from 'stores/store';
import { useSelector } from 'react-redux';
import { toggleStyles } from './DarkModeBtn';

export const MoreBtn = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const goToMore = () => {
    navigate('/more');
  };
  return (
    <Btn onClick={goToMore} aria-label="<My Pokemon Type> 프로젝트 개발자의 연락처 정보가 있는 페이지로 이동합니다.">
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
