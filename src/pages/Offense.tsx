import Title from '../components/Title';
import { Selector } from 'components/Selector';
import Result from 'components/Result';
import styled from 'styled-components';
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

function Offense() {
  return (
    <>
      <Title />
      <Container>
        <Selector />
        <Result />
      </Container>
      <BtnMenu />
    </>
  );
}

export default Offense;

// TODO
// [ ] 갤럭시 폴드는 우측에 셀렉터 좌측에 결과 보여주기
// [ ] 모바일 세로 화면일 때 우측에 셀렉터, 좌측에 결과
