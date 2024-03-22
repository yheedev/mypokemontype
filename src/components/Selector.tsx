import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import ContainerTypes from './ContainerTypes';

export const Selector = () => {
  const theme = useSelector((state: RootState) => state.darkMode.theme);
  const [isOffenseActive, setIsOffenseActive] = useState(true);
  const [isDefenseActive, setIsDefenseActive] = useState(false);
  const [info, setInfo] = useState('공격할 포켓몬의 타입을 선택해주세요!');

  const handleOffenseClick = () => {
    setIsOffenseActive(true);
    setIsDefenseActive(false);
    setInfo('공격할 포켓몬의 타입을 선택해주세요!');
  };

  const handleDefenseClick = () => {
    setIsOffenseActive(false);
    setIsDefenseActive(true);
    setInfo('방어할 포켓몬의 타입을 선택해주세요!');
  };

  return (
    <Container>
      <Card>
        <CardContainer>
          <div className="Option">
            <OptionOffense
              className="Offense"
              $isActive={isOffenseActive}
              onClick={handleOffenseClick}
              theme={theme}
            >
              <span className="OptionText OffenseText">공격</span>
            </OptionOffense>
            <OptionDefense
              className="Defense"
              $isActive={isDefenseActive}
              onClick={handleDefenseClick}
              theme={theme}
            >
              <span className="OptionText DefenseText">방어</span>
            </OptionDefense>
          </div>
          <div className="InfoContainer">
            <div className="info">{info}</div>
          </div>

          <div>
            <ContainerTypes />
          </div>
        </CardContainer>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text);
`;

const CardContainer = styled.div``;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 22px;

  .Option {
    justify-content: space-evenly;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.5rem;
    font-weight: 1000;
    font-family: 'NotoSansBlack';
    margin: 1.3rem 1rem;

    @media (min-width: 280px) and (max-width: 767px) {
      margin: 0.7rem 0.7rem;
    }
  }

  .Offense,
  .Defense {
    letter-spacing: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    border-top: none;

    display: flex;
    padding: 0.5rem 0 1.5rem;
    border-top: none;
    text-align: center;
    vertical-align: middle;
    text-indent: 3px;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.5rem 0 0.5rem;
      font-size: 1.1rem;
    }
  }

  .OptionText {
    display: inline-block;
    letter-spacing: 7px;

    @media (min-width: 280px) and (max-width: 767px) {
      padding-bottom: 0.5rem;
    }
  }

  .OffenseText {
    margin-right: 0.8rem;
  }

  .Offense {
    border-left: none;
    border-right: none;
  }

  .Defense {
    border-right: none;
    border-left: 2px solid var(--color-border);
    /* border-bottom: 2px solid var(--color-border); */
  }

  .InfoContainer {
    padding: 0 1.56rem 1.25rem;
    border-bottom: 2px solid var(--color-border);
    margin: 1rem 1rem;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.625rem 0px 1.25rem;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: span 1;
    font-family: 'NotoSansBlack';
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: 1.5px;
    padding: 1.5rem 0;
    text-align: center;

    @media (min-width: 280px) and (max-width: 767px) {
      font-size: 0.9rem;
      letter-spacing: 1.5px;
      padding: 0.5rem 3.5rem 0.5rem;
      font-weight: 400;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }
  }
`;

/**
 * TODO
 * [ ] 모바일에서 info 텍스트 두 문장으로 줄바꿈 하기
 *
 */

const OptionOffense = styled.div<{ $isActive: boolean; theme: string }>`
  border-bottom: ${props =>
    props.$isActive ? '7px solid var(--offenseRec)' : '2px solid var(--color-border)'};
  cursor: pointer;

  .OffenseText {
    color: ${props => (props.$isActive ? 'var(--offenseRec)' : 'var(--normal)')};
    ${props =>
      props.theme === 'dark' &&
      css`
        color: ${props.$isActive ? 'var(--offenseRec)' : 'var(--charcoal)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props =>
      props.$isActive ? '4px solid var(--offenseRec)' : '2px solid var(--color-border)'};
    .OffenseText {
      margin-right: 0.1rem;
    }
  }
`;

const OptionDefense = styled.div<{ $isActive: boolean; theme: string }>`
  border-bottom: ${props =>
    props.$isActive ? '7px solid var(--defenseRec)' : '2px solid var(--color-border)'};
  cursor: pointer;

  .DefenseText {
    color: ${props => (props.$isActive ? 'var(--defenseRec)' : 'var(--normal)')};
    ${props =>
      props.theme === 'dark' &&
      css`
        color: ${props.$isActive ? 'var(--defenseRec)' : 'var(--charcoal)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props =>
      props.$isActive ? '5px solid var(--defenseRec)' : '2px solid var(--color-border)'};
    .DefenseText {
    }
  }
`;

export default Selector;
