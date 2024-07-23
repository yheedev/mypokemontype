import styled from 'styled-components';
import MoreBtn from './MoreBtn';
import DarkModeBtn from './DarkModeBtn';

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const BtnMenu = () => {
  function test() {
    console.log('test');
  }
  return (
    <ButtonContainer onClick={test}>
      <MoreBtn />
      <DarkModeBtn />
    </ButtonContainer>
  );
};

export const ButtonContainer = styled.div`
  display: flex;
  padding: 1rem;
  position: absolute;
  align-items: center;
  transform: translateX(-10%);
  right: 0;
`;

export default BtnMenu;
