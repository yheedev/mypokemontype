import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'stores/store';
import { twoToCal } from 'features/upToTwoSlice';
//import { offenseCal } from 'features/offenseCalSlice';
//import { useLocation } from 'react-router-dom';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  //const selectTypes = useSelector((state: RootState) => state.upToTwo.selectTypes);
  const activeType = useSelector((state: RootState) => state.upToTwo.activeType) ?? [];
  //const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  //const location = useLocation();

  // NOTE
  //
  //

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
  console.log(activeType);
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
            dispatch(twoToCal(type));
          }}
          isDarkMode={isDarkMode}
          //isActive={activeType.includes(type)}
          isActive={activeType === type}
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
