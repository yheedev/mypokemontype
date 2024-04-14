import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { TypesName } from 'features/typeCalculator';

interface PillProps {
  text?: string;
  borderColor?: string;
  onClick?: () => void;
  onTypeClick: (type: TypesName) => void;
  selected?: boolean;
}

// 오버로드 1 / 2('(props: PolymorphicComponentProps<"web", Substitute<Det
// ailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, TypeProps >,
//   void, void, {}, {} >): Element')에서 다음 오류가 발생했습니다.
// 'onTypeClick' 속성이 '{ children: Element; className: string; borderColor:
// string | undefined; text: string | undefined; onClick: () => void; isActive: boole
// an; isDarkMode: boolean; }' 형식에 없지만 'FastOmit < Substitute < Substitute < DetailedHTMLProps < ButtonHTMLAtt
// ributes<HTMLButtonElement>, HTMLButtonElement >, TypeProps >, FastOmit <...>>, keyof ExecutionProps > ' 형식
// 에서 필수입니다.

//   오버로드 2 / 2('(props: Substitute<DetailedHTMLProps<ButtonHTMLAttributes<HTMLBu
//     ttonElement >, HTMLButtonElement >, TypeProps >): ReactNode')에서 다음 오류가 발생했습니다.
// 'onTypeClick' 속성이 '{ children: Element; className: string; borderColor: string | u
// ndefined; text: string | undefined; onClick: () => void; isActive: boolean; isDarkMode: boolean; }
// ' 형식에 없지만 'TypeProps' 형식에서 필수입니다.ts(2769)

interface TypeProps extends PillProps {
  isActive: boolean;
  // onTypeClick: (type: TypesName) => void;
  isDarkMode: boolean;
}

const PokemonType = ({ borderColor, text, onTypeClick, selected }: PillProps) => {
  const [isActive, setIsActive] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  useEffect(() => {
    setIsActive(!!selected); // Update isActive when selected prop changes
  }, [selected]);

  const handleClick = () => {
    setIsActive(!isActive);
    onTypeClick && onTypeClick(text as TypesName); // Call onTypeClick prop if it exists with type assertion
  };

  /**
   * TODO
   * [ ] isActive 전부 onClick으로 바꾸기
   */

  return (
    <Type
      className={`pill ${isActive ? 'active' : ''}  ${
        isDarkMode ? 'shadow-gr' : 'shadow-bl'
      }`}
      borderColor={borderColor}
      text={text}
      onClick={handleClick}
      isActive={isActive}
      isDarkMode={isDarkMode}
    >
      <span className="TypeText">{text}</span>
    </Type>
  );
};

const Type = styled.button<TypeProps>`
  border: 7px solid ${({ borderColor }) => borderColor};
  width: 5rem;
  height: 3rem;
  color: var(--color-background);

  border-radius: 30px;
  background-color: ${({ isActive, borderColor }) =>
    isActive ? borderColor : 'var(--color-card)'};

  .TypeText {
    font-family: 'NotoSansBlack';
    font-size: 1rem;
    letter-spacing: 4px;
    padding-top: 0.5rem;
    color: ${({ isDarkMode, isActive }) =>
      isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)'};
  }

  @media (min-width: 768px) and (min-width: 1023px) {
    border: 6px solid ${({ borderColor }) => borderColor};

    .TypeText {
      font-weight: 500;
      letter-spacing: 2px;
    }
  }

  @media (max-width: 767px) {
    border: 6px solid ${({ borderColor }) => borderColor};

    .TypeText {
      font-weight: 300;
      letter-spacing: 2px;
    }
  }
`;

export { PokemonType, Type };
