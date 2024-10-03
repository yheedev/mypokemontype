import { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import ContainerTypes from './ContainerTypes';
import { useNavigate, useLocation } from 'react-router-dom';

export const Selector = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
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
      navigate(Mode === 'offense' ? `/${lang}` : `/${lang}/defense`);
    },
    [navigate, lang]
  );

  useEffect(() => {
    // [ ] 여기도 `/${lang}/defense`?
    const currentMode = location.pathname === `/${lang}/defense` ? 'defense' : 'offense';
    setMode(currentMode);
    setInfo(translate.Info[currentMode]);
  }, [location.pathname, translate.Info, dispatch, lang]);

  const selectorCals = (Mode: 'offense' | 'defense') => {
    selectMode(Mode);
  };

  return (
    <Container>
      <Card lang={lang}>
        <CardContainer>
          <div className="Option">
            <OptionOffense
              className="Offense"
              $selectedMode={mode === 'offense'}
              onClick={() => {
                selectorCals('offense');
              }}
              $darkMode={darkMode}
            >
              <span className="OptionText OffenseText">{translate.Mode.offense}</span>
            </OptionOffense>
            <OptionDefense className="Defense" $selectedMode={mode === 'defense'} onClick={() => selectorCals('defense')} $darkMode={darkMode}>
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

export const Card = styled.div<{ lang: string }>`
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
    font-family: 'Noto Sans KR', sans-serif;
    margin: 1.3rem 1.5rem 0rem;
  }

  .Offense,
  .Defense {
    letter-spacing: ${({ lang }) => (lang === 'ko' ? '7px' : '3px')};
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
    text-indent: ${({ lang }) => (lang === 'ko' ? '1.25rem' : '0rem')};

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0.5rem 0 0.5rem;
      font-size: 1.1rem;
    }

    @media (min-width: 280px) and (max-width: 767px) {
      letter-spacing: ${({ lang }) => (lang === 'ko' ? '7px' : '0px')};
      padding: 0.5rem 0 0.5rem;
      font-size: 1.1rem;
    }
  }

  .OptionText {
    display: inline-block;
    letter-spacing: ${({ lang }) => (lang === 'ko' ? '7px' : '2.5px')};

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
  }

  .InfoContainer {
    border-bottom: 2px solid var(--color-border);
    margin: 2rem 1rem 1.5rem;

    @media (min-width: 280px) and (max-width: 767px) {
      padding: 0rem 0rem 1rem;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: span 1;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: ${({ lang }) => (lang === 'ko' ? '1.5px' : '0.5px')};
    padding: 1.5rem 0;
    text-align: center;
    margin-bottom: 1.5rem;
    word-break: ${({ lang }) => (lang === 'ko' ? ' keep-all' : 'normal')};

    @media (min-width: 280px) and (max-width: 767px) {
      font-size: 0.9rem;
      padding: 0.5rem 2.5rem 0.5rem;
      font-weight: 400;
      overflow-wrap: break-word;
      white-space: normal;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
  }
`;

const OptionOffense = styled.div<{ $selectedMode: boolean; $darkMode: string }>`
  border-bottom: ${props => (props.$selectedMode ? '7px solid var(--offenseRec)' : '2px solid var(--color-border)')};
  cursor: pointer;

  .OffenseText {
    color: ${props => (props.$selectedMode ? 'var(--offenseRec)' : 'var(--color-text)')};
    ${props =>
      props.$darkMode === 'dark' &&
      css`
        color: ${props.$selectedMode ? 'var(--offenseRec)' : 'var(--color-text)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props => (props.$selectedMode ? '4px solid var(--offenseRec)' : '2px solid var(--color-border)')};
    .OffenseText {
      margin-right: 0.1rem;
    }
  }
`;

const OptionDefense = styled.div<{ $selectedMode: boolean; $darkMode: string }>`
  border-bottom: ${props => (props.$selectedMode ? '7px solid var(--defenseRec)' : '2px solid var(--color-border)')};
  cursor: pointer;

  .DefenseText {
    color: ${props => (props.$selectedMode ? 'var(--defenseRec)' : 'var(--color-text)')};
    ${props =>
      props.$darkMode === 'dark' &&
      css`
        color: ${props.$selectedMode ? 'var(--defenseRec)' : 'var(--color-text)'};
      `}
  }

  @media (min-width: 280px) and (max-width: 767px) {
    border-bottom: ${props => (props.$selectedMode ? '5px solid var(--defenseRec)' : '2px solid var(--color-border)')};
    .DefenseText {
    }
  }
`;

export default Selector;
