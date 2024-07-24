import styled from 'styled-components';
import { TypeName } from 'features/types';

export type TypeNameElement = (typeof TypeName)[number];

interface Props {
  className?: string;
  text?: string;
  borderColor: string;
  onClick?: (isActive: boolean) => void; // 클릭했을 때에 불리언 값 전달하는 용도 (ContainerTypes의 passTypes에서 사용)
  isActive?: boolean; // 타입 버튼 클릭 여부를 시각적으로 확인 가능
  isDarkMode: boolean;
  upToTwo?: (type: string) => void; // ContainerTypes 컴포넌트에서 upToTwo 함수를 props로 전달
}

const PokemonType = ({
  text,
  borderColor,
  onClick,
  upToTwo,
  isDarkMode,
  isActive,
}: Props) => {
  const handleClick = () => {
    onClick && onClick(!isActive);
    text && upToTwo && upToTwo(text);
  };

  return (
    <Type
      className={`pill ${isActive ? 'active' : ''}  ${
        isDarkMode ? 'shadow-btn' : 'shadow-bl'
      }`}
      borderColor={borderColor}
      onClick={handleClick}
      isDarkMode={isDarkMode}
      isActive={isActive}
    >
      <span className="TypeText">{text}</span>
    </Type>
  );
};

const Type = styled.button.withConfig({
  shouldForwardProp: prop => !['borderColor', 'isActive', 'isDarkMode'].includes(prop),
})<Props>`
  border: 7px solid ${({ borderColor }) => borderColor};
  width: 5.5rem;
  height: 3rem;
  color: var(--color-background);
  border-radius: 30px;
  background-color: ${({ borderColor, isActive }) =>
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

  @media (min-width: 280px) and (max-width: 767px) {
    width: 5rem;
    height: 3rem;
    border: 4.5px solid ${({ borderColor }) => borderColor};

    .TypeText {
      font-weight: 300;
      letter-spacing: 2px;
    }
  }
`;

export { PokemonType, Type };
