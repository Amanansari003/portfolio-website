export interface AboutContent {
  title: string;
  subtitle: string;
  description: string[];
  strengths: StrengthCard[];
  education: Education;
}

export interface StrengthCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  location?: string;
}

export const ABOUT_DATA: AboutContent = {
  title: "About Me",
  subtitle: "Passionate Full Stack Developer with expertise in modern web technologies",
  description: [
    "I'm a Full Stack Developer skilled in Angular, C#, and ASP.NET Core, with a passion for building scalable, high-performance web applications. I thrive on delivering optimized, enterprise-grade solutions using modern development methodologies.",
    "At Cloud Analogy, I've developed complex synchronization systems, optimized application performance, and contributed to significant cost reductions through innovative serverless architectures. My expertise spans across the full development lifecycle, from backend APIs to responsive frontend interfaces."
  ],
  strengths: [
    {
      id: "fullstack",
      title: "Full Stack Expertise",
      description: "Specialized in Angular, C#, and ASP.NET Core with proven track record of delivering scalable solutions",
      icon: "code"
    },
    {
      id: "performance",
      title: "Performance Focused",
      description: "Consistently improved application performance by 25-35% through optimization and modern practices",
      icon: "zap"
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      description: "Contributed to 20% faster project delivery through effective cross-functional collaboration",
      icon: "users"
    },
    {
      id: "learning",
      title: "Continuous Learning",
      description: "Always updating skills with latest technologies and best practices in web development",
      icon: "book"
    }
  ],
  education: {
    degree: "Bachelor of Technology in CSE",
    institution: "Dr. A. P. J. Abdul Kalam Technical University",
    duration: "Aug 2019 - July 2023",
    location: "Uttar Pradesh, India"
  }
};