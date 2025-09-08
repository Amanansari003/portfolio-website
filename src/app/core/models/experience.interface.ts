
export interface Achievement {
  text: string;
  impact?: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  icon?: string;
  achievements: Achievement[];
  responsibilities: string[];
  technologies: string[];
}

export interface ExperienceConfig {
  experiences: WorkExperience[];
}

export const DEFAULT_EXPERIENCE_CONFIG: ExperienceConfig = {
  experiences: [
    {
      id: 'cloud-analogy',
      position: '.Net - Full Stack Developer',
      company: 'Cloud Analogy',
      location: 'Mohali',
      startDate: 'July 2023',
      endDate: 'Present',
      isPresent: true,
      icon: '💼',
      achievements: [
        {
          text: 'Developed real-time bidirectional synchronization system with 99.9% accuracy'
        },
        {
          text: 'Reduced infrastructure costs by 60% using serverless architecture'
        },
        {
          text: 'Improved page load performance by 25%'
        },
        {
          text: 'Reduced support queries by 200+ annually'
        },
        {
          text: 'Contributed to 20% faster project delivery'
        },
        {
          text: 'Reduced post-deployment bugs by 30%'
        }
      ],
      responsibilities: [
        'Developed bidirectional synchronization system between Jira and DevStride using Azure Functions',
        'Built scalable web applications using .NET and Angular with focus on performance optimization',
        'Integrated RESTful APIs and implemented secure authentication flows',
        'Collaborated with cross-functional teams to deliver high-quality solutions',
        'Implemented comprehensive testing strategies to improve code reliability'
      ],
      technologies: [
        'ASP.NET Core',
        'Angular',
        'Azure Functions',
        'Azure Table Storage',
        'REST APIs',
        'JWT',
        'Git',
        'Azure DevOps',
        'MSSQL'
      ]
    }
  ]
};