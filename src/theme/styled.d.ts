import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    theme: {
      textColor: string;
      bgColor: string;
      formColor: string;
      borderColor: string;
      darkGray: string;
      lightGray: string;
      btnTextColor: string;
      podoColor: string;
      closeBtnColor: string;
      lightPodoColor: string;
    };
  }
}
