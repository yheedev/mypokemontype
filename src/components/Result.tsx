import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import styled from 'styled-components';
import { PokemonType } from './PokemonType';
// import { useMemo } from 'react';

type OffenseResultType = {
  [key: string]: string[];
};

const Result = () => {
  // const theme = useSelector((state: RootState) => state.darkMode.theme);
  const translate = useSelector((state: RootState) => state.language.translations);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const offenseResult = useSelector((state: RootState) => state.offenseCal.result as OffenseResultType);
  // const { translate, isDarkMode, offenseResult } = useMemo(() => result, [result]);

  return (
    <Container>
      <Card>
        {Object.entries(offenseResult).map(([key, value]) =>
          value.length > 0 ? (
            <div key={key}>
              <h1>{key}배의 데미지</h1>
              {value.map(type => (
                <PokemonType
                  className="pokemon"
                  key={String(type)}
                  text={translate.TypeName[type as keyof typeof translate.TypeName]} // Add type annotation
                  borderColor={`var(--${type})`}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          ) : null
        )}
      </Card>
    </Container>
  );
};

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text);
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 22px;
  padding: 2rem;

  .pokemon {
    cursor: default;
  }
`;

// export function TypeCalculator() {
//   const [selectedTypes, setSelectedTypes] = useState<Typekey[]>([]);
//   const [effectiveness, setEffectiveness] = useState<{ [key in Typekey]: number }>({});

//   useEffect(() => {
//     if (selectedTypes.length === 0) {
//       // 선택된 타입이 없으면 (selectedTypes 배열의 요소가 0이면) 전체 포켓몬의 타입의 효과를 1배로 보여줍니다.
//       const defaultEffectiveness = Object.keys(TypeValue).reduce((acc, type) => {
//         acc[type as Typekey] = 1;
//         return acc;
//       }, {} as { [key in Typekey]: number });
//       setEffectiveness(defaultEffectiveness);
//     } else {
//       const newEffectiveness = calculateEffectiveness(selectedTypes);
//       setEffectiveness(newEffectiveness);
//     }
//   }, [selectedTypes]);

//   function selectType(type: Typekey) {
//     setSelectedTypes(prev => [...prev, type]);
//   }

//   function deselectType(type: Typekey) {
//     setSelectedTypes(prev => prev.filter(t => t !== type));
//   }

//   function calculateEffectiveness(selectedTypes: Typekey[]) {
//     const effectiveness = Object.keys(Types).reduce((acc, type) => {
//       acc[type as Typekey] = 1; // 기본 효과는 1
//       return acc;
//     }, {} as { [key in Typekey]: number });

//     selectedTypes.forEach(selectedType => {
//       const typeValue = Types[selectedType];
//       Object.keys(typeValue).forEach(type => {
//         // 선택된 타입에 대한 효과를 계산합니다.
//         effectiveness[type as Typekey] *= typeValue[type as Typekey];
//       });
//     });

//     return effectiveness;
//   }

//   return (
//     <div>
//       {Object.keys(Types).map(type => (
//         <button key={type} onClick={() => selectType(type as Typekey)}>
//           {type}
//         </button>
//       ))}
//       <div>
//         {Object.entries(effectiveness).map(([type, multiplier]) => (
//           <div key={type}>
//             {type}: {multiplier}배
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/**
 * TODO
 * 
 * [ ] 기본적으로 항상 1배의 데미지로 모든 타입이 보임 > 결과 카드 만들기
 * [ ] pill 마다 어떻게 포켓몬 타입 넣을지 고민
 * [ ] 타입 중에서는 최소 1개, 최대 2개의 타입까지 누를 수 있음 (셀렉터에서 처리?)
 * [x] 두 개의 타입을 누른 다음에 세 번째 타입을 누르면 맨 처음에 누른 타입의 선택이 해제되면서 두 개의 타입까지만 클릭할 수 있게 함
 * [ ] 배열 내의 더한 숫자(타입) 어떻게 결과에 전달할지?
[ ] 그 결과를 각각의 타입 컴포넌트에 어떻게 전달할지
[ ] 만약 4배의 데미지가 없으면 아예 설명도 생략하게 조건문
[ ] 그리고 4배가 없으면 2배에 불 아이콘이 가도록 조건문
 * [ ] result 렌더링
 * [ ] result 스타일링
 * 
 */
