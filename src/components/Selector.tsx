import { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import ContainerTypes from './ContainerTypes';
import { useNavigate, useLocation } from 'react-router-dom';

export const Selector = () => {
  //const lang = useSelector((state: RootState) => state.language.lang);
  const darkMode = useSelector((state: RootState) => state.darkMode.theme);
  const translate = useSelector((state: RootState) => state.language.translations);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [mode, setMode] = useState<'offense' | 'defense'>('offense');
  const [info, setInfo] = useState('');

  const selectMode = useCallback(
    (Mode: 'offense' | 'defense') => {
      setMode(Mode);
      navigate(Mode === 'offense' ? '/' : '/defense');
    },
    [navigate]
  );

  useEffect(() => {
    const currentMode = location.pathname === '/defense' ? 'defense' : 'offense';
    setMode(currentMode);
    setInfo(translate.Info[currentMode]);

    if (currentMode === 'offense') {
    }
  }, [location.pathname, selectMode, translate.Info, dispatch]);

  const selectorCals = (Mode: 'offense' | 'defense') => {
    selectMode(Mode);
  };

  return (
    <Container>
      <Card>
        <CardContainer>
          <div className="Option">
            <OptionOffense
              className="Offense"
              $selectedMode={mode === 'offense'} // 스타일
              onClick={() => {
                selectorCals('offense');
              }}
              $darkMode={darkMode}
            >
              <span className="OptionText OffenseText">{translate.Mode.offense}</span>
            </OptionOffense>
            <OptionDefense
              className="Defense"
              $selectedMode={mode === 'defense'}
              onClick={() => selectorCals('defense')}
              $darkMode={darkMode}
            >
              <span className="OptionText DefenseText">{translate.Mode.defense}</span>
            </OptionDefense>
          </div>
          <div className="InfoContainer">
            <div className="info">{info}</div>
          </div>
          <ContainerTypes />
        </CardContainer>
      </Card>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text);
`;

const CardContainer = styled.div``;

export const Card = styled.div`
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
    margin: 1.3rem 2rem;

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
    margin: 2rem 2rem;

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
      padding: 0.5rem 2rem 0.5rem;
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
 * [ ] 영어, 일본어일 떄 text-indent 다르게 설정
 */

const OptionOffense = styled.div<{ $selectedMode: boolean; $darkMode: string }>`
  border-bottom: ${props =>
    props.$selectedMode
      ? '7px solid var(--offenseRec)'
      : '2px solid var(--color-border)'};
  cursor: pointer;

  .OffenseText {
    color: ${props => (props.$selectedMode ? 'var(--offenseRec)' : 'var(--normal)')};
    ${props =>
      props.$darkMode === 'dark' &&
      css`
        color: ${props.$selectedMode ? 'var(--offenseRec)' : 'var(--charcoal)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props =>
      props.$selectedMode
        ? '4px solid var(--offenseRec)'
        : '2px solid var(--color-border)'};
    .OffenseText {
      margin-right: 0.1rem;
    }
  }
`;

const OptionDefense = styled.div<{ $selectedMode: boolean; $darkMode: string }>`
  border-bottom: ${props =>
    props.$selectedMode
      ? '7px solid var(--defenseRec)'
      : '2px solid var(--color-border)'};
  cursor: pointer;

  .DefenseText {
    color: ${props => (props.$selectedMode ? 'var(--defenseRec)' : 'var(--normal)')};
    ${props =>
      props.$darkMode === 'dark' &&
      css`
        color: ${props.$selectedMode ? 'var(--defenseRec)' : 'var(--charcoal)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props =>
      props.$selectedMode
        ? '5px solid var(--defenseRec)'
        : '2px solid var(--color-border)'};
    .DefenseText {
    }
  }
`;

export default Selector;
