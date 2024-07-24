import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { darkModeSlice } from 'features/darkModeSlice';
import { useToggleTheme } from 'hooks/useToggleTheme';
import { ReactComponent as Sun } from '../img/Sun.svg';
import { ReactComponent as ToggleOff } from '../img/ToggleOff.svg';
import { ReactComponent as Moon } from '../img/Moon.svg';
import { ReactComponent as ToggleOn } from '../img/ToggleOn.svg';

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
  /* height: auto;
  min-height: 100%; */
`;

const BtnContainer = styled.button`
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
  top: 48%;
`;

const ToggleOffIcon = styled(ToggleOff)`
  ${toggleStyles}
`;

const ToggleOnIcon = styled(ToggleOn)`
  ${toggleStyles}
`;

const SunIcon = styled(Sun)`
  ${iconStyles}
  left: 73%;
`;

const MoonIcon = styled(Moon)`
  ${iconStyles}
  left: 60%;
`;

export default DarkModeBtn;

// TODO
// [x] toggle svg 여백 줄이기 (viewBox)
// [ ] 다크모드 버튼 누를 때 파비콘 색깔도 같이 변화
// [x] 걍 버튼들 전부 다시 결과 컴포넌트 아래로 정렬하기 /왜냐하면 결과 컴포넌트 크기에 따라 지금 셀렉터 밑에 있는 버튼들 높이가 들썩거린다
// [x] 버튼들의 순서는 [more / 다크모드버튼]
// [ ] 이미지, 버튼 등 alt 전부 작성
// [ ] 하루에 한 번 light house 점수 확인
// [ ] scss 코드로 압축할 수 있는 css 코드 있는지 확인
// [ ] 타이틀 폰트 사이즈가 가끔 너무 작아진다
// [ ] 크로스브라우징 신경 쓰기
// [ ] 결과 컴포넌트의 불 아이콘 퍼블리싱
