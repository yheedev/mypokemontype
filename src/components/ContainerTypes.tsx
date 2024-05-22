import styled from 'styled-components';
import { PokemonType } from './PokemonType';
import { TypeName } from 'features/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { offenseCal } from 'features/offenseCalSlice';
import { upToTwo } from 'features/upToTwoSlice';

const ContainerTypes = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');
  const translate = useSelector((state: RootState) => state.language.translations);
  const dispatch = useDispatch();

  // const upToTwo = (activeType: string) => {
  //   let CalTypes: string[] = selectTypes.includes(activeType)
  //     ? selectTypes.filter(type => type !== activeType)
  //     : selectTypes.length >= 2
  //     ? [selectTypes[1], activeType]
  //     : [...selectTypes, activeType];

  //   //dispatch(setSelectTypes(CalTypes));
  //   //dispatch(offenseCal({ type1: CalTypes[0] || undefined, type2: CalTypes[1] || undefined }));
  //   dispatch(offenseCal({ type1: CalTypes[0], type2: CalTypes[1] }));

  //   console.log('selectTypes:', selectTypes);
  //   console.log('CalTypes:', CalTypes);
  // };

  const { type1, type2 } = useSelector((state: RootState) => state.upToTwo);
  const activeTypes = [type1, type2].filter(Boolean);

  const upToTwoHandler = (activeType: string) => {
    dispatch(upToTwo(activeType));
    dispatch(offenseCal({ type1, type2 }));
  };

  return (
    <Container>
      {TypeName.map((type: (typeof TypeName)[number]) => (
        <PokemonType
          key={String(type)}
          text={translate.TypeName[type]}
          borderColor={`var(--${type})`}
          // onClick={() => upToTwo(type)}
          // onClick={() => {
          //   if (selectTypes.includes(type)) {
          //     dispatch(setSelectTypes(selectTypes.filter(t => t !== type)));
          //   } else {
          //     upToTwo(type);
          //   }
          // }}
          onClick={() => upToTwoHandler(type)}
          isDarkMode={isDarkMode}
          isActive={activeTypes.includes(type)}
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
