import styled from 'styled-components';
// import { useState, useEffect } from 'react';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { offenseCal } from 'features/offenseCalSlice';

const ContainerTypes = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const type1 = useSelector((state: RootState) => state.offenseCal.type1);
  const type2 = useSelector((state: RootState) => state.offenseCal.type2);

  const upToTwo = (clickedType: string) => {
    if (clickedType === type1) {
      dispatch(offenseCal({ type1: type2, type2: undefined }));
    } else if (clickedType === type2) {
      dispatch(offenseCal({ type1: type1, type2: undefined }));
    } else {
      dispatch(offenseCal({ type1: type2, type2: clickedType }));
    }
  };

  // const upToTwo = (clickedType: string) => {
  //   const selectorTypes = [type1, type2].filter(Boolean);
  //   const newTypes = selectorTypes.includes(clickedType)
  //     ? selectorTypes.filter(type => type !== clickedType)
  //     : selectorTypes.length >= 2
  //     ? [selectorTypes[1], clickedType]
  //     : [...selectorTypes, clickedType];
  //   dispatch(offenseCal({ type1: newTypes[0] || undefined, type2: newTypes[1] || undefined }));
  // };

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          onClick={() => upToTwo(type)} // upTotwo 함수를 호출해서 클릭한 타입을 상태에 반영
          isDarkMode={isDarkMode}
          isActive={(type === type1 && type1 !== undefined) || (type === type2 && type2 !== undefined)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  align-items: center;
  margin: 2rem 1rem;
  gap: 0.7rem 1.3rem;
  justify-items: center;

  @media (max-width: 767px) {
    gap: 1rem;
  }
`;

export default ContainerTypes;
