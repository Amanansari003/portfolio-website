export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface AdditionalTech {
  name: string;
  category?: string;
}

export interface SkillsConfig {
  categories: SkillCategory[];
  additionalTechnologies: AdditionalTech[];
}

export const DEFAULT_SKILLS_CONFIG: SkillsConfig = {
  categories: [
    {
      title: 'Backend',
      icon: '🚀',
      skills: [
        { name: 'C#', level: 95 },
        { name: 'ASP.NET Core', level: 90 },
        { name: 'Web API', level: 88 },
        { name: 'Entity Framework', level: 85 },
        { name: 'MSSQL', level: 87 },
        { name: 'Azure Functions', level: 82 },
        { name: 'Redis', level: 78 }
      ]
    },
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'HTML/CSS', level: 85 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'Bootstrap', level: 82 },
        { name: 'Angular Material', level: 85 }
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: '⚡',
      skills: [
        { name: 'Visual Studio', level: 88 },
        { name: 'Git/GitHub', level: 85 },
        { name: 'Azure DevOps', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Postman', level: 85 },
        { name: 'SSMS', level: 82 }
      ]
    }
  ],
  additionalTechnologies: [
    { name: 'JWT', category: 'Security' },
    { name: 'LINQ', category: 'Backend' },
    { name: 'Dapper', category: 'Backend' },
    { name: 'ADO.NET', category: 'Backend' },
    { name: 'RabbitMQ', category: 'Message Queue' },
    { name: 'CI/CD', category: 'DevOps' },
    { name: 'PrimeNG', category: 'Frontend' },
    { name: 'jQuery', category: 'Frontend' },
    { name: 'Auth0', category: 'Security' },
    { name: 'Azure Table Storage', category: 'Cloud' }
  ]
};