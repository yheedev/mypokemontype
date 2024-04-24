import styled from 'styled-components';
import { useState } from 'react';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';

// interface ContainerTypesProps {
//   onClick: () => void;
// }

const ContainerTypes = () => {
  const [activeTypes, setActiveTypes] = useState<(typeof TypeName)[]>([]);

  const handleTypeClick = (clickedType: typeof TypeName) => {
    if (activeTypes.includes(clickedType)) {
      setActiveTypes(activeTypes.filter(t => t !== clickedType));
    } else if (activeTypes.length < 2) {
      setActiveTypes([...activeTypes, clickedType]);
    } else {
      setActiveTypes([activeTypes[1], clickedType]);
    }
  }; // 두 개 이상의 타입을 클릭할 때마다 첫 번째 타입을 빼고 마지막에 클릭한 타입을 추가한다

  // interface PillProps {
  //   text?: typeof TypeName; // Update the type of the `text` prop
  //   borderColor?: string;
  //   onClick?: () => void;
  //   onTypeClick: (type: typeof TypeName) => void;
  //   selected?: boolean;
  // }

  return (
    <Container>
      {activeTypes.map(type => (
        <PokemonType
          key={String(type)}
          borderColor={`var(--${type})`}
          text={type}
          onTypeClick={handleTypeClick}
          onClick={() => handleTypeClick(type)}
          selected={activeTypes.includes(type)}
        />
      ))}
    </Container>
  );
};

/**
 * TODO
 * [ ] typeCalculator TypesName의 타입 고쳐서 여기에 import하기
 */

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  align-items: center;
  margin: 2rem 1rem;
  gap: 1rem 1.5rem;
  justify-items: center;

  @media (max-width: 767px) {
    gap: 1rem;
  }
`;

export default ContainerTypes;
