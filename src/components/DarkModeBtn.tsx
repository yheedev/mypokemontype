import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from 'features/darkModeSlice';
import { useToggleTheme } from 'hooks/useToggleTheme';
import { ReactComponent as Sun } from '../svg/Sun.svg';
import { ReactComponent as ToggleOff } from '../svg/ToggleOff.svg';
import { ReactComponent as Moon } from '../svg/Moon.svg';
import { ReactComponent as ToggleOn } from '../svg/ToggleOn.svg';

export const DarkModeBtn = () => {
  const dispatch = useDispatch();
  const toggle = useToggleTheme()[0];
  const theme = useSelector((state: RootState) => state.darkMode.theme);

  const handleClick = () => {
    toggle();
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
        {/* {toggle} */}
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
  margin-left: -3rem;
  position: absolute;
  background: none;
  border: none;
  left: 1rem;
`;

export const toggleStyles = css`
  fill: var(--color-toggle);
  position: relative;
  width: 12rem;
  height: 6.1rem;
`;

export const iconStyles = css`
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
