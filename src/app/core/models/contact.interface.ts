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
      value: 'sagar.aman918113@gmail.com',
      icon: 'mail',
      link: 'mailto:sagar.aman918113@gmail.com'
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+91 975-924-2416',
      icon: 'phone',
      link: 'tel:+919759242416'
    },
    {
      type: 'location',
      label: 'Location',
      value: 'Mohali, Punjab, India',
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
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/i_4man03?igsh=MXA5Znc2ajRkM2gxZg==',
      icon: 'instagram',
      label: 'Follow on Instagram'
    }
  ],
  availability: {
    status: 'Ready to start a project?',
    description: "I'm currently available for freelance work and full-time opportunities."
  },
  resumeUrl: 'assets/resume/Aman_Full_Stack_Developer_Resume.pdf'
};