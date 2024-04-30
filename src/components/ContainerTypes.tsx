import styled from 'styled-components';
import { useState } from 'react';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';

const ContainerTypes = () => {
  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const upToTwo = (clickedType: string) => {
    if (activeTypes.includes(clickedType)) {
      setActiveTypes(activeTypes.filter(t => t !== clickedType));
    } else if (activeTypes.length < 2) {
      setActiveTypes([...activeTypes, clickedType]);
    } else {
      setActiveTypes([activeTypes[1], clickedType]);
    }
  }; // 두 개 이상의 타입을 클릭할 때마다 가장 마지막에 클릭한 타입을 클릭 해제

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={type}
          borderColor={`var(--${type})`}
          onClick={() => upToTwo(type)} // Fix: Pass the clicked type as an argument
          isDarkMode={false}
          isActive={activeTypes.includes(type)}
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
