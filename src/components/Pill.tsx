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
  WARNING
  CHECKLIST


  TODO
  [ ] pill  6x3으로 나란히 두기..는 컨테이너타입?
  [ ] pill 크기 반응형 (폰트사이즈, 두께)
  [ ] pill 한 번에 두 개까지만 클릭  가능하게 
  [ ] pill 마다 어떻게 포켓몬 타입 넣을지 고민
  [ ] 카드 아래 부분 자동으로 늘어나게 만들기기

  
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
      <span className="Namae">{text}</span>
    </Type>
  );
};

const Type = styled.button<TypeProps>`
  border: 6px solid ${({ borderColor }) => borderColor};
  width: 7em;
  height: 4em;
  border-radius: 30px;
  /* background-color: var(--color-card); */
  /* background-color: ${({ isActive, isDarkMode }) =>
    isDarkMode && isActive ? 'var(--color-background)' : 'var(--color-card)'}; */
  background-color: ${({ isActive, borderColor }) =>
    isActive ? borderColor : 'var(--color-card)'};

  .Namae {
    font-family: 'NotoSansBlack';
    font-size: 1.3em;
    letter-spacing: 5px;

    color: ${({ isDarkMode, isActive }) =>
      isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)'};
  }

  @media (max-width: 1024px) {
    width: 6em;
    height: 3.5em;

    .Namae {
      font-size: 1.2em;
    }
  }

  @media (min-width: 768px) and (min-width: 1023px) {
    border: 6px solid ${({ borderColor }) => borderColor};
    width: 5.5em;
    height: 3em;

    .Namae {
      font-size: 1.2em;
      font-weight: 800;
      letter-spacing: 3px;
    }
  }
`;

export default Pill;
