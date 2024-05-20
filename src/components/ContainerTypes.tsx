import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { offenseCal, setSelectTypes } from 'features/offenseCalSlice';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const selectTypes = useSelector((state: RootState) => state.offenseCal.selectTypes) || [];
  const dispatch = useDispatch();

  const upToTwo = (activeType: string, isActive: boolean) => {
    let offenseCalTypes: string[] = selectTypes.includes(activeType)
      ? selectTypes.filter(type => type !== activeType)
      : selectTypes.length >= 2
      ? [selectTypes[1], activeType]
      : [...selectTypes, activeType];

    dispatch(setSelectTypes(offenseCalTypes));
    dispatch(offenseCal({ type1: offenseCalTypes[0] || undefined, type2: offenseCalTypes[1] || undefined }));

    console.log('selectTypes:', selectTypes);
    console.log('offenseCalTypes:', offenseCalTypes);
  };

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          onClick={() => upToTwo(type, isActive)}
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
