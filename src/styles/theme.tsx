import { css } from 'styled-components';

const Styles = css`
  body {
    background-color: var(--color-background);

    .title {
      color: var(--color-Title);
    }

    .card {
      background-color: var(--color-card);
      color: var(--color-text);

      .border {
        border: 1px solid var(--color-border);
      }

      .option {
        color: var(--color-text);
      }
    }

    .toggle {
      fill: var(--color-toggle);

      .toggleIcon {
        fill: var(--color-toggleIcon);
      }
    }
  }
`;

export const lightTheme = css`
  [data-theme='light'] {
    --color-background: var(--lightGray);
    --color-Title: var(--black);
    --color-card: var(--white);
    --color-text: var(--black);
    --color-border: var(--borderGray);
    --color-notSelected: var(--notselectedforLight);
    --color-toggle: var(--black);
    --color-toggleIcon: var(--lightGray);

    ::selection {
      background: var(--fighting);
      -webkit-tap-highlight-color: var(--fighting);
    }
    ${Styles};
  }
`;

export const darkTheme = css`
  [data-theme='dark'] {
    --color-background: var(--charcoal);
    --color-Title: var(--lightGray);
    --color-card: var(--sealBrown);
    --color-text: var(--lightGray);
    --color-border: var(--borderGray);
    --color-notSelected: var(--charcoal);
    --color-toggle: var(--lightGray);
    --color-toggleIcon: var(--charcoal);
    --color-shadow: var(--shadow);

    ::selection {
      background: var(--steel);
      color: var(--black);
    }
    ${Styles}
  }
`;
