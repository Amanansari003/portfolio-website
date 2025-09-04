export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  achievements: string[];
  technologies: string[];
  projectUrl?: string;
  codeUrl?: string;
}

export interface ProjectsConfig {
  projects: Project[];
}

export const DEFAULT_PROJECTS_CONFIG: ProjectsConfig = {
  projects: [
    {
      id: 'sync-bridge',
      title: 'Sync Bridge – DevStride and Jira',
      description: 'Built a bidirectional synchronization system that automated real-time data flow between DevStride and Jira, covering over 95% of work item activities.',
      icon: '⚡',
      achievements: [
        '99.9% sync accuracy during extensive test cycles',
        '60% reduction in infrastructure costs',
        '80% reduction in manual sync workload',
        '100% improvement in data traceability and eliminating manual mapping efforts'
      ],
      technologies: ['Azure Functions', 'Azure Table Storage', 'REST APIs', 'Postman', 'Webhooks'],
      codeUrl: 'https://github.com/example/sync-bridge'
    },
    {
      id: 'ecommerce-api',
      title: 'E-Commerce Web-API',
      description: 'Built advanced search and filtering functionality using generic classes and LINQ, improving query precision, and reducing API response time by 25%.',
      icon: '🛒',
      achievements: [
        'Built advanced search and filtering functionality using generic classes and LINQ, improving query precision, and reducing API response time by 25%',
        'Designed and enforced a minimal-layer, modular architecture, enhancing system scalability and maintainability by 20%',
        'Created a centralized error handling mechanism with custom middleware and logging, resulting in 30% less downtime and improved application reliability',
        'Set up automated CI/CD pipelines on Azure DevOps, streamlining deployments and reducing release cycles by 35%',
        'Implemented Azure-hosted cron jobs (timer-based Azure Functions) for backend automation tasks',
        'Restricted disposable email addresses during registration and login, enhancing authentication integrity'
      ],
      technologies: ['ASP.NET Core', 'LINQ', 'Azure DevOps', 'Azure Functions', 'REST APIs'],
      codeUrl: 'https://github.com/example/ecommerce-api'
    },
    {
      id: '3d-auto-estimating',
      title: '3D Auto Estimating Application',
      description: 'Applied lazy loading and optimized code by reducing redundancy by 30%, enhancing system maintainability and improving load times by 20%.',
      icon: '📐',
      achievements: [
        'Applied lazy loading and optimized code by reducing redundancy by 30%, enhancing system maintainability and improving load times by 20%',
        'Migrated Angular project from v9 to v19, modernizing the codebase and ensuring compatibility with the latest features and libraries',
        'Streamlined multi-user workflow with a restructured application architecture for better scalability',
        'Enabled seamless Excel data integration, automating file processing and visualization to improve user interaction by 20% using EPPlus',
        'Led the deployment and release process across staging and production environments using Docker, Git, and CI/CD pipelines'
      ],
      technologies: ['Angular 19', 'EPPlus', 'Docker', 'Git', 'CI/CD', 'Excel Integration'],
      codeUrl: 'https://github.com/example/3d-estimating'
    },
    {
      id: 'energy-dealer-hub',
      title: 'Energy Dealer Hub',
      description: 'Developed a fully functional business website with secure backend API using .NET Core and Dapper for chemical energy dealership operations.',
      icon: '⚡',
      achievements: [
        'Developed a fully functional business website with secure backend API using .NET Core and Dapper',
        'Upgraded Angular from version 9 to 16, modernizing the codebase and adopting latest UI practices',
        'Integrated JWT authentication, and implemented email services for verification and transactional notifications',
        'Restricted disposable email addresses on the backend to prevent spam/bot registrations',
        'Used Directus CMS for dynamic content control by business teams without developer involvement',
        'Created responsive UI with lazy loading modules, reusable components, and enhanced UX using Angular Material and PrimeNG',
        'Improved page load speed by 35% and enhanced customer interaction via real-time updates using RxJS and Angular services'
      ],
      technologies: ['.NET Core', 'Dapper', 'Angular 16', 'JWT', 'Directus CMS', 'Angular Material', 'PrimeNG', 'RxJS'],
      codeUrl: 'https://github.com/example/energy-dealer-hub'
    }
  ]
};