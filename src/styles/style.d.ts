import 'styled-components';

declare module 'styled-components' {
  export interface TypeColor {
    normalColor: string;
    fireColor: string;
    waterColor: string;
    electricColor: string;
    grassColor: string;
    iceColor: string;
    fightingColor: string;
    poisonColor: string;
    groundColor: string;
    flyingColor: string;
    psychicColor: string;
    bugColor: string;
    rockColor: string;
    ghostColor: string;
    dragonColor: string;
    darkColor: string;
    steelColor: string;
    fairyColor: string;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      mode: string;
      bgColor: string;
      titleColor: string;
      cardColor: string;
      textColor: string;
      borderColor: string;
      offenseHighlight: string;
      defenseHightlight: string;
      notSelect: string;
      recommendColor: string;
    };
  }
}

declare module 'styled-components' {
  export interface TitleStyle {
    TitlefontSize: {
      pc: number;
      tablet: number;
      mobile: number;
    };
  }
}
