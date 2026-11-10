export type CoreLanguageType = 'C' | 'Python' | 'HTML' | 'CSS';

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface Benchmark {
  label: string;
  value: string;
  comparison: string;
}

export interface TechnicalDoc {
  overview: string;
  architectureSummary: string;
  complexity: {
    time: string;
    space: string;
  };
  algorithmsUsed: string[];
  dataStructures: string[];
  codeSnippets: CodeSnippet[];
  benchmarks: Benchmark[];
  challengesSolved: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  languages: CoreLanguageType[];
  tags: string[];
  description: string;
  keyFeatures: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  technicalDoc: TechnicalDoc;
  featured: boolean;
  accentColor: string;
  bannerGradient: string;
  imageUrl?: string;
  liveUrl?: string;
}

export interface CoreLanguageInfo {
  id: CoreLanguageType;
  name: string;
  version: string;
  level: string;
  tagline: string;
  focusAreas: string[];
  concepts: string[];
  codeHighlight: {
    title: string;
    language: string;
    code: string;
    notes: string;
  };
  projectIds: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  inquiryType: 'Recruitment' | 'Freelance' | 'Engineering Chat' | 'General';
  message: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarSeed: string;
}
