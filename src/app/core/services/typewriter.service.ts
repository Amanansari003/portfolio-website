import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { TypewriterConfig } from '../models/typewriterConfig.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TypewriterService {
  private readonly defaultConfig: TypewriterConfig = {
    words: ['Developer'],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  };

  private currentText = signal('');
  private isTyping = signal(false);
  private showCursor = signal(true);
  private currentWordIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private timeoutId: any = null;
  private readonly isBrowser: boolean;
  
  readonly currentText$ = this.currentText.asReadonly();
  readonly isTyping$ = this.isTyping.asReadonly();
  readonly showCursor$ = this.showCursor.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only start cursor blink in browser environment
    if (this.isBrowser) {
      this.startCursorBlink();
    }
  }

  startTypewriter(config: Partial<TypewriterConfig> = {}): void {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    this.isTyping.set(true);
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    
    this.typeText(finalConfig);
  }

  stopTypewriter(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isTyping.set(false);
  }

  private typeText(config: TypewriterConfig): void {
    const currentWord = config.words[this.currentWordIndex];
    
    if (!this.isDeleting) {
      // Typing mode
      if (this.currentCharIndex < currentWord.length) {
        this.currentText.set(currentWord.substring(0, this.currentCharIndex + 1));
        this.currentCharIndex++;
        
        this.timeoutId = setTimeout(() => {
          this.typeText(config);
        }, config.typeSpeed + this.getRandomDelay());
      } else {
        // Word is complete, start deleting after delay
        if (config.loop && config.words.length > 1) {
          this.timeoutId = setTimeout(() => {
            this.isDeleting = true;
            this.typeText(config);
          }, config.delayBetweenWords);
        } else {
          // Single word or no loop - stop typing
          this.isTyping.set(false);
        }
      }
    } else {
      // Deleting mode
      if (this.currentCharIndex > 0) {
        this.currentText.set(currentWord.substring(0, this.currentCharIndex - 1));
        this.currentCharIndex--;
        
        this.timeoutId = setTimeout(() => {
          this.typeText(config);
        }, config.deleteSpeed);
      } else {
        // Word is deleted, move to next word
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % config.words.length;
        
        this.timeoutId = setTimeout(() => {
          this.typeText(config);
        }, config.typeSpeed);
      }
    }
  }

  private getRandomDelay(): number {
    // Add random delay to make typing feel more natural
    return Math.random() * 100;
  }

  private startCursorBlink(): void {
    interval(530).subscribe(() => {
      if (this.isTyping$()) {
        this.showCursor.update(current => !current);
      } else {
        this.showCursor.set(true);
      }
    });
  }

  // Method to create a custom typewriter observable
  createTypewriter(text: string, speed: number = 100): Observable<string> {
    return new Observable(observer => {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          observer.next(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          observer.complete();
          clearInterval(typeInterval);
        }
      }, speed);

      // Cleanup function
      return () => clearInterval(typeInterval);
    });
  }

  // Method for one-time typing effect
  typeOnce(
    text: string, 
    speed: number = 100,
    callback?: (char: string, index: number) => void
  ): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      
      const typeChar = () => {
        if (index <= text.length) {
          const currentText = text.substring(0, index);
          this.currentText.set(currentText);
          
          if (callback) {
            callback(text[index - 1], index - 1);
          }
          
          index++;
          setTimeout(typeChar, speed + this.getRandomDelay());
        } else {
          resolve();
        }
      };
      
      typeChar();
    });
  }

  // Reset to initial state
  reset(): void {
    this.stopTypewriter();
    this.currentText.set('');
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
  }

  // Get current state
  getCurrentState(): {
    text: string;
    isTyping: boolean;
    showCursor: boolean;
  } {
    return {
      text: this.currentText$(),
      isTyping: this.isTyping$(),
      showCursor: this.showCursor$()
    };
  }
}