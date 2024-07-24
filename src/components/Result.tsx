import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { Container } from './ContainerTypes';
import { ReactComponent as Fire } from '../img/Fire.svg';
import { useLocation } from 'react-router-dom';

type ResultType = {
  [key: string]: string[];
};

const Result = () => {
  const location = useLocation();
  const translate = useSelector((state: RootState) => state.language.translations);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const offenseResult = useSelector(
    (state: RootState) => state.offenseCal.result as ResultType
  );
  const defenseResult = useSelector(
    (state: RootState) => state.defenseCal.result as ResultType
  );

  const offenseResultArray = Object.entries(offenseResult)
    .filter(([key, value]) => value.length > 0)
    .sort(([keyA], [keyB]) => parseFloat(keyB) - parseFloat(keyA));

  const defenseResultArray = Object.entries(defenseResult)
    .filter(([key, value]) => value.length > 0)
    .sort(([keyA], [keyB]) => parseFloat(keyB) - parseFloat(keyA));

  return (
    <ResultContainer>
      <ResultCard>
        {location.pathname === '/' &&
          offenseResultArray.map(([key, value], index) => (
            <div key={key}>
              <h1 className="resultEffect">{key}배의 데미지</h1>
              {index === 0 && <Fire />}
              <Hr />
              <PokemonContainer>
                {value.map(type => (
                  <PokemonType
                    className="pokemon"
                    key={String(type)}
                    text={translate.TypeName[type as keyof typeof translate.TypeName]}
                    borderColor={`var(--${type})`}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </PokemonContainer>
            </div>
          ))}
        {location.pathname === '/defense' &&
          defenseResultArray.map(([key, value], index) => (
            // `/defense` 경로에 대한 렌더링 로직
            <div key={key}>
              <h1 className="resultEffect">{key}배의 데미지</h1>
              {index === defenseResultArray.length - 1 && <Fire />}
              <Hr />
              <PokemonContainer>
                {value.map(type => (
                  <PokemonType
                    className="pokemon"
                    key={String(type)}
                    text={translate.TypeName[type as keyof typeof translate.TypeName]}
                    borderColor={`var(--${type})`}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </PokemonContainer>
            </div>
          ))}
        {/* {ResultArray.map(([key, value], index) => (
          <div key={key}>
            <h1 className="resultEffect">{key}배의 데미지</h1>
            {index === 0 && <Fire />}
            <Hr />
            <PokemonContainer>
              {value.map(type => (
                <PokemonType
                  className="pokemon"
                  key={String(type)}
                  text={translate.TypeName[type as keyof typeof translate.TypeName]} // Add type annotation
                  borderColor={`var(--${type})`}
                  isDarkMode={isDarkMode}
                />
              ))}
            </PokemonContainer>
          </div>
        ))} */}
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
  padding: 2rem 2rem 0 2rem;

  @media (min-width: 280px) and (max-width: 767px) {
    padding: 2rem 0.8rem 0rem;
  }

  .resultEffect {
    font-family: 'NotosansKRBold';
    font-size: 1.25rem;
    font-weight: 1000;
  }

  .pokemon {
    cursor: default;
    margin-bottom: 1rem;
  }
`;

const PokemonContainer = styled(Container)`
  margin: 2rem 0;
`;

export const Hr = styled.hr`
  border: 1px solid var(--color-border);

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 1em 0.64em 0rem;
  }
`;

// TODO;
// [ ] 동일한 result 컴포넌트 내에서 `/`, `/defense` 다른 경로로 보여주기 vs defenseResult, offenseResult 컴포넌트 따로 만들어서 속도 테스트
// [ ] 1배 상태에서는 fire svg 안보이게 하기
// [ ] 공격은 2배, 1배, 0.5배... 순서, 방어는 0.5배, 1배, 2배... 순서로 보여주기
