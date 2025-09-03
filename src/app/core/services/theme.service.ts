import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Theme } from './models/theme.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly currentTheme = signal<Theme>('dark');
  private readonly storageKey = 'portfolio-theme';
  private readonly isBrowser: boolean;
    
  readonly theme$ = this.currentTheme.asReadonly();
  

  // 1. Inject PLATFORM_ID to determine the execution environment
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // 2. Only initialize the theme if we are in a browser
    if (this.isBrowser) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    // Check for saved theme in localStorage
    const savedTheme = this.getStoredTheme();
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyThemeToDocument(theme);
    this.saveThemeToStorage(theme);
  }

  getCurrentTheme(): Theme {
    return this.currentTheme();
  }

  isDarkTheme(): boolean {
    return this.currentTheme() === 'dark';
  }

  private applyThemeToDocument(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }

  private getStoredTheme(): Theme | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      return (stored === 'light' || stored === 'dark') ? stored : null;
    }
    return null;
  }

  private saveThemeToStorage(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  // Method to get CSS custom property value
  getCSSVariable(property: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${property}`)
      .trim();
  }

  // Method to set CSS custom property
  setCSSVariable(property: string, value: string): void {
    document.documentElement.style.setProperty(`--${property}`, value);
  }
}
