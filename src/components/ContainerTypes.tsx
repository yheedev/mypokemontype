import styled from 'styled-components';
import { useState } from 'react';
import { PokemonType } from './PokemonType';
import { TypesName } from 'features/OffenseCalculator';

const types: TypesName[] = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'stella',
];

/**
 * TODO
 * [ ] typeCalculator TypesName의 타입 고쳐서 여기에 import하기
 */

const ContainerTypes = () => {
  const [activeTypes, setActiveTypes] = useState<TypesName[]>([]);

  const onTypeClick = (clickedType: TypesName) => {
    if (activeTypes.includes(clickedType)) {
      setActiveTypes(activeTypes.filter(t => t !== clickedType));
    } else if (activeTypes.length < 2) {
      setActiveTypes([...activeTypes, clickedType]);
    } else {
      setActiveTypes([activeTypes[1], clickedType]);
    }
  };

  return (
    <Container>
      {types.map(type => (
        <PokemonType
          key={type}
          borderColor={`var(--${type})`}
          text={type}
          onTypeClick={onTypeClick} // Add this line
          // onClick={() => handleTypeClick(type)}
          selected={activeTypes.includes(type)}
        />
      ))}
      {/* <PokemonType borderColor="var(--normal)" text="노멀" />
      <PokemonType borderColor="var(--fighting)" text="격투" />
      <PokemonType borderColor="var(--flying)" text="비행" />
      <PokemonType borderColor="var(--poision)" text="독" />
      <PokemonType borderColor="var(--ground)" text="땅" />
      <PokemonType borderColor="var(--rock)" text="바위" />
      <PokemonType borderColor="var(--bug)" text="벌레" />
      <PokemonType borderColor="var(--ghost)" text="고스트" />
      <PokemonType borderColor="var(--steel)" text="강철" />
      <PokemonType borderColor="var(--fire)" text="불" />
      <PokemonType borderColor="var(--water)" text="물" />
      <PokemonType borderColor="var(--grass)" text="풀" />
      <PokemonType borderColor="var(--electric)" text="전기" />
      <PokemonType borderColor="var(--psychic)" text="에스퍼" />
      <PokemonType borderColor="var(--ice)" text="얼음" />
      <PokemonType borderColor="var(--dragon)" text="드래곤" />
      <PokemonType borderColor="var(--dark)" text="악" />
      <PokemonType borderColor="var(--fairy)" text="페어리" />
      <PokemonType borderColor="var(--stella)" text="스텔라" /> */}
    </Container>
  );
};

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

  .stellar_btn {
    border: 5px solid transparent;
    border-radius: inherit;
    overflow: hidden;
  }

  .stellar_btn:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(to right, red, orange);
  }

  .stellar-border {
    border-radius: 20px;
    background: linear-gradient(white, white) padding-box,
      linear-gradient(to right, darkblue, darkorchid) border-box;
    border: 5px solid transparent;
    /* background-image: linear-gradient(#444444, #444444),
      linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: content-box, border-box; */
  }
`;

export default ContainerTypes;

/**
 * TODO
 * [ ] 스텔라 타입 border 그라데이션으로 만들기 (div 두개 겹쳐서 뒤에 있는 div에 background: linear-gradient 사용)
 */
