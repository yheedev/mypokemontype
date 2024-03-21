import styled from 'styled-components';
import Pill from './Pill';

const ContainerTypes = () => {
  return (
    <Container>
      <Pill borderColor="var(--normal)" color="var(--color-background)" text="노멀" />
      <Pill borderColor="var(--fire)" color="var(--color-background)" text="불" />
      <Pill borderColor="var(--water)" color="var(--color-background)" text="물" />
      <Pill borderColor="var(--electric)" color="var(--color-background)" text="전기" />
      <Pill borderColor="var(--grass)" color="var(--color-background)" text="풀" />
      <Pill borderColor="var(--ice)" color="var(--color-background)" text="얼음" />
      <Pill borderColor="var(--fighting)" color="var(--color-background)" text="격투" />
      <Pill borderColor="var(--poision)" color="var(--color-background)" text="독" />
      <Pill borderColor="var(--ground)" color="var(--color-background)" text="땅" />
      <Pill borderColor="var(--flying)" color="var(--color-background)" text="비행" />
      <Pill borderColor="var(--psychic)" color="var(--color-background)" text="에스퍼" />
      <Pill borderColor="var(--bug)" color="var(--color-background)" text="벌레" />
      <Pill borderColor="var(--rock)" color="var(--color-background)" text="바위" />
      <Pill borderColor="var(--ghost)" color="var(--color-background)" text="고스트" />
      <Pill borderColor="var(--dragon)" color="var(--color-background)" text="드래곤" />
      <Pill borderColor="var(--dark)" color="var(--color-background)" text="악" />
      <Pill borderColor="var(--steel)" color="var(--color-background)" text="강철" />
      <Pill borderColor="var(--fairy)" color="var(--color-background)" text="페어리" />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  margin: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 280px) and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default ContainerTypes;
