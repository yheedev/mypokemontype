import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { Container } from './ContainerTypes';
import { ReactComponent as Flame } from '../img/Flame.svg';
import { useLocation } from 'react-router-dom';

type ResultType = {
  [key: string]: string[];
};

const Result = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  const location = useLocation();
  const translate = useSelector((state: RootState) => state.language.translations);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const offenseResult = useSelector((state: RootState) => state.offenseCal.result as ResultType);
  const defenseResult = useSelector((state: RootState) => state.defenseCal.result as ResultType);

  const offenseResultArray = Object.entries(offenseResult)
    .filter(([key, value]) => value.length > 0)
    .sort(([keyA], [keyB]) => parseFloat(keyB) - parseFloat(keyA));

  const defenseResultArray = Object.entries(defenseResult)
    .filter(([key, value]) => value.length > 0)
    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB));

  const flameColor = location.pathname === `/${lang}` ? 'var(--offenseRec)' : 'var(--defenseRec)';

  return (
    <ResultContainer>
      <ResultCard>
        {location.pathname === `/${lang}` &&
          offenseResultArray.map(([key, value], index) => (
            <div key={key}>
              <TitleContainer>
                {index === 0 && (
                  <FlameIcon
                    className="fire"
                    aria-label="결과에서 공격과 방어에 가장 효과적인 포켓몬 타입을 강조하는 아이콘입니다."
                    color={flameColor}
                  />
                )}
                <h1 className="resultEffect">
                  {key}
                  {translate.Result['x damage']}
                </h1>
              </TitleContainer>
              <Hr />
              <PokemonContainer>
                {value.map(type => (
                  <PokemonType
                    className="pokemon"
                    key={String(type)}
                    text={translate.TypeName[type as keyof typeof translate.TypeName]}
                    borderColor={`var(--${type})`}
                    isDarkMode={isDarkMode}
                    cursor={'default'}
                  />
                ))}
              </PokemonContainer>
            </div>
          ))}
        {location.pathname === `/${lang}/defense` &&
          defenseResultArray.map(([key, value], index) => (
            <div key={key}>
              <TitleContainer>
                {index === 0 && (
                  <FlameIcon
                    className="fire"
                    aria-label="결과에서 공격과 방어에 가장 효과적인 포켓몬 타입을 강조하는 아이콘입니다."
                    color={flameColor}
                  />
                )}
                <h1 className="resultEffect">
                  {key}
                  {translate.Result['x damage']}
                </h1>
              </TitleContainer>
              <Hr />
              <PokemonContainer>
                {value.map(type => (
                  <PokemonType
                    className="pokemon"
                    key={String(type)}
                    text={translate.TypeName[type as keyof typeof translate.TypeName]}
                    borderColor={`var(--${type})`}
                    isDarkMode={isDarkMode}
                    cursor="default"
                  />
                ))}
              </PokemonContainer>
            </div>
          ))}
      </ResultCard>
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  color: var(--color-text);
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 22px;
  padding: 2rem 2rem 1rem 2rem;

  @media (min-width: 280px) and (max-width: 767px) {
    padding: 1rem 0.8rem;
  }

  .resultEffect {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.25rem;
    font-weight: 1000;

    @media (min-width: 280px) and (max-width: 767px) {
      margin: 1em 0.64em 0rem;
    }
  }
`;

const PokemonContainer = styled(Container)`
  margin: 1rem 0rem 1.5rem;
  cursor: default;

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 1em 0.5rem;
  }
`;

export const Hr = styled.hr`
  border: 1px solid var(--color-border);
  margin: 1em 0em 0rem;

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 0.8em 0.64em 0rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
`;

export const FlameIcon = styled(Flame)<{ color: string }>`
  border: 3px solid;
  border-radius: 50%;
  padding: 0.1rem;
  width: 2rem;
  height: 2rem;
  stroke: ${({ color }) => color};
  fill: ${({ color }) => color};
  stroke-width: 12;
  margin-left: 0.7rem;

  & g {
    fill: ${({ color }) => color};
  }

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 1rem 0 0 0;
  }
`;

// TODO;

// [ ] 뒤로가기 버튼 만들기
// [ ] 아이콘 hover할 때 툴박스
// [ ] 1배 상태에서는 fire svg 안보이게 하기
