import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { Container } from './ContainerTypes';
import { ReactComponent as Fire } from '../img/Fire.svg';
import { ReactComponent as Flame } from '../img/Flame.svg';
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
    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB));

  return (
    <ResultContainer>
      <ResultCard>
        {location.pathname === '/' &&
          offenseResultArray.map(([key, value], index) => (
            <div key={key}>
              <TitleContainer>
                {index === 0 && (
                  // <FireIcon
                  //   className="fire"
                  //   aria-label="the most recommended Pokemon types for offense or defense."
                  // />
                  <FlameIcon />
                )}
                <h1 className="resultEffect">{key}배의 데미지</h1>
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
                  />
                ))}
              </PokemonContainer>
            </div>
          ))}
        {location.pathname === '/defense' &&
          defenseResultArray.map(([key, value], index) => (
            // `/defense` 경로에 대한 렌더링 로직
            <div key={key}>
              {index === 0 && (
                <FireIcon
                  className="fire"
                  aria-label="the most recommended Pokemon types for offense or defense."
                />
              )}
              <h1 className="resultEffect">{key}배의 데미지</h1>
              {/* {index === defenseResultArray.length - 1 && <Fire />} */}

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
    padding: 1rem 0.8rem;
  }

  .resultEffect {
    font-family: 'NotosansKRBold';
    font-size: 1.25rem;
    font-weight: 1000;

    @media (min-width: 280px) and (max-width: 767px) {
      margin: 1em 0.64em 0rem;
    }
  }
`;

const PokemonContainer = styled(Container)`
  margin: 2rem 0;
`;

export const Hr = styled.hr`
  border: 1px solid var(--color-border);
  margin: 1em 0em 0rem;

  @media (min-width: 280px) and (max-width: 767px) {
    margin: 1.5em 0.64em 0rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
`;

export const FireIcon = styled(Fire)`
  border: 3px solid;
  border-radius: 50%;
  padding: 0.15em;
  width: 2em;
  height: 2em;

  & g {
    fill: var(--offenseRec);
  }
`;

export const FlameIcon = styled(Flame)`
  border: 3px solid;
  border-radius: 50%;
  padding: 0.15em;
  width: 2em;
  height: 2em;
  stroke: var(--offenseRec);
  stroke-width: 18;
  margin-left: 0.5em;
`;

// TODO;
// [ ] 동일한 result 컴포넌트 내에서 `/`, `/defense` 다른 경로로 보여주기 vs defenseResult, offenseResult 컴포넌트 따로 만들어서 속도 테스트
// [ ] 1배 상태에서는 fire svg 안보이게 하기
// [ ] 불 아이콘 퍼블리싱 하는 중,,
// [ ] 폰트들 위치 가장 상위로 옮기거나 가져오는 방법 고민하기 (lighthouse가 폰트 가져오는데 가장 오래걸린댄다,,)

// [ ] 컴포넌트 폴더 내에서,, 버튼들과 다른 것들 폴더 나누기
// [ ] 결과에 있는 pokemonType 컴포넌트에 `cursor: default;` 적용

// [ ] 언젠가 뒤로,, 버튼을 만들고 싶다
// [ ] 불 아이콘 클릭시 툴박스..?

// [x] 공격은 2배, 1배, 0.5배... 순서, 방어는 0.5배, 1배, 2배... 순서로 보여주기

// [x] hr 간격 위쪽 다시 조정
