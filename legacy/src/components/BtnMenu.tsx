import styled from 'styled-components';
import MoreBtn from './btn/MoreBtn';
import DarkModeBtn from './btn/DarkModeBtn';
import LangBtn from './btn/LangBtn';

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const BtnMenu = () => {
  return (
    <ButtonContainer>
      <MoreBtn />
      <LangBtn />
      <DarkModeBtn />
    </ButtonContainer>
  );
};

export const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 2rem;
  position: absolute;
  align-items: center;
  transform: translateX(-10%);
  right: 0;
  gap: 0.5rem;
`;

export default BtnMenu;
