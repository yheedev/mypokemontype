import { css } from 'styled-components';
// import { lightTheme, darkTheme } from './theme';

// export type TypeofTheme = keyof typeof themes; //모드의 type("light" | "dark")

// export type StyleMode = {
//   toggleStyle: (mode: TypeofTheme) => void; //현재 모드를 바꿔주는 함수
//   theme: TypeofTheme; //현재모드
// };

export const TitleStyle = {
  FontSize: {
    pc: '55px',
    tablet: '38px',
    mobile: '25px',
  },
  // TitleColor: {
  //   Color: lightTheme.colors.titleColor | darkTheme.colors.titleColor,
  // },
  TitleFont: {
    Font: 'Helios',
  },
};

const util = {
  truncate: () => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  scroll: () => css`
    &::-webkit-scrollbar {
      /** 스크롤바의 너비 */
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /** 스크롤바 길이 */
      height: 25%;
      /** 스크롤바의 색상 */
      background: ${({ theme }) => theme.colors.indigo600};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      /** 스크롤바 뒷 배경 색상 */
      background: ${({ theme }) => theme.colors.indigo300};
    }
  `,
};

export const styles = {
  // TitleStyle,
  util,
};

export default styles;
