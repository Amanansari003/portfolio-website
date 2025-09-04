import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ContactConfig, DEFAULT_CONTACT_CONFIG, ContactInfo, SocialLink } from '../../core/models/contact.interface';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;

  config: ContactConfig = DEFAULT_CONTACT_CONFIG;
  private isBrowser: boolean;
  private observer?: IntersectionObserver;
  private hasAnimated = false;

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
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateContactElements();
            this.hasAnimated = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  private animateContactElements(): void {
    // Animate contact info items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, index * 150);
    });

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add('animate-in');
      }, (contactItems.length * 150) + (index * 100));
    });

    // Animate CTA section
    setTimeout(() => {
      const ctaSection = document.querySelector('.cta-section');
      ctaSection?.classList.add('animate-in');
    }, (contactItems.length * 150) + (socialLinks.length * 100) + 200);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.observer) {
      setTimeout(() => {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
          this.observer?.observe(contactSection);
        }
      }, 100);
    }
  }

  onContactClick(contact: ContactInfo): void {
    if (!this.isBrowser || !contact.link) return;

    try {
      window.open(contact.link, contact.type === 'email' ? '_self' : '_blank');
    } catch (error) {
      console.error('Error opening contact link:', error);
    }
  }

  onSocialClick(social: SocialLink): void {
    if (!this.isBrowser) return;

    try {
      window.open(social.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening social link:', error);
    }
  }

  onSendMessage(): void {
    // TODO: Implement send message functionality
    console.log('Send message clicked - implement later');
    
    // For now, open email client
    if (this.isBrowser) {
      const emailContact = this.config.contactInfo.find(info => info.type === 'email');
      if (emailContact?.link) {
        window.open(emailContact.link, '_self');
      }
    }
  }

  onDownloadResume(): void {
    if (!this.isBrowser) return;

    try {
      const link = document.createElement('a');
      link.href = this.config.resumeUrl;
      link.download = 'Aman_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener,noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback: open in new tab
      window.open(this.config.resumeUrl, '_blank', 'noopener,noreferrer');
    }
  }

  getContactIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'mail': 'M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'phone': 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
      'location': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z'
    };
    return iconMap[iconName] || iconMap['mail'];
  }

  getSocialIcon(platform: string): string {
    const iconMap: { [key: string]: string } = {
      'linkedin': 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
      'github': 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'
    };
    return iconMap[platform.toLowerCase()] || iconMap['github'];
  }

  trackByContactType(index: number, contact: ContactInfo): string {
    return contact.type;
  }

  trackBySocialPlatform(index: number, social: SocialLink): string {
    return social.platform;
  }
}