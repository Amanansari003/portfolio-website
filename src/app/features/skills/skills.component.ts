import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { SkillsConfig, DEFAULT_SKILLS_CONFIG, Skill, SkillCategory } from '../../core/models/skills.interface';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, OnDestroy {
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef<HTMLElement>>;

  config: SkillsConfig = DEFAULT_SKILLS_CONFIG;
  private isBrowser: boolean;
  private observer?: IntersectionObserver;
  private animatedSkills = new Set<string>();

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
            const skillName = element.dataset['skill'];
            const level = parseInt(element.dataset['level'] || '0');
            
            if (skillName && !this.animatedSkills.has(skillName)) {
              this.animateProgressBar(element, level);
              this.animatedSkills.add(skillName);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  private animateProgressBar(element: HTMLElement, targetLevel: number): void {
    const progressFill = element.querySelector('.progress-fill') as HTMLElement;
    const progressText = element.querySelector('.progress-text') as HTMLElement;
    
    if (!progressFill || !progressText) return;

    let currentLevel = 0;
    const duration = 1500; // 1.5 seconds
    const increment = targetLevel / (duration / 16); // 60fps

    const animate = () => {
      currentLevel += increment;
      
      if (currentLevel >= targetLevel) {
        currentLevel = targetLevel;
        progressFill.style.width = `${currentLevel}%`;
        progressText.style.opacity = '1';
        progressText.textContent = `${Math.round(currentLevel)}%`;
        return;
      }
      
      progressFill.style.width = `${currentLevel}%`;
      progressText.style.opacity = '1';
      progressText.textContent = `${Math.round(currentLevel)}%`;
      
      requestAnimationFrame(animate);
    };
    
    // Add a small delay for stagger effect
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, Math.random() * 200);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.observer) {
      // Observe all progress bars
      setTimeout(() => {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          this.observer?.observe(bar);
        });
      }, 100);
    }
  }

  trackBySkillName(index: number, skill: Skill): string {
    return skill.name;
  }

  trackByCategoryTitle(index: number, category: SkillCategory): string {
    return category.title;
  }

  trackByTechName(index: number, tech: { name: string }): string {
    return tech.name;
  }
}
