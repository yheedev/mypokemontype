import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { ReactComponent as Globe } from 'img/Globe.svg';
import { toggleStyles } from './DarkModeBtn';

export const LangBtn = () => {
  // const dispatch = useDispatch();
  // TODO
  // [ ] 나중에 모달창을 만들어야겠지..
  const isDarkMode = useSelector((state: RootState) => state.darkMode.theme === 'dark');

  return (
    <Btn aria-label="Click to select your language: Korean, English, Japanese.">
      <GlobeIcon isDarkMode={isDarkMode} className="Globe shadow-bl" />
    </Btn>
  );
};

const Btn = styled.button`
  background: none;
  border: none;
`;

const GlobeIcon = styled(Globe).withConfig({
  shouldForwardProp: prop => !['isDarkMode'].includes(prop),
})<{ isDarkMode: boolean }>`
  ${toggleStyles}
  width: 2.5rem;
  height: 2.5rem;
  stroke: var(--color-toggle);
  stroke-width: 16;
`;

export default LangBtn;
