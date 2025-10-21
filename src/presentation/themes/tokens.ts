export type ColorTokens = {
  background: string;
  surface: string;
  primary: string;
  primaryVariant: string;
  text: string;
  mutedText: string;
  border: string;
  success: string;
  danger: string;
  shadow: string;
};

export type TypographyTokens = {
  h1: number;
  h2: number;
  body: number;
  small: number;
};

export type SpacingTokens = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

export type ThemeName = 'light' | 'dark' | 'system';

export type Theme = {
  name: ThemeName;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  rounded: number;
  elevation: number;
};
