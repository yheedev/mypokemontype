import React, { useRef } from 'react';
import styled from 'styled-components';
import { setLanguage } from '../features/languageSlice';
import { Card } from '../components/Selector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/store';
import { ReactComponent as Close } from '../img/Close.svg';
import ReactDOM from 'react-dom';

const LangModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);
  const translate = useSelector((state: RootState) => state.language.translations);
  const modalBackground = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackground.current) {
      onClose();
    }
  };

  const handleLanguageChange = (language: 'kr' | 'us' | 'jp') => {
    dispatch(setLanguage(language));
    onClose();
  };

  const modalContent = (
    <Modal lang={lang} ref={modalBackground} onClick={handleBackgroundClick}>
      <ModalContent lang={lang} onClick={e => e.stopPropagation()}>
        {' '}
        <ModalTitle>{translate.languege.languegeSettings}</ModalTitle>
        <ModalText onClick={() => handleLanguageChange('kr')}>
          {translate.languege.Korean}
        </ModalText>
        <HrModal />
        <ModalText onClick={() => handleLanguageChange('us')}>
          {translate.languege.English}
        </ModalText>
        <HrModal />
        <ModalText onClick={() => handleLanguageChange('jp')}>
          {translate.languege.Japanese}
        </ModalText>
        <ModalBtn onClick={onClose}>
          <CloseIcon />
        </ModalBtn>
      </ModalContent>
    </Modal>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 70%;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ModalContent = styled(Card)`
  background: var(--color-modalCard);
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--color-border);
  align-items: center;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--color-modalTitle);
  margin-bottom: 1rem;
`;

const ModalText = styled.h2`
  font-size: 1rem;
  color: var(--color-modalText);
`;

const HrModal = styled.hr`
  border: 1px solid var(--color-modalBorder);
  width: 5rem;
`;

const ModalBtn = styled.button<{
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}>`
  background: none;
  border: none;
  cursor: pointer;
  width: 5em;
  margin-top: 0.5rem;
`;

const CloseIcon = styled(Close)`
  width: 2em;
  height: 2rem;
  stroke: var(--offenseRec);
  stroke-width: 1.3;
  fill: var(--offenseRec);

  & path {
    fill: var(--offenseRec);
  }
`;

export default LangModal;
