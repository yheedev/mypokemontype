import styled from 'styled-components';
import { TypeName } from 'features/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';

export type TypeNameElement = (typeof TypeName)[number];

interface Props {
  className?: string;
  text?: string;
  borderColor: string;
  onClick?: (isActive: boolean) => void; // 클릭했을 때에 불리언 값 전달하는 용도
  isActive?: boolean; // 타입 버튼 클릭 여부를 시각적으로 확인 가능
  isDarkMode: boolean;
  upToTwo?: (type: string) => void; // ContainerTypes 컴포넌트에서 upToTwo 함수를 props로 전달
  cursor?: string;
}

const PokemonType = ({ text, borderColor, onClick, upToTwo, isDarkMode, isActive }: Props) => {
  const handleClick = () => {
    onClick && onClick(!isActive);
    text && upToTwo && upToTwo(text);
  };
  const lang = useSelector((state: RootState) => state.language.lang);

  return (
    <Type
      className={`pill ${isActive ? 'active' : ''}  ${isDarkMode ? 'shadow-btn' : 'shadow-bl'}`}
      lang={lang}
      borderColor={borderColor}
      onClick={handleClick}
      isDarkMode={isDarkMode}
      isActive={isActive}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <span className="TypeText">{text}</span>
    </Type>
  );
};

const Type = styled.button.withConfig({
  shouldForwardProp: prop => !['borderColor', 'isActive', 'isDarkMode'].includes(prop),
})<Props>`
  border: 7px solid ${({ borderColor }) => borderColor};
  width: 6.8em;
  height: 3.1rem;
  color: var(--color-background);
  border-radius: 30px;
  background-color: ${({ borderColor, isActive }) => (isActive ? borderColor : 'var(--color-card)')};
  cursor: ${({ cursor }) => cursor};

  .TypeText {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1rem;
    letter-spacing: ${({ lang }) => (lang === 'ko' ? '4px' : '1.5px')};
    padding-top: 0.5rem;
    color: ${({ isDarkMode, isActive }) => (isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)')};
  }

  @media (min-width: 768px) and (min-width: 1023px) {
    border: 6px solid ${({ borderColor }) => borderColor};

    .TypeText {
      font-weight: 500;
      letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '1px')};
    }
  }

  @media (min-width: 280px) and (max-width: 767px) {
    width: 4.8rem;
    height: 2.6rem;
    border: 4.5px solid ${({ borderColor }) => borderColor};

    .TypeText {
      font-size: 0.85rem;
      font-weight: ${({ lang }) => (lang === 'jp' ? '1000' : '300')};
      letter-spacing: ${({ lang }) => (lang === 'ko' ? '2px' : '0.5px')};
    }
  }
`;

export { PokemonType, Type };
