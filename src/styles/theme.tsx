// import { DefaultTheme } from 'styled-components';
// import Helios from './Helios.woff';

export const ResponsiveSize = {
  PC: {
    toggleW: 123.3,
    toggleH: 60,
    toggleIcon: 32,
  },
  Tablet: {
    toggleW: 92.48,
    toggleH: 45,
    toggleIcon: 24,
  },
  Mobile: {
    toggleW: 92.48,
    toggleH: 45,
    toggleIcon: 24,
  },
} as { [key: string]: { toggleW: number; toggleH: number; toggleIcon: number } };

export const getResponsive = (screenWidth: number) => {
  if (screenWidth >= 1024) {
    return ResponsiveSize.PC;
  } else if (screenWidth >= 768) {
    return ResponsiveSize.Tablet;
  } else {
    return ResponsiveSize.Mobile;
  }
};

// export const lightTheme: DefaultTheme = {
//   colors: {
//     mode: 'light',
//     bgColor: 'DDDBDB',
//     titleColor: '000000',
//     cardColor: 'FFFFFF',
//     textColor: '000000',
//     borderColor: 'DFE0E1',
//     offenseHighlight: 'E83737', //이건 디폴트, 다크 테마 모두 동일하게 사용하는 컬러
//     defenseHightlight: '6897A9', //이건 디폴트, 다크 테마 모두 동일하게 사용하는 컬러
//     notSelect: 'C6C6A7',
//     recommendColor: 'E83737', //이건 디폴트, 다크 테마 모두 동일하게 사용하는 컬러
//     toggleColor: '000000',
//     toggleIcon: 'DDDBDB',

//     //selection, 드래그 컬러
//   },
// };

// export const darkTheme: DefaultTheme = {
//   colors: {
//     mode: 'dark',
//     bgColor: '4F4D4D',
//     titleColor: 'DDDBDB',
//     cardColor: '171010',
//     textColor: 'DDDBDB',
//     borderColor: 'DFE0E1',
//     offenseHighlight: 'E83737',
//     defenseHightlight: '6897A9',
//     notSelect: '4F4D4D',
//     recommendColor: 'E83737',
//     toggleColor: 'DDDBDB',
//     toggleIcon: '4F4D4D',
//   },
// };

// export const typeColor: DefaultTheme = {
//   normalColor: 'C6C6A7',
//   fireColor: 'F5AC78',
//   waterColor: '9DB7F5',
//   electricColor: 'FAE078',
//   grassColor: 'A7DB8D',
//   iceColor: 'BCE6E6',
//   fightingColor: 'D67873',
//   poisonColor: 'C183C1',
//   groundColor: 'EBD69D',
//   flyingColor: 'C6B7F5',
//   psychicColor: 'FA92B2',
//   bugColor: 'C6D16E',
//   rockColor: 'D1C17D',
//   ghostColor: 'A292BC',
//   dragonColor: 'A27DFA',
//   darkColor: 'A29288',
//   steelColor: 'D1D1E0',
//   fairyColor: 'F4BDC9',
// };

export const theme = {
  ResponsiveSize,
  getResponsive,
  // lightTheme,
  // darkTheme,
  // typeColor,
};
// export default GlobalStyle;
export default theme;

// export type LightTheme = typeof lightTheme;
// export type DarkTheme = typeof darkTheme;
// export type Theme = typeof themes;
// export type TypeColor = typeof typeColor;
// export default DefaultTheme;
