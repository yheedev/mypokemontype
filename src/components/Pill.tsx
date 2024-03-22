import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';

interface PillProps {
  color: string;
  text: string;
  borderColor: string;
}

interface TypeProps extends PillProps {
  isActive: boolean;
  isDarkMode: boolean;
}

const Pill = ({ borderColor, color, text }: PillProps) => {
  const [isActive, setIsActive] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const handleClick = () => {
    setIsActive(!isActive);
  };

  /**


  TODO
  [x] pill  6x3으로 나란히 두기..는 컨테이너타입?
  [x] pill 크기 반응형 (폰트사이즈, 두께)
  [ ] pill 한 번에 두 개까지만 클릭  가능하게 
  [ ] pill 마다 어떻게 포켓몬 타입 넣을지 고민
  [x] 카드 아래 부분 자동으로 늘어나게 만들기
  [x] 전체 단위 rem으로 통일 (일부만 px, %)

  */

  return (
    <Type
      className={`pill ${isActive ? 'active' : ''}  ${
        isDarkMode ? 'shadow-gr' : 'shadow-bl'
      }`}
      borderColor={borderColor}
      color={color}
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

  border-radius: 30px;
  background-color: ${({ isActive, borderColor }) =>
    isActive ? borderColor : 'var(--color-card)'};

  .TypeText {
    font-family: 'NotoSansBlack';
    font-size: 1rem;
    letter-spacing: 4px;

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

export default Pill;
