import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { Container } from './ContainerTypes';

type OffenseResultType = {
  [key: string]: string[];
};

const Result = () => {
  // const theme = useSelector((state: RootState) => state.darkMode.theme);
  const translate = useSelector((state: RootState) => state.language.translations);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const offenseResult = useSelector(
    (state: RootState) => state.offenseCal.result as OffenseResultType
  );

  const offenseResultArray = Object.entries(offenseResult)
    .filter(([key, value]) => value.length > 0)
    .sort(([keyA], [keyB]) => parseFloat(keyB) - parseFloat(keyA));

  return (
    <ResultContainer>
      <ResultCard>
        {offenseResultArray.map(([key, value]) => (
          <div key={key}>
            <h1 className="resultEffect">{key}배의 데미지</h1>
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
        ))}
      </ResultCard>
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 1rem; */
  color: var(--color-text);
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: 22px;
  padding: 2rem 2rem 0 2rem;

  .resultEffect {
    font-family: 'NotosansKRBold';
    font-size: 1.25rem;
    font-weight: 1000;
    //margin-bottom: 10px;
  }

  .pokemon {
    cursor: default;
    margin-bottom: 1rem;
  }
`;

const PokemonContainer = styled(Container)`
  margin: 2rem 0;
`;

const Hr = styled.hr`
  border: 1px solid var(--color-border);
  margin: 1.5rem 0;
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
