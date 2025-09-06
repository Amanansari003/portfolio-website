import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AboutContent, StrengthCard } from '../../core/models/about.interface';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent implements OnInit {
  aboutContent: AboutContent | null = null;
  isBrowser: boolean = false;

  constructor(
    private aboutService: AboutService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadAboutContent();
  }

  private loadAboutContent(): void {
    this.aboutService.getAboutContent().subscribe({
      next: (content) => {
        this.aboutContent = content;
      },
      error: (error) => {
        console.error('Error loading about content:', error);
        // Fallback to empty content or default values
        this.aboutContent = {
          title: "About Me",
          subtitle: "Loading...",
          description: [],
          strengths: [],
          education: {
            degree: "",
            institution: "",
            duration: ""
          }
        };
      }
    });
  }

  // Get icon SVG safely
  getIconSvg(iconName: string): string {
    return this.aboutService.getIconSvg(iconName);
  }

  // Track by function for ngFor optimization
  trackByStrengthId(index: number, strength: StrengthCard): string {
    return strength.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Method to get strength card classes
  getStrengthCardClass(index: number): string {
    const baseClass = 'strength-card';
    const animationClass = this.isBrowser ? `animate-delay-${index + 1}` : '';
    return `${baseClass} ${animationClass}`.trim();
  }
}
