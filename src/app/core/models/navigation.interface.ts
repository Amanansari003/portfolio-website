export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
}

// export interface ScrollPosition {
//   x: number;
//   y: number;
// }

// export interface SectionVisibility {
//   id: string;
//   isVisible: boolean;
//   intersectionRatio: number;
// }

// export interface ScrollOptions {
//   behavior?: ScrollBehavior;
//   block?: ScrollLogicalPosition;
//   inline?: ScrollLogicalPosition;
// }

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
  };
}