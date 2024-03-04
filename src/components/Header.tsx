import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// import { useContext } from 'react';
// import { MyContext } from '../App';
// import { StyleMode } from '../styles/GlobalStyle';

function Header() {
  const navigate = useNavigate();
  // const { theme, toggleStyle } = useContext(MyContext) as StyleMode; //Context값 불러오기

  return (
    <HeaderStyle>
      <div
        className="header-btn"
        onClick={() => {
          navigate('/');
        }}
      >
        공격
      </div>
      <div
        className="header-btn"
        onClick={() => {
          navigate('../pages/Defense');
        }}
      >
        방어 페이지
      </div>
      <div
        className="header-btn"
        onClick={() => {
          navigate('../pages/More');
        }}
      >
        more 페이지
      </div>
      <div className="header-btn" onClick={() => {}}></div>
    </HeaderStyle>
  );
}

export const HeaderStyle = styled.header`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  /* border-bottom: 1px solid gray; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  .header-btn {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export default Header;
