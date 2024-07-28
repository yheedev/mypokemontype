import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { add, remove } from 'features/upToTwoSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { offenseCal } from 'features/offenseCalSlice';
import { defenseCal } from 'features/defenseCalSlice';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const selectTypes = useSelector((state: RootState) => state.upToTwo.selectTypes);
  const dispatch = useDispatch();
  const location = useLocation();

  const upToTwoAction = (type: any) => {
    if (selectTypes.includes(type)) {
      dispatch(remove(type));
    } else {
      dispatch(add(type));
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      if (selectTypes.length === 0) {
        dispatch(offenseCal({ offenseType1: undefined, offenseType2: undefined }));
      } else if (selectTypes.length === 1) {
        dispatch(offenseCal({ offenseType1: selectTypes[0], offenseType2: undefined }));
      } else if (selectTypes.length === 2) {
        dispatch(
          offenseCal({ offenseType1: selectTypes[0], offenseType2: selectTypes[1] })
        );
      }
    } else if (location.pathname === '/defense') {
      if (selectTypes.length === 0) {
        dispatch(defenseCal({ defenseType1: undefined, defenseType2: undefined }));
      } else if (selectTypes.length === 1) {
        dispatch(defenseCal({ defenseType1: selectTypes[0], defenseType2: undefined }));
      } else if (selectTypes.length === 2) {
        dispatch(
          defenseCal({ defenseType1: selectTypes[0], defenseType2: selectTypes[1] })
        );
      }
    }
  }, [location.pathname, selectTypes, dispatch]);

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          onClick={() => {
            upToTwoAction(type);
          }}
          isDarkMode={isDarkMode}
          isActive={selectTypes.includes(type)}
        />
      ))}
    </Container>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  align-items: center;
  margin: 2rem 2rem;
  gap: 0.7rem 1rem;
  justify-items: center;

  @media (min-width: 280px) and (max-width: 767px) {
    gap: 0.6rem 0.4rem;
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    margin: 0 0.8rem 2rem;
  } // 모바일
`;

export default ContainerTypes;

//TODO
//[ ] hover 스타일 추가
