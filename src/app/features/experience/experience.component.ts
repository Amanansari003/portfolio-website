import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { ExperienceConfig, DEFAULT_EXPERIENCE_CONFIG, WorkExperience } from '../../core/models/experience.interface';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @ViewChildren('experienceCard') experienceCards!: QueryList<ElementRef<HTMLElement>>;

  config: ExperienceConfig = DEFAULT_EXPERIENCE_CONFIG;
  private isBrowser: boolean;
  private observer?: IntersectionObserver;
  private animatedCards = new Set<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const experienceId = element.dataset['experienceId'];
            
            if (experienceId && !this.animatedCards.has(experienceId)) {
              this.animateCard(element);
              this.animatedCards.add(experienceId);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  private animateCard(element: HTMLElement): void {
    element.classList.add('animate-in');
    
    // Animate achievements with stagger
    const achievements = element.querySelectorAll('.achievement-item');
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        achievement.classList.add('fade-in');
      }, index * 100);
    });

    // Animate responsibilities with stagger
    const responsibilities = element.querySelectorAll('.responsibility-item');
    responsibilities.forEach((responsibility, index) => {
      setTimeout(() => {
        responsibility.classList.add('slide-in');
      }, (achievements.length * 100) + (index * 50));
    });

    // Animate technology tags
    const techTags = element.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
      setTimeout(() => {
        tag.classList.add('pop-in');
      }, (achievements.length * 100) + (responsibilities.length * 50) + (index * 30));
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.observer) {
      setTimeout(() => {
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach(card => {
          this.observer?.observe(card);
        });
      }, 100);
    }
  }

  getDateRange(experience: WorkExperience): string {
    return `${experience.startDate} - ${experience.isPresent ? 'Present' : experience.endDate}`;
  }

  trackByExperienceId(index: number, experience: WorkExperience): string {
    return experience.id;
  }

  trackByAchievement(index: number, achievement: { text: string }): string {
    return achievement.text;
  }

  trackByResponsibility(index: number, responsibility: string): string {
    return responsibility;
  }

  trackByTechnology(index: number, technology: string): string {
    return technology;
  }
}
