import { createGlobalStyle } from "styled-components";
import reset from "./reset";

import fonts from "./fonts";

export const GlobalStyles = createGlobalStyle`
  ${reset};

  :root {
    text-size-adjust: none;
  }

  @font-face {
    font-family: Atak;
    src: url(${fonts.AtakRegularWoff2}) format("woff2"),
      url(${fonts.AtakRegularWoff}) format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: Rza;
    src: url(${fonts.RzaRegularWoff2}) format("woff2"),
      url(${fonts.RzaRegularWoff}) format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  
  body {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;
