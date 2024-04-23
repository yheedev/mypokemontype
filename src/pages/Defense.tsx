import Title from '../components/Title';
import DarkModeBtn from 'components/DarkModeBtn';
import { Selector } from 'components/Selector';
import styled from 'styled-components';

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

function Defense() {
  return (
    <>
      <Title />
      <Container>
        <Selector />
      </Container>
      <DarkModeBtn />
    </>
  );
}

export default Defense;
