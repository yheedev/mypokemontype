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
  gap: 1em;
  /* padding: 1.5em; */
  color: var(--color-text);
`;

const CardContainer = styled.div``;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 20px;

  .Option {
    justify-content: space-evenly;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.4em;
    font-weight: 1000;
    font-family: 'NotoSansBlack';
    margin: 1em 1em;

    @media (min-width: 280px) and (max-width: 767px) {
      font-size: 1.5rem;
      margin: 0.7em 0.7em;
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
    padding: 0.2em 0 1.2em;
    border-top: none;
    text-align: center;
    vertical-align: middle;
    text-indent: 3px;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.5em 0 0.5em;
      font-size: 0.7em;
    }
  }

  .OptionText {
    display: inline-block;
    letter-spacing: 7px;

    /* @media (max-width: 300px) {
      font-size: 100px;
    } //갤럭시폴드 */

    @media (min-width: 280px) and (max-width: 767px) {
      padding-bottom: 7px;
    }
  }

  .OffenseText {
    margin-right: 0.8em;
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
    padding: 0 25px 20px;
    /* margin: 1rem 2rem; */
    border-bottom: 2px solid var(--color-border);
    margin: 1em 1em;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 10px 0px 20px;
      /* margin: 0.5 0.5em; */
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: span 1;
    font-family: 'NotoSansBlack';
    font-weight: 1000;
    font-size: 1.4em;
    letter-spacing: 1.5px;
    padding: 1em 0;

    @media (min-width: 280px) and (max-width: 767px) {
      font-size: 0.9em;
      letter-spacing: 1px;
      padding: 0.5em 0.5em;
    }
  }
`;

const OptionOffense = styled.div<{ $isActive: boolean; theme: string }>`
  border-bottom: ${props =>
    props.$isActive ? '7px solid var(--offenseRec)' : '2px solid var(--color-border)'};
  /* padding-bottom: ${props => (props.$isActive ? '0' : '5px')}; */
  /* margin-top: 7px; */
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
      margin-right: -7px;
    }
  }
`;

const OptionDefense = styled.div<{ $isActive: boolean; theme: string }>`
  border-bottom: ${props =>
    props.$isActive ? '7px solid var(--defenseRec)' : '2px solid var(--color-border)'};
  /* padding-bottom: ${props => (props.$isActive ? '0' : '5px')}; */
  /* margin-top: 7px; */
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
