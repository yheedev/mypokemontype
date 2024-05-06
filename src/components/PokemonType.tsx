//import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { TypeName } from 'features/types';

/**
 * TODO
 * [x] isActive 전부 onClick으로 바꾸기. 셀렉터의 isActive까지 바꿔야 함 - 그건 안됨 props 하나로 줄이고 속성 줄인걸로 만족
 * [x] props 하나로 수정,
 * [ ] {text}로 바꿨으니까 영어/한국어/일어를 고려해서 letter-spacing를 조절하거나 폰트를 아예 바꿔야할 듯
 */

export type TypeNameElement = (typeof TypeName)[number];

interface Props {
  className?: string;
  text?: string;
  borderColor: string;
  onClick?: (isActive: boolean) => void;
  isActive?: boolean; // 버튼 클릭 UI 확인, isActive를 이 props에서만 관리해야 uptotwo 함수가 정상적으로 작동
  isDarkMode?: boolean;
}

const PokemonType = ({ text, borderColor, onClick, isActive }: Props) => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  return (
    <Type
      className={`pill ${isActive ? 'active' : ''}  ${isDarkMode ? 'shadow-btn' : 'shadow-bl'}`}
      borderColor={borderColor}
      onClick={() => onClick && onClick(!isActive)}
      isDarkMode={isDarkMode}
      isActive={isActive}
    >
      <span className="TypeText">{text}</span>
    </Type>
  );
};

const Type = styled.button<Props>`
  border: 7px solid ${({ borderColor }) => borderColor};
  width: 5.5rem;
  height: 3rem;
  color: var(--color-background);
  border-radius: 30px;
  background-color: ${({ borderColor, isActive }) => (isActive ? borderColor : 'var(--color-card)')};

  .TypeText {
    font-family: 'NotoSansBlack';
    font-size: 1rem;
    letter-spacing: 4px;
    padding-top: 0.5rem;
    color: ${({ isDarkMode, isActive }) => (isDarkMode && isActive ? 'var(--color-card)' : 'var(--color-text)')};
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
