import { css } from 'styled-components';

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
    }
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

    ::selection {
      background: var(--steel);
    }
  }
`;
