import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores/store';
import { twoToCal } from 'features/upToTwoSlice';
//import { UnknownAction } from '@reduxjs/toolkit';
//import { UnknownAction } from '@reduxjs/toolkit';
//import { offenseCal } from 'features/offenseCalSlice';
//import { useLocation } from 'react-router-dom';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const selectTypes = useSelector((state: RootState) => state.upToTwo.selectTypes);
  const dispatch = useDispatch();
  //const location = useLocation();

  // const passTypes = (type: (typeof TypeName)[number]) => {
  //   twoToCal(type)(dispatch);
  // };

  // const passTypes = (type: (typeof TypeName)[number]) => {
  //   dispatch(twoToCal(type));
  // };

  // const passTypes = (type: (typeof TypeName)[number]) => {
  //   console.log(`Clicked: ${type}`);
  //   const action = twoToCal(type);
  //   dispatch(action as unknown as UnknownAction);
  // };

  // NOTE
  //

  // const passTypes = (type: (typeof TypeName)[number]) => {
  //   return (dispatch: any, getState: () => RootState) => {
  //     const state = getState();
  //     const selectTypes = state.upToTwo.selectTypes;

  //     // Dispatch upToTwo with the updated types
  //     dispatch(upToTwo([...selectTypes, type]));

  //     // Get the updated state
  //     const updatedState = getState();
  //     const updatedSelectTypes = updatedState.upToTwo.selectTypes;

  //     // Dispatch offenseCal with the updated types
  //     dispatch(offenseCal({ offenseType1: updatedSelectTypes[0], offenseType2: updatedSelectTypes[1] }));
  //   };
  // };

  // if (location.pathname === '/') {
  //   let offenseTypes = {};

  //   // selectTypes의 길이에 따라 offenseTypes 객체를 구성
  //   const newSelectTypes = [...selectTypes, type];
  //   if (newSelectTypes.length === 1) {
  //     offenseTypes = {
  //       offenseType1: newSelectTypes[0],
  //       offenseType2: undefined,
  //     };
  //   } else if (newSelectTypes.length === 2) {
  //     offenseTypes = {
  //       offenseType1: newSelectTypes[0],
  //       offenseType2: newSelectTypes[1],
  //     };
  //   }

  //   dispatch(offenseCal(offenseTypes));
  // }

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          //onClick={() => dispatch(upToTwo(type))}
          onClick={() => {
            //console.log(`Clicked: ${type}`);
            //passTypes(type);
            twoToCal(type);
          }}
          //onClick={() => dispatch(twoToCal(type) as unknown as UnknownAction)}
          isDarkMode={isDarkMode}
          isActive={selectTypes.includes(type)}
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
