import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutContent, ABOUT_DATA } from '../../core/models/about.interface';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  
  constructor() {}

  // Get about content - returns observable for consistency
  getAboutContent(): Observable<AboutContent> {
    return of(ABOUT_DATA);
  }

  // Get specific strength by ID
  getStrengthById(id: string) {
    return ABOUT_DATA.strengths.find(strength => strength.id === id);
  }

  // Get icon class name for strength cards
  getIconClass(iconName: string): string {
    const iconMap: Record<string, string> = {
      'code': 'icon-code',
      'zap': 'icon-zap', 
      'users': 'icon-users',
      'book': 'icon-book'
    };
    
    return iconMap[iconName] || 'icon-default';
  }

  // Get SVG icon for strength cards (simple inline SVG)
  getIconSvg(iconName: string): string {
    const icons: Record<string, string> = {
      'code': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <polyline points="16,18 22,12 16,6"></polyline>
                 <polyline points="8,6 2,12 8,18"></polyline>
               </svg>`,
      'zap': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
              </svg>`,
      'users': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>`,
      'book': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                 <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
               </svg>`
    };
    
    return icons[iconName] || icons['code'];
  }
}
