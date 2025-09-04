import { Injectable } from '@angular/core';
import { AnimationOptions, ScrollAnimationConfig } from '../models/animation.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observers: Map<Element, IntersectionObserver> = new Map();
  
  constructor() {}

  // Animate element with CSS animations
  animate(
    element: HTMLElement,
    animationName: string,
    options: AnimationOptions = {}
  ): Promise<void> {
    return new Promise((resolve) => {
      const defaultOptions: AnimationOptions = {
        duration: 600,
        delay: 0,
        easing: 'ease-out',
        direction: 'normal',
        fillMode: 'forwards',
        iterationCount: 1
      };

      const finalOptions = { ...defaultOptions, ...options };

      // Apply animation styles
      element.style.animationName = animationName;
      element.style.animationDuration = `${finalOptions.duration}ms`;
      element.style.animationDelay = `${finalOptions.delay}ms`;
      element.style.animationTimingFunction = finalOptions.easing!;
      element.style.animationDirection = finalOptions.direction!;
      element.style.animationFillMode = finalOptions.fillMode!;
      element.style.animationIterationCount = 
        typeof finalOptions.iterationCount === 'number' 
          ? finalOptions.iterationCount.toString() 
          : finalOptions.iterationCount!;

      // Listen for animation end
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };

      element.addEventListener('animationend', handleAnimationEnd);

      // Trigger reflow to start animation
      element.offsetHeight;
    });
  }

  // Fade in animation
  fadeIn(element: HTMLElement, options: AnimationOptions = {}): Promise<void> {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    return this.animate(element, 'fadeIn', options);
  }

  // Slide up animation
  slideUp(element: HTMLElement, options: AnimationOptions = {}): Promise<void> {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    
    return this.animate(element, 'slideUp', options);
  }

  // Scale in animation
  scaleIn(element: HTMLElement, options: AnimationOptions = {}): Promise<void> {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    return this.animate(element, 'scaleIn', options);
  }

  // Stagger animations for multiple elements
  staggerAnimation(
    elements: HTMLElement[],
    animationType: 'fadeIn' | 'slideUp' | 'scaleIn',
    staggerDelay: number = 100,
    baseOptions: AnimationOptions = {}
  ): Promise<void[]> {
    const animations = elements.map((element, index) => {
      const options = {
        ...baseOptions,
        delay: (baseOptions.delay || 0) + (index * staggerDelay)
      };

      switch (animationType) {
        case 'fadeIn':
          return this.fadeIn(element, options);
        case 'slideUp':
          return this.slideUp(element, options);
        case 'scaleIn':
          return this.scaleIn(element, options);
        default:
          return this.fadeIn(element, options);
      }
    });

    return Promise.all(animations);
  }

  // Animate on scroll
  animateOnScroll(
    element: HTMLElement,
    animationType: 'fadeIn' | 'slideUp' | 'scaleIn',
    config: ScrollAnimationConfig = {},
    options: AnimationOptions = {}
  ): void {
    const defaultConfig: ScrollAnimationConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      triggerOnce: true
    };

    const finalConfig = { ...defaultConfig, ...config };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch (animationType) {
              case 'fadeIn':
                this.fadeIn(element, options);
                break;
              case 'slideUp':
                this.slideUp(element, options);
                break;
              case 'scaleIn':
                this.scaleIn(element, options);
                break;
            }

            if (finalConfig.triggerOnce) {
              observer.unobserve(element);
              this.observers.delete(element);
            }
          }
        });
      },
      {
        threshold: finalConfig.threshold,
        rootMargin: finalConfig.rootMargin
      }
    );

    observer.observe(element);
    this.observers.set(element, observer);
  }

  // Create floating particles animation
  createFloatingElements(
    container: HTMLElement,
    count: number = 6,
    className: string = 'floating-shape'
  ): void {
    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div');
      shape.className = `${className} floating-shape-${i + 1}`;
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 60 + 20;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      shape.style.left = `${x}%`;
      shape.style.top = `${y}%`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `${delay}s`;

      container.appendChild(shape);
    }
  }

  // Parallax scroll effect
  createParallaxEffect(
    elements: Array<{ element: HTMLElement; speed: number }>,
    container?: HTMLElement
  ): () => void {
    const handleScroll = () => {
      const scrolled = container ? container.scrollTop : window.pageYOffset;

      elements.forEach(({ element, speed }) => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    const target = container || window;
    target.addEventListener('scroll', handleScroll);

    // Return cleanup function
    return () => target.removeEventListener('scroll', handleScroll);
  }

  // Text reveal animation
  animateTextReveal(
    element: HTMLElement,
    duration: number = 1000,
    staggerDelay: number = 50
  ): Promise<void> {
    return new Promise((resolve) => {
      const text = element.textContent || '';
      element.innerHTML = '';

      const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        span.style.display = 'inline-block';
        span.style.transition = `all ${duration}ms ease-out`;
        return span;
      });

      chars.forEach(char => element.appendChild(char));

      // Animate each character
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
        }, index * staggerDelay);
      });

      // Resolve when last character is animated
      setTimeout(() => {
        resolve();
      }, chars.length * staggerDelay + duration);
    });
  }

  // Cleanup method
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Destroy specific observer
  destroyObserver(element: HTMLElement): void {
    const observer = this.observers.get(element);
    if (observer) {
      observer.disconnect();
      this.observers.delete(element);
    }
  }
}
