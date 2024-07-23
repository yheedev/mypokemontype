import Title from '../components/Title';
import styled from 'styled-components';
import { Container, Card } from '../components/Selector';
import BtnMenu from 'components/BtnMenu';

export const More = () => {
  return (
    <>
      <Title />
      <Container>
        <MoreCard />
      </Container>
      <BtnMenu />
    </>
  );
};

export const MoreCard = styled(Card)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  justify-content: center;
`;

export default More;
