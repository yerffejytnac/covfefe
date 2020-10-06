import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
    fontSizes: number[];
    fontWeights: number[];
    space: number[];
  }
}
