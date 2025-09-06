export type Theme = 'light' | 'dark' | 'auto';

// export interface ThemeState {
//   currentTheme: Theme;
//   systemPreference: Theme;
//   userPreference: Theme | null;
// }

// export interface ThemeColors {
//   primary: {
//     50: string;
//     100: string;
//     200: string;
//     300: string;
//     400: string;
//     500: string;
//     600: string;
//     700: string;
//     800: string;
//     900: string;
//   };
//   background: {
//     primary: string;
//     secondary: string;
//     tertiary: string;
//     card: string;
//     elevated: string;
//     glass: string;
//   };
//   text: {
//     primary: string;
//     secondary: string;
//     tertiary: string;
//     muted: string;
//     disabled: string;
//   };
//   border: {
//     primary: string;
//     secondary: string;
//     accent: string;
//   };
//   status: {
//     success: string;
//     warning: string;
//     error: string;
//     info: string;
//   };
// }

// export interface ThemeVariables {
//   colors: ThemeColors;
//   typography: {
//     fontFamily: {
//       primary: string;
//       mono: string;
//     };
//     fontSize: Record<string, string>;
//     fontWeight: Record<string, string>;
//   };
//   spacing: Record<string, string>;
//   borderRadius: Record<string, string>;
//   shadows: Record<string, string>;
//   transitions: Record<string, string>;
//   zIndex: Record<string, number>;
// }