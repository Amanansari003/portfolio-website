export interface HeroContent {
  staticText: string;
  animatedWords: string[];
  subtitle: string;
  highlightedTechs: string[];
  buttons: HeroButton[];
}

export interface HeroButton {
  id: string;
  text: string;
  type: 'primary' | 'secondary' | 'outline';
  action: 'scroll' | 'download' | 'external';
  target?: string;
  url?: string;
  ariaLabel?: string;
  icon?: string;
}

export interface TypewriterState {
  currentText: string;
  isTyping: boolean;
  showCursor: boolean;
  currentWordIndex: number;
}

export interface HeroAnimation {
  name: string;
  duration: number;
  delay: number;
  easing: string;
  element?: HTMLElement;
}

export interface FloatingShape {
  id: string;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle';
}

export interface HeroConfig {
  content: HeroContent;
  animations: {
    typewriter: {
      words: string[];
      typeSpeed: number;
      deleteSpeed: number;
      delayBetweenWords: number;
      loop: boolean;
    };
    entrance: {
      titleDelay: number;
      subtitleDelay: number;
      buttonsDelay: number;
      staggerDelay: number;
    };
    background: {
      floatingShapes: boolean;
      particleCount: number;
      enableParallax: boolean;
    };
  };
  responsive: {
    mobile: {
      titleFontSize: string;
      subtitleFontSize: string;
      buttonLayout: 'stacked' | 'horizontal';
    };
    tablet: {
      titleFontSize: string;
      subtitleFontSize: string;
      buttonLayout: 'stacked' | 'horizontal';
    };
    desktop: {
      titleFontSize: string;
      subtitleFontSize: string;
      buttonLayout: 'horizontal';
    };
  };
}

export interface HeroState {
  isLoaded: boolean;
  animationsComplete: boolean;
  typewriterState: TypewriterState;
  currentBreakpoint: 'mobile' | 'tablet' | 'desktop';
}

// Default hero configuration
export const DEFAULT_HERO_CONFIG: HeroConfig = {
  content: {
    staticText: 'Full Stack',
    animatedWords: ['Developer', 'Engineer', 'Creator', 'Architect'],
    subtitle: 'Crafting scalable web applications with',
    highlightedTechs: ['Angular', 'C#', 'ASP.NET Core'],
    buttons: [
      {
        id: 'view-work',
        text: 'View My Work',
        type: 'primary',
        action: 'scroll',
        target: 'projects',
        ariaLabel: 'Scroll to projects section'
      },
      {
        id: 'download-resume',
        text: 'Download Resume',
        type: 'secondary',
        action: 'download',
        url: '/assets/documents/resume.pdf',
        ariaLabel: 'Download resume PDF file'
      }
    ]
  },
  animations: {
    typewriter: {
      words: ['Developer', 'Engineer', 'Creator', 'Architect'],
      typeSpeed: 50,
      deleteSpeed: 50,
      delayBetweenWords: 1000,
      loop: true
    },
    entrance: {
      titleDelay: 300,
      subtitleDelay: 600,
      buttonsDelay: 900,
      staggerDelay: 150
    },
    background: {
      floatingShapes: true,
      particleCount: 6,
      enableParallax: true
    }
  },
  responsive: {
    mobile: {
      titleFontSize: 'var(--text-3xl)',
      subtitleFontSize: 'clamp(1rem, 4vw, 1.25rem)',
      buttonLayout: 'stacked'
    },
    tablet: {
      titleFontSize: 'clamp(3rem, 6vw, 5rem)',
      subtitleFontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      buttonLayout: 'horizontal'
    },
    desktop: {
      titleFontSize: 'var(--text-6xl)',
      subtitleFontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
      buttonLayout: 'horizontal'
    }
  }
};