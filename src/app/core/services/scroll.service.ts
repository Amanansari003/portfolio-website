import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly activeSection = signal<string>('home');
  private readonly isBrowser: boolean;
  
  readonly activeSection$ = this.activeSection.asReadonly();

  private observer: IntersectionObserver | null = null;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      if (this.isBrowser) {
        this.initializeIntersectionObserver();
      }
    }
  
  private initializeIntersectionObserver(): void {
    // Initialize observer when DOM is ready
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.activeSection.set(sectionId);
        }
      });
    }, options);

    // Observe all sections
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && this.observer) {
        this.observer.observe(element);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getCurrentScrollPosition(): number {
    if (this.isBrowser) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    return 0;
  }

  isScrolledPastThreshold(threshold: number = 50): boolean {
    return this.getCurrentScrollPosition() > threshold;
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}