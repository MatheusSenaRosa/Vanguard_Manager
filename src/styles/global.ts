import { createGlobalStyle, css } from "styled-components";

import { getScrollStyles } from "./scroll";

export const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
  html {
    ${getScrollStyles(theme)}
  }
  body {
    background-color: ${theme.colors.neutral[80]};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins";
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    list-style: none;

    --webkit-font-smoothing: antialiased;
  }
`}

`;

