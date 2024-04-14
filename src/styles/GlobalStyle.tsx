import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { lightTheme, darkTheme } from './theme';
import Helios from './Helios.woff';
import NotosansKRBlack from './NotoSansKRBlack.otf';

export const GlobalStyle = createGlobalStyle`
${reset}

:root {
  ${lightTheme}
  ${darkTheme}

  --white: #FFFFFF;
  --lightGray: #DDDBDB;
  --borderGray: #DFE0E1;
  --charcoal: #4F4D4D;
  --sealBrown: #171010;
  --black: #000000;  

    --offenseRec: #E83737;
    --defenseRec: #6897A9;

    --normal: #C6C6A7;
    --fire: #F5AC78;
    --water: #9DB7F5;
    --electric: #FAE078;
    --grass: #A7DB8D;
    --ice: #BCE6E6;
    --fighting: #D67873;
    --poision: #C183C1;
    --ground: #EBD69D;
    --flying: #C6B7F5;
    --psychic: #FA92B2;
    --bug: #C6D16E;
    --rock: #D1C17D;
    --ghost: #A292BC;
    --dragon: #A27DFA;
    --dark: #A29288;
    --steel: #D1D1E0;
    --fairy: #F4BDC9;
    --stella: #44628D;
    
  }
  
@font-face {
    font-family: 'Helios';
        src: local('./Helios.woff'), local('Helios');
        font-style: normal;
        src: url(${Helios}) format('truetype');
  }
  
  @font-face {
    font-family: 'NotoSansBlack';
    src: local('./NotoSansKRBlack'), local('NotoSansBlack');
    font-style: normal;
    src: url(${NotosansKRBlack}) format('truetype');
  }

  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'NotoSans', sans-serif;
  font-size: 16px;
  background-color: var(--color-background);  
  box-sizing: border-box;
}

br {
  display: inline;
}

.toggle {
      fill: var(--color-toggle);

      .toggleIcon {
        fill: var(--color-toggleIcon);
      }
    }


li {
  list-style: none;
}

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [hidden] {
  display: none;
}

  .shadow-bl {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.30));
  }

  .shadow-gr {
    filter: drop-shadow(0px 2px 2px var(--lightGray));
  }

  
  
`;

export default GlobalStyle;
