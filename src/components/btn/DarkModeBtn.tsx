import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice, useToggleTheme } from 'features/darkModeSlice';
import { ReactComponent as Sun } from 'img/Sun.svg';
import { ReactComponent as ToggleOff } from 'img/ToggleOff.svg';
import { ReactComponent as Moon } from 'img/Moon.svg';
import { ReactComponent as ToggleOn } from 'img/ToggleOn.svg';

export const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const toggle = useToggleTheme()[0];
  const theme = useSelector((state: RootState) => state.darkMode.theme);
  //const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  const handleClick = () => {
    toggle();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(darkModeSlice.actions.setTheme(newTheme));
  };

  return (
    <Btn aria-label="Click to switch to dark mode or light mode.">
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
      {/* {toggle} */}
    </Btn>
  );
};

const Btn = styled.button`
  background: none;
  border: none;
`;

const BtnContainer = styled.div`
  background: none;
  border: none;
`;

export const toggleStyles = css`
  fill: var(--color-toggle);
  position: relative;
  width: 5.5rem;
  height: 2.5rem;
`;

export const iconStyles = css`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  transform: translate(-50%, -50%);
  fill: var(--color-toggleIcon);
  top: 40%;
`;

const ToggleOffIcon = styled(ToggleOff)`
  ${toggleStyles}
`;

const ToggleOnIcon = styled(ToggleOn)`
  ${toggleStyles}
`;

const SunIcon = styled(Sun)`
  ${iconStyles}
  left: 79%;
`;

const MoonIcon = styled(Moon)`
  ${iconStyles}
  left: 68%;
`;

export default DarkModeBtn;

// TODO
// [ ] 하루에 한 번 light house 점수 확인

// [ ] 다크모드 버튼 누를 때 파비콘 색깔도 같이 변화
// [ ] scss 코드로 압축할 수 있는 css 코드 있는지 확인 -> 리팩토링 나중에
