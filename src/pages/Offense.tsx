import Title from '../components/Title';
import DarkModeBtn from 'components/DarkModeBtn';
import Selector from 'components/Selector';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3em;
  padding: 1em;
  margin: 1em;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  } // 예외적으로 다른 중단점 사용
`;

function Offense() {
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

export default Offense;
