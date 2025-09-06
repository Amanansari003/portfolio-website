import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';
import { NavItem } from '../../core/models/navigation.interface';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly isScrolled = signal(false);
  private readonly isMobileMenuOpen = signal(false);
  
  readonly isScrolled$ = this.isScrolled.asReadonly();
  readonly isMobileMenuOpen$ = this.isMobileMenuOpen.asReadonly();

  navItems: NavItem[] = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  constructor(
    private scrollService: ScrollService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
  }

  private checkScrollPosition(): void {
    const scrolled = this.scrollService.isScrolledPastThreshold(20);
    this.isScrolled.set(scrolled);
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.closeMobileMenu();
  }

  scrollToHome(): void {
    this.scrollService.scrollToSection('home');
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(current => !current);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isActiveSection(sectionId: string): boolean {
    return this.scrollService.activeSection$() === sectionId;
  }

  // Prevent scroll when mobile menu is open
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
      this.closeMobileMenu();
    }
  }
}