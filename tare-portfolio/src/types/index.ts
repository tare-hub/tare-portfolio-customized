export type AccentTheme = 'crimson' | 'cyan' | 'emerald' | 'purple' | 'amber';

export interface ProjectArchitecture {
  overview: string;
  keyFeatures: string[];
  databaseSchema: string[];
  apiEndpoints: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; path: string; desc: string }[];
  technicalHighlights: string[];
  systemMetrics: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Backend' | 'Frontend' | 'Creative';
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  accentGradient: string;
  symbol: string;
  symbolType: 'text' | 'icon';
  imageUrl?: string;
  imageAlt?: string;
  mockupType: 'pharma' | 'autodrive' | 'media' | 'devpulse';
  architecture: ProjectArchitecture;
}

export interface SkillItem {
  name: string;
  level: number; // 1-100%
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'architecture';
  icon: string;
  experience: string;
  description: string;
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
}

export interface TerminalCommand {
  command: string;
  description: string;
  execute: (args: string[]) => string | React.ReactNode;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  message: string;
}