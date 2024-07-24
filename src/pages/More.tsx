import Title from '../components/Title';
import styled from 'styled-components';
import { Container, Card } from '../components/Selector';
import BtnMenu from 'components/BtnMenu';
import Lucario from '../img/Lucario.webp';
import { Hr } from 'components/Result';

export const More = () => {
  return (
    <>
      <Title />
      <Container>
        <MoreCard>
          <img src={Lucario} alt="Lucario" className="Lucario" />
          <Text>
            <Contact>
              Contact:
              <br />
              yheedev@gmail.com
            </Contact>
            <Hr />
            <Noti>Unofficial fannmade project</Noti>
          </Text>
        </MoreCard>
      </Container>
      <BtnMenu />
    </>
  );
};

export const MoreCard = styled(Card)`
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  // [x] 반응형 디자인으로 flex-wrap 될 때 Text 컴포넌트 위 아래 간격 같은지 확인
  gap: 2rem;
  padding: 3rem;
  margin: 3rem 20rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 4rem 11rem;
  } // 태블릿

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 3em 2rem 2rem;
  } // 모바일

  .Lucario {
    width: 16rem;
    @media (min-width: 280px) and (max-width: 767px) {
      width: 12rem;
    } // 모바일
  }
`;
// [x] 아이패드 에어 820x1180이 모바일 반응형으로 나옴,,

export const Text = styled.div`
  @media (min-width: 280px) and (max-width: 500px) {
    margin-top: 1rem;
  } // 모바일
`;

export const Contact = styled.h1`
  font-family: 'Helios';
  font-size: 1.5rem;
  @media (min-width: 280px) and (max-width: 767px) {
    font-size: 1rem;
  } // 모바일
`;

export const Noti = styled.h3`
  font-family: 'NotoSansBlack';
  font-size: 1rem;
  @media (min-width: 280px) and (max-width: 767px) {
    font-size: 0.7rem;
  } // 모바일
`;

export default More;
