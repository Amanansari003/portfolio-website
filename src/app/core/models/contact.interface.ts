export interface ContactInfo {
  type: 'email' | 'phone' | 'location';
  label: string;
  value: string;
  icon: string;
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface ContactConfig {
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  availability: {
    status: string;
    description: string;
  };
  resumeUrl: string;
}

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  contactInfo: [
    {
      type: 'email',
      label: 'Email',
      value: 'your.email@example.com',
      icon: 'mail',
      link: 'mailto:your.email@example.com'
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+91 XXX-XXX-XXXX',
      icon: 'phone',
      link: 'tel:+91XXXXXXXXXX'
    },
    {
      type: 'location',
      label: 'Location',
      value: 'India',
      icon: 'location'
    }
  ],
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/amanansari003/',
      icon: 'linkedin',
      label: 'Connect on LinkedIn'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/Amanansari003',
      icon: 'github',
      label: 'View GitHub Profile'
    }
  ],
  availability: {
    status: 'Ready to start a project?',
    description: "I'm currently available for freelance work and full-time opportunities."
  },
  resumeUrl: '../../../assets/resume/Aman_Full_Stack_Developer_Resume.pdf'
};