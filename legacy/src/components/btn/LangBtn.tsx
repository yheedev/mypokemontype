import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/store'
import { ReactComponent as Globe } from 'img/Globe.svg'
import { toggleStyles } from './DarkModeBtn'
import LangModal from 'components/LangModal'
import { useState } from 'react'

export const LangBtn = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.theme === 'dark',
  )
  const toggleModal = () => setModalOpen(!isModalOpen)

  return (
    <>
      <Btn
        onClick={toggleModal}
        aria-label="클릭해서 한국어, 영어, 일본어 중 언어를 선택할 수 있습니다."
      >
        <GlobeIcon isDarkMode={isDarkMode} className="Globe shadow-bl" />
      </Btn>
      {isModalOpen && <LangModal onClose={toggleModal} />}
    </>
  )
}

const Btn = styled.button`
  background: none;
  border: none;
`

const GlobeIcon = styled(Globe).withConfig({
  shouldForwardProp: (prop) => !['isDarkMode'].includes(prop),
})<{ isDarkMode: boolean }>`
  ${toggleStyles}
  width: 2.5rem;
  height: 2.5rem;
  stroke: var(--color-toggle);
  stroke-width: 16;
`

export default LangBtn
