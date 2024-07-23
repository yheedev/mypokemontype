import Title from '../components/Title';
// import DarkModeBtn from 'components/DarkModeBtn';
import { Selector } from 'components/Selector';
import Result from 'components/Result';
import styled from 'styled-components';
// import MoreBtn from 'components/MoreBtn';
import BtnMenu from 'components/BtnMenu';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 1rem;
  margin: 1rem;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

// export const Menu = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   /* flex-direction: row-reverse; */
// `;

function Offense() {
  return (
    <>
      <Title />
      <Container>
        <Selector />
        <Result />
      </Container>
      <BtnMenu />
      {/* <Menu>
        <MoreBtn />
        <DarkModeBtn />
      </Menu> */}
    </>
  );
}

export default Offense;
