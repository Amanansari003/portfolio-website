import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { ProjectsConfig, DEFAULT_PROJECTS_CONFIG, Project } from '../../core/models/projects.interface';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef<HTMLElement>>;

  config: ProjectsConfig = DEFAULT_PROJECTS_CONFIG;
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
            const projectId = element.dataset['projectId'];
            
            if (projectId && !this.animatedCards.has(projectId)) {
              this.animateCard(element);
              this.animatedCards.add(projectId);
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

    // Animate technology tags
    const techTags = element.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
      setTimeout(() => {
        tag.classList.add('pop-in');
      }, (achievements.length * 100) + (index * 50));
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.observer) {
      setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          this.observer?.observe(card);
        });
      }, 100);
    }
  }

  viewProjectDetails(project: Project): void {
    if (project.projectUrl) {
      window.open(project.projectUrl, '_blank');
    } else {
      // Handle project details modal or navigation
      console.log('View project details:', project.title);
    }
  }

  viewProjectCode(project: Project): void {
    if (project.codeUrl) {
      window.open(project.codeUrl, '_blank');
    }
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  trackByAchievement(index: number, achievement: string): string {
    return achievement;
  }

  trackByTechnology(index: number, technology: string): string {
    return technology;
  }
}
