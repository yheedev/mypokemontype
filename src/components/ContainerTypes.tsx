import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { add, remove } from 'features/upToTwoSlice';
import { useEffect } from 'react';
import { offenseCal } from 'features/offenseCalSlice';
//import { useLocation } from 'react-router-dom';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const selectTypes = useSelector((state: RootState) => state.upToTwo.selectTypes);
  const dispatch = useDispatch();
  const activeType = useSelector((state: RootState) => state.upToTwo.activeType);
  //const location = useLocation();

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

  const upToTwoAction = (type: string) => {
    if (selectTypes.includes(type)) {
      dispatch(remove(type));
    } else {
      dispatch(add(type));
    }
  };

  useEffect(() => {
    // selectTypes 배열이 변경될 때마다 offenseCal 액션을 호출합니다.
    if (selectTypes.length > 0) {
      dispatch(offenseCal({ offenseType1: selectTypes[0], offenseType2: selectTypes[1] }));
    }
  }, [selectTypes, dispatch]);

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          onClick={() => {
            console.log(`Clicked: ${type}`);
            console.log(selectTypes);
            //dispatch(upToTwo(type));
            upToTwoAction(type);
          }}
          isDarkMode={isDarkMode}
          isActive={activeType.includes(type)}
          //isActive={activeType === type}
        />
      ))}
    </Container>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  align-items: center;
  margin: 2rem 2rem;
  gap: 0.7rem 1rem;
  justify-items: center;

  @media (max-width: 767px) {
    gap: 1rem;
  }
`;

export default ContainerTypes;
