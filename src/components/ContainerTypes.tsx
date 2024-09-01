import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { add, remove } from 'features/upToTwoSlice';
import { useCallback, useEffect } from 'react';
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

  const pathCal = useCallback(
    (path: string, types: string[]) => {
      switch (path) {
        case '/':
          dispatch(
            offenseCal({
              offenseType1: types[0],
              offenseType2: types[1],
            })
          );
          break;
        case '/defense':
          dispatch(
            defenseCal({
              defenseType1: types[0],
              defenseType2: types[1],
            })
          );
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const types = [selectTypes[0], selectTypes[1]];
    pathCal(location.pathname, types);
  }, [location.pathname, selectTypes, dispatch, pathCal]);

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <Wrapper key={String(type)}>
          <PokemonType
            key={String(type)}
            text={translate.TypeName[type]}
            borderColor={`var(--${type})`}
            onClick={() => {
              upToTwoAction(type);
            }}
            isDarkMode={isDarkMode}
            isActive={selectTypes.includes(type)}
            cursor="pointer"
          />
        </Wrapper>
      ))}
    </Container>
  );
};

const Wrapper = styled.div`
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

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
  }
`;

export default ContainerTypes;
