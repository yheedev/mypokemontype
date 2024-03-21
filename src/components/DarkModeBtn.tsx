import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from 'features/darkModeSlice';
import { useToggleTheme } from 'hooks/useToggleTheme';
import { ReactComponent as Sun } from '../Img/Sun.svg';
import { ReactComponent as ToggleOff } from '../Img/ToggleOff.svg';
import { ReactComponent as Moon } from '../Img/Moon.svg';
import { ReactComponent as ToggleOn } from '../Img/ToggleOn.svg';

export const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const toggle = useToggleTheme()[0];
  const theme = useSelector((state: RootState) => state.darkMode.theme);

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(darkModeSlice.actions.setTheme(newTheme));
  };

  return (
    <Btn>
      <>
        <BtnContainer onClick={handleClick}>
          {theme === 'dark' ? (
            <>
              <ToggleOffIcon className="Toggle ToggleOff shadow-bl"></ToggleOffIcon>
              <SunIcon className="ToggleIcon shadow-bl" />
            </>
          ) : (
            <>
              <ToggleOnIcon className="shadow-bl Toggle ToggleOff"></ToggleOnIcon>
              <MoonIcon className="ToggleIcon shadow-gr" />
            </>
          )}
        </BtnContainer>{' '}
        {toggle}
      </>
    </Btn>
  );
};

const Btn = styled.div`
  height: auto;
  min-height: 100%;
`;

const BtnContainer = styled.button`
  transform: translateY(-10%);
  /**
  TODO
  [ ] 모바일에서는 버튼이 가장 하단에 내려가게 만들기 
  */
  margin-left: -3em;
  position: absolute;
  background: none;
  border: none;
  /* bottom: 0.25em; */
  left: 0.5em;
`;

const toggleStyles = css`
  fill: var(--color-toggle);
  position: relative;

  width: 18em;
  height: 9em;
`;

const iconStyles = css`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  transform: translate(-50%, -50%);
  fill: var(--color-toggleIcon);
  top: 48.5%;
`;

const ToggleOffIcon = styled(ToggleOff)`
  ${toggleStyles}
`;

const ToggleOnIcon = styled(ToggleOn)`
  ${toggleStyles}
`;

const SunIcon = styled(Sun)`
  ${iconStyles}
  left: 57%;
`;

const MoonIcon = styled(Moon)`
  ${iconStyles}
  left: 44%;
`;

export default DarkModeBtn;

/**
 *  TODO
 *
 * [x] 기존 SVG 가져온거 background-image로 수정
 * [x]  export const 사용해서 차례대로 스타일 넣기
 * [x] 반응형 체크
 * [x] media query 통일하고 DarkModeBtn styled-component 안에 넣기
 * [x] 폰트들 모두 로컬 저장X 코드로 가져오기
 * [x] 사용하지 않는 svg 파일 삭제

 *
 *
 */
