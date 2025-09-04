import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Signal, signal, ViewChild } from '@angular/core';
import { TypewriterService } from '../../core/services/typewriter.service';
import { AnimationService } from '../../core/services/animation.service';
import { ScrollService } from '../../core/services/scroll.service';
import { DEFAULT_HERO_CONFIG, HeroButton, HeroConfig, HeroState } from '../../core/models/hero.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroContainer', { static: true }) heroContainer!: ElementRef<HTMLElement>;
  @ViewChild('titleElement', { static: true }) titleElement!: ElementRef<HTMLElement>;
  @ViewChild('subtitleElement', { static: true }) subtitleElement!: ElementRef<HTMLElement>;
  @ViewChild('buttonsContainer', { static: true }) buttonsContainer!: ElementRef<HTMLElement>;
  @ViewChild('backgroundShapes', { static: true }) backgroundShapes!: ElementRef<HTMLElement>;

  private readonly heroState = signal<HeroState>({
    isLoaded: false,
    animationsComplete: false,
    typewriterState: {
      currentText: '',
      isTyping: false,
      showCursor: true,
      currentWordIndex: 0
    },
    currentBreakpoint: 'desktop'
  });
  private readonly isBrowser: boolean;

  readonly heroState$ = this.heroState.asReadonly();
  readonly config: HeroConfig = DEFAULT_HERO_CONFIG;
  
  // Typewriter text signals
  readonly typewriterText: Signal<string> = signal('');
  readonly showCursor: Signal<boolean> = signal(true);
  readonly isTyping: Signal<boolean> = signal(false);

  private parallaxCleanup?: () => void;
  private resizeObserver?: ResizeObserver;

  constructor(
    private typewriterService: TypewriterService,
    private animationService: AnimationService,
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) 
  {
    this.typewriterText = this.typewriterService.currentText$;
    this.showCursor = this.typewriterService.showCursor$;
    this.isTyping = this.typewriterService.isTyping$;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updateBreakpoint();
    this.setupResizeObserver();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeHero();
    }, 100);
  }

  ngOnDestroy(): void {
    this.typewriterService.stopTypewriter();
    this.animationService.cleanup();
    if (this.parallaxCleanup) {
      this.parallaxCleanup();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateBreakpoint();
  }

  private async initializeHero(): Promise<void> {
    try {
      if (!this.isBrowser) return;
      // Create floating background elements
      if (this.config.animations.background.floatingShapes) {
        this.createFloatingShapes();
      }

      // Setup parallax effect
      if (this.config.animations.background.enableParallax) {
        this.setupParallaxEffect();
      }

      // Start entrance animations
      await this.startEntranceAnimations();

      // Start typewriter effect
      this.startTypewriter();

      // Update state
      this.heroState.update(state => ({
        ...state,
        isLoaded: true,
        animationsComplete: true
      }));

    } catch (error) {
      console.error('Error initializing hero section:', error);
    }
  }

  private async startEntranceAnimations(): Promise<void> {
    const { entrance } = this.config.animations;

    // Animate title
    await this.animationService.fadeIn(
      this.titleElement.nativeElement,
      { 
        delay: entrance.titleDelay,
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    );

    // Animate subtitle
    this.animationService.slideUp(
      this.subtitleElement.nativeElement,
      { 
        delay: entrance.subtitleDelay,
        duration: 600
      }
    );

    // Animate buttons with stagger
    const buttons = this.buttonsContainer.nativeElement.querySelectorAll('.hero-button');
    await this.animationService.staggerAnimation(
      Array.from(buttons) as HTMLElement[],
      'scaleIn',
      entrance.staggerDelay,
      { delay: entrance.buttonsDelay }
    );
  }

  private startTypewriter(): void {
    const { typewriter } = this.config.animations;
    
    this.typewriterService.startTypewriter({
      words: typewriter.words,
      typeSpeed: typewriter.typeSpeed,
      deleteSpeed: typewriter.deleteSpeed,
      delayBetweenWords: typewriter.delayBetweenWords,
      loop: typewriter.loop,
      showCursor: true,
      cursorChar: '|'
    });
  }

  private createFloatingShapes(): void {
    if (this.backgroundShapes?.nativeElement) {
      this.animationService.createFloatingElements(
        this.backgroundShapes.nativeElement,
        this.config.animations.background.particleCount,
        'floating-shape'
      );
    }
  }

  private setupParallaxEffect(): void {
    const shapes = this.backgroundShapes?.nativeElement.querySelectorAll('.floating-shape');
    
    if (shapes) {
      const parallaxElements = Array.from(shapes).map((shape, index) => ({
        element: shape as HTMLElement,
        speed: 0.1 + (index * 0.05) // Different speeds for each shape
      }));
      this.parallaxCleanup = this.animationService.createParallaxEffect(parallaxElements);
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateBreakpoint();
      });

      this.resizeObserver.observe(document.body);
    }
  }

  private updateBreakpoint(): void {
    if (!this.isBrowser) return;
    const width = window.innerWidth;
    let breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';

    if (width < 768) {
      breakpoint = 'mobile';
    } else if (width < 1024) {
      breakpoint = 'tablet';
    }

    this.heroState.update(state => ({
      ...state,
      currentBreakpoint: breakpoint
    }));
  }

  private downloadFile(url: string, filename: string): void {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener,noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  // Getter for current responsive config
  get currentResponsiveConfig() {
    const breakpoint = this.heroState$().currentBreakpoint;
    return this.config.responsive[breakpoint];
  }

  // Getter for button layout class
  get buttonLayoutClass(): string {
    return `buttons-${this.currentResponsiveConfig.buttonLayout}`;
  }

  // Button action handlers
  onButtonClick(button: HeroButton): void {
    switch (button.action) {
      case 'scroll':
        if (button.target) {
          this.scrollService.scrollToSection(button.target);
        }
        break;
      
      case 'download':
        if (button.url) {
          this.downloadFile(button.url, 'Sagar_Aman_Resume.pdf');
        }
        break;
      
      case 'external':
        if (button.url) {
          window.open(button.url, '_blank', 'noopener,noreferrer');
        }
        break;
      
      default:
        console.warn(`Unknown button action: ${button.action}`);
    }
  }

  // Track by function for ngFor optimization
  trackByButtonId(index: number, button: HeroButton): string {
    return button.id;
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }

  // Method to get tech highlight class
  getTechHighlightClass(tech: string): string {
    const techMap: Record<string, string> = {
      'Angular': 'tech-dotnet',
      'C#': 'tech-dotnet',
      'ASP.NET Core': 'tech-dotnet'
    };
    
    return techMap[tech] || 'tech-default';
  }

  // Method to restart animations (useful for testing)
  restartAnimations(): void {
    this.heroState.update(state => ({
      ...state,
      isLoaded: false,
      animationsComplete: false
    }));

    this.typewriterService.reset();
    
    // Reset elements
    const elements = [
      this.titleElement?.nativeElement,
      this.subtitleElement?.nativeElement,
      ...Array.from(this.buttonsContainer?.nativeElement.querySelectorAll('.hero-button') || [])
    ];

    elements.forEach(el => {
      if (el instanceof HTMLElement) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
        }
    });

    // Restart after brief delay
    setTimeout(() => {
      this.initializeHero();
    }, 200);
  }
}