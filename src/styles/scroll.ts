import { shade } from "polished";
import { DefaultTheme, css } from "styled-components";

export const getScrollStyles = (theme: DefaultTheme) => css`
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${shade(0.2, theme.colors.neutral[20])};
    border-radius: 100px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neutral[20]};
    background: ${shade(0.6, theme.colors.neutral[20])};
    border-radius: 100px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neutral[60]};
    background: #949494;
  }
`;
